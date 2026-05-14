import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs';
import * as path from 'path';
import { readConfig, resolvedPaths } from '../../utils/config';
import { fetchRegistryIndex } from '../../utils/registry';
import { registry as localRegistry } from '../../core/registry/registry-data';

function isComponentInstalled(name: string, config: ReturnType<typeof readConfig> & object, cwd: string): boolean {
  const entry = localRegistry.find((c) => c.name === name);
  if (!entry) return false;

  const paths = resolvedPaths(config, cwd);
  const basePath = entry.basePath;
  const segment = basePath.startsWith('components/')
    ? basePath.slice('components/'.length)
    : basePath;

  let targetDir: string;
  if (segment === 'utils') targetDir = paths.utils;
  else if (segment === 'core') targetDir = paths.core;
  else if (segment === 'services') targetDir = paths.services;
  else targetDir = path.join(paths.components, segment);

  if (!fs.existsSync(targetDir)) return false;
  return fs.readdirSync(targetDir).length > 0;
}

export const listCommand = new Command('list')
  .description('List available components and their installation status')
  .option('--installed', 'Show only installed components', false)
  .action(async (options: { installed: boolean }) => {
    const cwd = process.cwd();

    const config = readConfig(cwd);
    if (!config) {
      console.error(chalk.red('No components.json found. Run "npx @nexuslabs/cli@alpha init" first.'));
      process.exit(1);
    }

    const spinner = ora('Fetching registry...').start();
    let index;
    try {
      index = await fetchRegistryIndex(config.registryUrl);
      spinner.succeed('Registry fetched');
    } catch (err) {
      spinner.fail('Failed to fetch registry');
      console.error(chalk.red(String(err)));
      process.exit(1);
    }

    const rows: Array<{ name: string; installed: boolean }> = index.items.map((item) => ({
      name: item.name,
      installed: isComponentInstalled(item.name, config, cwd),
    }));

    const filtered = options.installed ? rows.filter((r) => r.installed) : rows;

    if (filtered.length === 0) {
      console.log(chalk.yellow('No components found.'));
      return;
    }

    const maxNameLen = Math.max(4, ...filtered.map((r) => r.name.length));
    const nameHeader = 'NAME'.padEnd(maxNameLen);
    const statusHeader = 'STATUS';

    console.log('');
    console.log(`${chalk.bold(nameHeader)}  ${chalk.bold(statusHeader)}`);
    console.log(`${'─'.repeat(maxNameLen)}  ${'─'.repeat(13)}`);

    for (const row of filtered) {
      const name = row.name.padEnd(maxNameLen);
      const status = row.installed
        ? chalk.green('installed')
        : chalk.dim('not installed');
      console.log(`${name}  ${status}`);
    }
    console.log('');
  });
