import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from '../../../shared/components/switch';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-switch-doc-page',
  imports: [SwitchComponent, ReactiveFormsModule, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Switch</h1>
          <p class="mt-2 text-muted-foreground">A toggle control that switches between on and off states. Supports colors, icons, labels, and form integration.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-switch [(nChecked)]="enabled" nLabel="Enable notifications" />
            <p class="mt-3 text-xs text-muted-foreground">Enabled: {{ enabled() }}</p>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add switch" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">switch.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">switch.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/switch/</code>.</li>
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
              <div class="flex items-center gap-6">
                <n-switch nSize="sm"      nLabel="Small"   [nChecked]="true" />
                <n-switch nSize="default" nLabel="Default" [nChecked]="true" />
                <n-switch nSize="lg"      nLabel="Large"   [nChecked]="true" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Colors</h3>
          <div class="mt-3">
            <app-example title="nColor: default | success | danger | warning" [code]="colorsCode">
              <div class="flex flex-col gap-3">
                <n-switch nColor="default" nLabel="Default" [nChecked]="true" />
                <n-switch nColor="success" nLabel="Success" [nChecked]="true" />
                <n-switch nColor="danger"  nLabel="Danger"  [nChecked]="true" />
                <n-switch nColor="warning" nLabel="Warning" [nChecked]="true" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With icons</h3>
          <div class="mt-3">
            <app-example title="nIconOn / nIconOff content projection" [code]="iconsCode">
              <div class="flex items-center gap-6">
                <n-switch [(nChecked)]="darkMode" nLabel="Dark mode">
                  <svg nIconOff class="size-3 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                  </svg>
                  <svg nIconOn class="size-3 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                </n-switch>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading</h3>
          <div class="mt-3">
            <app-example title="nLoading" [code]="loadingCode">
              <div class="flex items-center gap-6">
                <n-switch nLabel="Loading off" [nLoading]="true" />
                <n-switch nLabel="Loading on" [nLoading]="true" [nChecked]="true" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Label inside track</h3>
          <div class="mt-3">
            <app-example title="nShowTrackLabel" [code]="trackLabelCode">
              <div class="flex items-center gap-6">
                <n-switch [nShowTrackLabel]="true" [(nChecked)]="trackEnabled" nTrackLabelOn="ON" nTrackLabelOff="OFF" nLabel="Track label" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="flex items-center gap-6">
                <n-switch nLabel="Disabled off" [nDisabled]="true" />
                <n-switch nLabel="Disabled on" [nDisabled]="true" [nChecked]="true" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With hint and error</h3>
          <div class="mt-3">
            <app-example title="nHint / nError" [code]="hintErrorCode">
              <div class="flex flex-col gap-4">
                <n-switch nLabel="Marketing emails" nHint="You can unsubscribe at any time." />
                <n-switch nLabel="Required setting" nError="This setting must be enabled to continue." />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="withFormCode">
              <form [formGroup]="settingsForm" (ngSubmit)="submitSettings()" class="flex flex-col gap-4 w-72">
                <n-switch formControlName="notifications" nLabel="Enable notifications" nHint="Receive alerts about account activity." />
                <n-switch formControlName="marketing" nLabel="Marketing emails" nHint="Optional — unsubscribe any time." />
                <button type="submit" class="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save settings</button>
                @if (formSubmitted()) {
                  <p class="text-sm text-muted-foreground">
                    Notifications: {{ settingsForm.value.notifications }} — Marketing: {{ settingsForm.value.marketing }}
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
export class SwitchDocPage {
  protected readonly installTab   = signal<'cli' | 'manual'>('cli');
  protected readonly enabled      = signal(false);
  protected readonly darkMode     = signal(false);
  protected readonly trackEnabled = signal(false);
  protected readonly formSubmitted = signal(false);

  protected readonly settingsForm = new FormGroup({
    notifications: new FormControl(false),
    marketing: new FormControl(false),
  });

  protected submitSettings(): void {
    this.formSubmitted.set(true);
  }

  protected readonly defaultCode = `enabled = signal(false);
// template
<n-switch [(nChecked)]="enabled" nLabel="Enable notifications" />`;

  protected readonly sizesCode = `<n-switch nSize="sm"      nLabel="Small"   [nChecked]="true" />
<n-switch nSize="default" nLabel="Default" [nChecked]="true" />
<n-switch nSize="lg"      nLabel="Large"   [nChecked]="true" />`;

  protected readonly colorsCode = `<n-switch nColor="default" nLabel="Default" [nChecked]="true" />
<n-switch nColor="success" nLabel="Success" [nChecked]="true" />
<n-switch nColor="danger"  nLabel="Danger"  [nChecked]="true" />
<n-switch nColor="warning" nLabel="Warning" [nChecked]="true" />`;

  protected readonly iconsCode = `darkMode = signal(false);
// template
<n-switch [(nChecked)]="darkMode" nLabel="Dark mode">
  <!-- shown when off -->
  <svg nIconOff class="size-3" ...>...</svg>
  <!-- shown when on -->
  <svg nIconOn class="size-3" ...>...</svg>
</n-switch>`;

  protected readonly loadingCode = `<n-switch nLabel="Loading off" [nLoading]="true" />
<n-switch nLabel="Loading on" [nLoading]="true" [nChecked]="true" />`;

  protected readonly trackLabelCode = `trackEnabled = signal(false);
// template
<n-switch
  [nShowTrackLabel]="true"
  [(nChecked)]="trackEnabled"
  nTrackLabelOn="ON"
  nTrackLabelOff="OFF"
  nLabel="Track label"
/>`;

  protected readonly disabledCode = `<n-switch nLabel="Disabled off" [nDisabled]="true" />
<n-switch nLabel="Disabled on" [nDisabled]="true" [nChecked]="true" />`;

  protected readonly hintErrorCode = `<n-switch nLabel="Marketing emails" nHint="You can unsubscribe at any time." />
<n-switch nLabel="Required setting" nError="This setting must be enabled to continue." />`;

  protected readonly withFormCode = `settingsForm = new FormGroup({
  notifications: new FormControl(false),
  marketing: new FormControl(false),
});
// template
<form [formGroup]="settingsForm">
  <n-switch formControlName="notifications" nLabel="Enable notifications" />
  <n-switch formControlName="marketing" nLabel="Marketing emails" />
</form>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { SwitchComponent } from './shared/components/switch';

@Component({
  selector: 'app-my-page',
  imports: [SwitchComponent],
  template: \`<n-switch [(nChecked)]="enabled" nLabel="Enable" />\`,
})
export class MyPage {
  enabled = signal(false);
}`;

  protected readonly usageCode = `<n-switch
  [(nChecked)]="enabled"
  nLabel="Enable feature"
  nHint="This can be changed later."
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nChecked', type: 'boolean (model)', default: 'false', description: 'Two-way bindable checked state.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of the switch track and thumb.' },
    { prop: 'nColor', type: "'default' | 'success' | 'danger' | 'warning'", default: "'default'", description: 'Color of the track when checked.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label text displayed beside the switch.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the switch.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the switch as required.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message shown below the switch.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the switch.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows a spinner in the thumb and disables interaction.' },
    { prop: 'nShowTrackLabel', type: 'boolean', default: 'false', description: 'Shows ON/OFF text inside the track.' },
    { prop: 'nTrackLabelOn', type: 'string', default: "'ON'", description: 'Label shown inside track when checked.' },
    { prop: 'nTrackLabelOff', type: 'string', default: "'OFF'", description: 'Label shown inside track when unchecked.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Custom id for the button element (auto-generated if omitted).' },
    { prop: 'nAriaLabel', type: 'string', default: "''", description: 'Accessible label when no visible label is provided.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the wrapper.' },
    { prop: '(nChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted on toggle with the new checked value.' },
    { prop: '(nBlur)', type: 'EventEmitter<FocusEvent>', default: '—', description: 'Emitted when the switch loses focus.' },
  ];
}
