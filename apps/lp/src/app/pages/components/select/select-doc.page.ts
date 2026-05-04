import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SelectComponent,
  SelectTriggerComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectGroupComponent,
} from '../../../shared/components/select';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-select-doc-page',
  imports: [
    SelectComponent, SelectTriggerComponent, SelectContentComponent,
    SelectItemComponent, SelectGroupComponent,
    ReactiveFormsModule,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Select</h1>
          <p class="mt-2 text-muted-foreground">A dropdown for selecting one or multiple values. Supports type-ahead search and groups.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full max-w-xs">
              <n-select nLabel="Country" [(nValue)]="country">
                <n-select-trigger nPlaceholder="Select a country..." />
                <n-select-content>
                  <n-select-item nValue="br">Brazil</n-select-item>
                  <n-select-item nValue="us">United States</n-select-item>
                  <n-select-item nValue="de">Germany</n-select-item>
                  <n-select-item nValue="jp">Japan</n-select-item>
                </n-select-content>
              </n-select>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add select" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge @angular/cdk" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">select/</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/select/</code>.</li>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">With groups</h3>
          <div class="mt-3">
            <app-example title="n-select-group" [code]="groupCode">
              <div class="w-full max-w-xs">
                <n-select nLabel="Framework" [(nValue)]="groupedVal">
                  <n-select-trigger nPlaceholder="Select a framework..." />
                  <n-select-content>
                    <n-select-group nLabel="Frontend">
                      <n-select-item nValue="angular">Angular</n-select-item>
                      <n-select-item nValue="react">React</n-select-item>
                      <n-select-item nValue="vue">Vue</n-select-item>
                    </n-select-group>
                    <n-select-group nLabel="Backend">
                      <n-select-item nValue="express">Express</n-select-item>
                      <n-select-item nValue="fastify">Fastify</n-select-item>
                    </n-select-group>
                  </n-select-content>
                </n-select>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Multi-select</h3>
          <div class="mt-3">
            <app-example title="nMultiple" [code]="multiCode">
              <div class="w-full max-w-xs">
                <n-select nLabel="Roles" [nMultiple]="true" [nClearable]="true" [(nValues)]="roles">
                  <n-select-trigger nPlaceholder="Select roles..." />
                  <n-select-content>
                    <n-select-item nValue="admin">Admin</n-select-item>
                    <n-select-item nValue="editor">Editor</n-select-item>
                    <n-select-item nValue="viewer">Viewer</n-select-item>
                  </n-select-content>
                </n-select>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading</h3>
          <div class="mt-3">
            <app-example title="nLoading" [code]="loadingCode">
              <div class="w-full max-w-xs">
                <n-select nLabel="Options" [nLoading]="true">
                  <n-select-trigger nPlaceholder="Loading..." />
                  <n-select-content>
                    <n-select-item nValue="a">Option A</n-select-item>
                  </n-select-content>
                </n-select>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Icons + Description</h3>
          <div class="mt-3">
            <app-example title="nDescription + icon-leading slot" [code]="withIconsCode">
              <div class="w-full max-w-xs">
                <n-select [(nValue)]="planVal">
                  <n-select-trigger nPlaceholder="Choose a plan" />
                  <n-select-content>
                    <n-select-item nValue="free" nLabel="Free" nDescription="Up to 3 projects, community support">
                      <svg data-slot="icon-leading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                    </n-select-item>
                    <n-select-item nValue="pro" nLabel="Pro" nDescription="Unlimited projects, priority support">
                      <svg data-slot="icon-leading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </n-select-item>
                    <n-select-item nValue="enterprise" nLabel="Enterprise" nDescription="Custom limits, SLA, dedicated support">
                      <svg data-slot="icon-leading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                    </n-select-item>
                  </n-select-content>
                </n-select>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Select All + Max</h3>
          <div class="mt-3">
            <app-example title="nSelectAll / nMaxSelections" [code]="selectAllCode">
              <div class="w-full max-w-xs">
                <n-select [(nValues)]="tags" [nMultiple]="true" [nSelectAll]="true" [nMaxSelections]="3" [nClearable]="true" nHint="Pick up to 3 tags">
                  <n-select-trigger nPlaceholder="Pick tags" />
                  <n-select-content>
                    <n-select-item nValue="bug">Bug</n-select-item>
                    <n-select-item nValue="feature">Feature</n-select-item>
                    <n-select-item nValue="docs">Docs</n-select-item>
                    <n-select-item nValue="refactor">Refactor</n-select-item>
                    <n-select-item nValue="test">Test</n-select-item>
                    <n-select-item nValue="chore">Chore</n-select-item>
                  </n-select-content>
                </n-select>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="withFormCode">
              <form class="flex flex-col gap-3 w-full max-w-xs" (ngSubmit)="submitRole()">
                <n-select [formControl]="roleControl" nLabel="Role" [nRequired]="true" [nError]="roleControl.touched && roleControl.invalid ? 'Please pick a role.' : null">
                  <n-select-trigger nPlaceholder="Choose role" />
                  <n-select-content>
                    <n-select-item nValue="admin">Admin</n-select-item>
                    <n-select-item nValue="editor">Editor</n-select-item>
                    <n-select-item nValue="viewer">Viewer</n-select-item>
                  </n-select-content>
                </n-select>
                <button type="submit" class="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">Save</button>
                <p class="text-xs text-muted-foreground">Value: {{ roleControl.value || '∅' }} · Status: {{ roleControl.status }}</p>
              </form>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-semibold">n-select</h3>
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
                @for (row of selectApiRows; track row.prop) {
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
export class SelectDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly country = signal('');
  protected readonly groupedVal = signal('');
  protected readonly roles = signal<string[]>([]);
  protected readonly planVal = signal('pro');
  protected readonly tags = signal<string[]>([]);
  protected readonly roleControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  protected submitRole(): void {
    this.roleControl.markAsTouched();
  }

  protected readonly defaultCode = `country = signal('');
// template
<n-select nLabel="Country" [(nValue)]="country">
  <n-select-trigger nPlaceholder="Select a country..." />
  <n-select-content>
    <n-select-item nValue="br">Brazil</n-select-item>
    <n-select-item nValue="us">United States</n-select-item>
  </n-select-content>
</n-select>`;

  protected readonly groupCode = `<n-select nLabel="Framework" [(nValue)]="framework">
  <n-select-trigger nPlaceholder="Select a framework..." />
  <n-select-content>
    <n-select-group nLabel="Frontend">
      <n-select-item nValue="angular">Angular</n-select-item>
      <n-select-item nValue="react">React</n-select-item>
    </n-select-group>
    <n-select-group nLabel="Backend">
      <n-select-item nValue="express">Express</n-select-item>
    </n-select-group>
  </n-select-content>
</n-select>`;

  protected readonly multiCode = `<n-select [nMultiple]="true" nClearable [(nValues)]="roles">
  <n-select-trigger nPlaceholder="Select roles..." />
  <n-select-content>
    <n-select-item nValue="admin">Admin</n-select-item>
    <n-select-item nValue="editor">Editor</n-select-item>
  </n-select-content>
</n-select>`;

  protected readonly loadingCode = `<n-select [nLoading]="true">
  <n-select-trigger nPlaceholder="Loading..." />
  <n-select-content>...</n-select-content>
</n-select>`;
  protected readonly withIconsCode = `<n-select [(nValue)]="plan">
  <n-select-trigger nPlaceholder="Choose a plan" />
  <n-select-content>
    <n-select-item nValue="free" nLabel="Free" nDescription="Up to 3 projects">
      <svg data-slot="icon-leading" class="h-4 w-4 text-muted-foreground" ...></svg>
    </n-select-item>
    <n-select-item nValue="pro" nLabel="Pro" nDescription="Unlimited projects">
      <svg data-slot="icon-leading" class="h-4 w-4 text-blue-500" ...></svg>
    </n-select-item>
  </n-select-content>
</n-select>`;
  protected readonly selectAllCode = `<n-select [(nValues)]="tags" [nMultiple]="true" [nSelectAll]="true" [nMaxSelections]="3" [nClearable]="true" nHint="Pick up to 3 tags">
  <n-select-trigger nPlaceholder="Pick tags" />
  <n-select-content>
    <n-select-item nValue="bug">Bug</n-select-item>
    <n-select-item nValue="feature">Feature</n-select-item>
    <n-select-item nValue="docs">Docs</n-select-item>
  </n-select-content>
</n-select>`;
  protected readonly withFormCode = `roleControl = new FormControl('', Validators.required);
// template
<n-select [formControl]="roleControl" nLabel="Role" [nRequired]="true">
  <n-select-trigger nPlaceholder="Choose role" />
  <n-select-content>
    <n-select-item nValue="admin">Admin</n-select-item>
    <n-select-item nValue="editor">Editor</n-select-item>
  </n-select-content>
</n-select>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import {
  SelectComponent,
  SelectTriggerComponent,
  SelectContentComponent,
  SelectItemComponent,
} from './shared/components/select';

@Component({ selector: 'app-my-page', imports: [...], template: \`...\` })
export class MyPage {
  value = signal('');
}`;

  protected readonly usageCode = `<n-select nLabel="Label" [(nValue)]="value">
  <n-select-trigger nPlaceholder="Select..." />
  <n-select-content>
    <n-select-item nValue="a">Option A</n-select-item>
    <n-select-item nValue="b">Option B</n-select-item>
  </n-select-content>
</n-select>`;

  protected readonly selectApiRows: ApiRow[] = [
    { prop: 'nValue', type: 'string (model)', default: "''", description: 'Selected value in single-select mode.' },
    { prop: 'nValues', type: 'string[] (model)', default: '[]', description: 'Selected values in multi-select mode.' },
    { prop: 'nMultiple', type: 'boolean', default: 'false', description: 'Enables multi-select mode.' },
    { prop: 'nClearable', type: 'boolean', default: 'false', description: 'Shows a clear button in the trigger.' },
    { prop: 'nSelectAll', type: 'boolean', default: 'false', description: 'Shows a "select all" option in multi-select mode.' },
    { prop: 'nMaxSelections', type: 'number | null', default: 'null', description: 'Limits how many items can be selected in multi-select.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the trigger.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label rendered above the trigger.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message shown below the select.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the select.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the select as required.' },
    { prop: '(nChange)', type: 'EventEmitter<string | string[]>', default: '—', description: 'Emitted when selection changes.' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when the dropdown opens or closes.' },
  ];
}
