import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ProgressBarComponent } from '../../../shared/components/progress-bar';
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
  selector: 'app-progress-bar-doc-page',
  imports: [ProgressBarComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Progress Bar</h1>
          <p class="mt-2 text-muted-foreground">
            Displays a visual indicator of task completion. Supports determinate and indeterminate states.
          </p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-progress-bar [nValue]="60" nLabel="Loading" />
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
                <app-code-block code="npx @nexuslabs/cli add progress-bar" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">progress-bar.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">progress-bar.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/progress-bar/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> util exists at <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/merge-classes.ts</code>.</li>
                  <li class="pt-3">Add the animation keyframes to your global CSS:
                    <div class="mt-2 ml-5"><app-code-block [code]="indeterminateCssCode" language="css" /></div>
                  </li>
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
            <app-example title="nSize: sm · default · lg" [code]="sizesCode">
              <div class="flex flex-col gap-4 w-full">
                <n-progress-bar nSize="sm" [nValue]="40" nLabel="Small" />
                <n-progress-bar nSize="default" [nValue]="60" nLabel="Default" />
                <n-progress-bar nSize="lg" [nValue]="80" nLabel="Large" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nVariant: default · success · warning · destructive" [code]="variantsCode">
              <div class="flex flex-col gap-4 w-full">
                <n-progress-bar nVariant="default" [nValue]="50" nLabel="Default" />
                <n-progress-bar nVariant="success" [nValue]="100" nLabel="Success" />
                <n-progress-bar nVariant="warning" [nValue]="70" nLabel="Warning" />
                <n-progress-bar nVariant="destructive" [nValue]="30" nLabel="Destructive" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Indeterminate</h3>
          <div class="mt-3">
            <app-example title="nIndeterminate" [code]="indeterminateCode">
              <n-progress-bar [nIndeterminate]="true" nLabel="Loading…" />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Striped</h3>
          <div class="mt-3">
            <app-example title="nStriped" [code]="stripedCode">
              <div class="flex flex-col gap-4 w-full">
                <n-progress-bar [nValue]="60" [nStriped]="true" nLabel="Default striped" />
                <n-progress-bar [nValue]="60" [nStriped]="true" nVariant="success" nLabel="Success striped" />
                <n-progress-bar [nValue]="60" [nStriped]="true" nVariant="warning" nLabel="Warning striped" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Indeterminate animations</h3>
          <div class="mt-3">
            <app-example title="nAnimation: slide · bounce · pulse + nStriped" [code]="animationsCode">
              <div class="flex flex-col gap-6 w-full">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-muted-foreground">slide (default)</span>
                  <n-progress-bar [nIndeterminate]="true" nAnimation="slide" nLabel="Slide" />
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-muted-foreground">bounce</span>
                  <n-progress-bar [nIndeterminate]="true" nAnimation="bounce" nLabel="Bounce" />
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-muted-foreground">pulse</span>
                  <n-progress-bar [nIndeterminate]="true" nAnimation="pulse" nLabel="Pulse" />
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-muted-foreground">striped + slide</span>
                  <n-progress-bar [nIndeterminate]="true" [nStriped]="true" nLabel="Striped indeterminate" />
                </div>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Show value</h3>
          <div class="mt-3">
            <app-example title="nShowValue" [code]="showValueCode">
              <div class="flex flex-col gap-6 w-full">
                <n-progress-bar [nValue]="progress()" [nShowValue]="true" nLabel="Upload progress" />
                <div class="flex gap-2">
                  <button
                    type="button"
                    class="rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-accent"
                    (click)="decrement()"
                  >−10</button>
                  <button
                    type="button"
                    class="rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-accent"
                    (click)="increment()"
                  >+10</button>
                </div>
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
export class ProgressBarDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly progress = signal(40);

  protected increment(): void {
    this.progress.update((v) => Math.min(100, v + 10));
  }

  protected decrement(): void {
    this.progress.update((v) => Math.max(0, v - 10));
  }

  protected readonly defaultCode = `<n-progress-bar [nValue]="60" nLabel="Loading" />`;

  protected readonly sizesCode = `<n-progress-bar nSize="sm" [nValue]="40" />
<n-progress-bar nSize="default" [nValue]="60" />
<n-progress-bar nSize="lg" [nValue]="80" />`;

  protected readonly variantsCode = `<n-progress-bar nVariant="default" [nValue]="50" />
<n-progress-bar nVariant="success" [nValue]="100" />
<n-progress-bar nVariant="warning" [nValue]="70" />
<n-progress-bar nVariant="destructive" [nValue]="30" />`;

  protected readonly indeterminateCode = `<n-progress-bar [nIndeterminate]="true" nLabel="Loading…" />`;

  protected readonly stripedCode = `<n-progress-bar [nValue]="60" [nStriped]="true" />
<n-progress-bar [nValue]="60" [nStriped]="true" nVariant="success" />
<n-progress-bar [nValue]="60" [nStriped]="true" nVariant="warning" />`;

  protected readonly animationsCode = `<!-- slide (default) -->
<n-progress-bar [nIndeterminate]="true" nAnimation="slide" />

<!-- bounce -->
<n-progress-bar [nIndeterminate]="true" nAnimation="bounce" />

<!-- pulse -->
<n-progress-bar [nIndeterminate]="true" nAnimation="pulse" />

<!-- striped indeterminate -->
<n-progress-bar [nIndeterminate]="true" [nStriped]="true" />`;

  protected readonly showValueCode = `<n-progress-bar [nValue]="progress()" [nShowValue]="true" nLabel="Upload progress" />`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { ProgressBarComponent } from './shared/components/progress-bar';

@Component({
  selector: 'app-my-page',
  imports: [ProgressBarComponent],
  template: \`<n-progress-bar [nValue]="progress" nLabel="Loading" />\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-progress-bar
  [nValue]="75"
  nVariant="default"
  nSize="default"
  nLabel="Upload progress"
/>`;

  protected readonly indeterminateCssCode = `@keyframes progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}
.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-bounce {
  0%, 100% { transform: translateX(-100%); }
  50%      { transform: translateX(200%); }
}
.animate-progress-bounce {
  animation: progress-bounce 2s ease-in-out infinite;
}

@keyframes progress-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}
.animate-progress-pulse {
  animation: progress-pulse 1.5s ease-in-out infinite;
}

@keyframes progress-stripes {
  0%   { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
.progress-bar-striped {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%, transparent 25%,
    transparent 50%, rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent
  );
  background-size: 1rem 1rem;
}
.progress-bar-striped-animated {
  animation: progress-stripes 1s linear infinite;
}

/* Respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-progress-indeterminate,
  .animate-progress-bounce,
  .animate-progress-pulse,
  .progress-bar-striped-animated {
    animation: none;
  }
}`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nValue', type: 'number', default: '0', description: 'Progress value, clamped to 0–100.' },
    { prop: 'nVariant', type: "'default' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Fill color variant.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Track height.' },
    { prop: 'nIndeterminate', type: 'boolean', default: 'false', description: 'Animated state for unknown-duration progress.' },
    { prop: 'nAnimation', type: "'slide' | 'bounce' | 'pulse'", default: "'slide'", description: 'Indeterminate animation style. Only applies when nIndeterminate is true.' },
    { prop: 'nStriped', type: 'boolean', default: 'false', description: 'Adds diagonal stripe pattern to the fill. Stripes animate when nAnimated or nIndeterminate.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Accessible label (aria-label on the track).' },
    { prop: 'nShowValue', type: 'boolean', default: 'false', description: 'Renders the percentage text below the track.' },
    { prop: 'nAnimated', type: 'boolean', default: 'true', description: 'Enables CSS width transition on value change.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes appended to the host wrapper.' },
  ];
}
