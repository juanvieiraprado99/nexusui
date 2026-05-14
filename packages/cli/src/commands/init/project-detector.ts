import * as fs from 'fs';
import * as path from 'path';

export function detectPackageManager(cwd: string): string {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

export function detectAngularProject(cwd: string): {
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
