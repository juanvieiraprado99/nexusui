import * as fs from 'fs';
import * as path from 'path';

// Using relative path — tsx resolves this directly without needing tsconfig paths
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { registry } = require('../packages/cli/src/core/registry/registry-data');

type ComponentRegistry = {
  name: string;
  basePath: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
};

type RegistryItem = {
  name: string;
  type: string;
  basePath?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { name: string; content: string }[];
  docs?: { overview?: string; api?: string };
  demos?: { name: string; content: string }[];
};

const ROOT = path.resolve(__dirname, '..');
const LIB_PATH = path.resolve(ROOT, 'libs/nexus/src/lib/shared');
const OUTPUT_PATH = path.resolve(ROOT, 'apps/web/public/r');

function getSourceDir(component: ComponentRegistry): string {
  return path.join(LIB_PATH, component.basePath);
}

function readFile(filePath: string): string | null {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

function readDocs(sourceDir: string): { overview?: string; api?: string } {
  const docDir = path.join(sourceDir, 'doc');
  return {
    overview: readFile(path.join(docDir, 'overview.md')) ?? undefined,
    api: readFile(path.join(docDir, 'api.md')) ?? undefined,
  };
}

function readDemos(sourceDir: string): { name: string; content: string }[] {
  const demoDir = path.join(sourceDir, 'demo');
  if (!fs.existsSync(demoDir)) return [];
  return fs
    .readdirSync(demoDir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => ({
      name: f,
      content: fs.readFileSync(path.join(demoDir, f), 'utf-8'),
    }));
}

function buildComponentJson(component: ComponentRegistry): RegistryItem | null {
  const sourceDir = getSourceDir(component);

  if (!fs.existsSync(sourceDir)) {
    console.warn(`  [skip] ${component.name} — source dir not found: ${sourceDir}`);
    return null;
  }

  const files = component.files
    .map((fileName) => {
      const content = readFile(path.join(sourceDir, fileName));
      if (content === null) {
        console.warn(`  [warn] ${component.name}/${fileName} not found`);
        return null;
      }
      return { name: fileName, content };
    })
    .filter((f): f is { name: string; content: string } => f !== null);

  if (files.length === 0) return null;

  const docs = readDocs(sourceDir);
  const demos = readDemos(sourceDir);

  return {
    name: component.name,
    type: 'registry:component',
    basePath: component.basePath,
    dependencies: component.dependencies,
    registryDependencies: component.registryDependencies,
    files,
    ...(Object.keys(docs).length > 0 && { docs }),
    ...(demos.length > 0 && { demos }),
  };
}

function main() {
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });

  const items: RegistryItem[] = [];

  console.log('Building registry...\n');

  for (const component of registry as ComponentRegistry[]) {
    process.stdout.write(`  ${component.name}... `);
    const item = buildComponentJson(component);
    if (!item) continue;

    const outputFile = path.join(OUTPUT_PATH, `${component.name}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(item, null, 2) + '\n');
    console.log(`✓ (${item.files.length} files)`);

    items.push(item);
  }

  const indexPath = path.join(OUTPUT_PATH, 'registry.json');
  const index = {
    $schema: 'https://nexus-ui.dev/schema/registry.json',
    name: '@nexus',
    homepage: 'https://nexus-ui.dev',
    version: '0.0.1',
    items: items.map((item) => ({
      name: item.name,
      type: item.type,
      registryDependencies: item.registryDependencies,
      files: item.files.map((f) => f.name),
    })),
  };
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');

  console.log(`\nDone! ${items.length} components → ${OUTPUT_PATH}`);
}

main();
