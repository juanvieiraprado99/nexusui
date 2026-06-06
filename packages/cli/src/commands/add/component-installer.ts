import * as fs from 'fs';
import * as path from 'path';
import { Config, setInstalledVersion } from '../../utils/config';
import { getTargetDir } from '../../utils/paths';
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
  const targetDir = getTargetDir(name, config, cwd);
  if (!targetDir) throw new Error(`Component "${name}" not found in registry`);

  fs.mkdirSync(targetDir, { recursive: true });

  const resolvedTarget = path.resolve(targetDir);
  const written: string[] = [];
  try {
    for (const file of item.files) {
      const filePath = path.resolve(targetDir, file.name);
      if (!filePath.startsWith(resolvedTarget + path.sep) && filePath !== resolvedTarget) {
        throw new Error(`Unsafe file path in registry response: ${file.name}`);
      }
      const content = transformContent(file.content, config);
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

  // Record installed version so `update`/`list` can tell if it's up to date.
  setInstalledVersion(cwd, name, item.version ?? entry.version);

  return written;
}
