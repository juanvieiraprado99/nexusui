import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

export const configSchema = z.object({
  $schema: z.string().optional(),
  packageManager: z.enum(['npm', 'yarn', 'pnpm', 'bun']).default('npm'),
  registryUrl: z.string().default('https://nexus-ui.dev/r'),
  tailwind: z.object({
    css: z.string(),
    baseColor: z.string(),
  }),
  baseUrl: z.string(),
  aliases: z.object({
    components: z.string(),
    utils: z.string(),
  }),
  // Map of installed component name → installed version. Source of truth for
  // "is this component up to date?" — compared against the registry version.
  components: z.record(z.string()).default({}),
});

export type Config = z.infer<typeof configSchema>;

export function readConfig(cwd: string): Config | null {
  const configPath = path.join(cwd, 'components.json');
  if (!fs.existsSync(configPath)) return null;
  try {
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return configSchema.parse(raw);
  } catch {
    return null;
  }
}

export function writeConfig(cwd: string, config: Config): void {
  const configPath = path.join(cwd, 'components.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
}

export function getInstalledVersion(config: Config, name: string): string | undefined {
  return config.components?.[name];
}

export function setInstalledVersion(cwd: string, name: string, version: string): void {
  const config = readConfig(cwd);
  if (!config) return;
  config.components = { ...(config.components ?? {}), [name]: version };
  writeConfig(cwd, config);
}

export function removeInstalledVersion(cwd: string, name: string): void {
  const config = readConfig(cwd);
  if (!config || !config.components) return;
  delete config.components[name];
  writeConfig(cwd, config);
}

export function resolvedPaths(config: Config, cwd: string) {
  const base = path.join(cwd, config.baseUrl);
  return {
    components: path.join(base, 'shared', 'components'),
    utils: path.join(base, 'shared', 'utils'),
    core: path.join(base, 'shared', 'core'),
    services: path.join(base, 'shared', 'services'),
  };
}
