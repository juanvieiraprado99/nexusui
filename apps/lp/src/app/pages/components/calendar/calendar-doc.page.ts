import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarComponent } from '../../../shared/components/calendar';
import type { CalendarValue } from '../../../shared/components/calendar';
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
  selector: 'app-calendar-doc-page',
  imports: [
    CalendarComponent,
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
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Calendar</h1>
          <p class="mt-2 text-muted-foreground">A date picker calendar with single, multiple, and range selection modes. Supports min/max constraints, disabled dates, and reactive forms.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default (single)" [code]="defaultCode">
            <div class="flex flex-col items-center gap-3">
              <n-calendar [(nValue)]="singleValue" />
              <p class="text-sm text-muted-foreground">
                Selected: <span class="font-medium text-foreground">{{ singleLabel() }}</span>
              </p>
            </div>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add calendar" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">calendar/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/calendar/</code>.</li>
                  <li class="pt-3">Also install the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">button</code> component (required by calendar navigation).</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Multiple selection</h3>
          <div class="mt-3">
            <app-example title='nMode="multiple"' [code]="multipleCode">
              <div class="flex flex-col items-center gap-3">
                <n-calendar nMode="multiple" [(nValue)]="multipleValue" />
                <p class="text-sm text-muted-foreground">
                  {{ multipleCount() }} date(s) selected
                </p>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Range selection</h3>
          <div class="mt-3">
            <app-example title='nMode="range"' [code]="rangeCode">
              <div class="flex flex-col items-center gap-3">
                <n-calendar nMode="range" [(nValue)]="rangeValue" />
                <p class="text-sm text-muted-foreground">{{ rangeLabel() }}</p>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Min / Max dates</h3>
          <div class="mt-3">
            <app-example title="[nMin] + [nMax]" [code]="minMaxCode">
              <div class="flex flex-col items-center gap-3">
                <n-calendar [(nValue)]="minMaxValue" [nMin]="minDate" [nMax]="maxDate" />
                <p class="text-sm text-muted-foreground">Only current month selectable</p>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Reactive form</h3>
          <div class="mt-3">
            <app-example title="[formControl]" [code]="formCode">
              <div class="flex flex-col items-center gap-4">
                <n-calendar [formControl]="dateControl" />
                <div class="text-sm space-y-1 text-center">
                  <p class="text-muted-foreground">
                    Value: <span class="font-medium text-foreground">{{ formDisplayValue() }}</span>
                  </p>
                  <p [class]="dateControl.valid ? 'text-green-600' : 'text-destructive'">
                    {{ dateControl.valid ? 'Valid' : 'Required' }}
                  </p>
                </div>
                <button
                  type="button"
                  class="text-xs text-muted-foreground underline hover:text-foreground"
                  (click)="dateControl.reset()"
                >Clear</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="[nDisabled]" [code]="disabledCode">
              <n-calendar [nDisabled]="true" />
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
export class CalendarDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly singleValue = signal<CalendarValue>(null);
  protected readonly multipleValue = signal<CalendarValue>(null);
  protected readonly rangeValue = signal<CalendarValue>(null);
  protected readonly minMaxValue = signal<CalendarValue>(null);
  protected readonly dateControl = new FormControl<CalendarValue>(null, Validators.required);

  protected readonly minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  protected readonly maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  protected readonly singleLabel = computed(() => {
    const v = this.singleValue();
    return v instanceof Date ? v.toLocaleDateString() : 'none';
  });

  protected readonly multipleCount = computed(() => {
    const v = this.multipleValue();
    return Array.isArray(v) ? v.length : 0;
  });

  protected readonly rangeLabel = computed(() => {
    const v = this.rangeValue();
    if (!Array.isArray(v) || v.length === 0) return 'Select range start';
    if (v.length === 1) return `From ${v[0].toLocaleDateString()} — select end`;
    return `${v[0].toLocaleDateString()} → ${v[1].toLocaleDateString()}`;
  });

  protected formDisplayValue(): string {
    const v = this.dateControl.value;
    return v instanceof Date ? v.toLocaleDateString() : 'none';
  }

  protected readonly defaultCode = `value = signal<CalendarValue>(null);

<n-calendar [(nValue)]="value" />`;

  protected readonly multipleCode = `value = signal<CalendarValue>(null);

<n-calendar nMode="multiple" [(nValue)]="value" />`;

  protected readonly rangeCode = `value = signal<CalendarValue>(null);

<n-calendar nMode="range" [(nValue)]="value" />`;

  protected readonly minMaxCode = `minDate = new Date(year, month, 1);
maxDate = new Date(year, month + 1, 0);

<n-calendar [(nValue)]="value" [nMin]="minDate" [nMax]="maxDate" />`;

  protected readonly formCode = `dateControl = new FormControl<Date | null>(null, Validators.required);

<n-calendar [formControl]="dateControl" />`;

  protected readonly disabledCode = `<n-calendar [nDisabled]="true" />`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { CalendarComponent, CalendarValue } from './shared/components/calendar';

@Component({
  selector: 'app-my-page',
  imports: [CalendarComponent],
  template: \`...\`,
})
export class MyPage {
  value = signal<CalendarValue>(null);
}`;

  protected readonly usageCode = `<n-calendar [(nValue)]="value" />
<n-calendar nMode="multiple" [(nValue)]="value" />
<n-calendar nMode="range" [(nValue)]="value" />`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nMode', type: "'single' | 'multiple' | 'range'", default: "'single'", description: 'Selection mode.' },
    { prop: 'nValue', type: 'CalendarValue', default: 'null', description: 'Two-way bindable selected value. Date for single, Date[] for multiple/range.' },
    { prop: 'nMin', type: 'Date | null', default: 'null', description: 'Minimum selectable date. Earlier dates are disabled.' },
    { prop: 'nMax', type: 'Date | null', default: 'null', description: 'Maximum selectable date. Later dates are disabled.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the entire calendar.' },
    { prop: 'nDisabledDate', type: 'DisabledDateFn | null', default: 'null', description: 'Function (date: Date) => boolean to disable individual dates.' },
    { prop: 'nLocale', type: 'string', default: 'navigator.language', description: 'BCP 47 locale for month/weekday labels.' },
    { prop: 'nWeekStartsOn', type: '0 | 1', default: '0', description: 'First day of week: 0 = Sunday, 1 = Monday.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Additional CSS classes on the root element.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Custom id attribute.' },
    { prop: '(nChange)', type: 'EventEmitter<CalendarValue>', default: '—', description: 'Emitted on date selection.' },
  ];
}
