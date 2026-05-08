import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  BreadcrumbEllipsisComponent,
} from '../../../shared/components/breadcrumb';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-breadcrumb-doc-page',
  imports: [
    BreadcrumbComponent,
    BreadcrumbListComponent,
    BreadcrumbItemComponent,
    BreadcrumbLinkComponent,
    BreadcrumbPageComponent,
    BreadcrumbSeparatorComponent,
    BreadcrumbEllipsisComponent,
    DocsLayoutComponent,
    CodeBlockComponent,
    ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Breadcrumb</h1>
          <p class="mt-2 text-muted-foreground">Displays the path to the current resource using a hierarchy of links.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-breadcrumb>
              <n-breadcrumb-list>
                <n-breadcrumb-item>
                  <a n-breadcrumb-link href="#">Home</a>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  <n-breadcrumb-separator>/</n-breadcrumb-separator>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  <a n-breadcrumb-link href="#">Products</a>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  <n-breadcrumb-separator>/</n-breadcrumb-separator>
                </n-breadcrumb-item>
                <n-breadcrumb-item>
                  <n-breadcrumb-page>Laptop</n-breadcrumb-page>
                </n-breadcrumb-item>
              </n-breadcrumb-list>
            </n-breadcrumb>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add breadcrumb" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">breadcrumb.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">breadcrumb.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/breadcrumb/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> util exists in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Custom separator</h3>
          <div class="mt-3">
            <app-example title="n-breadcrumb-separator" [code]="customSeparatorCode">
              <n-breadcrumb>
                <n-breadcrumb-list>
                  <n-breadcrumb-item>
                    <a n-breadcrumb-link href="#">Home</a>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-separator>›</n-breadcrumb-separator>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <a n-breadcrumb-link href="#">Settings</a>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-separator>›</n-breadcrumb-separator>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-page>General</n-breadcrumb-page>
                  </n-breadcrumb-item>
                </n-breadcrumb-list>
              </n-breadcrumb>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With ellipsis</h3>
          <div class="mt-3">
            <app-example title="n-breadcrumb-ellipsis" [code]="ellipsisCode">
              <n-breadcrumb>
                <n-breadcrumb-list>
                  <n-breadcrumb-item>
                    <a n-breadcrumb-link href="#">Home</a>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-separator>/</n-breadcrumb-separator>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-ellipsis />
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-separator>/</n-breadcrumb-separator>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <a n-breadcrumb-link href="#">Components</a>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-separator>/</n-breadcrumb-separator>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-page>Breadcrumb</n-breadcrumb-page>
                  </n-breadcrumb-item>
                </n-breadcrumb-list>
              </n-breadcrumb>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: sm | default | lg" [code]="sizesCode">
              <div class="flex flex-col gap-4">
                <n-breadcrumb nSize="sm">
                  <n-breadcrumb-list>
                    <n-breadcrumb-item><a n-breadcrumb-link href="#">Home</a></n-breadcrumb-item>
                    <n-breadcrumb-item><n-breadcrumb-separator>/</n-breadcrumb-separator></n-breadcrumb-item>
                    <n-breadcrumb-item><n-breadcrumb-page>Small</n-breadcrumb-page></n-breadcrumb-item>
                  </n-breadcrumb-list>
                </n-breadcrumb>
                <n-breadcrumb nSize="default">
                  <n-breadcrumb-list>
                    <n-breadcrumb-item><a n-breadcrumb-link href="#">Home</a></n-breadcrumb-item>
                    <n-breadcrumb-item><n-breadcrumb-separator>/</n-breadcrumb-separator></n-breadcrumb-item>
                    <n-breadcrumb-item><n-breadcrumb-page>Default</n-breadcrumb-page></n-breadcrumb-item>
                  </n-breadcrumb-list>
                </n-breadcrumb>
                <n-breadcrumb nSize="lg">
                  <n-breadcrumb-list>
                    <n-breadcrumb-item><a n-breadcrumb-link href="#">Home</a></n-breadcrumb-item>
                    <n-breadcrumb-item><n-breadcrumb-separator>/</n-breadcrumb-separator></n-breadcrumb-item>
                    <n-breadcrumb-item><n-breadcrumb-page>Large</n-breadcrumb-page></n-breadcrumb-item>
                  </n-breadcrumb-list>
                </n-breadcrumb>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled link</h3>
          <div class="mt-3">
            <app-example title="nDisabled on n-breadcrumb-link" [code]="disabledCode">
              <n-breadcrumb>
                <n-breadcrumb-list>
                  <n-breadcrumb-item>
                    <a n-breadcrumb-link href="#" [nDisabled]="true">Home</a>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-separator>/</n-breadcrumb-separator>
                  </n-breadcrumb-item>
                  <n-breadcrumb-item>
                    <n-breadcrumb-page>Current Page</n-breadcrumb-page>
                  </n-breadcrumb-item>
                </n-breadcrumb-list>
              </n-breadcrumb>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>

          <h3 class="mt-4 text-sm font-semibold">n-breadcrumb</h3>
          <div class="mt-2 overflow-x-auto rounded-lg border border-border/60">
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

          <h3 class="mt-6 text-sm font-semibold">Sub-components</h3>
          <div class="mt-2 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Component</th>
                  <th class="px-4 py-2 text-left font-medium">Selector</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of subComponentRows; track row.component) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.component }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.selector }}</td>
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
export class BreadcrumbDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<n-breadcrumb>
  <n-breadcrumb-list>
    <n-breadcrumb-item>
      <a n-breadcrumb-link href="#">Home</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>/</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <a n-breadcrumb-link href="#">Products</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>/</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-page>Laptop</n-breadcrumb-page>
    </n-breadcrumb-item>
  </n-breadcrumb-list>
</n-breadcrumb>`;

  protected readonly customSeparatorCode = `<n-breadcrumb>
  <n-breadcrumb-list>
    <n-breadcrumb-item>
      <a n-breadcrumb-link href="#">Home</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>›</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <a n-breadcrumb-link href="#">Settings</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>›</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-page>General</n-breadcrumb-page>
    </n-breadcrumb-item>
  </n-breadcrumb-list>
</n-breadcrumb>`;

  protected readonly ellipsisCode = `<n-breadcrumb>
  <n-breadcrumb-list>
    <n-breadcrumb-item>
      <a n-breadcrumb-link href="#">Home</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>/</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-ellipsis />
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>/</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <a n-breadcrumb-link href="#">Components</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>/</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-page>Breadcrumb</n-breadcrumb-page>
    </n-breadcrumb-item>
  </n-breadcrumb-list>
</n-breadcrumb>`;

  protected readonly sizesCode = `<n-breadcrumb nSize="sm">...</n-breadcrumb>
<n-breadcrumb nSize="default">...</n-breadcrumb>
<n-breadcrumb nSize="lg">...</n-breadcrumb>`;

  protected readonly disabledCode = `<a n-breadcrumb-link href="#" [nDisabled]="true">Home</a>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
} from './shared/components/breadcrumb';

@Component({
  selector: 'app-my-page',
  imports: [
    BreadcrumbComponent, BreadcrumbListComponent, BreadcrumbItemComponent,
    BreadcrumbLinkComponent, BreadcrumbPageComponent, BreadcrumbSeparatorComponent,
  ],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-breadcrumb>
  <n-breadcrumb-list>
    <n-breadcrumb-item>
      <a n-breadcrumb-link routerLink="/">Home</a>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-separator>/</n-breadcrumb-separator>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-breadcrumb-page>Current Page</n-breadcrumb-page>
    </n-breadcrumb-item>
  </n-breadcrumb-list>
</n-breadcrumb>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Font size applied to the breadcrumb trail.' },
    { prop: 'nAriaLabel', type: 'string', default: "'breadcrumb'", description: 'Accessible label for the nav element.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the root nav element.' },
  ];

  protected readonly subComponentRows: { component: string; selector: string; description: string }[] = [
    { component: 'BreadcrumbListComponent', selector: 'n-breadcrumb-list', description: 'Ordered list wrapper for breadcrumb items.' },
    { component: 'BreadcrumbItemComponent', selector: 'n-breadcrumb-item', description: 'List item wrapper — use for each segment including separators.' },
    { component: 'BreadcrumbLinkComponent', selector: 'a[n-breadcrumb-link]', description: 'Anchor link within a breadcrumb item. Accepts nDisabled.' },
    { component: 'BreadcrumbPageComponent', selector: 'n-breadcrumb-page', description: 'Current page indicator (aria-current="page", non-interactive).' },
    { component: 'BreadcrumbSeparatorComponent', selector: 'n-breadcrumb-separator', description: 'Visual separator between items. Slot default content or provide custom text/icon.' },
    { component: 'BreadcrumbEllipsisComponent', selector: 'n-breadcrumb-ellipsis', description: 'Collapsed middle items indicator (…).' },
  ];
}
