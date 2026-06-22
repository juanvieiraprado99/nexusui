import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-pagination-doc-page',
  imports: [PaginationComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Pagination</h1>
          <p class="mt-2 text-muted-foreground">Navigation component for paginated content with smart ellipsis, compact mode, and optional page size selector.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex flex-col items-center gap-3">
              <n-pagination [nTotalPages]="10" [(nPage)]="page" />
              <p class="text-sm text-muted-foreground">Page: <span class="font-medium text-foreground">{{ page() }}</span></p>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add pagination" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">pagination.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">pagination.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/pagination/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> exists in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/</code>.</li>
                  <li class="pt-3">Ensure the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">select</code> component exists in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/select/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: sm | default | lg" [code]="sizesCode">
              <div class="flex flex-col gap-4">
                <n-pagination nSize="sm"  [nTotalPages]="10" />
                <n-pagination             [nTotalPages]="10" />
                <n-pagination nSize="lg"  [nTotalPages]="10" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Compact</h3>
          <div class="mt-3">
            <app-example title="nCompact" [code]="compactCode">
              <n-pagination [nCompact]="true" [nTotalPages]="10" [(nPage)]="page" />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <n-pagination [nDisabled]="true" [nTotalPages]="10" />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With page size selector</h3>
          <div class="mt-3">
            <app-example title="nShowPageSizeSelector" [code]="pageSizeCode">
              <div class="flex flex-col gap-3">
                <n-pagination
                  [nShowPageSizeSelector]="true"
                  [nTotalItems]="500"
                  [(nPage)]="pageSizePage"
                  [(nPageSize)]="pageSize"
                />
                <p class="text-sm text-muted-foreground">
                  Page <span class="font-medium text-foreground">{{ pageSizePage() }}</span>,
                  {{ pageSize() }} rows per page
                </p>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nVariant: default | outline | ghost" [code]="variantsCode">
              <div class="flex flex-col gap-4">
                <n-pagination nVariant="default" [nTotalPages]="10" />
                <n-pagination nVariant="outline" [nTotalPages]="10" />
                <n-pagination nVariant="ghost"   [nTotalPages]="10" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">From total items</h3>
          <div class="mt-3">
            <app-example title="nTotalItems" [code]="totalItemsCode">
              <div class="flex flex-col gap-3">
                <n-pagination [nTotalItems]="243" [nPageSize]="10" [(nPage)]="totalItemsPage" />
                <p class="text-sm text-muted-foreground">
                  243 items / 10 per page &rarr; page
                  <span class="font-medium text-foreground">{{ totalItemsPage() }}</span> of 25
                </p>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Siblings &amp; boundaries</h3>
          <div class="mt-3">
            <app-example title="nSiblingCount &amp; nBoundaryCount" [code]="siblingsCode">
              <div class="flex flex-col gap-4">
                <n-pagination [nTotalPages]="20" [nSiblingCount]="2" [(nPage)]="siblingsPage" />
                <n-pagination [nTotalPages]="20" [nBoundaryCount]="2" [(nPage)]="siblingsPage" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Without first/last</h3>
          <div class="mt-3">
            <app-example title="nShowFirstLast" [code]="firstLastCode">
              <n-pagination [nShowFirstLast]="false" [nTotalPages]="10" [(nPage)]="firstLastPage" />
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
export class PaginationDocPage {
  protected readonly installTab  = signal<'cli' | 'manual'>('cli');
  protected readonly page        = signal(1);
  protected readonly pageSizePage = signal(1);
  protected readonly pageSize    = signal(10);
  protected readonly totalItemsPage = signal(1);
  protected readonly siblingsPage = signal(10);
  protected readonly firstLastPage = signal(1);

  protected readonly defaultCode = `<n-pagination [nTotalPages]="10" [(nPage)]="page" />`;

  protected readonly sizesCode = `<n-pagination nSize="sm"  [nTotalPages]="10" />
<n-pagination             [nTotalPages]="10" />
<n-pagination nSize="lg"  [nTotalPages]="10" />`;

  protected readonly compactCode = `<n-pagination [nCompact]="true" [nTotalPages]="10" [(nPage)]="page" />`;

  protected readonly disabledCode = `<n-pagination [nDisabled]="true" [nTotalPages]="10" />`;

  protected readonly pageSizeCode = `<n-pagination
  [nShowPageSizeSelector]="true"
  [nTotalItems]="500"
  [(nPage)]="page"
  [(nPageSize)]="pageSize"
/>`;

  protected readonly variantsCode = `<n-pagination nVariant="default" [nTotalPages]="10" />
<n-pagination nVariant="outline" [nTotalPages]="10" />
<n-pagination nVariant="ghost"   [nTotalPages]="10" />`;

  protected readonly totalItemsCode = `<n-pagination [nTotalItems]="243" [nPageSize]="10" [(nPage)]="page" />`;

  protected readonly siblingsCode = `<n-pagination [nTotalPages]="20" [nSiblingCount]="2" [(nPage)]="page" />
<n-pagination [nTotalPages]="20" [nBoundaryCount]="2" [(nPage)]="page" />`;

  protected readonly firstLastCode = `<n-pagination [nShowFirstLast]="false" [nTotalPages]="10" [(nPage)]="page" />`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { PaginationComponent } from './shared/components/pagination';

@Component({
  selector: 'app-my-page',
  imports: [PaginationComponent],
  template: \`<n-pagination [nTotalPages]="10" [(nPage)]="page" />\`,
})
export class MyPage {
  page = signal(1);
}`;

  protected readonly usageCode = `<n-pagination
  [nTotalPages]="10"
  [(nPage)]="page"
  nSize="default"
  [nShowFirstLast]="true"
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nPage', type: 'number (model)', default: '1', description: 'Current page — two-way binding.' },
    { prop: 'nTotalPages', type: 'number', default: '1', description: 'Total pages (used when nTotalItems is not set).' },
    { prop: 'nTotalItems', type: 'number | null', default: 'null', description: 'Total items — auto-calculates pages (requires nPageSize).' },
    { prop: 'nPageSize', type: 'number (model)', default: '10', description: 'Items per page — two-way binding.' },
    { prop: 'nPageSizeOptions', type: 'number[]', default: '[10, 25, 50, 100]', description: 'Options in the page size dropdown.' },
    { prop: 'nSiblingCount', type: 'number', default: '1', description: 'Pages shown on each side of current page.' },
    { prop: 'nBoundaryCount', type: 'number', default: '1', description: 'Pages shown at start and end boundaries.' },
    { prop: 'nShowFirstLast', type: 'boolean', default: 'true', description: 'Show first/last page navigation buttons.' },
    { prop: 'nShowPageSizeSelector', type: 'boolean', default: 'false', description: 'Show the page size dropdown.' },
    { prop: 'nCompact', type: 'boolean', default: 'false', description: 'Compact mode — hides page numbers, shows "X / Y".' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables all pagination interaction.' },
    { prop: 'nVariant', type: "'default' | 'outline' | 'ghost'", default: "'default'", description: 'Visual style of page buttons.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of pagination buttons.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra classes on the host element.' },
    { prop: 'nAriaLabel', type: 'string', default: "'Pagination'", description: 'aria-label on the navigation element.' },
  ];
}
