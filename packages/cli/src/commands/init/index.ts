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

const BASE_COLORS = ['slate', 'zinc', 'neutral', 'stone', 'gray'] as const;
type BaseColor = (typeof BASE_COLORS)[number];

const NEXUS_THEME_MARKER = '/* nexus-ui theme */';

function detectPackageManager(cwd: string): string {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

function detectAngularProject(cwd: string): {
  sourceRoot: string;
  stylesPath: string;
} | null {
  const angularJsonPath = path.join(cwd, 'angular.json');
  if (!fs.existsSync(angularJsonPath)) return null;

  try {
    const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
    const projects = angularJson.projects ?? {};
    const projectNames = Object.keys(projects);
    if (projectNames.length === 0) return null;

    const mainProject = projects[projectNames[0]];
    const sourceRoot: string = mainProject.sourceRoot ?? 'src';
    const buildOptions = mainProject.architect?.build?.options ?? mainProject.targets?.build?.options ?? {};
    const styles: string[] = buildOptions.styles ?? [];
    const stylesPath = styles[0] ?? `${sourceRoot}/styles.css`;

    return { sourceRoot, stylesPath };
  } catch {
    return null;
  }
}

function buildThemeCss(baseColor: BaseColor): string {
  const themes: Record<BaseColor, { light: Record<string, string>; dark: Record<string, string> }> = {
    slate: {
      light: {
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.145 0 0)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.145 0 0)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.145 0 0)',
        '--primary': 'oklch(0.205 0 0)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.97 0 0)',
        '--secondary-foreground': 'oklch(0.205 0 0)',
        '--muted': 'oklch(0.97 0 0)',
        '--muted-foreground': 'oklch(0.556 0 0)',
        '--accent': 'oklch(0.97 0 0)',
        '--accent-foreground': 'oklch(0.205 0 0)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.922 0 0)',
        '--input': 'oklch(0.922 0 0)',
        '--ring': 'oklch(0.708 0 0)',
        '--radius': '0.625rem',
      },
      dark: {
        '--background': 'oklch(0.145 0 0)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.205 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.205 0 0)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--secondary': 'oklch(0.269 0 0)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.269 0 0)',
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--accent': 'oklch(0.269 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.396 0.141 25.723)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.269 0 0)',
        '--input': 'oklch(0.269 0 0)',
        '--ring': 'oklch(0.439 0 0)',
      },
    },
    zinc: {
      light: {
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.141 0.005 285.823)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.141 0.005 285.823)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.141 0.005 285.823)',
        '--primary': 'oklch(0.21 0.006 285.885)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.967 0.001 286.375)',
        '--secondary-foreground': 'oklch(0.21 0.006 285.885)',
        '--muted': 'oklch(0.967 0.001 286.375)',
        '--muted-foreground': 'oklch(0.552 0.016 285.938)',
        '--accent': 'oklch(0.967 0.001 286.375)',
        '--accent-foreground': 'oklch(0.21 0.006 285.885)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.92 0.004 286.32)',
        '--input': 'oklch(0.92 0.004 286.32)',
        '--ring': 'oklch(0.705 0.015 286.067)',
        '--radius': '0.5rem',
      },
      dark: {
        '--background': 'oklch(0.141 0.005 285.823)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.21 0.006 285.885)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.21 0.006 285.885)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.21 0.006 285.885)',
        '--secondary': 'oklch(0.274 0.006 286.033)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.274 0.006 286.033)',
        '--muted-foreground': 'oklch(0.705 0.015 286.067)',
        '--accent': 'oklch(0.274 0.006 286.033)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.396 0.141 25.723)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.274 0.006 286.033)',
        '--input': 'oklch(0.274 0.006 286.033)',
        '--ring': 'oklch(0.552 0.016 285.938)',
      },
    },
    neutral: {
      light: {
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.145 0 0)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.145 0 0)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.145 0 0)',
        '--primary': 'oklch(0.205 0 0)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.97 0 0)',
        '--secondary-foreground': 'oklch(0.205 0 0)',
        '--muted': 'oklch(0.97 0 0)',
        '--muted-foreground': 'oklch(0.556 0 0)',
        '--accent': 'oklch(0.97 0 0)',
        '--accent-foreground': 'oklch(0.205 0 0)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.922 0 0)',
        '--input': 'oklch(0.922 0 0)',
        '--ring': 'oklch(0.708 0 0)',
        '--radius': '0.5rem',
      },
      dark: {
        '--background': 'oklch(0.145 0 0)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.205 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.205 0 0)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.985 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--secondary': 'oklch(0.269 0 0)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.269 0 0)',
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--accent': 'oklch(0.269 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.396 0.141 25.723)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.269 0 0)',
        '--input': 'oklch(0.269 0 0)',
        '--ring': 'oklch(0.439 0 0)',
      },
    },
    stone: {
      light: {
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.147 0.004 49.25)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.147 0.004 49.25)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.147 0.004 49.25)',
        '--primary': 'oklch(0.216 0.006 56.043)',
        '--primary-foreground': 'oklch(0.985 0.001 106.423)',
        '--secondary': 'oklch(0.97 0.001 106.424)',
        '--secondary-foreground': 'oklch(0.216 0.006 56.043)',
        '--muted': 'oklch(0.97 0.001 106.424)',
        '--muted-foreground': 'oklch(0.553 0.013 58.071)',
        '--accent': 'oklch(0.97 0.001 106.424)',
        '--accent-foreground': 'oklch(0.216 0.006 56.043)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.923 0.003 48.717)',
        '--input': 'oklch(0.923 0.003 48.717)',
        '--ring': 'oklch(0.709 0.01 56.259)',
        '--radius': '0.5rem',
      },
      dark: {
        '--background': 'oklch(0.147 0.004 49.25)',
        '--foreground': 'oklch(0.985 0.001 106.423)',
        '--card': 'oklch(0.216 0.006 56.043)',
        '--card-foreground': 'oklch(0.985 0.001 106.423)',
        '--popover': 'oklch(0.216 0.006 56.043)',
        '--popover-foreground': 'oklch(0.985 0.001 106.423)',
        '--primary': 'oklch(0.923 0.003 48.717)',
        '--primary-foreground': 'oklch(0.216 0.006 56.043)',
        '--secondary': 'oklch(0.268 0.007 34.298)',
        '--secondary-foreground': 'oklch(0.985 0.001 106.423)',
        '--muted': 'oklch(0.268 0.007 34.298)',
        '--muted-foreground': 'oklch(0.709 0.01 56.259)',
        '--accent': 'oklch(0.268 0.007 34.298)',
        '--accent-foreground': 'oklch(0.985 0.001 106.423)',
        '--destructive': 'oklch(0.396 0.141 25.723)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.268 0.007 34.298)',
        '--input': 'oklch(0.268 0.007 34.298)',
        '--ring': 'oklch(0.553 0.013 58.071)',
      },
    },
    gray: {
      light: {
        '--background': 'oklch(1 0 0)',
        '--foreground': 'oklch(0.13 0.028 261.692)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.13 0.028 261.692)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.13 0.028 261.692)',
        '--primary': 'oklch(0.21 0.034 264.665)',
        '--primary-foreground': 'oklch(0.985 0.002 247.839)',
        '--secondary': 'oklch(0.967 0.003 264.542)',
        '--secondary-foreground': 'oklch(0.21 0.034 264.665)',
        '--muted': 'oklch(0.967 0.003 264.542)',
        '--muted-foreground': 'oklch(0.551 0.027 264.364)',
        '--accent': 'oklch(0.967 0.003 264.542)',
        '--accent-foreground': 'oklch(0.21 0.034 264.665)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.928 0.006 264.531)',
        '--input': 'oklch(0.928 0.006 264.531)',
        '--ring': 'oklch(0.707 0.022 261.325)',
        '--radius': '0.5rem',
      },
      dark: {
        '--background': 'oklch(0.13 0.028 261.692)',
        '--foreground': 'oklch(0.985 0.002 247.839)',
        '--card': 'oklch(0.21 0.034 264.665)',
        '--card-foreground': 'oklch(0.985 0.002 247.839)',
        '--popover': 'oklch(0.21 0.034 264.665)',
        '--popover-foreground': 'oklch(0.985 0.002 247.839)',
        '--primary': 'oklch(0.928 0.006 264.531)',
        '--primary-foreground': 'oklch(0.21 0.034 264.665)',
        '--secondary': 'oklch(0.278 0.033 256.848)',
        '--secondary-foreground': 'oklch(0.985 0.002 247.839)',
        '--muted': 'oklch(0.278 0.033 256.848)',
        '--muted-foreground': 'oklch(0.707 0.022 261.325)',
        '--accent': 'oklch(0.278 0.033 256.848)',
        '--accent-foreground': 'oklch(0.985 0.002 247.839)',
        '--destructive': 'oklch(0.396 0.141 25.723)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.278 0.033 256.848)',
        '--input': 'oklch(0.278 0.033 256.848)',
        '--ring': 'oklch(0.551 0.027 264.364)',
      },
    },
  };

  const { light, dark } = themes[baseColor];

  const toVars = (tokens: Record<string, string>) =>
    Object.entries(tokens)
      .map(([k, v]) => `    ${k}: ${v};`)
      .join('\n');

  return `${NEXUS_THEME_MARKER}
@import "tailwindcss";

@layer base {
  :root {
${toVars(light)}
  }

  .dark {
${toVars(dark)}
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
`;
}

function patchStylesCss(stylesPath: string, baseColor: BaseColor): void {
  const theme = buildThemeCss(baseColor);

  if (!fs.existsSync(stylesPath)) {
    fs.mkdirSync(path.dirname(stylesPath), { recursive: true });
    fs.writeFileSync(stylesPath, theme, 'utf-8');
    return;
  }

  const existing = fs.readFileSync(stylesPath, 'utf-8');
  if (existing.includes(NEXUS_THEME_MARKER)) return;

  // Prepend nexus theme, preserving any existing content after
  const existingWithoutTailwind = existing.replace(/@import ["']tailwindcss["'];?\n?/g, '').trim();
  const combined = theme + (existingWithoutTailwind ? '\n\n' + existingWithoutTailwind : '');
  fs.writeFileSync(stylesPath, combined, 'utf-8');
}

function aliasToFsPath(alias: string, baseUrl: string): string {
  const relative = alias.replace(/^@\//, '');
  return `${baseUrl}/${relative}`;
}

function patchTsconfig(cwd: string, baseUrl: string, aliases: { utils: string; components: string }): void {
  const tsconfigPath = path.join(cwd, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) return;

  const raw = fs.readFileSync(tsconfigPath, 'utf-8');
  let config: Record<string, unknown>;
  try {
    config = JSON.parse(raw);
  } catch {
    return;
  }

  const compilerOptions = (config['compilerOptions'] as Record<string, unknown>) ?? {};
  const paths = (compilerOptions['paths'] as Record<string, string[]>) ?? {};

  const utilsAlias = `${aliases.utils}/*`;
  const compsAlias = `${aliases.components}/*`;

  if (!paths[utilsAlias]) paths[utilsAlias] = [`${aliasToFsPath(aliases.utils, baseUrl)}/*`];
  if (!paths[compsAlias]) paths[compsAlias] = [`${aliasToFsPath(aliases.components, baseUrl)}/*`];
  if (!paths['@/*'])      paths['@/*']      = [`${baseUrl}/*`];

  if (!compilerOptions['baseUrl']) compilerOptions['baseUrl'] = '.';

  compilerOptions['paths'] = paths;
  config['compilerOptions'] = compilerOptions;

  fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2) + '\n');
}

function patchPostcss(cwd: string): void {
  const postcssPath = path.join(cwd, 'postcss.config.js');
  const content = `module.exports = {\n  plugins: {\n    '@tailwindcss/postcss': {},\n  },\n};\n`;
  fs.writeFileSync(postcssPath, content, 'utf-8');
}

function patchAngularJson(cwd: string, stylesPath: string): void {
  const angularJsonPath = path.join(cwd, 'angular.json');
  if (!fs.existsSync(angularJsonPath)) return;

  let angularJson: Record<string, unknown>;
  try {
    angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));
  } catch {
    return;
  }

  const projects = (angularJson['projects'] as Record<string, unknown>) ?? {};
  const projectNames = Object.keys(projects);
  if (projectNames.length === 0) return;

  const mainProject = projects[projectNames[0]] as Record<string, unknown>;
  const architect = (mainProject['architect'] as Record<string, unknown>) ??
                    (mainProject['targets'] as Record<string, unknown>) ?? {};

  for (const targetName of ['build', 'test']) {
    const target = architect[targetName] as Record<string, unknown> | undefined;
    if (!target) continue;
    const options = (target['options'] as Record<string, unknown>) ?? {};
    const styles = (options['styles'] as string[]) ?? [];
    if (!styles.includes(stylesPath)) {
      styles.push(stylesPath);
      options['styles'] = styles;
      target['options'] = options;
    }
  }

  fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2) + '\n');
}

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
    patchStylesCss(answers.stylesPath as string, answers.baseColor as BaseColor);
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
    console.log(`  ${chalk.cyan('nexus-ui-cli add button')}   — add your first component`);
    console.log(`  ${chalk.cyan('nexus-ui-cli add')}           — browse all available components`);
  });
