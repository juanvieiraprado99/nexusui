import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-input-doc-page',
  imports: [InputComponent, ReactiveFormsModule, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Input</h1>
          <p class="mt-2 text-muted-foreground">A text input field with label, hint, error, and loading states.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full max-w-sm">
              <n-input nLabel="Email" nPlaceholder="you@example.com" nType="email" [(nValue)]="emailValue" />
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
                <app-code-block code="npx @nexuslabs/cli@alpha add input" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/input/</code>.</li>
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
              <div class="flex flex-col gap-3 w-full max-w-sm">
                <n-input nSize="sm" nPlaceholder="Small" />
                <n-input nPlaceholder="Default" />
                <n-input nSize="lg" nPlaceholder="Large" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With hint</h3>
          <div class="mt-3">
            <app-example title="nHint" [code]="hintCode">
              <div class="w-full max-w-sm">
                <n-input nLabel="Username" nPlaceholder="johndoe" nHint="Must be at least 3 characters." />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Error state</h3>
          <div class="mt-3">
            <app-example title="nError" [code]="errorCode">
              <div class="w-full max-w-sm">
                <n-input nLabel="Email" nPlaceholder="you@example.com" nError="Please enter a valid email address." />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading</h3>
          <div class="mt-3">
            <app-example title="nLoading" [code]="loadingCode">
              <div class="w-full max-w-sm">
                <n-input nLabel="Search" nPlaceholder="Searching..." [nLoading]="true" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="w-full max-w-sm">
                <n-input nLabel="Read only" nPlaceholder="Disabled" [nDisabled]="true" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With label</h3>
          <div class="mt-3">
            <app-example title="nLabel / nHint / nRequired" [code]="withLabelCode">
              <div class="flex w-full max-w-sm flex-col gap-4">
                <n-input nLabel="Username" nPlaceholder="johndoe" [nRequired]="true" />
                <n-input nLabel="Email" nType="email" nPlaceholder="name@example.com" nHint="We'll never share your email." />
                <n-input nLabel="Password" nType="password" nPlaceholder="••••••••" [nRequired]="true" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="withFormCode">
              <form [formGroup]="emailForm" class="flex w-full max-w-sm flex-col gap-4">
                <n-input
                  formControlName="email"
                  nLabel="Email"
                  nPlaceholder="you@example.com"
                  [nRequired]="true"
                  nHint="We'll use this for your receipt."
                  [nError]="emailForm.controls['email'].touched && emailForm.controls['email'].invalid ? 'Enter a valid email.' : null"
                />
                <p class="text-sm text-muted-foreground">Value: {{ emailForm.controls['email'].value || 'empty' }}</p>
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
export class InputDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly emailValue = signal('');
  protected readonly emailForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  protected readonly defaultCode = `<n-input nLabel="Email" nPlaceholder="you@example.com" nType="email" [(nValue)]="emailValue" />`;
  protected readonly sizesCode = `<n-input nSize="sm" nPlaceholder="Small" />
<n-input nPlaceholder="Default" />
<n-input nSize="lg" nPlaceholder="Large" />`;
  protected readonly hintCode = `<n-input nLabel="Username" nPlaceholder="johndoe" nHint="Must be at least 3 characters." />`;
  protected readonly errorCode = `<n-input nLabel="Email" nPlaceholder="you@example.com" nError="Please enter a valid email address." />`;
  protected readonly loadingCode = `<n-input nLabel="Search" nPlaceholder="Searching..." [nLoading]="true" />`;
  protected readonly disabledCode = `<n-input nLabel="Read only" nPlaceholder="Disabled" [nDisabled]="true" />`;
  protected readonly withLabelCode = `<n-input nLabel="Username" nPlaceholder="johndoe" [nRequired]="true" />
<n-input nLabel="Email" nType="email" nPlaceholder="name@example.com" nHint="We'll never share your email." />
<n-input nLabel="Password" nType="password" nPlaceholder="••••••••" [nRequired]="true" />`;
  protected readonly withFormCode = `emailForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
});
// template
<n-input
  formControlName="email"
  nLabel="Email"
  nPlaceholder="you@example.com"
  [nRequired]="true"
  nHint="We'll use this for your receipt."
  [nError]="emailForm.controls['email'].touched && emailForm.controls['email'].invalid ? 'Enter a valid email.' : null"
/>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { InputComponent } from './shared/components/input';

@Component({
  selector: 'app-my-page',
  imports: [InputComponent],
  template: \`<n-input nLabel="Name" [(nValue)]="name" />\`,
})
export class MyPage {
  name = signal('');
}`;

  protected readonly usageCode = `<n-input
  nLabel="Email"
  nPlaceholder="you@example.com"
  nType="email"
  nRequired
  [(nValue)]="email"
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of the input field.' },
    { prop: 'nType', type: "'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'", default: "'text'", description: 'Native input type.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label text rendered above the input.' },
    { prop: 'nPlaceholder', type: 'string', default: "''", description: 'Placeholder text for the input.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the input when no error.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message shown below the input. Hides hint.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the input as required.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the input.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { prop: 'nValue', type: 'string (model)', default: "''", description: 'Two-way bindable value of the input.' },
    { prop: '(nChange)', type: 'EventEmitter<string>', default: '—', description: 'Emitted on each input event with the new value.' },
    { prop: '(nBlur)', type: 'EventEmitter<FocusEvent>', default: '—', description: 'Emitted when the input loses focus.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the wrapper element.' },
  ];
}
