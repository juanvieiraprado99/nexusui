import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { writeConfig } from '../../utils/config';
import { installComponent } from '../add/component-installer';
import { getRegistryUrl } from '../../utils/registry';
import { BASE_COLORS, PRIMARY_COLORS } from './theme-presets';
import type { BaseColor, PrimaryColor } from './theme-presets';
import { patchAngularJson } from './angular-json-patcher';
import { patchStylesCss } from './tailwind-patcher';
import { patchPostcss } from './postcss-patcher';
import { patchTsconfig } from './tsconfig-patcher';
import { detectPackageManager, detectAngularProject } from './project-detector';

export const initCommand = new Command('init')
  .description('Initialize nexus-ui in your Angular project')
  .action(async () => {
    const cwd = process.cwd();

    console.log(chalk.bold('\nnexus-ui init\n'));

    const angular = detectAngularProject(cwd);
    if (!angular) {
      console.error(chalk.red('No angular.json found. Run this command inside an Angular project.'));
      process.exit(1);
    }

    const packageManager = detectPackageManager(cwd);

    const existingConfig = fs.existsSync(path.join(cwd, 'components.json'));
    if (existingConfig) {
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: 'components.json already exists. Re-initialize?',
        initial: false,
      });
      if (!overwrite) return;
    }

    const answers = await prompts([
      {
        type: 'select',
        name: 'baseColor',
        message: 'Which base color would you like to use?',
        choices: BASE_COLORS.map((c) => ({ title: c, value: c })),
        initial: 0,
      },
      {
        type: 'select',
        name: 'primaryColor',
        message: 'Which primary color for components?',
        choices: PRIMARY_COLORS.map((c) => ({ title: c, value: c })),
        initial: 0,
      },
      {
        type: 'text',
        name: 'stylesPath',
        message: 'Where is your global styles file?',
        initial: angular.stylesPath,
      },
      {
        type: 'text',
        name: 'baseUrl',
        message: 'Where is your app source root?',
        initial: angular.sourceRoot + '/app',
      },
      {
        type: 'text',
        name: 'baseAlias',
        message: 'Base path alias (used for @/shared/...)?',
        initial: '@',
      },
    ]);

    if (!answers.baseColor) return;

    const baseAlias: string = answers.baseAlias ?? '@';
    const baseUrl: string = answers.baseUrl ?? `${angular.sourceRoot}/app`;

    const config = {
      $schema: 'https://nexus-ui.dev/schema/components.json',
      packageManager: packageManager as 'npm' | 'yarn' | 'pnpm' | 'bun',
      registryUrl: getRegistryUrl(),
      tailwind: {
        css: answers.stylesPath as string,
        baseColor: answers.baseColor as string,
        primaryColor: answers.primaryColor as string,
      },
      baseUrl,
      aliases: {
        components: `${baseAlias}/shared/components`,
        utils: `${baseAlias}/shared/utils`,
      },
    };

    console.log('');
    console.log(chalk.bold('Configuration:'));
    console.log(JSON.stringify(config, null, 2));
    console.log('');

    const { confirm } = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with this configuration?',
      initial: true,
    });
    if (!confirm) return;

    const spinner = ora('Writing components.json...').start();
    writeConfig(cwd, config);
    spinner.succeed('components.json written');

    const depsSpinner = ora('Installing dependencies...').start();
    try {
      const deps = [
        'tailwindcss',
        '@tailwindcss/postcss',
        '@tailwindcss/cli',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ];
      execSync(`${packageManager} install ${deps.join(' ')}`, { cwd, stdio: 'pipe' });
      depsSpinner.succeed('Dependencies installed');
    } catch (err) {
      depsSpinner.fail('Failed to install dependencies');
      console.error(chalk.red(String(err)));
      process.exit(1);
    }

    const configSpinner = ora('Configuring project...').start();
    patchPostcss(cwd);
    patchStylesCss(answers.stylesPath as string, answers.baseColor as BaseColor, answers.primaryColor as PrimaryColor);
    patchTsconfig(cwd, baseUrl, config.aliases);
    patchAngularJson(cwd, answers.stylesPath as string);
    configSpinner.succeed('Project configured');

    const utilsSpinner = ora('Installing utils...').start();
    try {
      await installComponent('utils', config, cwd);
      utilsSpinner.succeed('utils installed');
    } catch (err) {
      utilsSpinner.fail(`Failed to install utils: ${String(err)}`);
    }

    console.log('');
    console.log(chalk.green.bold('nexus-ui initialized!'));
    console.log('');
    console.log('Next steps:');
    console.log(`  ${chalk.cyan('npx @nexuslabs/cli@alpha add button')}   — add your first component`);
    console.log(`  ${chalk.cyan('npx @nexuslabs/cli@alpha add')}           — browse all available components`);
  });
