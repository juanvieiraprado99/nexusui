import * as fs from 'fs';
import * as path from 'path';
import { Config, resolvedPaths } from '../../utils/config';
import { registry as localRegistry } from '../../core/registry/registry-data';

export type ResolvedDeps = {
  components: string[];
  npmPackages: string[];
};

const SAFE_NAME_RE = /^[a-z0-9][a-z0-9-_]*$/;

function getTargetDir(name: string, config: Config, cwd: string): string {
  const paths = resolvedPaths(config, cwd);
  const entry = localRegistry.find((c) => c.name === name);
  if (!entry) throw new Error(`Component "${name}" not found in registry`);
  const basePath = entry.basePath;

  if (basePath === 'utils') return paths.utils;
  if (basePath === 'core') return paths.core;
  if (basePath === 'services') return paths.services;
  return path.join(paths.components, basePath);
}

function isInstalled(name: string, config: Config, cwd: string): boolean {
  const dir = getTargetDir(name, config, cwd);
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).length > 0;
}

function getInstalledPackages(cwd: string): Set<string> {
  const pkgPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) return new Set();
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return new Set([
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
      ...Object.keys(pkg.peerDependencies ?? {}),
    ]);
  } catch {
    return new Set();
  }
}

export async function resolveDependencies(
  selected: string[],
  config: Config,
  cwd: string,
  options: { overwrite?: boolean } = {},
): Promise<ResolvedDeps> {
  const toInstall: string[] = [];
  const npmPackages = new Set<string>();
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const installedPackages = getInstalledPackages(cwd);

  function visit(name: string) {
    if (visited.has(name)) return;
    if (visiting.has(name)) {
      throw new Error(`Circular dependency detected: ${[...visiting, name].join(' → ')}`);
    }
    visiting.add(name);

    if (!SAFE_NAME_RE.test(name)) throw new Error(`Invalid component name: "${name}"`);
    const entry = localRegistry.find((c) => c.name === name);
    if (!entry) throw new Error(`Component "${name}" not found in registry`);

    for (const dep of entry.registryDependencies ?? []) {
      visit(dep);
    }

    visited.add(name);
    visiting.delete(name);

    const installed = isInstalled(name, config, cwd);
    if (!installed || options.overwrite) {
      toInstall.push(name);
    }

    for (const pkg of entry.dependencies ?? []) {
      if (!installedPackages.has(pkg)) {
        npmPackages.add(pkg);
      }
    }
  }

  for (const name of selected) {
    visit(name);
  }

  return { components: toInstall, npmPackages: Array.from(npmPackages) };
}
