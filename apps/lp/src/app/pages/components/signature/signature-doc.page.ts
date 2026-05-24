import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignatureComponent } from '../../../shared/components/signature';
import type { SignatureOutputFormat } from '../../../shared/components/signature';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-signature-doc-page',
  imports: [SignatureComponent, ReactiveFormsModule, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Signature</h1>
          <p class="mt-2 text-muted-foreground">
            Canvas-based signature pad with mouse and touch support. Works inside Angular reactive forms.
          </p>
        </header>

        <!-- Default example -->
        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-signature nLabel="Assinatura" nHint="Assine com o mouse ou dedo" [(nValue)]="value" />
          </app-example>
        </div>

        <!-- Installation -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')" class="rounded-md px-3 py-1 text-xs font-medium transition-colors" [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'" [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')" class="rounded-md px-3 py-1 text-xs font-medium transition-colors" [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'" [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli@alpha add signature" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">signature.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">signature.types.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/signature/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">injectFormControl</code> utils exist in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <!-- Reactive form example -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>
          <div class="mt-4 space-y-6">
            <app-example title="With Reactive Form" [code]="formCode">
              <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <n-signature
                  formControlName="signature"
                  nLabel="Assinatura"
                  [nRequired]="true"
                  nHint="Campo obrigatório para confirmar o contrato"
                  [nError]="form.controls.signature.touched && form.controls.signature.invalid ? 'Assinatura é obrigatória' : null"
                />
                <button
                  type="submit"
                  class="self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Confirmar
                </button>
                @if (submitted()) {
                  <p class="text-sm" [class]="form.valid ? 'text-green-600 dark:text-green-400' : 'text-destructive'">
                    {{ form.valid ? 'Formulário enviado!' : 'Preencha os campos obrigatórios.' }}
                  </p>
                }
              </form>
            </app-example>

            <app-example title="Output Formats" [code]="formatsCode">
              <div class="flex flex-col gap-4">
                <div class="flex gap-2">
                  @for (fmt of formats; track fmt) {
                    <button
                      type="button"
                      (click)="activeFormat.set(fmt)"
                      class="rounded-md px-3 py-1.5 text-xs font-medium transition-colors border"
                      [class]="activeFormat() === fmt ? 'bg-primary text-primary-foreground border-primary' : 'border-input bg-background text-muted-foreground hover:bg-accent'"
                    >
                      {{ fmt }}
                    </button>
                  }
                </div>
                <n-signature
                  nLabel="Assinatura"
                  [nOutputFormat]="activeFormat()"
                  [(nValue)]="formatValue"
                />
                @if (formatValue()) {
                  <div class="rounded-md border border-input bg-muted/40 p-3">
                    <p class="mb-1 text-xs font-medium text-muted-foreground">Output ({{ activeFormat() }}):</p>
                    <pre class="text-xs text-foreground break-all whitespace-pre-wrap font-mono">{{ formatValue().slice(0, 200) }}{{ formatValue().length > 200 ? '…' : '' }}</pre>
                  </div>
                }
              </div>
            </app-example>

            <app-example title="Custom Colors" [code]="colorsCode">
              <n-signature
                nLabel="Assinatura"
                nStrokeColor="#1d4ed8"
                [nStrokeWidth]="3"
                nBackgroundColor="#f8fafc"
              />
            </app-example>

            <app-example title="Disabled" [code]="disabledCode">
              <n-signature nLabel="Assinatura" [nDisabled]="true" />
            </app-example>
          </div>
        </section>

        <!-- API -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API</h2>
          <div class="mt-4 overflow-hidden rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/50">
                <tr>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Prop</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Type</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Default</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border/60">
                @for (row of apiRows; track row.prop) {
                  <tr class="hover:bg-muted/30 transition-colors">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-xs text-muted-foreground">{{ row.description }}</td>
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
export class SignatureDocPage {
  protected readonly installTab  = signal<'cli' | 'manual'>('cli');
  protected readonly submitted   = signal(false);
  protected readonly value       = signal('');
  protected readonly formatValue = signal('');
  protected readonly activeFormat = signal<SignatureOutputFormat>('base64-png');
  protected readonly formats: SignatureOutputFormat[] = ['base64-png', 'base64-svg', 'svg'];

  readonly form = new FormGroup({
    signature: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
  }

  protected readonly importCode = `import { SignatureComponent } from '@/shared/components/signature';`;

  protected readonly usageCode = `<n-signature nLabel="Assinatura" [(nValue)]="sig" />`;

  protected readonly defaultCode = `<n-signature
  nLabel="Assinatura"
  nHint="Assine com o mouse ou dedo"
  [(nValue)]="value"
/>`;

  protected readonly formCode = `form = new FormGroup({
  signature: new FormControl('', Validators.required),
});

// template
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <n-signature
    formControlName="signature"
    nLabel="Assinatura"
    [nRequired]="true"
    nHint="Campo obrigatório"
    [nError]="form.controls.signature.touched && form.controls.signature.invalid
      ? 'Assinatura é obrigatória'
      : null"
  />
  <button type="submit">Confirmar</button>
</form>`;

  protected readonly formatsCode = `<!-- base64-png (default) — raster, stores as PNG data URL -->
<n-signature nOutputFormat="base64-png" [(nValue)]="sig" />

<!-- base64-svg — vector, stores as SVG data URL -->
<n-signature nOutputFormat="base64-svg" [(nValue)]="sig" />

<!-- svg — raw SVG markup string -->
<n-signature nOutputFormat="svg" [(nValue)]="sig" />`;

  protected readonly colorsCode = `<n-signature
  nStrokeColor="#1d4ed8"
  [nStrokeWidth]="3"
  nBackgroundColor="#f8fafc"
/>`;

  protected readonly disabledCode = `<n-signature nLabel="Assinatura" [nDisabled]="true" />`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nWidth', type: 'number', default: '400', description: 'Canvas width in px' },
    { prop: 'nHeight', type: 'number', default: '200', description: 'Canvas height in px' },
    { prop: 'nStrokeColor', type: 'string', default: "'#000000'", description: 'Pen color' },
    { prop: 'nStrokeWidth', type: 'number', default: '2', description: 'Pen thickness in px' },
    { prop: 'nBackgroundColor', type: 'string', default: "'transparent'", description: 'Canvas background color' },
    { prop: 'nOutputFormat', type: "SignatureOutputFormat", default: "'base64-png'", description: "Output format: 'base64-png', 'base64-svg', or 'svg'" },
    { prop: 'nPlaceholder', type: 'string', default: "'Assine aqui'", description: 'Watermark text shown when empty' },
    { prop: 'nClearLabel', type: 'string', default: "'Limpar'", description: 'Label for the clear button' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label text above the canvas' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables drawing' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks field as required' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message below the canvas' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Hint text below the canvas' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra CSS classes on the root wrapper' },
    { prop: 'nId', type: 'string', default: "''", description: 'Override the auto-generated element ID' },
    { prop: 'nAriaLabel', type: 'string', default: "''", description: 'aria-label when no visible label is used' },
    { prop: 'nValue', type: 'model<string>', default: "''", description: 'Two-way binding for the output value' },
    { prop: 'nChange', type: 'output<string>', default: '—', description: 'Emitted on stroke end and clear' },
    { prop: 'nBegin', type: 'output<void>', default: '—', description: 'Emitted when drawing starts' },
    { prop: 'nEnd', type: 'output<void>', default: '—', description: 'Emitted when a stroke ends' },
    { prop: 'nClear', type: 'output<void>', default: '—', description: 'Emitted when canvas is cleared' },
  ];
}
