import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { LabelComponent } from '../../../shared/components/label';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-label-doc-page',
  imports: [LabelComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Label</h1>
          <p class="mt-2 text-muted-foreground">Renders an accessible label associated with a form control.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex flex-col gap-3">
              <n-label>Email address</n-label>
              <n-label [nRequired]="true">Password</n-label>
              <n-label [nDisabled]="true">Disabled label</n-label>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add label" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">label.component.ts</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/label/</code>.</li>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Required indicator</h3>
          <div class="mt-3">
            <app-example title="nRequired" [code]="requiredCode">
              <n-label [nRequired]="true">Required field</n-label>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <n-label [nDisabled]="true">Disabled label</n-label>
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
export class LabelDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<n-label>Email address</n-label>
<n-label [nRequired]="true">Password</n-label>
<n-label [nDisabled]="true">Disabled label</n-label>`;

  protected readonly requiredCode = `<n-label [nRequired]="true">Required field</n-label>`;
  protected readonly disabledCode = `<n-label [nDisabled]="true">Disabled label</n-label>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { LabelComponent } from './shared/components/label';

@Component({
  selector: 'app-my-page',
  imports: [LabelComponent],
  template: \`<n-label nFor="email">Email</n-label>\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-label nFor="email" nRequired>Email address</n-label>
<input id="email" type="email" />`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nFor', type: 'string', default: "''", description: 'Associates the label with a form control via the for attribute.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Sets the id attribute on the label element.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Shows a red asterisk (*) indicating a required field.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Reduces opacity and sets cursor to not-allowed.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes merged into the label.' },
  ];
}
