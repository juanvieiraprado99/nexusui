import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocsLayoutComponent } from '../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';

@Component({
  selector: 'app-cli-page',
  imports: [DocsLayoutComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl space-y-16 pb-16">

        <!-- Header -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold tracking-tight">CLI</h1>
            <span class="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">@nexuslabs/cli</span>
          </div>
          <p class="text-lg text-muted-foreground leading-relaxed">
            A command-line tool that copies components directly into your Angular project.
            No npm install — the code becomes yours.
          </p>
        </div>

        <!-- Introduction -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">Overview</h2>
            <p class="mt-2 text-muted-foreground leading-relaxed">
              nexus-ui ships no library package. Instead, the CLI fetches component source files from the
              registry and writes them into your project. You own the code — modify it, extend it, delete
              what you don't need. No version conflicts, no vendor lock-in.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="rounded-lg border border-border/60 bg-card p-4 space-y-1.5">
              <h4 class="text-sm font-semibold">Detects your stack</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Reads <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">angular.json</code> and
                lockfiles to auto-detect package manager and project structure.
              </p>
            </div>
            <div class="rounded-lg border border-border/60 bg-card p-4 space-y-1.5">
              <h4 class="text-sm font-semibold">Resolves dependencies</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Adding <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">combobox</code> automatically
                installs <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">input</code>,
                <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">label</code>, and
                <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">utils</code>.
              </p>
            </div>
            <div class="rounded-lg border border-border/60 bg-card p-4 space-y-1.5">
              <h4 class="text-sm font-semibold">Rewrites imports</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Library paths transform to your project's aliases from
                <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">components.json</code> automatically.
              </p>
            </div>
          </div>
        </div>

        <!-- init command -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">init</h2>
            <p class="mt-2 text-muted-foreground">
              One-time setup for your Angular project. Run this before adding any components.
            </p>
          </div>

          <app-code-block [code]="initCode" language="bash" />

          <div class="space-y-3">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wide">What it does</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 shrink-0 text-primary" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Detects your Angular project from <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">angular.json</code>
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 shrink-0 text-primary" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Prompts for base color, primary color, styles path, and import alias
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 shrink-0 text-primary" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Installs <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">tailwindcss</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">class-variance-authority</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">clsx</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">tailwind-merge</code>
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 shrink-0 text-primary" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Patches <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">postcss.config.js</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">styles.css</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">tsconfig.json</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">angular.json</code>
              </li>
              <li class="flex items-start gap-2">
                <svg class="mt-0.5 shrink-0 text-primary" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Writes <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">components.json</code> and copies utility functions
              </li>
            </ul>
          </div>

          <div class="space-y-2">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wide">components.json</h3>
            <p class="text-sm text-muted-foreground">Generated config file that the CLI reads for every subsequent command.</p>
            <app-code-block [code]="componentsJsonCode" language="json" filename="components.json" />
          </div>
        </div>

        <!-- add command -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">add</h2>
            <p class="mt-2 text-muted-foreground">
              Fetch one or more components from the registry and write them into your project.
            </p>
          </div>

          <!-- Add a single component -->
          <div class="space-y-2">
            <h3 class="text-base font-semibold">Add a component</h3>
            <app-code-block [code]="addSingleCode" language="bash" />
          </div>

          <!-- Add multiple components -->
          <div class="space-y-2">
            <h3 class="text-base font-semibold">Add multiple components</h3>
            <app-code-block [code]="addMultipleCode" language="bash" />
          </div>

          <!-- Interactive mode -->
          <div class="space-y-2">
            <h3 class="text-base font-semibold">Interactive mode</h3>
            <p class="text-sm text-muted-foreground">Run without arguments to pick components from a multi-select prompt.</p>
            <app-code-block [code]="addInteractiveCode" language="bash" />
          </div>

          <!-- Add all -->
          <div class="space-y-2">
            <h3 class="text-base font-semibold">Add all components</h3>
            <app-code-block [code]="addAllCode" language="bash" />
          </div>

          <!-- Options table -->
          <div class="space-y-3">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Options</h3>
            <div class="overflow-hidden rounded-lg border border-border/60">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-border/60 bg-muted/40">
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Option</th>
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Default</th>
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of addOptions; track row.option) {
                    <tr class="border-b border-border/60 last:border-0">
                      <td class="px-4 py-3 font-mono text-xs">{{ row.option }}</td>
                      <td class="px-4 py-3 text-muted-foreground">{{ row.default }}</td>
                      <td class="px-4 py-3 text-muted-foreground">{{ row.description }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <!-- Dependency resolution callout -->
          <div class="rounded-lg border border-border/60 bg-muted/30 px-4 py-4 text-sm space-y-1">
            <p class="font-semibold">Automatic dependency resolution</p>
            <p class="text-muted-foreground leading-relaxed">
              The CLI walks a recursive dependency graph before installing anything.
              Running <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">add combobox</code>
              will automatically include
              <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">input</code>,
              <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">label</code>, and
              <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">utils</code> — no manual chasing.
            </p>
          </div>
        </div>

        <!-- list command -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">list</h2>
            <p class="mt-2 text-muted-foreground">
              Show all available components and their installation status.
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="text-base font-semibold">List all components</h3>
            <app-code-block [code]="listCode" language="bash" />
          </div>

          <div class="space-y-2">
            <h3 class="text-base font-semibold">List only installed components</h3>
            <app-code-block [code]="listInstalledCode" language="bash" />
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Options</h3>
            <div class="overflow-hidden rounded-lg border border-border/60">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-border/60 bg-muted/40">
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Option</th>
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Default</th>
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of listOptions; track row.option) {
                    <tr class="border-b border-border/60 last:border-0">
                      <td class="px-4 py-3 font-mono text-xs">{{ row.option }}</td>
                      <td class="px-4 py-3 text-muted-foreground">{{ row.default }}</td>
                      <td class="px-4 py-3 text-muted-foreground">{{ row.description }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- remove command -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">remove</h2>
            <p class="mt-2 text-muted-foreground">
              Delete installed components from your project.
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="text-base font-semibold">Remove a component</h3>
            <app-code-block [code]="removeCode" language="bash" />
          </div>

          <div class="space-y-2">
            <h3 class="text-base font-semibold">Remove multiple components</h3>
            <app-code-block [code]="removeMultiCode" language="bash" />
          </div>

          <div class="rounded-lg border border-border/60 bg-muted/30 px-4 py-4 text-sm space-y-1">
            <p class="font-semibold">Dependency check</p>
            <p class="text-muted-foreground leading-relaxed">
              Before removing, the CLI checks whether any other installed component depends on the target.
              If dependents exist, you'll be prompted to confirm before proceeding.
            </p>
          </div>
        </div>

        <!-- update command -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">update</h2>
            <p class="mt-2 text-muted-foreground">
              Fetch the latest registry version of installed components and apply changes.
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="text-base font-semibold">Update a component</h3>
            <app-code-block [code]="updateOneCode" language="bash" />
          </div>

          <div class="space-y-2">
            <h3 class="text-base font-semibold">Update all installed components</h3>
            <app-code-block [code]="updateAllCode" language="bash" />
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Options</h3>
            <div class="overflow-hidden rounded-lg border border-border/60">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-border/60 bg-muted/40">
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Option</th>
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Default</th>
                    <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of updateOptions; track row.option) {
                    <tr class="border-b border-border/60 last:border-0">
                      <td class="px-4 py-3 font-mono text-xs">{{ row.option }}</td>
                      <td class="px-4 py-3 text-muted-foreground">{{ row.default }}</td>
                      <td class="px-4 py-3 text-muted-foreground">{{ row.description }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div class="rounded-lg border border-border/60 bg-muted/30 px-4 py-4 text-sm space-y-1">
            <p class="font-semibold">Diff before apply</p>
            <p class="text-muted-foreground leading-relaxed">
              For each changed file, the CLI shows an inline diff (removed lines in red, added in green)
              and prompts you to confirm, skip, or inspect the diff before writing any changes.
            </p>
          </div>
        </div>

        <!-- diff command -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">diff</h2>
            <p class="mt-2 text-muted-foreground">
              Preview differences between local component files and registry versions — no changes applied.
            </p>
          </div>

          <app-code-block [code]="diffCode" language="bash" />

          <div class="rounded-lg border border-border/60 bg-muted/30 px-4 py-4 text-sm space-y-1">
            <p class="font-semibold">Read-only</p>
            <p class="text-muted-foreground leading-relaxed">
              <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">diff</code> never writes to disk.
              Use it to review what <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">update</code>
              would change before committing to the update.
            </p>
          </div>
        </div>

        <!-- How it works -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">How it works</h2>
            <p class="mt-2 text-muted-foreground">
              Three steps happen every time you run <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">add</code>.
            </p>
          </div>

          <ol class="space-y-6">
            <li class="flex gap-4">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-bold" aria-hidden="true">1</span>
              <div class="space-y-1 pt-0.5">
                <h3 class="font-semibold">Fetch from registry</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Each component is a JSON bundle at
                  <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">https://nexus-ui.dev/r/&#123;name&#125;.json</code>.
                  The bundle includes all source files, metadata, and dependency lists. A 5-minute in-memory
                  cache prevents redundant fetches during multi-component installs.
                </p>
              </div>
            </li>
            <li class="flex gap-4">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-bold" aria-hidden="true">2</span>
              <div class="space-y-1 pt-0.5">
                <h3 class="font-semibold">Rewrite imports</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Internal library import paths are replaced by regex with the aliases you configured during
                  <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">init</code>. For example,
                  <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">@nexus/shared/utils</code>
                  becomes <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">&#64;/shared/utils</code>
                  in your project. Any new import shape in the library must have a matching regex — this is
                  checked automatically.
                </p>
              </div>
            </li>
            <li class="flex gap-4">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs font-bold" aria-hidden="true">3</span>
              <div class="space-y-1 pt-0.5">
                <h3 class="font-semibold">Write files (with rollback)</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  Files are written to disk based on your <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">components.json</code>
                  paths. Existing files are protected unless you pass <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">--overwrite</code>.
                  If anything fails mid-install, all written files are rolled back automatically.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <!-- components.json reference -->
        <div class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">components.json reference</h2>
            <p class="mt-2 text-muted-foreground">
              Every field written by <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">init</code> and read by <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">add</code>.
            </p>
          </div>

          <div class="overflow-hidden rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-border/60 bg-muted/40">
                  <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Field</th>
                  <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of configFields; track row.field) {
                  <tr class="border-b border-border/60 last:border-0">
                    <td class="px-4 py-3 font-mono text-xs">{{ row.field }}</td>
                    <td class="px-4 py-3 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

      </article>
    </app-docs-layout>
  `,
})
export class CliPage {
  protected readonly initCode = `npx @nexuslabs/cli@alpha init`;

  protected readonly addSingleCode = `npx @nexuslabs/cli@alpha add button`;

  protected readonly addMultipleCode = `npx @nexuslabs/cli@alpha add button input checkbox`;

  protected readonly addInteractiveCode = `npx @nexuslabs/cli@alpha add`;

  protected readonly addAllCode = `npx @nexuslabs/cli@alpha add --all`;

  protected readonly componentsJsonCode = `{
  "$schema": "https://nexus-ui.dev/schema.json",
  "packageManager": "npm",
  "registryUrl": "https://nexus-ui.dev/r",
  "tailwind": {
    "css": "src/styles.css",
    "baseColor": "zinc",
    "primaryColor": "blue"
  },
  "baseUrl": "src/app",
  "aliases": {
    "components": "@/shared/components",
    "utils": "@/shared/utils"
  }
}`;

  protected readonly addOptions = [
    { option: '--overwrite', default: 'false', description: 'Overwrite existing component files' },
    { option: '--all',       default: 'false', description: 'Install every registered component' },
    { option: '--no-cache',  default: 'false', description: 'Bypass the 5-minute in-memory registry cache' },
  ];

  protected readonly listCode = `npx @nexuslabs/cli@alpha list`;
  protected readonly listInstalledCode = `npx @nexuslabs/cli@alpha list --installed`;

  protected readonly listOptions = [
    { option: '--installed', default: 'false', description: 'Show only installed components' },
  ];

  protected readonly removeCode = `npx @nexuslabs/cli@alpha remove button`;
  protected readonly removeMultiCode = `npx @nexuslabs/cli@alpha remove button input`;

  protected readonly updateOneCode = `npx @nexuslabs/cli@alpha update button`;
  protected readonly updateAllCode = `npx @nexuslabs/cli@alpha update --all`;

  protected readonly updateOptions = [
    { option: '--all', default: 'false', description: 'Update all installed components' },
    { option: '--yes', default: 'false', description: 'Skip confirmation prompts' },
  ];

  protected readonly diffCode = `npx @nexuslabs/cli@alpha diff button`;

  protected readonly configFields = [
    { field: '$schema', description: 'JSON schema URL for IDE validation' },
    { field: 'packageManager', description: 'npm | yarn | pnpm | bun — auto-detected from lockfile' },
    { field: 'registryUrl', description: 'Base URL for registry JSON bundles. Override with NEXUS_REGISTRY_URL env var.' },
    { field: 'tailwind.css', description: 'Path to your global stylesheet where Tailwind directives and CSS variables are injected' },
    { field: 'tailwind.baseColor', description: 'Neutral palette: slate | zinc | neutral | stone | gray' },
    { field: 'tailwind.primaryColor', description: 'Accent palette: blue | indigo | violet | purple | green | emerald | teal | …' },
    { field: 'baseUrl', description: 'Root directory for components (e.g. src/app)' },
    { field: 'aliases.components', description: 'Import alias for components (e.g. @/shared/components)' },
    { field: 'aliases.utils', description: 'Import alias for utilities (e.g. @/shared/utils)' },
  ];
}
