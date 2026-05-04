import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatepickerComponent, DatepickerCalendarComponent } from '../../../shared/components/datepicker';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-date-picker-doc-page',
  imports: [DatepickerComponent, DatepickerCalendarComponent, ReactiveFormsModule, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Date Picker</h1>
          <p class="mt-2 text-muted-foreground">A calendar overlay for selecting a date. Supports min/max constraints and custom disabled dates.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-full max-w-xs">
              <n-datepicker nLabel="Date of birth" [(nValue)]="date" />
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
                <app-code-block code="npx @nexuslabs/cli@alpha add datepicker" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge @angular/cdk" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">datepicker/</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/datepicker/</code>.</li>
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
              <div class="flex flex-col gap-3 w-full max-w-xs">
                <n-datepicker nSize="sm" nPlaceholder="Small" />
                <n-datepicker nPlaceholder="Default" />
                <n-datepicker nSize="lg" nPlaceholder="Large" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Min / Max range</h3>
          <div class="mt-3">
            <app-example title="nMin / nMax" [code]="rangeCode">
              <div class="w-full max-w-xs">
                <n-datepicker nLabel="Pick a date (this month)" [nMin]="minDate" [nMax]="maxDate" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled weekends</h3>
          <div class="mt-3">
            <app-example title="nDisabledDate" [code]="weekendsCode">
              <div class="w-full max-w-xs">
                <n-datepicker nLabel="Business days only" [nDisabledDate]="disableWeekends" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="w-full max-w-xs">
                <n-datepicker nLabel="Read only date" [nDisabled]="true" />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With label</h3>
          <div class="mt-3">
            <app-example title="nLabel / nHint" [code]="withLabelCode">
              <div class="w-full max-w-xs">
                <n-datepicker [(nValue)]="withLabelDate" nLabel="Date of birth" nPlaceholder="dd/mm/yyyy" nHint="We'll use this to verify your age." />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Error</h3>
          <div class="mt-3">
            <app-example title="nError" [code]="errorDateCode">
              <div class="w-full max-w-xs">
                <n-datepicker [(nValue)]="errorDate" nLabel="Start date" nPlaceholder="Select" nError="This date is required." />
              </div>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form</h3>
          <div class="mt-3">
            <app-example title="ReactiveFormsModule" [code]="withFormCode">
              <form [formGroup]="dateForm" class="flex w-full max-w-xs flex-col gap-3">
                <n-datepicker
                  formControlName="date"
                  nLabel="Appointment"
                  nPlaceholder="Select a date"
                  [nRequired]="true"
                  [nError]="dateForm.controls['date'].touched && dateForm.controls['date'].invalid ? 'Please select a date.' : null"
                />
                <p class="text-sm text-muted-foreground">
                  Selected: <span class="text-foreground font-medium">{{ dateForm.controls['date'].value ? dateForm.controls['date'].value!.toLocaleDateString() : 'none' }}</span>
                </p>
              </form>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Inline calendar</h3>
          <div class="mt-3">
            <app-example title="n-datepicker-calendar" [code]="inlineCalendarCode">
              <div class="flex flex-col items-center gap-3">
                <n-datepicker-calendar [nValue]="calendarDate()" (nChange)="calendarDate.set($event)" (nClear)="calendarDate.set(null)" />
                <p class="text-sm text-muted-foreground">
                  Selected: <span class="text-foreground font-medium">{{ calendarDate() ? calendarDate()!.toLocaleDateString() : 'none' }}</span>
                </p>
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
export class DatePickerDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly date = signal<Date | null>(null);
  protected readonly withLabelDate = signal<Date | null>(null);
  protected readonly errorDate = signal<Date | null>(null);
  protected readonly calendarDate = signal<Date | null>(null);
  protected readonly dateForm = new FormGroup({
    date: new FormControl<Date | null>(null, Validators.required),
  });

  protected readonly minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  protected readonly maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  protected readonly disableWeekends = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  protected readonly defaultCode = `date = signal<Date | null>(null);
// template
<n-datepicker nLabel="Date of birth" [(nValue)]="date" />`;

  protected readonly sizesCode = `<n-datepicker nSize="sm" nPlaceholder="Small" />
<n-datepicker nPlaceholder="Default" />
<n-datepicker nSize="lg" nPlaceholder="Large" />`;

  protected readonly rangeCode = `minDate = new Date(2025, 0, 1);
maxDate = new Date(2025, 11, 31);
// template
<n-datepicker nLabel="Pick a date" [nMin]="minDate" [nMax]="maxDate" />`;

  protected readonly weekendsCode = `disableWeekends = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
// template
<n-datepicker nLabel="Business days only" [nDisabledDate]="disableWeekends" />`;

  protected readonly disabledCode = `<n-datepicker nLabel="Read only date" [nDisabled]="true" />`;
  protected readonly withLabelCode = `<n-datepicker [(nValue)]="date" nLabel="Date of birth" nPlaceholder="dd/mm/yyyy" nHint="We'll use this to verify your age." />`;
  protected readonly errorDateCode = `<n-datepicker [(nValue)]="date" nLabel="Start date" nError="This date is required." />`;
  protected readonly withFormCode = `dateForm = new FormGroup({
  date: new FormControl<Date | null>(null, Validators.required),
});
// template
<n-datepicker
  formControlName="date"
  nLabel="Appointment"
  nPlaceholder="Select a date"
  [nRequired]="true"
  [nError]="dateForm.controls['date'].touched && dateForm.controls['date'].invalid ? 'Please select a date.' : null"
/>`;
  protected readonly inlineCalendarCode = `calendarDate = signal<Date | null>(null);
// template
<n-datepicker-calendar
  [nValue]="calendarDate()"
  (nChange)="calendarDate.set($event)"
  (nClear)="calendarDate.set(null)"
/>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { DatepickerComponent } from './shared/components/datepicker';

@Component({
  selector: 'app-my-page',
  imports: [DatepickerComponent],
  template: \`<n-datepicker nLabel="Start date" [(nValue)]="startDate" />\`,
})
export class MyPage {
  startDate = signal<Date | null>(null);
}`;

  protected readonly usageCode = `<n-datepicker
  nLabel="Start date"
  nPlaceholder="Pick a date"
  nRequired
  [(nValue)]="date"
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nValue', type: 'Date | null (model)', default: 'null', description: 'Two-way bindable selected date.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Size of the trigger button.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label rendered above the trigger.' },
    { prop: 'nPlaceholder', type: 'string', default: "''", description: 'Placeholder when no date is selected.' },
    { prop: 'nMin', type: 'Date | null', default: 'null', description: 'Earliest selectable date.' },
    { prop: 'nMax', type: 'Date | null', default: 'null', description: 'Latest selectable date.' },
    { prop: 'nDisabledDate', type: '((date: Date) => boolean) | null', default: 'null', description: 'Function that returns true for dates that should be disabled.' },
    { prop: 'nLocale', type: 'string', default: 'navigator.language', description: 'Locale for date formatting.' },
    { prop: 'nWeekStartsOn', type: '0 | 1', default: '0', description: 'First day of the week (0 = Sunday, 1 = Monday).' },
    { prop: 'nShowToday', type: 'boolean', default: 'true', description: 'Highlights today in the calendar.' },
    { prop: 'nClearable', type: 'boolean', default: 'true', description: 'Shows a clear button in the calendar panel.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the date picker.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message shown below the picker.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the picker.' },
    { prop: '(nChange)', type: 'EventEmitter<Date | null>', default: '—', description: 'Emitted when the selected date changes.' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when the calendar panel opens or closes.' },
  ];
}
