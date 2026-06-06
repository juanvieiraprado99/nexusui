import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getInstalledVersion, readConfig } from '../../utils/config';
import { isInstalled } from '../../utils/paths';
import { fetchRegistryIndex } from '../../utils/registry';

type Status = 'up-to-date' | 'outdated' | 'not-installed';

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

    const rows = index.items.map((item) => {
      const installed = isInstalled(item.name, config, cwd);
      const installedVersion = getInstalledVersion(config, item.name);
      const latest = item.version ?? '—';

      let status: Status;
      if (!installed) status = 'not-installed';
      else if (installedVersion && installedVersion === item.version) status = 'up-to-date';
      else status = 'outdated';

      return {
        name: item.name,
        installed: installed ? (installedVersion ?? '?') : '—',
        latest,
        status,
      };
    });

    const filtered = options.installed ? rows.filter((r) => r.status !== 'not-installed') : rows;

    if (filtered.length === 0) {
      console.log(chalk.yellow('No components found.'));
      return;
    }

    const nameLen = Math.max(4, ...filtered.map((r) => r.name.length));
    const instLen = Math.max(9, ...filtered.map((r) => r.installed.length));
    const latestLen = Math.max(6, ...filtered.map((r) => r.latest.length));

    const header =
      `${chalk.bold('NAME'.padEnd(nameLen))}  ` +
      `${chalk.bold('INSTALLED'.padEnd(instLen))}  ` +
      `${chalk.bold('LATEST'.padEnd(latestLen))}  ` +
      `${chalk.bold('STATUS')}`;

    console.log('');
    console.log(header);
    console.log(`${'─'.repeat(nameLen)}  ${'─'.repeat(instLen)}  ${'─'.repeat(latestLen)}  ${'─'.repeat(13)}`);

    for (const row of filtered) {
      const status =
        row.status === 'up-to-date'
          ? chalk.green('up to date')
          : row.status === 'outdated'
            ? chalk.yellow('outdated')
            : chalk.dim('not installed');

      console.log(
        `${row.name.padEnd(nameLen)}  ` +
          `${row.installed.padEnd(instLen)}  ` +
          `${row.latest.padEnd(latestLen)}  ` +
          `${status}`,
      );
    }
    console.log('');
  });
