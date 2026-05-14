import * as fs from 'fs';
import * as path from 'path';

export function aliasToFsPath(alias: string, baseUrl: string): string {
  const relative = alias.replace(/^@\//, '');
  return `${baseUrl}/${relative}`;
}

export function patchTsconfig(cwd: string, baseUrl: string, aliases: { utils: string; components: string }): void {
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
