import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupComponent } from '../../../shared/components/input-group';
import { InputGroupControlDirective } from '../../../shared/components/input-group';
import { ButtonComponent } from '../../../shared/components/button';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-input-group-doc-page',
  imports: [
    InputGroupComponent,
    InputGroupControlDirective,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
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
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Input Group</h1>
          <p class="mt-2 text-muted-foreground">Groups a text control with addons (text, icons, or buttons) before and/or after it, plus optional clear, copy, and loading affordances.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full max-w-sm">
              <n-input-group nAddonBefore="https://">
                <input nInputGroup type="text" placeholder="example.com" />
              </n-input-group>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add input-group" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input-group.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input-group-control.directive.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input-group.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/input-group/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> exists in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/</code>.</li>
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
          <p class="mt-3 text-sm text-muted-foreground">The <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">n-input-group</code> is a visual wrapper — put the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">nInputGroup</code> directive on the projected native <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input</code>/<code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">textarea</code>. <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">ngModel</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">formControlName</code> go on that same control.</p>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Text addons</h3>
          <div class="mt-3">
            <app-example title="nAddonBefore / nAddonAfter" [code]="addonsCode">
              <div class="w-full max-w-sm">
                <n-input-group nAddonBefore="@" nAddonAfter=".com">
                  <input nInputGroup type="text" placeholder="username" />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With icon</h3>
          <div class="mt-3">
            <app-example title="nAddonBefore (TemplateRef)" [code]="iconCode">
              <div class="w-full max-w-sm">
                <n-input-group [nAddonBefore]="mailIcon">
                  <input nInputGroup type="email" placeholder="you@example.com" />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With button</h3>
          <div class="mt-3">
            <app-example title="nAddonAfter (button)" [code]="buttonCode">
              <div class="w-full max-w-sm">
                <n-input-group [nAddonAfter]="searchBtn">
                  <input nInputGroup type="search" placeholder="Search..." />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: sm | default | lg" [code]="sizesCode">
              <div class="flex flex-col gap-3 w-full max-w-sm">
                <n-input-group nAddonBefore="$" nSize="sm">
                  <input nInputGroup type="number" placeholder="0.00" />
                </n-input-group>
                <n-input-group nAddonBefore="$">
                  <input nInputGroup type="number" placeholder="0.00" />
                </n-input-group>
                <n-input-group nAddonBefore="$" nSize="lg">
                  <input nInputGroup type="number" placeholder="0.00" />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Clearable</h3>
          <div class="mt-3">
            <app-example title="nClearable" [code]="clearableCode">
              <div class="w-full max-w-sm">
                <n-input-group nClearable>
                  <input nInputGroup type="text" [(ngModel)]="clearValue" placeholder="Type something..." />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Copyable</h3>
          <div class="mt-3">
            <app-example title="nCopyable" [code]="copyableCode">
              <div class="w-full max-w-sm">
                <n-input-group nCopyable nAddonBefore="Token">
                  <input nInputGroup type="text" value="nexus-api-key-abc123" readonly />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading</h3>
          <div class="mt-3">
            <app-example title="nLoading" [code]="loadingCode">
              <div class="w-full max-w-sm">
                <n-input-group nAddonBefore="@" nLoading>
                  <input nInputGroup type="text" placeholder="username" />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="w-full max-w-sm">
                <n-input-group nAddonBefore="https://" nDisabled>
                  <input nInputGroup type="text" placeholder="example.com" />
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Textarea</h3>
          <div class="mt-3">
            <app-example title="Block addons with textarea" [code]="textareaCode">
              <div class="w-full max-w-sm">
                <n-input-group nAddonBefore="Note" nAddonAfter="max. 500 characters">
                  <textarea nInputGroup rows="4" placeholder="Describe the issue..."></textarea>
                </n-input-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="withFormCode">
              <form [formGroup]="priceForm" class="flex w-full max-w-sm flex-col gap-3">
                <n-input-group nAddonBefore="R$">
                  <input nInputGroup type="number" formControlName="price" placeholder="0.00" />
                </n-input-group>
                <p class="text-sm text-muted-foreground">Value: {{ priceForm.controls['price'].value || 'empty' }}</p>
              </form>
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

    <ng-template #mailIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    </ng-template>

    <ng-template #searchBtn>
      <button n-button nVariant="ghost" nSize="sm" type="button">Search</button>
    </ng-template>
  `,
})
export class InputGroupDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly clearValue = signal('');
  protected readonly priceForm = new FormGroup({
    price: new FormControl('', { nonNullable: true }),
  });

  protected readonly defaultCode = `<n-input-group nAddonBefore="https://">
  <input nInputGroup type="text" placeholder="example.com" />
</n-input-group>`;
  protected readonly addonsCode = `<n-input-group nAddonBefore="@" nAddonAfter=".com">
  <input nInputGroup type="text" placeholder="username" />
</n-input-group>`;
  protected readonly iconCode = `<n-input-group [nAddonBefore]="mailIcon">
  <input nInputGroup type="email" placeholder="you@example.com" />
</n-input-group>

<ng-template #mailIcon>
  <svg ...><!-- mail icon --></svg>
</ng-template>`;
  protected readonly buttonCode = `<n-input-group [nAddonAfter]="searchBtn">
  <input nInputGroup type="search" placeholder="Search..." />
</n-input-group>

<ng-template #searchBtn>
  <button n-button nVariant="ghost" nSize="sm">Search</button>
</ng-template>`;
  protected readonly sizesCode = `<n-input-group nAddonBefore="$" nSize="sm">
  <input nInputGroup type="number" placeholder="0.00" />
</n-input-group>
<n-input-group nAddonBefore="$">
  <input nInputGroup type="number" placeholder="0.00" />
</n-input-group>
<n-input-group nAddonBefore="$" nSize="lg">
  <input nInputGroup type="number" placeholder="0.00" />
</n-input-group>`;
  protected readonly clearableCode = `<n-input-group nClearable>
  <input nInputGroup type="text" [(ngModel)]="value" placeholder="Type something..." />
</n-input-group>`;
  protected readonly copyableCode = `<n-input-group nCopyable nAddonBefore="Token">
  <input nInputGroup type="text" value="nexus-api-key-abc123" readonly />
</n-input-group>`;
  protected readonly loadingCode = `<n-input-group nAddonBefore="@" nLoading>
  <input nInputGroup type="text" placeholder="username" />
</n-input-group>`;
  protected readonly disabledCode = `<n-input-group nAddonBefore="https://" nDisabled>
  <input nInputGroup type="text" placeholder="example.com" />
</n-input-group>`;
  protected readonly textareaCode = `<n-input-group nAddonBefore="Note" nAddonAfter="max. 500 characters">
  <textarea nInputGroup rows="4" placeholder="Describe the issue..."></textarea>
</n-input-group>`;
  protected readonly withFormCode = `priceForm = new FormGroup({
  price: new FormControl('', { nonNullable: true }),
});
// template
<form [formGroup]="priceForm">
  <n-input-group nAddonBefore="R$">
    <input nInputGroup type="number" formControlName="price" placeholder="0.00" />
  </n-input-group>
</form>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupControlDirective } from './shared/components/input-group';

@Component({
  selector: 'app-my-page',
  imports: [InputGroupComponent, InputGroupControlDirective, FormsModule],
  template: \`
    <n-input-group nAddonBefore="https://">
      <input nInputGroup type="text" [(ngModel)]="domain" />
    </n-input-group>
  \`,
})
export class MyPage {
  domain = signal('');
}`;

  protected readonly usageCode = `<n-input-group nAddonBefore="https://" nClearable>
  <input nInputGroup type="text" [(ngModel)]="domain" placeholder="example.com" />
</n-input-group>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nAddonBefore', type: 'string | TemplateRef<void>', default: "''", description: 'Addon rendered before the control. String or a TemplateRef for icons/buttons.' },
    { prop: 'nAddonAfter', type: 'string | TemplateRef<void>', default: "''", description: 'Addon rendered after the control.' },
    { prop: 'nAddonAlign', type: "'inline' | 'block'", default: "'inline'", description: 'Stacks addons above/below the control when set to block.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of the group and projected control.' },
    { prop: 'nClearable', type: 'boolean', default: 'false', description: 'Shows a clear (X) button when the control has a value.' },
    { prop: 'nCopyable', type: 'boolean', default: 'false', description: 'Shows a copy-to-clipboard button.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the projected control.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the group and the projected control.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the group element.' },
    { prop: 'nInputGroup', type: 'directive', default: '—', description: 'Directive placed on the native input/textarea projected into the group.' },
  ];
}
