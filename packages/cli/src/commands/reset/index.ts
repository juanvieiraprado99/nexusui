import { Command } from 'commander';
import chalk from 'chalk';
import prompts from 'prompts';
import * as fs from 'fs';
import { readConfig } from '../../utils/config';
import { getTargetDir, isInstalled } from '../../utils/paths';
import { fetchRegistryIndex } from '../../utils/registry';
import { installComponent } from '../add/component-installer';
import { registry as localRegistry } from '../../core/registry/registry-data';

type ResetResult = 'reset' | 'skipped' | 'error';

async function resetComponent(
  name: string,
  config: ReturnType<typeof readConfig> & object,
  cwd: string,
  latestVersion: string | undefined,
  requestedVersion: string | undefined,
  yes: boolean,
): Promise<ResetResult> {
  if (!localRegistry.find((c) => c.name === name)) {
    console.error(chalk.red(`Component "${name}" not found in registry.`));
    return 'error';
  }

  // Only the current registry version is available — historical versions are out of scope.
  if (requestedVersion && requestedVersion !== latestVersion) {
    console.error(
      chalk.red(
        `Version ${requestedVersion} of "${name}" is not available. Only the current version (${latestVersion ?? 'unknown'}) can be installed.`,
      ),
    );
    return 'error';
  }

  const targetDir = getTargetDir(name, config, cwd);
  if (!targetDir) {
    console.error(chalk.red(`Component "${name}" not found in registry.`));
    return 'error';
  }

  if (!yes) {
    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Reset ${chalk.cyan(name)} to v${latestVersion ?? '?'}? This deletes local files and re-copies them.`,
      initial: false,
    });
    if (!confirm) {
      console.log(chalk.dim(`Skipping ${name}.`));
      return 'skipped';
    }
  }

  try {
    if (isInstalled(name, config, cwd) && fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true });
    }
    await installComponent(name, config, cwd);
  } catch (err) {
    console.error(chalk.red(`Failed to reset ${name}: ${String(err)}`));
    return 'error';
  }

  console.log(chalk.green(`✓ ${name}: reset to v${latestVersion ?? '?'}`));
  return 'reset';
}

export const resetCommand = new Command('reset')
  .description('Delete a component locally and re-copy it from the registry (current version)')
  .argument('<components...>', 'Component names to reset')
  .option('--version <version>', 'Version to reset to (only the current version is supported)')
  .option('--yes', 'Skip confirmation prompts', false)
  .action(async (components: string[], options: { version?: string; yes: boolean }) => {
    const cwd = process.cwd();

    const config = readConfig(cwd);
    if (!config) {
      console.error(chalk.red('No components.json found. Run "npx @nexuslabs/cli@alpha init" first.'));
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

    const results = { reset: 0, skipped: 0, error: 0 };

    for (const name of components) {
      const result = await resetComponent(name, config, cwd, latestOf(name), options.version, options.yes);
      results[result]++;
    }

    console.log('');
    console.log(chalk.bold('Summary:'));
    if (results.reset > 0) console.log(chalk.green(`  Reset:   ${results.reset}`));
    if (results.skipped > 0) console.log(chalk.yellow(`  Skipped: ${results.skipped}`));
    if (results.error > 0) console.log(chalk.red(`  Errors:  ${results.error}`));
  });
