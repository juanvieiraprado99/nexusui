import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { execSync } from 'child_process';
import { readConfig } from '../../utils/config';
import { fetchRegistryIndex } from '../../utils/registry';
import { resolveDependencies } from './dependency-resolver';
import { installComponent } from './component-installer';

export const addCommand = new Command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Component names to add')
  .option('--overwrite', 'Overwrite existing components', false)
  .option('--all', 'Install all available components', false)
  .action(async (components: string[], options: { overwrite: boolean; all: boolean }) => {
    const cwd = process.cwd();

    const config = readConfig(cwd);
    if (!config) {
      console.error(chalk.red('No components.json found. Run nexus init first.'));
      process.exit(1);
    }

    let selected: string[] = components;

    if (options.all) {
      const spinner = ora('Fetching registry...').start();
      try {
        const index = await fetchRegistryIndex(config.registryUrl);
        selected = index.items.map((i) => i.name);
        spinner.succeed('Registry fetched');
      } catch (err) {
        spinner.fail('Failed to fetch registry');
        console.error(chalk.red(String(err)));
        process.exit(1);
      }
    } else if (selected.length === 0) {
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

      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Which components do you want to add?',
        choices: index.items.map((i) => ({ title: i.name, value: i.name })),
        min: 1,
      });

      if (!response.components || response.components.length === 0) {
        console.log(chalk.yellow('No components selected.'));
        return;
      }
      selected = response.components as string[];
    }

    const spinner = ora('Resolving dependencies...').start();
    let resolved;
    try {
      resolved = await resolveDependencies(selected, config, cwd, { overwrite: options.overwrite });
      spinner.succeed('Dependencies resolved');
    } catch (err) {
      spinner.fail('Failed to resolve dependencies');
      console.error(chalk.red(String(err)));
      process.exit(1);
    }

    if (resolved.components.length === 0) {
      console.log(
        chalk.green('All selected components are already installed.') +
          ' Use --overwrite to reinstall.',
      );
      return;
    }

    console.log('');
    console.log(chalk.bold('Components to install:'), resolved.components.join(', '));
    if (resolved.npmPackages.length > 0) {
      console.log(chalk.bold('npm packages:        '), resolved.npmPackages.join(', '));
    }
    console.log('');

    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed?',
      initial: true,
    });
    if (!confirm) return;

    if (resolved.npmPackages.length > 0) {
      const installSpinner = ora('Installing npm packages...').start();
      try {
        execSync(`${config.packageManager} install ${resolved.npmPackages.join(' ')}`, {
          cwd,
          stdio: 'pipe',
        });
        installSpinner.succeed('npm packages installed');
      } catch (err) {
        installSpinner.fail('Failed to install npm packages');
        console.error(chalk.red(String(err)));
        process.exit(1);
      }
    }

    for (const name of resolved.components) {
      const compSpinner = ora(`Installing ${chalk.cyan(name)}...`).start();
      try {
        const files = await installComponent(name, config, cwd);
        compSpinner.succeed(`${chalk.cyan(name)} installed (${files.length} files)`);
      } catch (err) {
        compSpinner.fail(`Failed to install ${name}`);
        console.error(chalk.red(String(err)));
        process.exit(1);
      }
    }

    console.log('');
    console.log(chalk.green.bold('Done!'));
  });
