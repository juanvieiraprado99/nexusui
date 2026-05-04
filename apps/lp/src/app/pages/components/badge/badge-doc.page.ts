import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { BadgeComponent } from '../../../shared/components/badge';
import { AvatarComponent } from '../../../shared/components/avatar';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-badge-doc-page',
  imports: [BadgeComponent, AvatarComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Badge</h1>
          <p class="mt-2 text-muted-foreground">Displays a small status label or count indicator.</p>
        </header>

        <div class="mt-8">
          <app-example title="All variants" [code]="variantsCode">
            <div class="flex flex-wrap items-center justify-center gap-3">
              <n-badge>Default</n-badge>
              <n-badge nVariant="secondary">Secondary</n-badge>
              <n-badge nVariant="destructive">Destructive</n-badge>
              <n-badge nVariant="outline">Outline</n-badge>
              <n-badge nVariant="success">Success</n-badge>
              <n-badge nVariant="warning">Warning</n-badge>
            </div>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'cli'"
                (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'"
                [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'"
              >CLI</button>
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'manual'"
                (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'"
                [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'"
              >Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add badge" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5">
                      <app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" />
                    </div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">badge.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">badge.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/badge/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> util exists at <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/merge-classes.ts</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">With Avatar</h3>
          <div class="mt-3">
            <app-example title="Status badge alongside avatar" [code]="withAvatarCode">
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <n-avatar nName="João Prado" />
                    <span
                      class="absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-background"
                      role="img"
                      aria-label="Online"
                    ></span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-sm font-medium">João Prado</span>
                    <n-badge nVariant="success">Online</n-badge>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <n-avatar nName="Maria Silva" />
                    <span
                      class="absolute right-0 bottom-0 size-3 rounded-full bg-amber-400 ring-2 ring-background"
                      role="img"
                      aria-label="Ausente"
                    ></span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-sm font-medium">Maria Silva</span>
                    <n-badge nVariant="warning">Ausente</n-badge>
                  </div>
                </div>
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Prop</th>
                  <th class="px-4 py-2 text-left font-medium">Type</th>
                  <th class="px-4 py-2 text-left font-medium">Default</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of apiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class BadgeDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly variantsCode = `<n-badge>Default</n-badge>
<n-badge nVariant="secondary">Secondary</n-badge>
<n-badge nVariant="destructive">Destructive</n-badge>
<n-badge nVariant="outline">Outline</n-badge>
<n-badge nVariant="success">Success</n-badge>
<n-badge nVariant="warning">Warning</n-badge>`;

  protected readonly withAvatarCode = `<div class="flex items-center gap-3">
  <div class="relative">
    <n-avatar nName="João Prado" />
    <span class="absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-background"
          role="img" aria-label="Online"></span>
  </div>
  <div class="flex flex-col gap-1">
    <span class="text-sm font-medium">João Prado</span>
    <n-badge nVariant="success">Online</n-badge>
  </div>
</div>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { BadgeComponent } from './shared/components/badge';

@Component({
  selector: 'app-my-page',
  imports: [BadgeComponent],
  template: \`<n-badge nVariant="success">Online</n-badge>\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-badge nVariant="default">Label</n-badge>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nVariant', type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'", default: "'default'", description: 'Visual style of the badge.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes appended to the host.' },
  ];
}
