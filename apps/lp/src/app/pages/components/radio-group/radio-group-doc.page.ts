import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioGroupComponent, RadioComponent } from '../../../shared/components/radio';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-radio-group-doc-page',
  imports: [RadioGroupComponent, RadioComponent, ReactiveFormsModule, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Radio Group</h1>
          <p class="mt-2 text-muted-foreground">A set of radio buttons where only one option can be selected at a time.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex flex-col gap-2">
              <n-radio-group nLabel="Notification preference" [(nValue)]="plan">
                <n-radio nValue="email" nLabel="Email" nDescription="Receive updates via email." />
                <n-radio nValue="sms" nLabel="SMS" nDescription="Receive updates via text message." />
                <n-radio nValue="push" nLabel="Push notification" nDescription="Receive updates in the app." />
              </n-radio-group>
              <p class="text-xs text-muted-foreground mt-2">Selected: {{ plan() }}</p>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add radio" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">radio/</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/radio/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">injectFormControl</code>, and the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">skeleton</code> component are present.</li>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Horizontal</h3>
          <div class="mt-3">
            <app-example title="nOrientation: horizontal" [code]="horizontalCode">
              <n-radio-group nOrientation="horizontal" [(nValue)]="size">
                <n-radio nValue="xs" nLabel="XS" />
                <n-radio nValue="sm" nLabel="SM" />
                <n-radio nValue="md" nLabel="MD" />
                <n-radio nValue="lg" nLabel="LG" />
              </n-radio-group>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <n-radio-group [nDisabled]="true" [(nValue)]="disabledPlan">
                <n-radio nValue="free" nLabel="Free" nDescription="Up to 5 projects." />
                <n-radio nValue="pro" nLabel="Pro" nDescription="Unlimited projects." />
              </n-radio-group>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With error</h3>
          <div class="mt-3">
            <app-example title="nError" [code]="errorCode">
              <n-radio-group nLabel="Choose a plan" nError="Please select an option to continue.">
                <n-radio nValue="free" nLabel="Free" />
                <n-radio nValue="pro" nLabel="Pro" />
              </n-radio-group>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: sm | default | lg" [code]="sizesCode">
              <div class="flex flex-col gap-6">
                <n-radio-group [(nValue)]="radioSm" nSize="sm" nLabel="Small" nOrientation="horizontal">
                  <n-radio nValue="a" nLabel="Option A" />
                  <n-radio nValue="b" nLabel="Option B" />
                </n-radio-group>
                <n-radio-group [(nValue)]="radioMd" nLabel="Default" nOrientation="horizontal">
                  <n-radio nValue="a" nLabel="Option A" />
                  <n-radio nValue="b" nLabel="Option B" />
                </n-radio-group>
                <n-radio-group [(nValue)]="radioLg" nSize="lg" nLabel="Large" nOrientation="horizontal">
                  <n-radio nValue="a" nLabel="Option A" />
                  <n-radio nValue="b" nLabel="Option B" />
                </n-radio-group>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Colors</h3>
          <div class="mt-3">
            <app-example title="nColor: default | success | destructive" [code]="colorsCode">
              <div class="flex flex-col gap-6">
                <n-radio-group [(nValue)]="colorA" nLabel="Default" nOrientation="horizontal">
                  <n-radio nValue="1" nLabel="Option 1" />
                  <n-radio nValue="2" nLabel="Option 2" />
                </n-radio-group>
                <n-radio-group [(nValue)]="colorB" nColor="success" nLabel="Success" nOrientation="horizontal">
                  <n-radio nValue="1" nLabel="Accept" />
                  <n-radio nValue="2" nLabel="Decline" />
                </n-radio-group>
                <n-radio-group [(nValue)]="colorC" nColor="destructive" nLabel="Destructive" nOrientation="horizontal">
                  <n-radio nValue="1" nLabel="Delete account" />
                  <n-radio nValue="2" nLabel="Keep account" />
                </n-radio-group>
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading</h3>
          <div class="mt-3">
            <app-example title="nLoading" [code]="loadingCode">
              <n-radio-group nLabel="Loading options" [nLoading]="true" [nSkeletonRows]="3">
                <n-radio nValue="a" nLabel="Option A" />
                <n-radio nValue="b" nLabel="Option B" />
                <n-radio nValue="c" nLabel="Option C" />
              </n-radio-group>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Rich description</h3>
          <div class="mt-3">
            <app-example title="Custom description content" [code]="richDescriptionCode">
              <n-radio-group [(nValue)]="paymentMethod" nVariant="card" nLabel="Payment method">
                <n-radio nValue="card" nLabel="Credit card">
                  <span slot="description" class="flex items-center gap-2">
                    <span class="inline-flex h-5 w-7 items-center justify-center rounded bg-blue-600 text-[10px] font-bold text-white">VISA</span>
                    <span class="inline-flex h-5 w-7 items-center justify-center rounded bg-orange-500 text-[10px] font-bold text-white">MC</span>
                    <span class="text-xs text-muted-foreground">Visa, Mastercard, Amex</span>
                  </span>
                </n-radio>
                <n-radio nValue="pix" nLabel="Pix">
                  <span slot="description" class="flex items-center gap-1.5 text-xs text-muted-foreground">
                    Instant approval
                  </span>
                </n-radio>
              </n-radio-group>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Card</h3>
          <div class="mt-3">
            <app-example title="nVariant: card" [code]="cardCode">
              <n-radio-group [(nValue)]="cardPlan" nVariant="card" nLabel="Choose a plan">
                <n-radio nValue="starter" nLabel="Starter" nDescription="For personal projects — up to 3 collaborators." />
                <n-radio nValue="team" nLabel="Team" nDescription="Small team with real-time collaboration." />
                <n-radio nValue="business" nLabel="Business" nDescription="Dedicated SLA, SSO, advanced auditing." />
              </n-radio-group>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Reactive form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="reactiveFormCode">
              <div [formGroup]="radioForm" class="flex w-full flex-col gap-4">
                <n-radio-group
                  formControlName="plan"
                  nLabel="Plan"
                  [nRequired]="true"
                  nHint="You can change this later."
                  [nError]="radioForm.controls['plan'].touched && radioForm.controls['plan'].invalid ? 'Please select a plan.' : null"
                >
                  <n-radio nValue="free" nLabel="Free" />
                  <n-radio nValue="pro" nLabel="Pro" />
                  <n-radio nValue="enterprise" nLabel="Enterprise" />
                </n-radio-group>
                <p class="text-sm text-muted-foreground">
                  Selected: <span class="text-foreground font-medium">{{ radioForm.controls['plan'].value ?? 'none' }}</span>
                </p>
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-semibold">n-radio-group</h3>
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
                @for (row of groupApiRows; track row.prop) {
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
          <h3 class="mt-6 text-sm font-semibold">n-radio</h3>
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
                @for (row of radioApiRows; track row.prop) {
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
export class RadioGroupDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly plan = signal<string | null>('email');
  protected readonly size = signal<string | null>('md');
  protected readonly disabledPlan = signal<string | null>('free');
  protected readonly radioSm = signal<string | null>('a');
  protected readonly radioMd = signal<string | null>('a');
  protected readonly radioLg = signal<string | null>('a');
  protected readonly colorA = signal<string | null>('1');
  protected readonly colorB = signal<string | null>('1');
  protected readonly colorC = signal<string | null>('2');
  protected readonly paymentMethod = signal<string | null>('card');
  protected readonly cardPlan = signal<string | null>('team');
  protected readonly radioForm = new FormGroup({
    plan: new FormControl<string | null>(null, Validators.required),
  });

  protected readonly defaultCode = `plan = signal('email');
// template
<n-radio-group nLabel="Notification preference" [(nValue)]="plan">
  <n-radio nValue="email" nLabel="Email" nDescription="Receive updates via email." />
  <n-radio nValue="sms" nLabel="SMS" nDescription="Receive updates via text message." />
  <n-radio nValue="push" nLabel="Push notification" nDescription="Receive updates in the app." />
</n-radio-group>`;

  protected readonly horizontalCode = `<n-radio-group nOrientation="horizontal" [(nValue)]="size">
  <n-radio nValue="xs" nLabel="XS" />
  <n-radio nValue="sm" nLabel="SM" />
  <n-radio nValue="md" nLabel="MD" />
  <n-radio nValue="lg" nLabel="LG" />
</n-radio-group>`;

  protected readonly disabledCode = `<n-radio-group [nDisabled]="true" [(nValue)]="plan">
  <n-radio nValue="free" nLabel="Free" nDescription="Up to 5 projects." />
  <n-radio nValue="pro" nLabel="Pro" nDescription="Unlimited projects." />
</n-radio-group>`;

  protected readonly errorCode = `<n-radio-group nLabel="Choose a plan" nError="Please select an option to continue.">
  <n-radio nValue="free" nLabel="Free" />
  <n-radio nValue="pro" nLabel="Pro" />
</n-radio-group>`;
  protected readonly sizesCode = `<n-radio-group [(nValue)]="value" nSize="sm" nLabel="Small" nOrientation="horizontal">
  <n-radio nValue="a" nLabel="Option A" />
  <n-radio nValue="b" nLabel="Option B" />
</n-radio-group>
<n-radio-group [(nValue)]="value" nLabel="Default" nOrientation="horizontal">
  <n-radio nValue="a" nLabel="Option A" />
  <n-radio nValue="b" nLabel="Option B" />
</n-radio-group>
<n-radio-group [(nValue)]="value" nSize="lg" nLabel="Large" nOrientation="horizontal">
  <n-radio nValue="a" nLabel="Option A" />
  <n-radio nValue="b" nLabel="Option B" />
</n-radio-group>`;
  protected readonly colorsCode = `<n-radio-group [(nValue)]="a" nLabel="Default" nOrientation="horizontal">
  <n-radio nValue="1" nLabel="Option 1" />
</n-radio-group>
<n-radio-group [(nValue)]="b" nColor="success" nLabel="Success" nOrientation="horizontal">
  <n-radio nValue="1" nLabel="Accept" />
</n-radio-group>
<n-radio-group [(nValue)]="c" nColor="destructive" nLabel="Destructive" nOrientation="horizontal">
  <n-radio nValue="1" nLabel="Delete account" />
</n-radio-group>`;
  protected readonly loadingCode = `<n-radio-group nLabel="Loading options" [nLoading]="true" [nSkeletonRows]="3">
  <n-radio nValue="a" nLabel="Option A" />
  <n-radio nValue="b" nLabel="Option B" />
</n-radio-group>`;
  protected readonly richDescriptionCode = `<n-radio-group [(nValue)]="method" nVariant="card" nLabel="Payment method">
  <n-radio nValue="card" nLabel="Credit card">
    <span slot="description" class="flex items-center gap-2">
      <span class="...">VISA</span>
      <span class="...">MC</span>
    </span>
  </n-radio>
  <n-radio nValue="pix" nLabel="Pix">
    <span slot="description">Instant approval</span>
  </n-radio>
</n-radio-group>`;
  protected readonly cardCode = `<n-radio-group [(nValue)]="plan" nVariant="card" nLabel="Choose a plan">
  <n-radio nValue="starter" nLabel="Starter" nDescription="For personal projects." />
  <n-radio nValue="team" nLabel="Team" nDescription="Small team collaboration." />
  <n-radio nValue="business" nLabel="Business" nDescription="Dedicated SLA, SSO." />
</n-radio-group>`;
  protected readonly reactiveFormCode = `radioForm = new FormGroup({
  plan: new FormControl<string | null>(null, Validators.required),
});
// template
<div [formGroup]="radioForm">
  <n-radio-group formControlName="plan" nLabel="Plan" [nRequired]="true">
    <n-radio nValue="free" nLabel="Free" />
    <n-radio nValue="pro" nLabel="Pro" />
  </n-radio-group>
</div>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { RadioGroupComponent, RadioComponent } from './shared/components/radio';

@Component({
  selector: 'app-my-page',
  imports: [RadioGroupComponent, RadioComponent],
  template: \`...\`,
})
export class MyPage {
  plan = signal('free');
}`;

  protected readonly usageCode = `<n-radio-group nLabel="Plan" [(nValue)]="plan">
  <n-radio nValue="free" nLabel="Free" />
  <n-radio nValue="pro" nLabel="Pro" />
</n-radio-group>`;

  protected readonly groupApiRows: ApiRow[] = [
    { prop: 'nValue', type: 'T | null (model)', default: 'null', description: 'Two-way bindable selected value.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Group label displayed above the options.' },
    { prop: 'nOrientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction of the radio items.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size applied to all child radios.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables all radio items in the group.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows skeleton placeholders instead of radio items.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message displayed below the group.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the group.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the group as required.' },
    { prop: '(nChange)', type: 'EventEmitter<T | null>', default: '—', description: 'Emitted when the selected value changes.' },
  ];

  protected readonly radioApiRows: ApiRow[] = [
    { prop: 'nValue', type: 'T (required)', default: '—', description: 'The value this radio represents.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label text beside the radio button.' },
    { prop: 'nDescription', type: 'string', default: "''", description: 'Secondary description text below the label.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables this specific radio item.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg' | null", default: 'null', description: 'Overrides the group size for this item.' },
    { prop: 'nVariant', type: "'default' | 'card' | null", default: 'null', description: 'Visual variant. Card wraps item in a bordered container.' },
    { prop: 'nColor', type: "'default' | 'primary' | 'destructive' | null", default: 'null', description: 'Color accent of the radio indicator.' },
    { prop: '(nChange)', type: 'EventEmitter<T>', default: '—', description: 'Emitted when this radio is selected.' },
  ];
}
