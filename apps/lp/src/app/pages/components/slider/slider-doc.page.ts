import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SliderComponent, type SliderMark } from '../../../shared/components/slider';
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
  selector: 'app-slider-doc-page',
  imports: [SliderComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Slider</h1>
          <p class="mt-2 text-muted-foreground">A range input with single/range modes, vertical orientation, marks, and optional side inputs.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="w-72 space-y-3">
              <n-slider [(nValue)]="sliderValue" nLabel="Volume" />
              <p class="text-sm text-muted-foreground">Value: {{ sliderValue() }}</p>
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
                <app-code-block code="npx @nexuslabs/cli add slider" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5">
                      <app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" />
                    </div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">slider.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">slider.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/slider/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Range</h3>
          <div class="mt-3">
            <app-example title="nRange" [code]="rangeCode">
              <div class="w-72 space-y-3">
                <n-slider [(nValue)]="rangeValue" [nRange]="true" nLabel="Price range" />
                <p class="text-sm text-muted-foreground">{{ rangeValue()[0] }} – {{ rangeValue()[1] }}</p>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Vertical</h3>
          <div class="mt-3">
            <app-example title="nOrientation: vertical" [code]="verticalCode">
              <div class="flex h-52 items-start gap-10">
                <div class="flex flex-col items-center gap-2">
                  <n-slider [(nValue)]="bassValue" nOrientation="vertical" nLabel="Bass" />
                  <span class="text-xs text-muted-foreground">{{ bassValue() }}</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <n-slider [(nValue)]="midValue" nOrientation="vertical" nLabel="Mid" />
                  <span class="text-xs text-muted-foreground">{{ midValue() }}</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                  <n-slider [(nValue)]="trebleValue" nOrientation="vertical" nLabel="Treble" />
                  <span class="text-xs text-muted-foreground">{{ trebleValue() }}</span>
                </div>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With inputs</h3>
          <div class="mt-3">
            <app-example title="nShowInputs" [code]="withInputsCode">
              <div class="w-96 space-y-6">
                <n-slider [(nValue)]="inputSingleValue" [nShowInputs]="true" nLabel="Single with input" />
                <n-slider [(nValue)]="inputRangeValue" [nRange]="true" [nShowInputs]="true" nLabel="Range with inputs" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With marks</h3>
          <div class="mt-3">
            <app-example title="nMarks + nStep" [code]="withMarksCode">
              <div class="w-72 pb-6">
                <n-slider [(nValue)]="marksValue" [nMarks]="marks" [nStep]="25" nLabel="Intensity" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: sm | md | lg" [code]="sizesCode">
              <div class="w-72 space-y-6">
                <n-slider nSize="sm" nLabel="Small" [nValue]="50" />
                <n-slider nSize="md" nLabel="Medium (default)" [nValue]="50" />
                <n-slider nSize="lg" nLabel="Large" [nValue]="50" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nVariant: default | accent" [code]="variantsCode">
              <div class="w-72 space-y-6">
                <n-slider nVariant="default" nLabel="Default" [nValue]="60" />
                <n-slider nVariant="accent" nLabel="Accent" [nValue]="60" />
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
export class SliderDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly sliderValue     = signal<number>(40);
  protected readonly rangeValue      = signal<[number, number]>([20, 70]);
  protected readonly bassValue       = signal<number>(60);
  protected readonly midValue        = signal<number>(45);
  protected readonly trebleValue     = signal<number>(75);
  protected readonly inputSingleValue = signal<number>(30);
  protected readonly inputRangeValue  = signal<[number, number]>([15, 80]);
  protected readonly marksValue      = signal<number>(50);

  protected readonly marks: SliderMark[] = [
    { value: 0,   label: 'Off'    },
    { value: 25,  label: 'Low'    },
    { value: 50,  label: 'Med'    },
    { value: 75,  label: 'High'   },
    { value: 100, label: 'Max'    },
  ];

  protected readonly defaultCode = `value = signal<number>(40);
// template
<n-slider [(nValue)]="value" nLabel="Volume" />`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import { SliderComponent } from './shared/components/slider';

@Component({
  selector: 'app-my-page',
  imports: [SliderComponent],
  template: \`<n-slider [(nValue)]="value" nLabel="Volume" />\`,
})
export class MyPage {
  value = signal<number>(40);
}`;

  protected readonly usageCode = `<n-slider [(nValue)]="value" nLabel="Volume" />`;

  protected readonly rangeCode = `range = signal<[number, number]>([20, 70]);
// template
<n-slider [(nValue)]="range" [nRange]="true" nLabel="Price range" />
<p>{{ range()[0] }} – {{ range()[1] }}</p>`;

  protected readonly verticalCode = `<div class="flex h-52 items-start gap-10">
  <n-slider [(nValue)]="bass" nOrientation="vertical" nLabel="Bass" />
  <n-slider [(nValue)]="mid" nOrientation="vertical" nLabel="Mid" />
  <n-slider [(nValue)]="treble" nOrientation="vertical" nLabel="Treble" />
</div>`;

  protected readonly withInputsCode = `<n-slider [(nValue)]="single" [nShowInputs]="true" nLabel="Single" />
<n-slider [(nValue)]="range" [nRange]="true" [nShowInputs]="true" nLabel="Range" />`;

  protected readonly withMarksCode = `marks: SliderMark[] = [
  { value: 0,   label: 'Off' },
  { value: 25,  label: 'Low' },
  { value: 50,  label: 'Med' },
  { value: 75,  label: 'High' },
  { value: 100, label: 'Max' },
];
// template
<n-slider [(nValue)]="value" [nMarks]="marks" [nStep]="25" nLabel="Intensity" />`;

  protected readonly sizesCode = `<n-slider nSize="sm" nLabel="Small" />
<n-slider nSize="md" nLabel="Medium (default)" />
<n-slider nSize="lg" nLabel="Large" />`;

  protected readonly variantsCode = `<n-slider nVariant="default" nLabel="Default" />
<n-slider nVariant="accent" nLabel="Accent" />`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nValue', type: 'number | [number, number] (model)', default: '0', description: 'Current value. Use a tuple [min, max] when nRange is true.' },
    { prop: 'nMin', type: 'number', default: '0', description: 'Minimum allowed value.' },
    { prop: 'nMax', type: 'number', default: '100', description: 'Maximum allowed value.' },
    { prop: 'nStep', type: 'number', default: '1', description: 'Step increment between snappable values.' },
    { prop: 'nRange', type: 'boolean', default: 'false', description: 'Enables two-thumb range mode. nValue becomes a tuple.' },
    { prop: 'nOrientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Slider orientation.' },
    { prop: 'nMarks', type: 'SliderMark[]', default: '[]', description: 'Array of mark objects ({ value, label? }) rendered along the track.' },
    { prop: 'nShowTooltip', type: 'boolean', default: 'true', description: 'Shows the current value above the thumb while dragging.' },
    { prop: 'nShowInputs', type: 'boolean', default: 'false', description: 'Renders numeric input boxes on both sides of the slider.' },
    { prop: 'nSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track and thumb size.' },
    { prop: 'nVariant', type: "'default' | 'accent'", default: "'default'", description: 'Color of the active track and thumb border.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Label rendered above the slider.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown when no error.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Error message. Hides hint when set.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Marks the control as required.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables all interaction.' },
    { prop: '(nChange)', type: 'EventEmitter<number | [number, number]>', default: '—', description: 'Emitted on pointer-up and keyboard navigation.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the root wrapper.' },
  ];
}
