import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  CollapsibleComponent,
  CollapsibleTriggerComponent,
  CollapsibleContentComponent,
} from '../../../shared/components/collapsible';
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
  selector: 'app-collapsible-doc-page',
  imports: [
    CollapsibleComponent, CollapsibleTriggerComponent, CollapsibleContentComponent,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Collapsible</h1>
          <p class="mt-2 text-muted-foreground">An interactive component that expands and collapses content with smooth animation.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-collapsible class="w-full max-w-sm">
              <button n-collapsible-trigger type="button"
                class="flex w-full items-center justify-between rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-accent">
                Toggle section
              </button>
              <n-collapsible-content>
                <div class="rounded-md border border-border px-4 py-3 mt-1 text-sm">
                  Hidden content revealed when expanded.
                </div>
              </n-collapsible-content>
            </n-collapsible>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add collapsible" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">collapsible/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/collapsible/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Controlled</h3>
          <div class="mt-3">
            <app-example title="[(nOpen)] two-way binding" [code]="controlledCode">
              <div class="flex flex-col gap-3 w-full max-w-sm">
                <div class="flex items-center gap-2">
                  <button type="button" (click)="open.set(!open())"
                    class="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
                    {{ open() ? 'Close' : 'Open' }}
                  </button>
                  <span class="text-sm text-muted-foreground">State: {{ open() ? 'open' : 'closed' }}</span>
                </div>
                <n-collapsible [(nOpen)]="open">
                  <button n-collapsible-trigger type="button"
                    class="flex w-full items-center justify-between rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-accent">
                    Controlled collapsible
                  </button>
                  <n-collapsible-content>
                    <div class="rounded-md border border-border px-4 py-3 mt-1 text-sm">
                      Controlled by external state.
                    </div>
                  </n-collapsible-content>
                </n-collapsible>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Lazy rendering</h3>
          <div class="mt-3">
            <app-example title="nLazy — unmounts content when closed" [code]="lazyCode">
              <n-collapsible [nLazy]="true" class="w-full max-w-sm">
                <button n-collapsible-trigger type="button"
                  class="flex w-full items-center justify-between rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-accent">
                  Lazy collapsible
                </button>
                <n-collapsible-content>
                  <div class="rounded-md border border-border px-4 py-3 mt-1 text-sm">
                    Content is unmounted when closed (DOM not present).
                  </div>
                </n-collapsible-content>
              </n-collapsible>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nVariant: default · bordered · card" [code]="variantsCode">
              <div class="flex flex-col gap-3 w-full max-w-sm">
                @for (v of ['default', 'bordered', 'card']; track v) {
                  <n-collapsible [nVariant]="$any(v)">
                    <button n-collapsible-trigger type="button"
                      class="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-medium hover:bg-accent">
                      {{ v }} variant
                    </button>
                    <n-collapsible-content>
                      <div class="px-4 py-3 mt-1 text-sm text-muted-foreground">Content for {{ v }} variant.</div>
                    </n-collapsible-content>
                  </n-collapsible>
                }
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-medium text-muted-foreground">CollapsibleComponent (n-collapsible)</h3>
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
export class CollapsibleDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly open = signal(false);

  protected readonly defaultCode = `<n-collapsible>
  <button n-collapsible-trigger type="button">
    Toggle section
  </button>
  <n-collapsible-content>
    Hidden content revealed when expanded.
  </n-collapsible-content>
</n-collapsible>`;

  protected readonly controlledCode = `open = signal(false);

// template
<n-collapsible [(nOpen)]="open">
  <button n-collapsible-trigger type="button">Controlled</button>
  <n-collapsible-content>Content</n-collapsible-content>
</n-collapsible>`;

  protected readonly lazyCode = `<n-collapsible [nLazy]="true">
  <button n-collapsible-trigger type="button">Lazy</button>
  <n-collapsible-content>
    Unmounted from DOM when closed.
  </n-collapsible-content>
</n-collapsible>`;

  protected readonly variantsCode = `<n-collapsible nVariant="default">...</n-collapsible>
<n-collapsible nVariant="bordered">...</n-collapsible>
<n-collapsible nVariant="card">...</n-collapsible>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  CollapsibleComponent,
  CollapsibleTriggerComponent,
  CollapsibleContentComponent,
} from './shared/components/collapsible';

@Component({
  selector: 'app-my-page',
  imports: [CollapsibleComponent, CollapsibleTriggerComponent, CollapsibleContentComponent],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-collapsible [(nOpen)]="open">
  <button n-collapsible-trigger type="button">Toggle</button>
  <n-collapsible-content>
    <p>Collapsible content here.</p>
  </n-collapsible-content>
</n-collapsible>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nOpen', type: 'boolean', default: 'false', description: 'Two-way bindable open state.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Prevents the collapsible from opening.' },
    { prop: 'nLazy', type: 'boolean', default: 'false', description: 'Unmounts content from the DOM when closed.' },
    { prop: 'nVariant', type: "'default' | 'bordered' | 'card'", default: "'default'", description: 'Visual style of the container.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes appended to the host.' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when the open state changes.' },
  ];
}
