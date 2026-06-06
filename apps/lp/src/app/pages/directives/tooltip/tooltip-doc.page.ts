import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { TooltipDirective } from '../../../shared/components/tooltip';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-tooltip-doc-page',
  imports: [TooltipDirective, ButtonComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Directives</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Tooltip</h1>
          <p class="mt-2 text-muted-foreground">An attribute directive that shows a floating label on hover or focus. Built on the Angular CDK Overlay — it flips to the opposite side when there is no room, supports eight positions, and accepts plain text or a custom template.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex items-center justify-center p-8">
              <button n-button nTooltip="Save changes">Save</button>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add tooltip" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install the CDK Overlay dependency: <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">npm i &#64;angular/cdk</code>.</li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">tooltip.directive.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">tooltip-content.component.ts</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/tooltip/</code>.</li>
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
          <p class="mt-3 text-sm text-muted-foreground">Apply <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">nTooltip</code> to any focusable element. The tooltip opens on <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mouseenter</code> / <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">focus</code> and closes on leave, blur, or <kbd class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">Esc</kbd>.</p>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Sides</h3>
          <div class="mt-3">
            <app-example title="nTooltipSide" [code]="sidesCode">
              <div class="flex flex-wrap items-center justify-center gap-4 p-8">
                <button n-button nTooltip="Top tooltip" nTooltipSide="top">Top</button>
                <button n-button nTooltip="Right tooltip" nTooltipSide="right">Right</button>
                <button n-button nTooltip="Bottom tooltip" nTooltipSide="bottom">Bottom</button>
                <button n-button nTooltip="Left tooltip" nTooltipSide="left">Left</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Diagonals</h3>
          <div class="mt-3">
            <app-example title="Diagonal sides" [code]="diagonalsCode">
              <div class="grid grid-cols-2 place-items-center gap-4 p-8">
                <button n-button nTooltip="Top-left tooltip" nTooltipSide="top-left">Top-left</button>
                <button n-button nTooltip="Top-right tooltip" nTooltipSide="top-right">Top-right</button>
                <button n-button nTooltip="Bottom-left tooltip" nTooltipSide="bottom-left">Bottom-left</button>
                <button n-button nTooltip="Bottom-right tooltip" nTooltipSide="bottom-right">Bottom-right</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Alignment</h3>
          <div class="mt-3">
            <app-example title="nTooltipAlign" [code]="alignCode">
              <div class="flex flex-wrap items-center justify-center gap-4 p-8">
                <button n-button nTooltip="Aligned to start" nTooltipSide="top" nTooltipAlign="start">Start</button>
                <button n-button nTooltip="Aligned to center" nTooltipSide="top" nTooltipAlign="center">Center</button>
                <button n-button nTooltip="Aligned to end" nTooltipSide="top" nTooltipAlign="end">End</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">No delay</h3>
          <div class="mt-3">
            <app-example title="nTooltipDelay" [code]="delayCode">
              <div class="flex items-center justify-center p-8">
                <button n-button nTooltip="Shows instantly" [nTooltipDelay]="0">Instant</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Rich content</h3>
          <div class="mt-3">
            <app-example title="Template content" [code]="templateCode">
              <ng-template #richTip>
                <div class="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <span>Requires admin access</span>
                </div>
              </ng-template>
              <div class="flex items-center justify-center p-8">
                <button n-button [nTooltip]="richTip">Admin action</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nTooltipDisabled" [code]="disabledCode">
              <div class="flex items-center justify-center p-8">
                <button n-button nVariant="outline" nTooltip="You will not see me" [nTooltipDisabled]="true">No tooltip</button>
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
          <p class="mt-3 text-sm text-muted-foreground">The tooltip content is rendered in a CDK overlay with <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">role="tooltip"</code> and wired to the host via <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">aria-describedby</code> while open.</p>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class TooltipDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<button n-button nTooltip="Save changes">Save</button>`;
  protected readonly sidesCode = `<button n-button nTooltip="Top tooltip" nTooltipSide="top">Top</button>
<button n-button nTooltip="Right tooltip" nTooltipSide="right">Right</button>
<button n-button nTooltip="Bottom tooltip" nTooltipSide="bottom">Bottom</button>
<button n-button nTooltip="Left tooltip" nTooltipSide="left">Left</button>`;
  protected readonly diagonalsCode = `<button n-button nTooltip="Top-left" nTooltipSide="top-left">Top-left</button>
<button n-button nTooltip="Top-right" nTooltipSide="top-right">Top-right</button>
<button n-button nTooltip="Bottom-left" nTooltipSide="bottom-left">Bottom-left</button>
<button n-button nTooltip="Bottom-right" nTooltipSide="bottom-right">Bottom-right</button>`;
  protected readonly alignCode = `<button n-button nTooltip="Aligned to start" nTooltipAlign="start">Start</button>
<button n-button nTooltip="Aligned to center" nTooltipAlign="center">Center</button>
<button n-button nTooltip="Aligned to end" nTooltipAlign="end">End</button>`;
  protected readonly delayCode = `<button n-button nTooltip="Shows instantly" [nTooltipDelay]="0">Instant</button>`;
  protected readonly disabledCode = `<button n-button nTooltip="You will not see me" [nTooltipDisabled]="true">No tooltip</button>`;
  protected readonly templateCode = `<ng-template #richTip>
  <div class="flex items-center gap-1.5">
    <svg><!-- icon --></svg>
    <span>Requires admin access</span>
  </div>
</ng-template>

<button n-button [nTooltip]="richTip">Admin action</button>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { TooltipDirective } from './shared/components/tooltip';

@Component({
  selector: 'app-my-page',
  imports: [TooltipDirective],
  template: \`<button nTooltip="Hello">Hover me</button>\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<button nTooltip="Save changes">Save</button>
<button nTooltip="On the right" nTooltipSide="right">Side</button>
<button [nTooltip]="customTpl">Template</button>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nTooltip', type: 'string | TemplateRef', default: '— (required)', description: 'Tooltip content. Accepts plain text or a template reference.' },
    { prop: 'nTooltipSide', type: "'top' | 'bottom' | 'left' | 'right' | diagonals", default: "'top'", description: 'Preferred side. Flips to the opposite side when there is no room.' },
    { prop: 'nTooltipAlign', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alignment along the side (cardinal sides only; ignored for diagonals).' },
    { prop: 'nTooltipDelay', type: 'number', default: '300', description: 'Delay in milliseconds before showing on mouseenter.' },
    { prop: 'nTooltipDisabled', type: 'boolean', default: 'false', description: 'Disables the tooltip.' },
  ];
}
