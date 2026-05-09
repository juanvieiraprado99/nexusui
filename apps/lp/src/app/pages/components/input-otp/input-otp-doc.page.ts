import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpComponent } from '../../../shared/components/input-otp';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-input-otp-doc-page',
  imports: [InputOtpComponent, ReactiveFormsModule, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Input OTP</h1>
          <p class="mt-2 text-muted-foreground">A one-time password input with individual character slots, auto-advance, paste support, and reactive forms integration.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex flex-col items-center gap-3">
              <n-input-otp nLabel="Verification Code" nHint="Enter the 6-digit code sent to your phone." [(nValue)]="otpValue" />
              <p class="text-sm text-muted-foreground">Value: <span class="font-medium text-foreground">{{ otpValue() || '——' }}</span></p>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add input-otp" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input-otp.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">input-otp.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/input-otp/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">injectFormControl</code> exist in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/</code>.</li>
                  <li class="pt-3">Ensure the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">label</code> component exists in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/label/</code>.</li>
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
              <div class="flex flex-col gap-4">
                <n-input-otp nSize="sm"  nLabel="Small"   [nLength]="6" />
                <n-input-otp             nLabel="Default" [nLength]="6" />
                <n-input-otp nSize="lg"  nLabel="Large"   [nLength]="6" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Masked (PIN)</h3>
          <div class="mt-3">
            <app-example title="nMask" [code]="maskedCode">
              <n-input-otp [nMask]="true" [nLength]="4" nPattern="numeric" nLabel="PIN" nHint="Your PIN is hidden for security." />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With separator</h3>
          <div class="mt-3">
            <app-example title="nSeparatorIndex" [code]="separatorCode">
              <div class="flex flex-col gap-4">
                <n-input-otp [nLength]="6" [nSeparatorIndex]="3" nLabel="3 + 3 groups" />
                <n-input-otp [nLength]="8" [nSeparatorIndex]="4" nLabel="4 + 4 groups" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Auto-submit</h3>
          <div class="mt-3">
            <app-example title="(nComplete)" [code]="autoSubmitCode">
              <div class="flex flex-col gap-3">
                <n-input-otp
                  nLabel="Auto-submit OTP"
                  nHint="Submits automatically when all 6 digits are entered."
                  [nLength]="6"
                  (nComplete)="result.set($event)"
                />
                @if (result()) {
                  <p class="text-sm font-medium text-green-600 dark:text-green-400">Submitted: {{ result() }}</p>
                }
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Error state</h3>
          <div class="mt-3">
            <app-example title="nError" [code]="errorCode">
              <n-input-otp nLabel="Verification Code" [nLength]="6" nError="Invalid code. Please try again." />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <n-input-otp nLabel="Verification Code" [nLength]="6" [nDisabled]="true" />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="withFormCode">
              <form [formGroup]="otpForm" (ngSubmit)="otpSubmitted.set(true); otpForm.markAllAsTouched()" class="flex flex-col gap-4">
                <n-input-otp
                  formControlName="otp"
                  nLabel="Verification Code"
                  [nLength]="6"
                  [nRequired]="true"
                  [nError]="otpForm.controls['otp'].touched && otpForm.controls['otp'].invalid ? 'Please enter the complete 6-digit code.' : null"
                />
                <button
                  type="submit"
                  class="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Verify
                </button>
                @if (otpSubmitted() && otpForm.valid) {
                  <p class="text-sm text-muted-foreground">Submitted: <span class="font-medium text-foreground">{{ otpForm.value.otp }}</span></p>
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
export class InputOtpDocPage {
  protected readonly installTab  = signal<'cli' | 'manual'>('cli');
  protected readonly otpValue    = signal('');
  protected readonly result      = signal('');
  protected readonly otpSubmitted = signal(false);
  protected readonly otpForm = new FormGroup({
    otp: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  protected readonly defaultCode = `<n-input-otp nLabel="Verification Code" nHint="Enter the 6-digit code sent to your phone." [(nValue)]="otpValue" />`;

  protected readonly sizesCode = `<n-input-otp nSize="sm"  nLabel="Small"   [nLength]="6" />
<n-input-otp             nLabel="Default" [nLength]="6" />
<n-input-otp nSize="lg"  nLabel="Large"   [nLength]="6" />`;

  protected readonly maskedCode = `<n-input-otp [nMask]="true" [nLength]="4" nPattern="numeric" nLabel="PIN" nHint="Your PIN is hidden for security." />`;

  protected readonly separatorCode = `<n-input-otp [nLength]="6" [nSeparatorIndex]="3" nLabel="3 + 3 groups" />
<n-input-otp [nLength]="8" [nSeparatorIndex]="4" nLabel="4 + 4 groups" />`;

  protected readonly autoSubmitCode = `<n-input-otp
  nLabel="Auto-submit OTP"
  [nLength]="6"
  (nComplete)="onComplete($event)"
/>
// component
protected onComplete(value: string): void {
  // verify the code automatically
}`;

  protected readonly errorCode = `<n-input-otp nLabel="Verification Code" [nLength]="6" nError="Invalid code. Please try again." />`;

  protected readonly disabledCode = `<n-input-otp nLabel="Verification Code" [nLength]="6" [nDisabled]="true" />`;

  protected readonly withFormCode = `otpForm = new FormGroup({
  otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
});
// template
<n-input-otp
  formControlName="otp"
  nLabel="Verification Code"
  [nLength]="6"
  [nRequired]="true"
  [nError]="otpForm.controls['otp'].touched && otpForm.controls['otp'].invalid ? 'Please enter the complete 6-digit code.' : null"
/>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { InputOtpComponent } from './shared/components/input-otp';

@Component({
  selector: 'app-my-page',
  imports: [InputOtpComponent],
  template: \`<n-input-otp [nLength]="6" [(nValue)]="code" />\`,
})
export class MyPage {
  code = signal('');
}`;

  protected readonly usageCode = `<n-input-otp
  nLabel="Verification Code"
  nHint="Enter the 6-digit code sent to your phone."
  [nLength]="6"
  nPattern="numeric"
  [(nValue)]="code"
  (nComplete)="verify($event)"
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nValue', type: 'string (model)', default: "''", description: 'Two-way bindable OTP string. Use with [(nValue)].' },
    { prop: 'nLength', type: 'number', default: '6', description: 'Number of character slots.' },
    { prop: 'nPattern', type: "'numeric' | 'alpha' | 'alphanumeric'", default: "'numeric'", description: 'Allowed character set per slot.' },
    { prop: 'nMask', type: 'boolean', default: 'false', description: 'Show slots as password dots (PIN mode).' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size variant for each slot.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables all slots.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message shown below slots. Sets aria-invalid on all slots.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below slots when no error.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label text linked to the first slot.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Override the auto-generated ID for SSR stability.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the root wrapper.' },
    { prop: 'nSeparatorIndex', type: 'number | null', default: 'null', description: 'Slot index before which a separator is shown (e.g. 3 gives 3+3 groups).' },
    { prop: 'nAutofocus', type: 'boolean', default: 'false', description: 'Focus first slot after render.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
    { prop: 'nAriaLabel', type: 'string', default: "''", description: 'aria-label on the slot group when no nLabel is provided.' },
    { prop: '(nComplete)', type: 'EventEmitter<string>', default: '—', description: 'Emits the full OTP string when all slots are filled.' },
    { prop: '(nChange)', type: 'EventEmitter<string>', default: '—', description: 'Emits on any slot value change.' },
  ];
}
