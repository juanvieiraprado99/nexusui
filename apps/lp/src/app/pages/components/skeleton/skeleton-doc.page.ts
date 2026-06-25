import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SkeletonComponent } from '../../../shared/components/skeleton';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-skeleton-doc-page',
  imports: [SkeletonComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Skeleton</h1>
          <p class="mt-2 text-muted-foreground">A loading placeholder with a pulse animation while content loads.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex flex-col gap-3 w-full max-w-sm">
              <n-skeleton nClass="h-4 w-full" />
              <n-skeleton nClass="h-4 w-3/4" />
              <n-skeleton nClass="h-4 w-1/2" />
            </div>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')" class="rounded-md px-3 py-1 text-xs font-medium transition-colors" [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'" [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')" class="rounded-md px-3 py-1 text-xs font-medium transition-colors" [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'" [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli@alpha add skeleton" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">skeleton.component.ts</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/skeleton/</code>.</li>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Shapes</h3>
          <div class="mt-3">
            <app-example title="nShape: default | circle" [code]="shapesCode">
              <div class="flex items-center gap-4">
                <n-skeleton nShape="circle" nClass="h-12 w-12" />
                <div class="flex flex-col gap-2 flex-1">
                  <n-skeleton nClass="h-4 w-full" />
                  <n-skeleton nClass="h-4 w-2/3" />
                </div>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Colors</h3>
          <div class="mt-3">
            <app-example title="nColor: any CSS color" [code]="colorsCode">
              <div class="flex flex-col gap-3 w-full max-w-sm">
                <n-skeleton nClass="h-4 w-full" />
                <n-skeleton nColor="#f87171" nClass="h-4 w-full" />
                <n-skeleton nColor="rgb(167 139 250)" nClass="h-4 w-3/4" />
                <n-skeleton nColor="oklch(0.7 0.12 200)" nClass="h-4 w-2/3" />
                <n-skeleton nColor="#34d399" nClass="h-4 w-1/2" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Card skeleton</h3>
          <div class="mt-3">
            <app-example title="Composite layout" [code]="cardCode">
              <div class="rounded-lg border border-border/60 p-4 w-full max-w-sm space-y-3">
                <n-skeleton nClass="h-36 w-full" />
                <n-skeleton nClass="h-5 w-3/4" />
                <n-skeleton nClass="h-4 w-full" />
                <n-skeleton nClass="h-4 w-5/6" />
                <n-skeleton nClass="h-8 w-24" />
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
export class SkeletonDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<n-skeleton nClass="h-4 w-full" />
<n-skeleton nClass="h-4 w-3/4" />
<n-skeleton nClass="h-4 w-1/2" />`;

  protected readonly shapesCode = `<n-skeleton nShape="circle" nClass="h-12 w-12" />
<n-skeleton nClass="h-4 w-full" />`;

  protected readonly cardCode = `<div class="rounded-lg border p-4 space-y-3">
  <n-skeleton nClass="h-36 w-full" />
  <n-skeleton nClass="h-5 w-3/4" />
  <n-skeleton nClass="h-4 w-full" />
  <n-skeleton nClass="h-4 w-5/6" />
  <n-skeleton nClass="h-8 w-24" />
</div>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { SkeletonComponent } from './shared/components/skeleton';

@Component({
  selector: 'app-my-page',
  imports: [SkeletonComponent],
  template: \`<n-skeleton nClass="h-4 w-full" />\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-skeleton nClass="h-4 w-full" />
<n-skeleton nShape="circle" nClass="h-10 w-10" />
<n-skeleton nColor="#f87171" nClass="h-4 w-full" />`;

  protected readonly colorsCode = `<n-skeleton nClass="h-4 w-full" />
<n-skeleton nColor="#f87171" nClass="h-4 w-full" />
<n-skeleton nColor="rgb(167 139 250)" nClass="h-4 w-3/4" />
<n-skeleton nColor="oklch(0.7 0.12 200)" nClass="h-4 w-2/3" />
<n-skeleton nColor="#34d399" nClass="h-4 w-1/2" />`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nColor', type: 'string', default: "''", description: 'Any CSS color, applied as inline background-color. Empty falls back to bg-muted.' },
    { prop: 'nShape', type: "'default' | 'circle'", default: "'default'", description: "Shape of the skeleton. 'circle' applies rounded-full." },
    { prop: 'nClass', type: 'string', default: "''", description: 'Tailwind classes for size and additional styling (e.g. h-4 w-full).' },
  ];
}
