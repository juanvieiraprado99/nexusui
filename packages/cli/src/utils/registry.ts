import * as https from 'https';
import * as http from 'http';
import { Config } from './config';

export type RegistryFile = { name: string; content: string };

export type RegistryItem = {
  name: string;
  type: string;
  basePath?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  docs?: { overview?: string; api?: string };
  demos?: RegistryFile[];
};

export type RegistryIndex = {
  name: string;
  version: string;
  items: Array<{
    name: string;
    type: string;
    registryDependencies?: string[];
    files: string[];
  }>;
};

let indexCache: { base: string; data: RegistryIndex; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

const BAKED_REGISTRY_URL = '__REGISTRY_URL__';

export function getRegistryUrl(): string {
  const envUrl = process.env['NEXUS_REGISTRY_URL'];
  if (envUrl) return envUrl.replace(/\/$/, '');
  return BAKED_REGISTRY_URL;
}

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
        return;
      }
      let data = '';
      res.on('data', (chunk: string) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data) as T);
        } catch {
          reject(new Error(`Invalid JSON from ${url}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

export async function fetchRegistryIndex(registryUrl?: string): Promise<RegistryIndex> {
  const base = registryUrl ?? getRegistryUrl();
  const now = Date.now();
  if (indexCache && indexCache.base === base && now - indexCache.timestamp < CACHE_TTL) {
    return indexCache.data;
  }
  const url = `${base}/registry.json`;
  const data = await fetchJson<RegistryIndex>(url);
  indexCache = { base, data, timestamp: now };
  return data;
}

export async function fetchComponent(name: string, registryUrl?: string): Promise<RegistryItem> {
  const base = registryUrl ?? getRegistryUrl();
  const url = `${base}/${name}.json`;
  return fetchJson<RegistryItem>(url);
}

export function transformContent(content: string, config: Config): string {
  let out = content;
  const { aliases } = config;

  // ../../utils/X → configured utils alias
  out = out.replace(
    /from ['"]\.\.\/\.\.\/utils\/([\w\-./]+)['"]/g,
    (_match, p: string) => `from '${aliases.utils}/${p}'`,
  );

  // ../component-name → configured components alias
  out = out.replace(
    /from ['"]\.\.\/([\w\-]+)['"]/g,
    (_match, p: string) => `from '${aliases.components}/${p}'`,
  );

  // @/shared/utils/X → configured utils alias
  out = out.replace(
    /from ['"]@\/shared\/utils\/([\w\-./]+)['"]/g,
    (_match, p: string) => `from '${aliases.utils}/${p}'`,
  );

  // @/shared/components/X → configured components alias
  out = out.replace(
    /from ['"]@\/shared\/components\/([\w\-./]+)['"]/g,
    (_match, p: string) => `from '${aliases.components}/${p}'`,
  );

  return out;
}
