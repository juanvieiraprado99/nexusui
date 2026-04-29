# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

Build **nexus-ui**: a shadcn/ui-style component library for **Angular 21**. Components are not installed via `npm install` — a CLI (`nexus-ui-cli`) copies component source files directly into the user's project. Each component becomes the user's own code.

## Status

Implementation underway. Shipped and working:

- `libs/nexus/src/lib/shared/components/button/` — full component with CVA variants, demos, docs
- `libs/nexus/src/lib/shared/components/input/` — full component with CVA variants, ControlValueAccessor, demos, docs
- `libs/nexus/src/lib/shared/utils/` — `merge-classes.ts`, `number.ts`, `form-control.ts`
- `libs/nexus/src/lib/shared/services/` — `dark-mode.service.ts`
- `scripts/build-registry.cts` — reads `libs/nexus`, emits `apps/web/public/r/*.json`
- `scripts/inject-registry-url.js` — replaces `__REGISTRY_URL__` at CLI build time
- `packages/cli/` — Commander.js CLI with `init` and `add` commands
- `apps/web/` — Angular SSR docs site scaffold
- `docs/ARCHITECTURE.md` — reference architecture document (Portuguese)

## Architecture

Monorepo layout (Nx 22 + npm workspaces):

```
apps/web/              # Angular SSR docs site — serves registry JSON at /r/
libs/nexus/            # Component source (truth)
packages/cli/          # nexus-ui-cli (published to npm)
scripts/build-registry.cts       # generates apps/web/public/r/*.json from libs/nexus
scripts/inject-registry-url.js   # patches __REGISTRY_URL__ in CLI dist at build time
tools/generators/      # Nx schematics (generate:component)
```

### Three-piece system

1. **Library** (`libs/nexus`) — Angular standalone components, `OnPush`, `ViewEncapsulation.None`, CVA variants, `host: { '[class]': 'classes()' }` pattern. Uses `mergeClasses()` (clsx + tailwind-merge).
2. **Registry** — static JSON files at `apps/web/public/r/{name}.json`. Metadata source of truth: `packages/cli/src/core/registry/registry-data.ts` — single TS file imported by both the build script and the CLI types. Build script reads component sources + `doc/*.md` + `demo/*.ts` and emits JSON bundles.
3. **CLI** (`packages/cli`) — Commander.js. Two commands: `init` (scaffolds `components.json`, patches `angular.json` / Tailwind / tsconfig, installs base deps) and `add` (recursively resolves `registryDependencies`, fetches JSON from registry URL, transforms imports, writes files with rollback).

### Critical: `transformContent()` (in CLI registry client)

Rewrites imports by **regex** (no AST) as files are copied into the user's project. Maps internal library paths to user's configured aliases from `components.json`. Every new import pattern in the lib needs a matching regex + test in the CLI.

### Registry URL injection

CLI build replaces `__REGISTRY_URL__` via `scripts/inject-registry-url.js` (Node.js — works on Windows natively). Prod URL: `https://nexus-ui.dev/r`. Dev URL: `http://localhost:4222/r`. Env override: `NEXUS_REGISTRY_URL`.

### Component authoring convention

Each component lives at `libs/nexus/src/lib/shared/components/{name}/`:

```
{name}.component.ts     # class with inputs, computed classes, host bindings
{name}.variants.ts      # CVA definitions (cva() call, exported type)
index.ts                # public re-export
demo/*.ts               # standalone Angular components consumed by docs site + registry
doc/overview.md         # description + usage examples
doc/api.md              # inputs/outputs reference table
```

After creating a component, add an entry to `packages/cli/src/core/registry/registry-data.ts` — otherwise the CLI and build script cannot see it.

### Selector and input naming

- Selector prefix: `n-` (e.g. `n-button`, `button[n-button]`, `a[n-button]`)
- Input prefix: `n` (e.g. `nVariant`, `nSize`, `nType`, `nClass`, `nLoading`, `nDisabled`)

### Release

Nx Release + Conventional Commits, `fixed` versioning (CLI + lib bump together — prevents registry schema mismatch). Tag `v{version}`. `npm publish --provenance` from `packages/cli/dist`.

## Commands

### Development

```bash
npm start
# concurrent: serve docs (:4222) + tailwind watch + build registry --watch
# registry JSON available at http://localhost:4222/r/

npm run dev:cli
# compiles CLI (tsc) + injects localhost registry URL (http://localhost:4222/r) + npm link globally

npm run build:cli
# compiles CLI + injects prod registry URL (https://nexus-ui.dev/r)

npm run build:registry
# one-shot: generate apps/web/public/r/*.json

npm run generate:component -- --name=foo
# Nx schematic: scaffolds libs/nexus component files + registry-data.ts entry
```

### Nx targets on `libs/nexus`

```bash
npx nx build nexus    # ng-packagr build
npx nx lint nexus     # ESLint
npx nx test nexus     # Vitest
```

### CLI end-user flow (tested in a separate Angular project)

```bash
nexus-ui-cli init          # one-time setup: components.json, Tailwind, tsconfig paths, utils
nexus-ui-cli add button    # add a component (resolves registryDependencies recursively)
nexus-ui-cli add --all     # add all registered components
```

## Known Traps

- **Regex-based import transformation is fragile.** Any new import shape in the lib must get a matching regex AND unit test in the CLI. A missed pattern ships broken files to users.
- **`registry-data.ts` grows large.** At 40+ components consider splitting by category (`primitives.ts`, `forms.ts`, barrel re-export) but keep a single exported `registry` array.
- **5-min in-memory cache in registry client** can mask updates during debugging. A `--no-cache` / fresh-fetch flag is planned.
- **Fixed versioning** means every CLI-only change also bumps the lib. That is intentional — do not switch to independent versioning without a schema-compat strategy.

## Working in This Repo

- Reference architecture decisions are in `docs/ARCHITECTURE.md`.
- Domain: `nexus-ui.dev`. Env var: `NEXUS_REGISTRY_URL`.
- After adding a new component to `libs/nexus/`, always add its entry to `packages/cli/src/core/registry/registry-data.ts` and run `npm run build:registry`.
- `injectFormControl()` in `libs/nexus/src/lib/shared/utils/form-control.ts` is the shared CVA bridge — use it in every form component rather than injecting `NgControl` manually.
- `DarkModeService` persists theme to `localStorage` under key `nexus-theme` and toggles the `dark` class on `document.documentElement`.
