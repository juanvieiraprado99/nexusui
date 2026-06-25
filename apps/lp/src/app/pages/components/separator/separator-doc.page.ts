import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SeparatorComponent } from '../../../shared/components/separator';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-separator-doc-page',
  imports: [SeparatorComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Separator</h1>
          <p class="mt-2 text-muted-foreground">Visually or semantically separates content. Supports labels, gradients, and orientations.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full space-y-4">
              <p class="text-sm text-muted-foreground">Above the separator</p>
              <n-separator />
              <p class="text-sm text-muted-foreground">Below the separator</p>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add separator" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install clsx tailwind-merge class-variance-authority" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">separator.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">separator.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/separator/</code>.</li>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">With label</h3>
          <div class="mt-3">
            <app-example title="nLabel" [code]="labelCode">
              <div class="w-full space-y-4">
                <n-separator nLabel="OR" />
                <n-separator nLabel="Continue with" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Gradient</h3>
          <div class="mt-3">
            <app-example title="nGradient" [code]="gradientCode">
              <n-separator [nGradient]="true" />
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Vertical</h3>
          <div class="mt-3">
            <app-example title="nOrientation: vertical" [code]="verticalCode">
              <div class="flex items-center gap-4 h-8">
                <span class="text-sm text-muted-foreground">Left</span>
                <n-separator nOrientation="vertical" />
                <span class="text-sm text-muted-foreground">Right</span>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With icon</h3>
          <div class="mt-3">
            <app-example title="Icon as content" [code]="withIconCode">
              <div class="w-full max-w-sm space-y-2 text-sm">
                <p class="text-muted-foreground">Section A</p>
                <n-separator>
                  <svg xmlns="http://www.w3.org/2000/svg" class="text-muted-foreground h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </n-separator>
                <p class="text-muted-foreground">Section B</p>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nVariant: solid | dashed | dotted" [code]="variantsCode">
              <div class="w-full max-w-sm space-y-4 text-xs text-muted-foreground">
                <div>
                  <p>solid</p>
                  <n-separator nVariant="solid" />
                </div>
                <div>
                  <p>dashed</p>
                  <n-separator nVariant="dashed" />
                </div>
                <div>
                  <p>dotted</p>
                  <n-separator nVariant="dotted" />
                </div>
                <div>
                  <p>large + strong</p>
                  <n-separator nSize="lg" nIntensity="strong" />
                </div>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Between content sections</h3>
          <div class="mt-3">
            <app-example title="Card sections" [code]="sectionsCode">
              <div class="w-full max-w-sm rounded-lg border border-border bg-card text-card-foreground">
                <div class="p-4">
                  <p class="text-sm font-medium">Profile</p>
                  <p class="text-xs text-muted-foreground">Manage your public details.</p>
                </div>
                <n-separator />
                <div class="p-4">
                  <p class="text-sm font-medium">Notifications</p>
                  <p class="text-xs text-muted-foreground">Choose what you get notified about.</p>
                </div>
                <n-separator />
                <div class="p-4">
                  <p class="text-sm font-medium">Billing</p>
                  <p class="text-xs text-muted-foreground">Update your payment method.</p>
                </div>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Inline toolbar (vertical)</h3>
          <div class="mt-3">
            <app-example title="Vertical between actions" [code]="toolbarCode">
              <div class="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm">
                <button type="button" class="text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                <n-separator nOrientation="vertical" nClass="h-4" />
                <button type="button" class="text-muted-foreground hover:text-foreground transition-colors">Duplicate</button>
                <n-separator nOrientation="vertical" nClass="h-4" />
                <button type="button" class="text-destructive hover:opacity-80 transition-opacity">Delete</button>
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
export class SeparatorDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<n-separator />`;
  protected readonly labelCode = `<n-separator nLabel="OR" />`;
  protected readonly gradientCode = `<n-separator nGradient />`;
  protected readonly verticalCode = `<div class="flex items-center gap-4 h-8">
  <span>Left</span>
  <n-separator nOrientation="vertical" />
  <span>Right</span>
</div>`;
  protected readonly withIconCode = `<n-separator>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
</n-separator>`;
  protected readonly variantsCode = `<n-separator nVariant="solid" />
<n-separator nVariant="dashed" />
<n-separator nVariant="dotted" />
<n-separator nSize="lg" nIntensity="strong" />`;

  protected readonly sectionsCode = `<div class="rounded-lg border bg-card">
  <div class="p-4">Profile</div>
  <n-separator />
  <div class="p-4">Notifications</div>
  <n-separator />
  <div class="p-4">Billing</div>
</div>`;

  protected readonly toolbarCode = `<div class="flex items-center gap-3">
  <button>Edit</button>
  <n-separator nOrientation="vertical" nClass="h-4" />
  <button>Duplicate</button>
  <n-separator nOrientation="vertical" nClass="h-4" />
  <button>Delete</button>
</div>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { SeparatorComponent } from './shared/components/separator';

@Component({
  selector: 'app-my-page',
  imports: [SeparatorComponent],
  template: \`<n-separator nLabel="OR" />\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-separator />
<n-separator nLabel="OR" />
<n-separator nOrientation="vertical" />`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nOrientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction of the separator line.' },
    { prop: 'nVariant', type: "'solid' | 'dashed' | 'dotted'", default: "'solid'", description: 'Line style.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Thickness of the separator line.' },
    { prop: 'nIntensity', type: "'muted' | 'default' | 'strong'", default: "'default'", description: 'Color intensity of the line.' },
    { prop: 'nGradient', type: 'boolean', default: 'false', description: 'Fades the line to transparent at both ends.' },
    { prop: 'nInset', type: 'boolean', default: 'false', description: 'Adds horizontal margin to inset the separator.' },
    { prop: 'nDecorative', type: 'boolean', default: 'false', description: 'Marks as purely decorative (role="none" instead of role="separator").' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Text label displayed in the center of the separator.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the host element.' },
  ];
}
