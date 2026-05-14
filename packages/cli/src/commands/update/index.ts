import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
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

function isInstalled(name: string, config: ReturnType<typeof readConfig> & object, cwd: string): boolean {
  const dir = getTargetDir(name, config, cwd);
  if (!dir || !fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).length > 0;
}

function showInlineDiff(fileName: string, localContent: string, registryContent: string): void {
  const localLines = localContent.split('\n');
  const registryLines = registryContent.split('\n');

  console.log(chalk.bold(`\n--- local/${fileName}`));
  console.log(chalk.bold(`+++ registry/${fileName}`));
  console.log(chalk.cyan('@@ changed @@'));

  // Simple before/after block diff
  for (const line of localLines) {
    console.log(chalk.red('- ' + line));
  }
  for (const line of registryLines) {
    console.log(chalk.green('+ ' + line));
  }
}

async function updateComponent(
  name: string,
  config: ReturnType<typeof readConfig> & object,
  cwd: string,
  yes: boolean,
): Promise<'uptodate' | 'updated' | 'skipped' | 'error'> {
  const targetDir = getTargetDir(name, config, cwd);
  if (!targetDir) {
    console.error(chalk.red(`Component "${name}" not found in registry.`));
    return 'error';
  }

  let item;
  try {
    item = await fetchComponent(name, config.registryUrl);
  } catch (err) {
    console.error(chalk.red(`Failed to fetch ${name}: ${String(err)}`));
    return 'error';
  }

  // Compute changed files
  const changedFiles: Array<{ name: string; local: string; incoming: string; filePath: string }> = [];

  for (const file of item.files) {
    const filePath = path.join(targetDir, file.name);
    const incoming = transformContent(file.content, config);

    if (!fs.existsSync(filePath)) {
      changedFiles.push({ name: file.name, local: '', incoming, filePath });
      continue;
    }

    const local = fs.readFileSync(filePath, 'utf-8');
    if (local !== incoming) {
      changedFiles.push({ name: file.name, local, incoming, filePath });
    }
  }

  if (changedFiles.length === 0) {
    console.log(chalk.dim(`${name}: up to date`));
    return 'uptodate';
  }

  if (yes) {
    for (const f of changedFiles) {
      fs.mkdirSync(path.dirname(f.filePath), { recursive: true });
      fs.writeFileSync(f.filePath, f.incoming, 'utf-8');
    }
    console.log(chalk.green(`✓ ${name}: updated (${changedFiles.length} file${changedFiles.length > 1 ? 's' : ''})`));
    return 'updated';
  }

  // Interactive prompt
  const { action } = await prompts({
    type: 'select',
    name: 'action',
    message: `${chalk.cyan(name)} has ${changedFiles.length} changed file${changedFiles.length > 1 ? 's' : ''}. Overwrite?`,
    choices: [
      { title: 'Yes', value: 'yes' },
      { title: 'No', value: 'no' },
      { title: 'Diff (show changes)', value: 'diff' },
    ],
    initial: 1,
  });

  if (action === 'diff') {
    for (const f of changedFiles) {
      showInlineDiff(f.name, f.local, f.incoming);
    }
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Overwrite ${chalk.cyan(name)}?`,
      initial: false,
    });
    if (!confirm) {
      console.log(chalk.dim(`Skipping ${name}.`));
      return 'skipped';
    }
  } else if (action !== 'yes') {
    console.log(chalk.dim(`Skipping ${name}.`));
    return 'skipped';
  }

  for (const f of changedFiles) {
    fs.mkdirSync(path.dirname(f.filePath), { recursive: true });
    fs.writeFileSync(f.filePath, f.incoming, 'utf-8');
  }
  console.log(chalk.green(`✓ ${name}: updated (${changedFiles.length} file${changedFiles.length > 1 ? 's' : ''})`));
  return 'updated';
}

export const updateCommand = new Command('update')
  .description('Update installed components to the latest registry version')
  .argument('[components...]', 'Component names to update')
  .option('--all', 'Update all installed components', false)
  .option('--yes', 'Skip confirmation prompts', false)
  .action(async (components: string[], options: { all: boolean; yes: boolean }) => {
    const cwd = process.cwd();

    const config = readConfig(cwd);
    if (!config) {
      console.error(chalk.red('No components.json found. Run "npx @nexuslabs/cli@alpha init" first.'));
      process.exit(1);
    }

    let targets: string[] = components;

    if (options.all) {
      targets = localRegistry
        .map((e) => e.name)
        .filter((name) => isInstalled(name, config, cwd));

      if (targets.length === 0) {
        console.log(chalk.yellow('No installed components found.'));
        return;
      }
    } else if (targets.length === 0) {
      console.error(chalk.red('No component names provided. Use --all to update all installed components.'));
      process.exit(1);
    }

    const results = { updated: 0, uptodate: 0, skipped: 0, error: 0 };

    for (const name of targets) {
      const spinner = ora(`Checking ${chalk.cyan(name)}...`).start();
      spinner.stop();
      const result = await updateComponent(name, config, cwd, options.yes);
      results[result]++;
    }

    console.log('');
    console.log(chalk.bold('Summary:'));
    if (results.updated > 0) console.log(chalk.green(`  Updated:    ${results.updated}`));
    if (results.uptodate > 0) console.log(chalk.dim(`  Up to date: ${results.uptodate}`));
    if (results.skipped > 0) console.log(chalk.yellow(`  Skipped:    ${results.skipped}`));
    if (results.error > 0) console.log(chalk.red(`  Errors:     ${results.error}`));
  });
