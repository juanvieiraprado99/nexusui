import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import * as fs from 'fs';
import * as path from 'path';
import { readConfig, resolvedPaths } from '../../utils/config';
import { registry as localRegistry } from '../../core/registry/registry-data';

function getTargetDir(name: string, config: ReturnType<typeof readConfig> & object, cwd: string): string | null {
  const entry = localRegistry.find((c) => c.name === name);
  if (!entry) return null;

  const paths = resolvedPaths(config, cwd);
  const basePath = entry.basePath;
  const segment = basePath.startsWith('components/')
    ? basePath.slice('components/'.length)
    : basePath;

  if (segment === 'utils') return paths.utils;
  if (segment === 'core') return paths.core;
  if (segment === 'services') return paths.services;
  return path.join(paths.components, segment);
}

function isInstalled(name: string, config: ReturnType<typeof readConfig> & object, cwd: string): boolean {
  const dir = getTargetDir(name, config, cwd);
  if (!dir || !fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).length > 0;
}

function findInstalledDependents(name: string, config: ReturnType<typeof readConfig> & object, cwd: string): string[] {
  return localRegistry
    .filter(
      (entry) =>
        entry.name !== name &&
        entry.registryDependencies?.includes(name) &&
        isInstalled(entry.name, config, cwd),
    )
    .map((entry) => entry.name);
}

export const removeCommand = new Command('remove')
  .description('Remove installed components from your project')
  .argument('[components...]', 'Component names to remove')
  .action(async (components: string[]) => {
    const cwd = process.cwd();

    const config = readConfig(cwd);
    if (!config) {
      console.error(chalk.red('No components.json found. Run "npx @nexuslabs/cli@alpha init" first.'));
      process.exit(1);
    }

    if (components.length === 0) {
      console.error(chalk.red('No component names provided. Usage: nexus remove <component> [...]'));
      process.exit(1);
    }

    const removed: string[] = [];
    const skipped: string[] = [];

    for (const name of components) {
      const entry = localRegistry.find((c) => c.name === name);
      if (!entry) {
        console.error(chalk.red(`Component "${name}" not found in registry.`));
        skipped.push(name);
        continue;
      }

      const targetDir = getTargetDir(name, config, cwd);
      if (!targetDir || !isInstalled(name, config, cwd)) {
        console.log(chalk.yellow(`${name}: not installed, skipping.`));
        skipped.push(name);
        continue;
      }

      const dependents = findInstalledDependents(name, config, cwd);
      if (dependents.length > 0) {
        const depList = dependents.join(', ');
        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: `${chalk.yellow(depList)} depend${dependents.length === 1 ? 's' : ''} on ${chalk.cyan(name)}. Proceed anyway?`,
          initial: false,
        });
        if (!proceed) {
          console.log(chalk.dim(`Skipping ${name}.`));
          skipped.push(name);
          continue;
        }
      }

      try {
        fs.rmSync(targetDir, { recursive: true });
        console.log(chalk.green(`✓ Removed ${chalk.cyan(name)}`));
        removed.push(name);
      } catch (err) {
        console.error(chalk.red(`Failed to remove ${name}: ${String(err)}`));
        skipped.push(name);
      }
    }

    console.log('');
    if (removed.length > 0) {
      console.log(chalk.green.bold(`Removed: ${removed.join(', ')}`));
    }
    if (skipped.length > 0) {
      console.log(chalk.yellow(`Skipped: ${skipped.join(', ')}`));
    }
  });
