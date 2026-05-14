import { Command } from 'commander';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { readConfig, resolvedPaths } from '../../utils/config';
import { fetchComponent, transformContent } from '../../utils/registry';
import { registry as localRegistry } from '../../core/registry/registry-data';

function getTargetDir(name: string, config: ReturnType<typeof readConfig> & object, cwd: string): string | null {
  const entry = localRegistry.find((c) => c.name === name);
  if (!entry) return null;

  const paths = resolvedPaths(config, cwd);
  const segment = entry.basePath.startsWith('components/')
    ? entry.basePath.slice('components/'.length)
    : entry.basePath;

  if (segment === 'utils') return paths.utils;
  if (segment === 'core') return paths.core;
  if (segment === 'services') return paths.services;
  return path.join(paths.components, segment);
}

function showInlineDiff(fileName: string, localContent: string, registryContent: string): void {
  const localLines = localContent.split('\n');
  const registryLines = registryContent.split('\n');

  console.log(chalk.bold(`\n--- local/${fileName}`));
  console.log(chalk.bold(`+++ registry/${fileName}`));
  console.log(chalk.cyan('@@ changed @@'));

  for (const line of localLines) {
    console.log(chalk.red('- ' + line));
  }
  for (const line of registryLines) {
    console.log(chalk.green('+ ' + line));
  }
}

async function diffComponent(
  name: string,
  config: ReturnType<typeof readConfig> & object,
  cwd: string,
): Promise<void> {
  const targetDir = getTargetDir(name, config, cwd);
  if (!targetDir) {
    console.error(chalk.red(`Component "${name}" not found in registry.`));
    return;
  }

  let item;
  try {
    item = await fetchComponent(name, config.registryUrl);
  } catch (err) {
    console.error(chalk.red(`Failed to fetch ${name}: ${String(err)}`));
    return;
  }

  let hasChanges = false;

  for (const file of item.files) {
    const filePath = path.join(targetDir, file.name);
    const incoming = transformContent(file.content, config);

    if (!fs.existsSync(filePath)) {
      console.log(chalk.bold(`\n${name} / ${file.name}`) + chalk.yellow(' (new file)'));
      for (const line of incoming.split('\n')) {
        console.log(chalk.green('+ ' + line));
      }
      hasChanges = true;
      continue;
    }

    const local = fs.readFileSync(filePath, 'utf-8');
    if (local !== incoming) {
      console.log(chalk.bold(`\n${name} / ${file.name}`));
      showInlineDiff(file.name, local, incoming);
      hasChanges = true;
    }
  }

  if (!hasChanges) {
    console.log(chalk.dim(`${name}: no changes`));
  }
}

export const diffCommand = new Command('diff')
  .description('Show diff between local component files and registry versions')
  .argument('[components...]', 'Component names to diff')
  .action(async (components: string[]) => {
    const cwd = process.cwd();

    if (components.length === 0) {
      console.error(chalk.red('No component names provided. Usage: nexus diff <component> [...]'));
      process.exit(1);
    }

    const config = readConfig(cwd);
    if (!config) {
      console.error(chalk.red('No components.json found. Run "npx @nexuslabs/cli@alpha init" first.'));
      process.exit(1);
    }

    for (const name of components) {
      await diffComponent(name, config, cwd);
    }

    console.log('');
  });
