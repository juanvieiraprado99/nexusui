import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  PopoverComponent,
  PopoverTriggerDirective,
  PopoverContentComponent,
  PopoverCloseDirective,
} from '../../../shared/components/popover';
import { ButtonComponent } from '../../../shared/components/button';
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
  selector: 'app-popover-doc-page',
  imports: [
    PopoverComponent, PopoverTriggerDirective, PopoverContentComponent, PopoverCloseDirective,
    ButtonComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Popover</h1>
          <p class="mt-2 text-muted-foreground">Displays rich content in a floating panel anchored to a trigger element.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex items-center justify-center min-h-24">
              <n-popover>
                <button n-button nVariant="outline" n-popover-trigger type="button">Open popover</button>
                <n-popover-content>
                  <div class="flex flex-col gap-2">
                    <h4 class="font-semibold leading-none">Dimensions</h4>
                    <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                    <button n-button nVariant="ghost" nSize="sm" n-popover-close type="button" class="mt-2 w-full">Close</button>
                  </div>
                </n-popover-content>
              </n-popover>
            </div>
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
                <app-code-block code="npx @nexuslabs/cli add popover" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install &#64;angular/cdk clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">popover/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/popover/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Hover trigger</h3>
          <div class="mt-3">
            <app-example title='nTrigger="hover"' [code]="hoverCode">
              <div class="flex items-center justify-center min-h-24">
                <n-popover nTrigger="hover">
                  <button n-button nVariant="outline" n-popover-trigger type="button">Hover me</button>
                  <n-popover-content>
                    <p class="text-sm">Opens on hover, closes on mouse leave.</p>
                  </n-popover-content>
                </n-popover>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Focus trigger</h3>
          <div class="mt-3">
            <app-example title='nTrigger="focus"' [code]="focusCode">
              <div class="flex items-center justify-center min-h-24">
                <n-popover nTrigger="focus">
                  <button n-button nVariant="outline" n-popover-trigger type="button">Focus me</button>
                  <n-popover-content>
                    <p class="text-sm">Opens on focus, stays open while focus is inside, closes when focus leaves.</p>
                  </n-popover-content>
                </n-popover>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Placement</h3>
          <div class="mt-3">
            <app-example title="nSide: top · bottom · left · right" [code]="placementCode">
              <div class="flex flex-wrap gap-2 items-center justify-center min-h-32">
                @for (side of ['top', 'bottom', 'left', 'right']; track side) {
                  <n-popover>
                    <button n-button nVariant="outline" nSize="sm" n-popover-trigger type="button">{{ side }}</button>
                    <n-popover-content [nSide]="$any(side)">
                      <p class="text-sm">Placed on the {{ side }}.</p>
                    </n-popover-content>
                  </n-popover>
                }
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Modal with form</h3>
          <div class="mt-3">
            <app-example title="nModal + nPersistent" [code]="formCode">
              <div class="flex items-center justify-center min-h-24">
                <n-popover [nModal]="true" [nPersistent]="true">
                  <button n-button n-popover-trigger type="button">Edit profile</button>
                  <n-popover-content nSize="lg">
                    <div class="flex flex-col gap-3">
                      <h4 class="font-semibold">Edit profile</h4>
                      <p class="text-xs text-muted-foreground">Focus trap active — click outside to shake.</p>
                      <input class="h-9 rounded-md border border-border bg-background px-3 text-sm" placeholder="Display name" />
                      <div class="flex gap-2">
                        <button n-button nSize="sm" type="button">Save</button>
                        <button n-button nVariant="outline" nSize="sm" n-popover-close type="button">Cancel</button>
                      </div>
                    </div>
                  </n-popover-content>
                </n-popover>
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-medium text-muted-foreground">PopoverComponent (n-popover)</h3>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">PopoverContentComponent (n-popover-content)</h3>
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
                @for (row of contentApiRows; track row.prop) {
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
export class PopoverDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<n-popover>
  <button n-button nVariant="outline" n-popover-trigger type="button">
    Open popover
  </button>
  <n-popover-content>
    <h4 class="font-semibold">Title</h4>
    <p class="text-sm text-muted-foreground">Description text.</p>
    <button n-button nVariant="ghost" nSize="sm" n-popover-close type="button">
      Close
    </button>
  </n-popover-content>
</n-popover>`;

  protected readonly hoverCode = `<n-popover nTrigger="hover">
  <button n-button n-popover-trigger type="button">Hover me</button>
  <n-popover-content>
    <p class="text-sm">Opens on hover.</p>
  </n-popover-content>
</n-popover>`;

  protected readonly focusCode = `<n-popover nTrigger="focus">
  <button n-button n-popover-trigger type="button">Focus me</button>
  <n-popover-content>
    <p class="text-sm">Opens on focus, closes when focus leaves.</p>
  </n-popover-content>
</n-popover>`;

  protected readonly placementCode = `<n-popover>
  <button n-button n-popover-trigger type="button">Top</button>
  <n-popover-content nSide="top">
    <p class="text-sm">Placed on top.</p>
  </n-popover-content>
</n-popover>`;

  protected readonly formCode = `<n-popover [nModal]="true" [nPersistent]="true">
  <button n-button n-popover-trigger type="button">Edit</button>
  <n-popover-content nSize="lg">
    <div class="flex flex-col gap-3">
      <h4 class="font-semibold">Edit profile</h4>
      <input class="..." placeholder="Display name" />
      <div class="flex gap-2">
        <button n-button nSize="sm" type="button">Save</button>
        <button n-button nVariant="outline" nSize="sm"
          n-popover-close type="button">Cancel</button>
      </div>
    </div>
  </n-popover-content>
</n-popover>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  PopoverComponent,
  PopoverTriggerDirective,
  PopoverContentComponent,
  PopoverCloseDirective,
} from './shared/components/popover';

@Component({
  selector: 'app-my-page',
  imports: [
    PopoverComponent, PopoverTriggerDirective,
    PopoverContentComponent, PopoverCloseDirective,
  ],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-popover>
  <button n-popover-trigger type="button">Open</button>
  <n-popover-content>
    <p class="text-sm">Popover content.</p>
  </n-popover-content>
</n-popover>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nOpen', type: 'boolean', default: 'false', description: 'Two-way bindable open state.' },
    { prop: 'nTrigger', type: "'click' | 'hover' | 'focus'", default: "'click'", description: 'How the popover is triggered.' },
    { prop: 'nModal', type: 'boolean', default: 'false', description: 'Enables focus trap inside the panel.' },
    { prop: 'nPersistent', type: 'boolean', default: 'false', description: "Prevents closing on outside click — shakes instead." },
    { prop: 'nId', type: 'string', default: "''", description: 'Custom ID for the popover (SSR-stable).' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when open state changes.' },
  ];

  protected readonly contentApiRows: ApiRow[] = [
    { prop: 'nSide', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred side for placement. Auto-flips if no space.' },
    { prop: 'nAlign', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment along the cross-axis.' },
    { prop: 'nSideOffset', type: 'number', default: '8', description: 'Distance in px from the trigger.' },
    { prop: 'nArrow', type: 'boolean', default: 'true', description: 'Shows an arrow pointing to the trigger.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Width of the popover panel.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes for the panel.' },
  ];
}
