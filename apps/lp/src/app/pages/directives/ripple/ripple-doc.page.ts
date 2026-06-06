import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RippleDirective } from '../../../shared/components/ripple';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-ripple-doc-page',
  imports: [RippleDirective, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Directives</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Ripple</h1>
          <p class="mt-2 text-muted-foreground">An attribute directive that adds a Material/shadcn-style ripple effect to any element, animating from the click point. Self-contained — the animation uses the Web Animations API, so it needs no global CSS.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div
              nRipple
              class="flex h-24 w-48 cursor-pointer select-none items-center justify-center rounded-lg bg-muted text-sm font-medium text-muted-foreground"
            >
              Click anywhere
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
                <app-code-block code="npx @nexuslabs/cli@alpha add ripple" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>No extra runtime dependencies — the directive only uses <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">&#64;angular/core</code>.</li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">ripple.directive.ts</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/ripple/</code>.</li>
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
          <p class="mt-3 text-sm text-muted-foreground">The directive automatically ensures the host is positioned (<code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">position: relative</code>) and clips the ripple (<code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">overflow: hidden</code>), unless <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">nRippleUnbounded</code> is set.</p>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">On a button</h3>
          <div class="mt-3">
            <app-example title="With n-button" [code]="onButtonCode">
              <button nRipple nRippleColor="rgba(255,255,255,0.6)" type="button" class="inline-flex h-10 cursor-pointer select-none items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
                Ripple Button
              </button>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Custom colors</h3>
          <div class="mt-3">
            <app-example title="nRippleColor" [code]="colorsCode">
              <div class="flex flex-wrap gap-3">
                <div nRipple nRippleColor="#3b82f6" class="flex h-20 w-20 cursor-pointer select-none items-center justify-center rounded-lg bg-muted text-xs font-medium">Blue</div>
                <div nRipple nRippleColor="#ef4444" class="flex h-20 w-20 cursor-pointer select-none items-center justify-center rounded-lg bg-muted text-xs font-medium">Red</div>
                <div nRipple nRippleColor="#22c55e" class="flex h-20 w-20 cursor-pointer select-none items-center justify-center rounded-lg bg-muted text-xs font-medium">Green</div>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Centered</h3>
          <div class="mt-3">
            <app-example title="nRippleCentered" [code]="centeredCode">
              <button nRipple [nRippleCentered]="true" type="button" aria-label="Icon button" class="flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-full bg-muted text-lg text-muted-foreground">★</button>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Unbounded</h3>
          <div class="mt-3">
            <app-example title="nRippleUnbounded" [code]="unboundedCode">
              <button nRipple [nRippleUnbounded]="true" [nRippleCentered]="true" nRippleColor="#6366f1" type="button" aria-label="Unbounded icon button" class="flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-full bg-muted text-lg text-muted-foreground">♥</button>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nRippleDisabled" [code]="disabledCode">
              <div nRipple [nRippleDisabled]="true" class="flex h-20 w-48 cursor-not-allowed select-none items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground/60">No ripple</div>
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
          <p class="mt-3 text-sm text-muted-foreground">Each click injects a <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">&lt;span data-slot="ripple"&gt;</code> (decorative, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">aria-hidden</code>) that is removed when its animation finishes.</p>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class RippleDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<div nRipple class="rounded-lg bg-muted p-6">Click anywhere</div>`;
  protected readonly onButtonCode = `<button n-button nRipple nRippleColor="rgba(255,255,255,0.6)">Ripple Button</button>`;
  protected readonly colorsCode = `<div nRipple nRippleColor="#3b82f6">Blue</div>
<div nRipple nRippleColor="#ef4444">Red</div>
<div nRipple nRippleColor="#22c55e">Green</div>`;
  protected readonly centeredCode = `<button nRipple [nRippleCentered]="true" class="h-12 w-12 rounded-full">★</button>`;
  protected readonly unboundedCode = `<button nRipple [nRippleUnbounded]="true" [nRippleCentered]="true">♥</button>`;
  protected readonly disabledCode = `<div nRipple [nRippleDisabled]="true">No ripple</div>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { RippleDirective } from './shared/components/ripple';

@Component({
  selector: 'app-my-page',
  imports: [RippleDirective],
  template: \`<button nRipple>Click</button>\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<div nRipple>Surface</div>
<button nRipple nRippleColor="#3b82f6">Colored</button>
<button nRipple [nRippleCentered]="true">Centered</button>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nRippleColor', type: 'string', default: "'currentColor'", description: 'Ripple color. Accepts any CSS color.' },
    { prop: 'nRippleDuration', type: 'number', default: '500', description: 'Animation duration in milliseconds.' },
    { prop: 'nRippleDisabled', type: 'boolean', default: 'false', description: 'Turns the effect off.' },
    { prop: 'nRippleCentered', type: 'boolean', default: 'false', description: 'Always originate from the host center, ignoring the click point.' },
    { prop: 'nRippleUnbounded', type: 'boolean', default: 'false', description: 'Do not apply overflow: hidden — the ripple may overflow the host.' },
  ];
}
