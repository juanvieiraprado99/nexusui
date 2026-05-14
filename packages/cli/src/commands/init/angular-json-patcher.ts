import * as fs from 'fs';
import * as path from 'path';

export function patchAngularJson(cwd: string, stylesPath: string): void {
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
