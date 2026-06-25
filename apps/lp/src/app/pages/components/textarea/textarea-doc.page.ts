import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { TextareaComponent } from '../../../shared/components/textarea';
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
  selector: 'app-textarea-doc-page',
  imports: [TextareaComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Textarea</h1>
          <p class="mt-2 text-muted-foreground">A multi-line text input with auto-resize, character count, label, and reactive form support.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full max-w-sm">
              <n-textarea
                [(nValue)]="textValue"
                nLabel="Message"
                nPlaceholder="Type your message…"
                nHint="Be concise and clear."
              />
            </div>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'cli'"
                (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'"
                [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'"
              >CLI</button>
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'manual'"
                (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'"
                [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'"
              >Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add textarea" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5">
                      <app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" />
                    </div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">textarea.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">textarea.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/textarea/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">injectFormControl</code> exists at <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/form-control.ts</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">LabelComponent</code> at <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/label/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="w-full max-w-sm">
                <n-textarea
                  [(nValue)]="disabledValue"
                  nLabel="Notes (read-only)"
                  [nDisabled]="true"
                />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: sm | default | lg" [code]="sizesCode">
              <div class="w-full max-w-sm space-y-4">
                <n-textarea nSize="sm" nLabel="Small" nPlaceholder="Small textarea…" />
                <n-textarea nLabel="Default" nPlaceholder="Default textarea…" />
                <n-textarea nSize="lg" nLabel="Large" nPlaceholder="Large textarea…" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Auto-resize</h3>
          <div class="mt-3">
            <app-example title="nAutoResize + nMinRows + nMaxRows" [code]="autoResizeCode">
              <div class="w-full max-w-sm">
                <n-textarea
                  [(nValue)]="autoResizeValue"
                  nLabel="Comment"
                  nPlaceholder="Type to expand…"
                  [nAutoResize]="true"
                  [nMinRows]="2"
                  [nMaxRows]="6"
                />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Character count</h3>
          <div class="mt-3">
            <app-example title="nCharCount + nMaxLength" [code]="charCountCode">
              <div class="w-full max-w-sm">
                <n-textarea
                  [(nValue)]="charCountValue"
                  nLabel="Bio"
                  nPlaceholder="Tell us about yourself…"
                  [nCharCount]="true"
                  [nMaxLength]="140"
                />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Resize modes</h3>
          <div class="mt-3">
            <app-example title="nResize: none | vertical | horizontal | both" [code]="resizeCode">
              <div class="w-full max-w-sm space-y-4">
                <n-textarea nResize="none" nLabel="No resize" nPlaceholder="resize: none" />
                <n-textarea nResize="vertical" nLabel="Vertical" nPlaceholder="resize: vertical (default)" />
                <n-textarea nResize="horizontal" nLabel="Horizontal" nPlaceholder="resize: horizontal" />
                <n-textarea nResize="both" nLabel="Both" nPlaceholder="resize: both" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Error state</h3>
          <div class="mt-3">
            <app-example title="nError" [code]="errorCode">
              <div class="w-full max-w-sm">
                <n-textarea
                  nLabel="Description"
                  nPlaceholder="Describe the issue…"
                  nError="This field is required."
                />
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
export class TextareaDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly textValue        = signal('');
  protected readonly disabledValue    = signal('This field is disabled.');
  protected readonly autoResizeValue  = signal('');
  protected readonly charCountValue   = signal('');

  protected readonly defaultCode = `<n-textarea
  [(nValue)]="message"
  nLabel="Message"
  nPlaceholder="Type your message…"
  nHint="Be concise and clear."
/>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { TextareaComponent } from './shared/components/textarea';

@Component({
  selector: 'app-my-page',
  imports: [TextareaComponent],
  template: \`<n-textarea [(nValue)]="value" nLabel="Description" />\`,
})
export class MyPage {
  value = signal('');
}`;

  protected readonly usageCode = `<n-textarea
  [(nValue)]="value"
  nLabel="Description"
  nPlaceholder="Enter a description…"
  nHint="Max 500 characters."
/>`;

  protected readonly disabledCode = `<n-textarea
  [(nValue)]="value"
  nLabel="Notes (read-only)"
  [nDisabled]="true"
/>`;

  protected readonly sizesCode = `<n-textarea nSize="sm" nLabel="Small" />
<n-textarea nLabel="Default" />
<n-textarea nSize="lg" nLabel="Large" />`;

  protected readonly autoResizeCode = `<n-textarea
  [(nValue)]="value"
  nLabel="Comment"
  nPlaceholder="Type to expand…"
  [nAutoResize]="true"
  [nMinRows]="2"
  [nMaxRows]="6"
/>`;

  protected readonly charCountCode = `<n-textarea
  [(nValue)]="bio"
  nLabel="Bio"
  [nCharCount]="true"
  [nMaxLength]="140"
/>`;

  protected readonly resizeCode = `<n-textarea nResize="none" nLabel="No resize" />
<n-textarea nResize="vertical" nLabel="Vertical (default)" />
<n-textarea nResize="horizontal" nLabel="Horizontal" />
<n-textarea nResize="both" nLabel="Both" />`;

  protected readonly errorCode = `<n-textarea
  nLabel="Description"
  nError="This field is required."
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Visual size of the textarea.' },
    { prop: 'nResize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'CSS resize behavior. Ignored when nAutoResize is true.' },
    { prop: 'nRows', type: 'number', default: '3', description: 'Fixed row count when auto-resize is off.' },
    { prop: 'nAutoResize', type: 'boolean', default: 'false', description: 'Grows the textarea as the user types.' },
    { prop: 'nMinRows', type: 'number', default: '3', description: 'Minimum row height when auto-resize is active.' },
    { prop: 'nMaxRows', type: 'number', default: '0', description: 'Maximum row height when auto-resize is active (0 = unlimited).' },
    { prop: 'nMaxLength', type: 'number', default: '0', description: 'Native maxlength attribute (0 = no limit).' },
    { prop: 'nCharCount', type: 'boolean', default: 'false', description: 'Shows a character counter below the textarea.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label text rendered above the textarea.' },
    { prop: 'nPlaceholder', type: 'string', default: "''", description: 'Placeholder text.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown when no error.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message. Hides hint when set.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
    { prop: 'nReadonly', type: 'boolean', default: 'false', description: 'Renders the textarea read-only (still focusable and submitted in forms).' },
    { prop: 'nValue', type: 'string (model)', default: "''", description: 'Two-way bindable value via [(nValue)].' },
    { prop: '(nChange)', type: 'EventEmitter<string>', default: '—', description: 'Emitted on each input event.' },
    { prop: '(nBlur)', type: 'EventEmitter<FocusEvent>', default: '—', description: 'Emitted when the textarea loses focus.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the wrapper.' },
  ];
}
