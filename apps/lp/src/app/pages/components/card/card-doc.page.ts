import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
} from '../../../shared/components/card';
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
  selector: 'app-card-doc-page',
  imports: [
    CardComponent, CardHeaderComponent, CardTitleComponent,
    CardDescriptionComponent, CardContentComponent, CardFooterComponent,
    ButtonComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Card</h1>
          <p class="mt-2 text-muted-foreground">A container component for grouping related content with header, body, and footer sections.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-card class="w-full max-w-sm">
              <n-card-header>
                <n-card-title>Card title</n-card-title>
                <n-card-description>A short description of the card content.</n-card-description>
              </n-card-header>
              <n-card-content>
                <p class="text-sm text-muted-foreground">Card body content goes here.</p>
              </n-card-content>
              <n-card-footer>
                <button n-button nSize="sm" type="button">Action</button>
                <button n-button nVariant="ghost" nSize="sm" type="button">Cancel</button>
              </n-card-footer>
            </n-card>
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
                <app-code-block code="npx @nexuslabs/cli add card" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">card.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">card.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/card/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nVariant: default · elevated · filled · ghost" [code]="variantsCode">
              <div class="grid grid-cols-2 gap-3 w-full">
                @for (v of ['default', 'elevated', 'filled', 'ghost']; track v) {
                  <n-card [nVariant]="$any(v)">
                    <n-card-header>
                      <n-card-title class="text-sm">{{ v }}</n-card-title>
                    </n-card-header>
                    <n-card-content>
                      <p class="text-xs text-muted-foreground">nVariant="{{ v }}"</p>
                    </n-card-content>
                  </n-card>
                }
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Clickable</h3>
          <div class="mt-3">
            <app-example title="nClickable + nSelected" [code]="clickableCode">
              <div class="flex flex-col gap-3 w-full max-w-sm">
                @for (plan of plans; track plan.id) {
                  <n-card
                    [nClickable]="true"
                    [nSelected]="selectedPlan() === plan.id"
                    (nClick)="selectedPlan.set(plan.id)"
                  >
                    <n-card-content>
                      <p class="font-medium">{{ plan.name }}</p>
                      <p class="text-sm text-muted-foreground">{{ plan.price }}</p>
                    </n-card-content>
                  </n-card>
                }
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading</h3>
          <div class="mt-3">
            <app-example title="nLoading" [code]="loadingCode">
              <n-card [nLoading]="true" class="w-full max-w-sm">
                <n-card-header>
                  <n-card-title>Loading card</n-card-title>
                  <n-card-description>Content is being fetched.</n-card-description>
                </n-card-header>
                <n-card-content>
                  <p class="text-sm text-muted-foreground">This content is loading…</p>
                </n-card-content>
              </n-card>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-medium text-muted-foreground">CardComponent (n-card)</h3>
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
export class CardDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly selectedPlan = signal<string>('starter');

  protected readonly plans = [
    { id: 'starter', name: 'Starter', price: 'Free forever' },
    { id: 'pro', name: 'Pro', price: '$12 / month' },
    { id: 'enterprise', name: 'Enterprise', price: 'Contact us' },
  ];

  protected readonly defaultCode = `<n-card>
  <n-card-header>
    <n-card-title>Card title</n-card-title>
    <n-card-description>A short description.</n-card-description>
  </n-card-header>
  <n-card-content>
    <p>Card body content.</p>
  </n-card-content>
  <n-card-footer>
    <button n-button nSize="sm">Action</button>
  </n-card-footer>
</n-card>`;

  protected readonly variantsCode = `<n-card nVariant="default">...</n-card>
<n-card nVariant="elevated">...</n-card>
<n-card nVariant="filled">...</n-card>
<n-card nVariant="ghost">...</n-card>`;

  protected readonly clickableCode = `selectedPlan = signal('starter');

// template
<n-card
  [nClickable]="true"
  [nSelected]="selectedPlan() === 'starter'"
  (nClick)="selectedPlan.set('starter')"
>
  <n-card-content>Starter — Free forever</n-card-content>
</n-card>`;

  protected readonly loadingCode = `<n-card [nLoading]="isLoading()">
  <n-card-header>
    <n-card-title>Loading card</n-card-title>
  </n-card-header>
  <n-card-content>Content...</n-card-content>
</n-card>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
} from './shared/components/card';

@Component({
  selector: 'app-my-page',
  imports: [
    CardComponent, CardHeaderComponent, CardTitleComponent,
    CardDescriptionComponent, CardContentComponent, CardFooterComponent,
  ],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-card nVariant="default" nSize="default">
  <n-card-header>
    <n-card-title>Title</n-card-title>
    <n-card-description>Description</n-card-description>
  </n-card-header>
  <n-card-content>Content</n-card-content>
  <n-card-footer>Footer</n-card-footer>
</n-card>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nVariant', type: "'default' | 'elevated' | 'filled' | 'ghost'", default: "'default'", description: 'Visual style of the card.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Padding size.' },
    { prop: 'nClickable', type: 'boolean', default: 'false', description: 'Makes the card interactive (keyboard + click).' },
    { prop: 'nSelected', type: 'boolean', default: 'false', description: 'Shows a primary ring around the card.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows an animated overlay on top of the content.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes appended to the host.' },
    { prop: '(nClick)', type: 'EventEmitter<MouseEvent | KeyboardEvent>', default: '—', description: 'Emitted when the clickable card is activated.' },
  ];
}
