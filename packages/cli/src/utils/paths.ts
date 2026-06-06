import * as fs from 'fs';
import * as path from 'path';
import { Config, resolvedPaths } from './config';
import { registry as localRegistry } from '../core/registry/registry-data';

/**
 * Resolve the on-disk directory where a component's files live (or would live)
 * in the user's project. Returns null if the component is unknown to the registry.
 */
export function getTargetDir(name: string, config: Config, cwd: string): string | null {
  const entry = localRegistry.find((c) => c.name === name);
  if (!entry) return null;

  const paths = resolvedPaths(config, cwd);
  const segment = entry.basePath.startsWith('components/')
    ? entry.basePath.slice('components/'.length)
    : entry.basePath;

  if (segment === 'utils') return paths.utils;
  if (segment === 'core') return paths.core;
  if (segment === 'services') return paths.services;
  return path.join(paths.components, segment);
}

/** True if the component's target directory exists and contains files. */
export function isInstalled(name: string, config: Config, cwd: string): boolean {
  const dir = getTargetDir(name, config, cwd);
  if (!dir || !fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).length > 0;
}
