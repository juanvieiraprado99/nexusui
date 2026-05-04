import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ComboboxComponent,
  ComboboxTriggerComponent,
  ComboboxContentComponent,
  ComboboxItemComponent,
  ComboboxGroupComponent,
  ComboboxEmptyComponent,
} from '../../../shared/components/combobox';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

const ALL_FRAMEWORKS = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'astro', label: 'Astro' },
];

@Component({
  selector: 'app-combobox-doc-page',
  imports: [
    ComboboxComponent, ComboboxTriggerComponent, ComboboxContentComponent,
    ComboboxItemComponent, ComboboxGroupComponent, ComboboxEmptyComponent,
    ReactiveFormsModule,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Combobox</h1>
          <p class="mt-2 text-muted-foreground">A searchable dropdown for selecting from a list. Supports single and multi-select.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full max-w-xs">
              <n-combobox nLabel="Framework" [(nValue)]="framework">
                <n-combobox-trigger nPlaceholder="Select a framework..." />
                <n-combobox-content>
                  <n-combobox-item nValue="angular" nLabel="Angular">Angular</n-combobox-item>
                  <n-combobox-item nValue="react" nLabel="React">React</n-combobox-item>
                  <n-combobox-item nValue="vue" nLabel="Vue">Vue</n-combobox-item>
                  <n-combobox-item nValue="svelte" nLabel="Svelte">Svelte</n-combobox-item>
                  <n-combobox-empty>No framework found.</n-combobox-empty>
                </n-combobox-content>
              </n-combobox>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add combobox" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge @angular/cdk" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">combobox/</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/combobox/</code>.</li>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Multi-select</h3>
          <div class="mt-3">
            <app-example title="nMultiple" [code]="multiCode">
              <div class="w-full max-w-xs">
                <n-combobox nLabel="Technologies" [nMultiple]="true" [(nValues)]="technologies">
                  <n-combobox-trigger nPlaceholder="Select technologies..." />
                  <n-combobox-content>
                    <n-combobox-item nValue="typescript" nLabel="TypeScript">TypeScript</n-combobox-item>
                    <n-combobox-item nValue="tailwind" nLabel="Tailwind CSS">Tailwind CSS</n-combobox-item>
                    <n-combobox-item nValue="rxjs" nLabel="RxJS">RxJS</n-combobox-item>
                    <n-combobox-item nValue="ngrx" nLabel="NgRx">NgRx</n-combobox-item>
                  </n-combobox-content>
                </n-combobox>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Clearable</h3>
          <div class="mt-3">
            <app-example title="nClearable" [code]="clearableCode">
              <div class="w-full max-w-xs">
                <n-combobox [nClearable]="true" [(nValue)]="clearableVal">
                  <n-combobox-trigger nPlaceholder="Select an option..." />
                  <n-combobox-content>
                    <n-combobox-item nValue="option-1" nLabel="Option 1">Option 1</n-combobox-item>
                    <n-combobox-item nValue="option-2" nLabel="Option 2">Option 2</n-combobox-item>
                    <n-combobox-item nValue="option-3" nLabel="Option 3">Option 3</n-combobox-item>
                  </n-combobox-content>
                </n-combobox>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="w-full max-w-xs">
                <n-combobox [nDisabled]="true" nValue="angular">
                  <n-combobox-trigger nPlaceholder="Select..." />
                  <n-combobox-content>
                    <n-combobox-item nValue="angular" nLabel="Angular">Angular</n-combobox-item>
                  </n-combobox-content>
                </n-combobox>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Async</h3>
          <div class="mt-3">
            <app-example title="nFilterChange + nLoading" [code]="asyncCode">
              <div class="w-full max-w-xs">
                <n-combobox [(nValue)]="asyncValue" [nLoading]="asyncLoading()" (nFilterChange)="onAsyncFilter($event)">
                  <n-combobox-trigger nPlaceholder="Search frameworks..." />
                  <n-combobox-content>
                    @for (item of asyncItems(); track item.value) {
                      <n-combobox-item [nValue]="item.value" [nLabel]="item.label">{{ item.label }}</n-combobox-item>
                    }
                    <n-combobox-empty>No results found.</n-combobox-empty>
                  </n-combobox-content>
                </n-combobox>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With groups</h3>
          <div class="mt-3">
            <app-example title="n-combobox-group" [code]="withGroupsCode">
              <div class="w-full max-w-xs">
                <n-combobox [(nValue)]="groupsValue">
                  <n-combobox-trigger nPlaceholder="Select a language..." />
                  <n-combobox-content>
                    <n-combobox-group nLabel="Frontend">
                      <n-combobox-item nValue="typescript" nLabel="TypeScript">TypeScript</n-combobox-item>
                      <n-combobox-item nValue="javascript" nLabel="JavaScript">JavaScript</n-combobox-item>
                    </n-combobox-group>
                    <n-combobox-group nLabel="Backend">
                      <n-combobox-item nValue="go" nLabel="Go">Go</n-combobox-item>
                      <n-combobox-item nValue="rust" nLabel="Rust">Rust</n-combobox-item>
                      <n-combobox-item nValue="python" nLabel="Python">Python</n-combobox-item>
                    </n-combobox-group>
                    <n-combobox-empty>No language found.</n-combobox-empty>
                  </n-combobox-content>
                </n-combobox>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="comboWithFormCode">
              <div class="flex flex-col gap-4 w-full max-w-xs">
                <n-combobox [formControl]="comboFormControl">
                  <n-combobox-trigger nPlaceholder="Select a country..." />
                  <n-combobox-content>
                    <n-combobox-item nValue="br" nLabel="Brazil">Brazil</n-combobox-item>
                    <n-combobox-item nValue="us" nLabel="United States">United States</n-combobox-item>
                    <n-combobox-item nValue="de" nLabel="Germany">Germany</n-combobox-item>
                    <n-combobox-item nValue="jp" nLabel="Japan">Japan</n-combobox-item>
                  </n-combobox-content>
                </n-combobox>
                @if (comboFormControl.invalid && comboFormControl.touched) {
                  <p class="text-sm text-destructive" role="alert">Please select a country.</p>
                }
                <p class="text-sm text-muted-foreground">Value: {{ comboFormControl.value || 'none' }} — Status: {{ comboFormControl.status }}</p>
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-semibold">n-combobox</h3>
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
                @for (row of comboboxApiRows; track row.prop) {
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
          <h3 class="mt-6 text-sm font-semibold">n-combobox-trigger</h3>
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
                @for (row of triggerApiRows; track row.prop) {
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
export class ComboboxDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly framework = signal('');
  protected readonly technologies = signal<string[]>([]);
  protected readonly clearableVal = signal('');
  protected readonly asyncValue = signal('');
  protected readonly asyncLoading = signal(false);
  protected readonly asyncItems = signal(ALL_FRAMEWORKS);
  protected readonly groupsValue = signal('');
  protected readonly comboFormControl = new FormControl('', Validators.required);

  private _asyncTimer: ReturnType<typeof setTimeout> | null = null;

  protected onAsyncFilter(query: string): void {
    if (this._asyncTimer) clearTimeout(this._asyncTimer);
    this.asyncLoading.set(true);
    this._asyncTimer = setTimeout(() => {
      this.asyncItems.set(ALL_FRAMEWORKS.filter(i => i.label.toLowerCase().includes(query.toLowerCase())));
      this.asyncLoading.set(false);
    }, 400);
  }

  protected readonly defaultCode = `framework = signal('');
// template
<n-combobox nLabel="Framework" [(nValue)]="framework">
  <n-combobox-trigger nPlaceholder="Select a framework..." />
  <n-combobox-content>
    <n-combobox-item nValue="angular" nLabel="Angular">Angular</n-combobox-item>
    <n-combobox-item nValue="react" nLabel="React">React</n-combobox-item>
    <n-combobox-empty>No framework found.</n-combobox-empty>
  </n-combobox-content>
</n-combobox>`;

  protected readonly multiCode = `<n-combobox [nMultiple]="true" [(nValues)]="technologies">
  <n-combobox-trigger nPlaceholder="Select technologies..." />
  <n-combobox-content>
    <n-combobox-item nValue="typescript" nLabel="TypeScript">TypeScript</n-combobox-item>
    <n-combobox-item nValue="tailwind" nLabel="Tailwind CSS">Tailwind CSS</n-combobox-item>
  </n-combobox-content>
</n-combobox>`;

  protected readonly clearableCode = `<n-combobox nClearable [(nValue)]="value">
  <n-combobox-trigger nPlaceholder="Select..." />
  <n-combobox-content>
    <n-combobox-item nValue="option-1" nLabel="Option 1">Option 1</n-combobox-item>
  </n-combobox-content>
</n-combobox>`;

  protected readonly disabledCode = `<n-combobox [nDisabled]="true">
  <n-combobox-trigger />
  <n-combobox-content>...</n-combobox-content>
</n-combobox>`;
  protected readonly asyncCode = `items = signal(ALL_ITEMS);
loading = signal(false);
onFilter(query: string): void {
  this.loading.set(true);
  setTimeout(() => {
    this.items.set(ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase())));
    this.loading.set(false);
  }, 400);
}
// template
<n-combobox [(nValue)]="value" [nLoading]="loading()" (nFilterChange)="onFilter($event)">
  <n-combobox-trigger nPlaceholder="Search..." />
  <n-combobox-content>
    @for (item of items(); track item.value) {
      <n-combobox-item [nValue]="item.value" [nLabel]="item.label">{{ item.label }}</n-combobox-item>
    }
    <n-combobox-empty>No results found.</n-combobox-empty>
  </n-combobox-content>
</n-combobox>`;
  protected readonly withGroupsCode = `<n-combobox [(nValue)]="value">
  <n-combobox-trigger nPlaceholder="Select a language..." />
  <n-combobox-content>
    <n-combobox-group nLabel="Frontend">
      <n-combobox-item nValue="typescript" nLabel="TypeScript">TypeScript</n-combobox-item>
      <n-combobox-item nValue="javascript" nLabel="JavaScript">JavaScript</n-combobox-item>
    </n-combobox-group>
    <n-combobox-group nLabel="Backend">
      <n-combobox-item nValue="go" nLabel="Go">Go</n-combobox-item>
    </n-combobox-group>
    <n-combobox-empty>No language found.</n-combobox-empty>
  </n-combobox-content>
</n-combobox>`;
  protected readonly comboWithFormCode = `control = new FormControl('', Validators.required);
// template
<n-combobox [formControl]="control">
  <n-combobox-trigger nPlaceholder="Select a country..." />
  <n-combobox-content>
    <n-combobox-item nValue="br" nLabel="Brazil">Brazil</n-combobox-item>
    <n-combobox-item nValue="us" nLabel="United States">United States</n-combobox-item>
  </n-combobox-content>
</n-combobox>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import {
  ComboboxComponent,
  ComboboxTriggerComponent,
  ComboboxContentComponent,
  ComboboxItemComponent,
  ComboboxEmptyComponent,
} from './shared/components/combobox';

@Component({ selector: 'app-my-page', imports: [...], template: \`...\` })
export class MyPage {
  value = signal('');
}`;

  protected readonly usageCode = `<n-combobox nLabel="Label" [(nValue)]="value">
  <n-combobox-trigger nPlaceholder="Select..." />
  <n-combobox-content>
    <n-combobox-item nValue="a" nLabel="Option A">Option A</n-combobox-item>
    <n-combobox-item nValue="b" nLabel="Option B">Option B</n-combobox-item>
    <n-combobox-empty>No results found.</n-combobox-empty>
  </n-combobox-content>
</n-combobox>`;

  protected readonly comboboxApiRows: ApiRow[] = [
    { prop: 'nValue', type: 'string (model)', default: "''", description: 'Selected value for single-select mode.' },
    { prop: 'nValues', type: 'string[] (model)', default: '[]', description: 'Selected values for multi-select mode.' },
    { prop: 'nMultiple', type: 'boolean', default: 'false', description: 'Enables multi-select mode.' },
    { prop: 'nClearable', type: 'boolean', default: 'false', description: 'Shows a clear button in the trigger.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows a loading spinner in the trigger.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the combobox.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label rendered above the trigger.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message shown below the combobox.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the combobox.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the combobox as required.' },
    { prop: '(nFilterChange)', type: 'EventEmitter<string>', default: '—', description: 'Emitted when the search query changes (for async filtering).' },
  ];

  protected readonly triggerApiRows: ApiRow[] = [
    { prop: 'nPlaceholder', type: 'string', default: "'Select an option...'", description: 'Placeholder shown when no value is selected.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of the trigger button.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the trigger.' },
  ];
}
