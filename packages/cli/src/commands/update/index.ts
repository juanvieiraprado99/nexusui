import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import { getInstalledVersion, readConfig } from '../../utils/config';
import { isInstalled } from '../../utils/paths';
import { fetchRegistryIndex } from '../../utils/registry';
import { installComponent } from '../add/component-installer';
import { registry as localRegistry } from '../../core/registry/registry-data';

type UpdateResult = 'uptodate' | 'updated' | 'skipped' | 'error';

async function updateComponent(
  name: string,
  config: ReturnType<typeof readConfig> & object,
  cwd: string,
  latestVersion: string | undefined,
  yes: boolean,
): Promise<UpdateResult> {
  if (!localRegistry.find((c) => c.name === name)) {
    console.error(chalk.red(`Component "${name}" not found in registry.`));
    return 'error';
  }

  if (!latestVersion) {
    console.error(chalk.red(`No version info for "${name}" in registry.`));
    return 'error';
  }

  const installed = getInstalledVersion(config, name);

  // Version is the source of truth — equal versions mean up to date even if
  // the user has locally edited the component.
  if (installed && installed === latestVersion) {
    console.log(chalk.dim(`${name}: up to date (v${installed})`));
    return 'uptodate';
  }

  const from = installed ?? 'unknown';

  if (!yes) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Update ${chalk.cyan(name)} ${chalk.dim(from)} → ${chalk.green(latestVersion)}? This overwrites local changes.`,
      initial: true,
    });
    if (!confirm) {
      console.log(chalk.dim(`Skipping ${name}.`));
      return 'skipped';
    }
  }

  try {
    await installComponent(name, config, cwd);
  } catch (err) {
    console.error(chalk.red(`Failed to update ${name}: ${String(err)}`));
    return 'error';
  }

  console.log(chalk.green(`✓ ${name}: updated ${from} → ${latestVersion}`));
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

    let index;
    try {
      index = await fetchRegistryIndex(config.registryUrl);
    } catch (err) {
      console.error(chalk.red(`Failed to fetch registry: ${String(err)}`));
      process.exit(1);
    }

    const latestOf = (name: string) => index.items.find((i) => i.name === name)?.version;

    const results = { updated: 0, uptodate: 0, skipped: 0, error: 0 };

    for (const name of targets) {
      const result = await updateComponent(name, config, cwd, latestOf(name), options.yes);
      results[result]++;
    }

    console.log('');
    console.log(chalk.bold('Summary:'));
    if (results.updated > 0) console.log(chalk.green(`  Updated:    ${results.updated}`));
    if (results.uptodate > 0) console.log(chalk.dim(`  Up to date: ${results.uptodate}`));
    if (results.skipped > 0) console.log(chalk.yellow(`  Skipped:    ${results.skipped}`));
    if (results.error > 0) console.log(chalk.red(`  Errors:     ${results.error}`));
  });
