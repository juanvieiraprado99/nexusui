import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/components/checkbox';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-checkbox-doc-page',
  imports: [CheckboxComponent, ReactiveFormsModule, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Checkbox</h1>
          <p class="mt-2 text-muted-foreground">A checkbox input with label, indeterminate state, and form integration.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex flex-col gap-3">
              <n-checkbox nLabel="Accept terms and conditions" [(nChecked)]="checked" />
              <p class="text-xs text-muted-foreground">Checked: {{ checked() }}</p>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add checkbox" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">checkbox.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">checkbox.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/checkbox/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">injectFormControl</code> utils exist in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/</code>.</li>
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
              <div class="flex flex-col gap-3">
                <n-checkbox nSize="sm" nLabel="Small" />
                <n-checkbox nLabel="Default" />
                <n-checkbox nSize="lg" nLabel="Large" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Indeterminate</h3>
          <div class="mt-3">
            <app-example title="nIndeterminate" [code]="indeterminateCode">
              <n-checkbox nLabel="Partially selected" [nIndeterminate]="true" />
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With hint and error</h3>
          <div class="mt-3">
            <app-example title="nHint / nError" [code]="hintErrorCode">
              <div class="flex flex-col gap-4">
                <n-checkbox nLabel="Subscribe to newsletter" nHint="We'll send weekly updates." />
                <n-checkbox nLabel="Accept terms" nError="You must accept the terms to continue." />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="flex flex-col gap-3">
                <n-checkbox nLabel="Disabled unchecked" [nDisabled]="true" />
                <n-checkbox nLabel="Disabled checked" [nChecked]="true" [nDisabled]="true" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With label</h3>
          <div class="mt-3">
            <app-example title="nLabel / nHint / nError" [code]="withLabelCode">
              <div class="flex flex-col gap-4">
                <n-checkbox nLabel="Subscribe to newsletter" nHint="We'll send you weekly updates." />
                <n-checkbox nLabel="I agree to the terms of service" [nRequired]="true" />
                <n-checkbox nLabel="Enable notifications" nError="You must enable notifications to continue." />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="withFormCode">
              <form [formGroup]="termsForm" (ngSubmit)="submitTerms()" class="flex flex-col gap-4 w-72">
                <n-checkbox
                  formControlName="terms"
                  nLabel="I accept the terms and conditions"
                  [nRequired]="true"
                  [nError]="termsError()"
                />
                <n-checkbox
                  formControlName="marketing"
                  nLabel="Send me product updates"
                  nHint="Optional — unsubscribe any time."
                />
                <button type="submit" class="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Submit</button>
                @if (termsSubmitted()) {
                  <p class="text-sm text-muted-foreground">
                    Terms: {{ termsForm.value.terms }} — Marketing: {{ termsForm.value.marketing }}
                  </p>
                }
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
  `,
})
export class CheckboxDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly checked = signal(false);
  protected readonly termsForm = new FormGroup({
    terms: new FormControl(false, Validators.requiredTrue),
    marketing: new FormControl(false),
  });
  protected readonly termsSubmitted = signal(false);

  protected termsError(): string | null {
    const ctrl = this.termsForm.get('terms');
    if (ctrl?.invalid && (ctrl.touched || this.termsSubmitted())) return 'You must accept the terms.';
    return null;
  }

  protected submitTerms(): void {
    this.termsSubmitted.set(true);
    this.termsForm.markAllAsTouched();
  }

  protected readonly defaultCode = `checked = signal(false);
// template
<n-checkbox nLabel="Accept terms and conditions" [(nChecked)]="checked" />`;

  protected readonly sizesCode = `<n-checkbox nSize="sm" nLabel="Small" />
<n-checkbox nLabel="Default" />
<n-checkbox nSize="lg" nLabel="Large" />`;

  protected readonly indeterminateCode = `<n-checkbox nLabel="Partially selected" [nIndeterminate]="true" />`;

  protected readonly hintErrorCode = `<n-checkbox nLabel="Subscribe to newsletter" nHint="We'll send weekly updates." />
<n-checkbox nLabel="Accept terms" nError="You must accept the terms to continue." />`;

  protected readonly disabledCode = `<n-checkbox nLabel="Disabled unchecked" [nDisabled]="true" />
<n-checkbox nLabel="Disabled checked" [nChecked]="true" [nDisabled]="true" />`;
  protected readonly withLabelCode = `<n-checkbox nLabel="Subscribe to newsletter" nHint="We'll send you weekly updates." />
<n-checkbox nLabel="I agree to the terms of service" [nRequired]="true" />
<n-checkbox nLabel="Enable notifications" nError="You must enable notifications to continue." />`;
  protected readonly withFormCode = `termsForm = new FormGroup({
  terms: new FormControl(false, Validators.requiredTrue),
  marketing: new FormControl(false),
});
// template
<form [formGroup]="termsForm">
  <n-checkbox formControlName="terms" nLabel="I accept the terms and conditions" [nRequired]="true" />
  <n-checkbox formControlName="marketing" nLabel="Send me product updates" nHint="Optional." />
</form>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { CheckboxComponent } from './shared/components/checkbox';

@Component({
  selector: 'app-my-page',
  imports: [CheckboxComponent],
  template: \`<n-checkbox nLabel="Agree" [(nChecked)]="agreed" />\`,
})
export class MyPage {
  agreed = signal(false);
}`;

  protected readonly usageCode = `<n-checkbox
  nLabel="Accept terms and conditions"
  nRequired
  [(nChecked)]="agreed"
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nChecked', type: 'boolean (model)', default: 'false', description: 'Two-way bindable checked state.' },
    { prop: 'nIndeterminate', type: 'boolean', default: 'false', description: 'Shows a dash icon for partially-selected states.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of the checkbox.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label text displayed beside the checkbox.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the checkbox.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message shown below the checkbox.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the checkbox as required.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
    { prop: '(nChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted on change with the new checked value.' },
    { prop: '(nBlur)', type: 'EventEmitter<FocusEvent>', default: '—', description: 'Emitted when the checkbox loses focus.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the wrapper.' },
  ];
}
