import * as fs from 'fs';
import * as path from 'path';
import { Config, resolvedPaths } from '../../utils/config';
import { fetchComponent, transformContent } from '../../utils/registry';
import { registry as localRegistry } from '../../core/registry/registry-data';

export async function installComponent(
  name: string,
  config: Config,
  cwd: string,
): Promise<string[]> {
  const entry = localRegistry.find((c) => c.name === name);
  if (!entry) throw new Error(`Component "${name}" not found in registry`);

  const item = await fetchComponent(name, config.registryUrl);
  const paths = resolvedPaths(config, cwd);
  const segment = entry.basePath.startsWith('components/')
    ? entry.basePath.slice('components/'.length)
    : entry.basePath;

  let targetDir: string;
  if (segment === 'utils') targetDir = paths.utils;
  else if (segment === 'core') targetDir = paths.core;
  else if (segment === 'services') targetDir = paths.services;
  else targetDir = path.join(paths.components, segment);

  fs.mkdirSync(targetDir, { recursive: true });

  const written: string[] = [];
  try {
    for (const file of item.files) {
      const content = transformContent(file.content, config);
      const filePath = path.join(targetDir, file.name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content, 'utf-8');
      written.push(filePath);
    }
  } catch (err) {
    for (const f of written) {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    }
    throw err;
  }

  return written;
}
