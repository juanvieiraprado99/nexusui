import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  AccordionComponent,
  AccordionItemComponent,
  AccordionTriggerComponent,
  AccordionContentComponent,
} from '../../../shared/components/accordion';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-accordion-doc-page',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionTriggerComponent,
    AccordionContentComponent,
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
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Accordion</h1>
          <p class="mt-2 text-muted-foreground">A vertically stacked set of interactive headings that reveal or hide associated content.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-accordion class="w-full">
              <n-accordion-item nValue="item-1">
                <button n-accordion-trigger>What is nexus-ui?</button>
                <n-accordion-content>
                  nexus-ui is an Angular component library in the style of shadcn/ui.
                  Components are copied directly into your project via the CLI.
                </n-accordion-content>
              </n-accordion-item>
              <n-accordion-item nValue="item-2">
                <button n-accordion-trigger>How do I install a component?</button>
                <n-accordion-content>
                  Run <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">npx &#64;nexuslabs/cli&#64;alpha init</code> once,
                  then <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">npx &#64;nexuslabs/cli&#64;alpha add accordion</code>.
                </n-accordion-content>
              </n-accordion-item>
              <n-accordion-item nValue="item-3">
                <button n-accordion-trigger>Can I customize the components?</button>
                <n-accordion-content>
                  Yes! Since the files live in your project you have full control.
                  Use <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">nClass</code> or edit the source directly.
                </n-accordion-content>
              </n-accordion-item>
            </n-accordion>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add accordion" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">accordion.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">accordion-item.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">accordion-trigger.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">accordion-content.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">accordion.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/accordion/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Multiple open panels</h3>
          <div class="mt-3">
            <app-example title="nType=&quot;multiple&quot;" [code]="multipleCode">
              <n-accordion nType="multiple" class="w-full" [(nValues)]="openItems">
                <n-accordion-item nValue="item-1">
                  <button n-accordion-trigger>Section 1</button>
                  <n-accordion-content>Content for section 1. In multiple mode, several panels can be open simultaneously.</n-accordion-content>
                </n-accordion-item>
                <n-accordion-item nValue="item-2">
                  <button n-accordion-trigger>Section 2</button>
                  <n-accordion-content>Content for section 2. Opening this item does not close the previous one.</n-accordion-content>
                </n-accordion-item>
                <n-accordion-item nValue="item-3">
                  <button n-accordion-trigger>Section 3</button>
                  <n-accordion-content>Content for section 3.</n-accordion-content>
                </n-accordion-item>
              </n-accordion>
              <p class="mt-3 text-xs text-muted-foreground">Open: {{ openItems().join(', ') || 'none' }}</p>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled items</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <n-accordion class="w-full">
                <n-accordion-item nValue="item-1">
                  <button n-accordion-trigger>Active item</button>
                  <n-accordion-content>This item works normally.</n-accordion-content>
                </n-accordion-item>
                <n-accordion-item nValue="item-2" [nDisabled]="true">
                  <button n-accordion-trigger>Disabled item</button>
                  <n-accordion-content>This content cannot be accessed.</n-accordion-content>
                </n-accordion-item>
                <n-accordion-item nValue="item-3">
                  <button n-accordion-trigger>Another active item</button>
                  <n-accordion-content>This item also works normally.</n-accordion-content>
                </n-accordion-item>
              </n-accordion>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Non-collapsible</h3>
          <div class="mt-3">
            <app-example title="[nCollapsible]=&quot;false&quot;" [code]="nonCollapsibleCode">
              <n-accordion class="w-full" [nCollapsible]="false" nValue="item-1">
                <n-accordion-item nValue="item-1">
                  <button n-accordion-trigger>Always one open (try clicking)</button>
                  <n-accordion-content>This panel cannot be collapsed — one item is always open.</n-accordion-content>
                </n-accordion-item>
                <n-accordion-item nValue="item-2">
                  <button n-accordion-trigger>Clicking here closes the other</button>
                  <n-accordion-content>But you cannot close this one either without opening another.</n-accordion-content>
                </n-accordion-item>
              </n-accordion>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>

          <h3 class="mt-4 text-sm font-semibold">n-accordion</h3>
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

          <h3 class="mt-6 text-sm font-semibold">n-accordion-item</h3>
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
                @for (row of itemApiRows; track row.prop) {
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
export class AccordionDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly openItems  = signal<string[]>([]);

  protected readonly defaultCode = `<n-accordion>
  <n-accordion-item nValue="item-1">
    <button n-accordion-trigger>What is nexus-ui?</button>
    <n-accordion-content>
      nexus-ui is an Angular component library in the style of shadcn/ui.
    </n-accordion-content>
  </n-accordion-item>
  <n-accordion-item nValue="item-2">
    <button n-accordion-trigger>How do I install?</button>
    <n-accordion-content>
      Run npx @nexuslabs/cli@alpha add accordion.
    </n-accordion-content>
  </n-accordion-item>
</n-accordion>`;

  protected readonly multipleCode = `openItems = signal<string[]>([]);
// template
<n-accordion nType="multiple" [(nValues)]="openItems">
  <n-accordion-item nValue="item-1">
    <button n-accordion-trigger>Section 1</button>
    <n-accordion-content>Content for section 1.</n-accordion-content>
  </n-accordion-item>
  <n-accordion-item nValue="item-2">
    <button n-accordion-trigger>Section 2</button>
    <n-accordion-content>Content for section 2.</n-accordion-content>
  </n-accordion-item>
</n-accordion>`;

  protected readonly disabledCode = `<n-accordion>
  <n-accordion-item nValue="item-1">
    <button n-accordion-trigger>Active item</button>
    <n-accordion-content>This item works normally.</n-accordion-content>
  </n-accordion-item>
  <n-accordion-item nValue="item-2" [nDisabled]="true">
    <button n-accordion-trigger>Disabled item</button>
    <n-accordion-content>This content cannot be accessed.</n-accordion-content>
  </n-accordion-item>
</n-accordion>`;

  protected readonly nonCollapsibleCode = `<n-accordion [nCollapsible]="false" nValue="item-1">
  <n-accordion-item nValue="item-1">
    <button n-accordion-trigger>Always one open</button>
    <n-accordion-content>This panel cannot be collapsed.</n-accordion-content>
  </n-accordion-item>
  <n-accordion-item nValue="item-2">
    <button n-accordion-trigger>Clicking here closes the other</button>
    <n-accordion-content>But you cannot close this without opening another.</n-accordion-content>
  </n-accordion-item>
</n-accordion>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import {
  AccordionComponent,
  AccordionItemComponent,
  AccordionTriggerComponent,
  AccordionContentComponent,
} from './shared/components/accordion';

@Component({
  selector: 'app-my-page',
  imports: [AccordionComponent, AccordionItemComponent, AccordionTriggerComponent, AccordionContentComponent],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-accordion>
  <n-accordion-item nValue="item-1">
    <button n-accordion-trigger>Trigger text</button>
    <n-accordion-content>Panel content goes here.</n-accordion-content>
  </n-accordion-item>
</n-accordion>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nType', type: "'single' | 'multiple'", default: "'single'", description: 'Whether one or multiple items can be open at a time.' },
    { prop: 'nCollapsible', type: 'boolean', default: 'true', description: 'When false, the open item cannot be collapsed (single mode only).' },
    { prop: 'nValue', type: 'string (model)', default: "''", description: 'Two-way bindable open item value (single mode).' },
    { prop: 'nValues', type: 'string[] (model)', default: '[]', description: 'Two-way bindable open item values (multiple mode).' },
    { prop: '(nOpenChange)', type: 'EventEmitter<string | string[]>', default: '—', description: 'Emitted when the open state changes.' },
    { prop: 'nVariant', type: "'default'", default: "'default'", description: 'Visual variant of the accordion.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of the accordion items.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the root element.' },
  ];

  protected readonly itemApiRows: ApiRow[] = [
    { prop: 'nValue', type: 'string', default: "''", description: 'Unique identifier for this item, used to control open state.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Prevents the item from being opened or closed.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the item wrapper.' },
  ];
}
