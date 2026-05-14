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

function transformContent(content: string, utils: string, components: string): string {
  let out = content;
  out = out.replace(/from ['"]\.\.\/\.\.\/utils\/([\w\-./]+)['"]/g, (_m, p) => `from '${utils}/${p}'`);
  out = out.replace(/from ['"]\.\.\/([\w\-]+)['"]/g, (_m, p) => `from '${components}/${p}'`);
  out = out.replace(/from ['"]@\/shared\/utils\/([\w\-./]+)['"]/g, (_m, p) => `from '${utils}/${p}'`);
  out = out.replace(/from ['"]@\/shared\/components\/([\w\-./]+)['"]/g, (_m, p) => `from '${components}/${p}'`);
  return out;
}

function dryRunTransformCheck(items: RegistryItem[], strict: boolean): boolean {
  const DUMMY_UTILS = '@app/shared/utils';
  const DUMMY_COMPS = '@app/shared/components';
  const BROKEN = [
    /from ['"]\.\.\/\.\.\/utils\//,
    /from ['"]@\/shared\/utils\//,
    /from ['"]@\/shared\/components\//,
    /from ['"]\.\.\//,
  ];
  let hasErrors = false;
  for (const item of items) {
    for (const file of item.files) {
      const transformed = transformContent(file.content, DUMMY_UTILS, DUMMY_COMPS);
      for (const re of BROKEN) {
        const match = transformed.split('\n').find((line) => re.test(line));
        if (match) {
          console.error(`  [transform-error] ${item.name}/${file.name}: ${match.trim()}`);
          hasErrors = true;
        }
      }
    }
  }
  return hasErrors;
}

function main() {
  const strict = process.argv.includes('--strict');

  fs.mkdirSync(OUTPUT_PATH, { recursive: true });

  const items: RegistryItem[] = [];

  console.log('Building registry...\n');

  for (const component of registry as ComponentRegistry[]) {
    process.stdout.write(`  ${component.name}... `);

    // Pre-flight: validate that every listed file exists on disk
    const sourceDir = getSourceDir(component);
    if (fs.existsSync(sourceDir)) {
      for (const fileName of component.files) {
        const filePath = path.join(sourceDir, fileName);
        if (!fs.existsSync(filePath)) {
          const msg = `[preflight] ${component.name}/${fileName} listed in registry but not found on disk`;
          if (strict) {
            throw new Error(msg);
          } else {
            console.warn(`\n  [warn] ${msg}`);
          }
        }
      }
    }

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

  if (process.argv.includes('--dry-run-transform')) {
    console.log('\nRunning dry-run transform check...');
    const hasErrors = dryRunTransformCheck(items, strict);
    if (hasErrors && strict) {
      process.exit(1);
    }
  }
}

main();
