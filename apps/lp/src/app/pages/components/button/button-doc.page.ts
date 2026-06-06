import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button';
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
  selector: 'app-button-doc-page',
  imports: [ButtonComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Button</h1>
          <p class="mt-2 text-muted-foreground">Displays a button or a component that looks like a button.</p>
        </header>

        <div class="mt-8">
          <app-example title="All variants" [code]="variantsCode">
            <div class="flex flex-wrap items-center justify-center gap-3">
              <button n-button type="button">Default</button>
              <button n-button nVariant="secondary" type="button">Secondary</button>
              <button n-button nVariant="success" type="button">Success</button>
              <button n-button nVariant="warning" type="button">Warning</button>
              <button n-button nVariant="destructive" type="button">Destructive</button>
              <button n-button nVariant="outline" type="button">Outline</button>
              <button n-button nVariant="ghost" type="button">Ghost</button>
              <button n-button nVariant="link" type="button">Link</button>
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
                <app-code-block code="npx @nexuslabs/cli add button" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5">
                      <app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" />
                    </div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">button.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">button.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into your project under <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/button/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> util exists at <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/merge-classes.ts</code>.</li>
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
            <app-example title="nSize: sm | default | lg | icon" [code]="sizesCode">
              <div class="flex flex-wrap items-center justify-center gap-3">
                <button n-button nSize="sm" type="button">Small</button>
                <button n-button type="button">Default</button>
                <button n-button nSize="lg" type="button">Large</button>
                <button n-button nSize="icon" type="button" nAriaLabel="Add">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                </button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Icon button</h3>
          <div class="mt-3">
            <app-example title="nSize: icon + nAriaLabel" [code]="iconCode">
              <div class="flex flex-wrap items-center justify-center gap-3">
                <button n-button nSize="icon" type="button" nAriaLabel="Edit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button n-button nVariant="outline" nSize="icon" type="button" nAriaLabel="Delete">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2m-9 0v14h10V6"/></svg>
                </button>
                <button n-button nVariant="ghost" nSize="icon" type="button" nAriaLabel="Settings">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
                </button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading</h3>
          <div class="mt-3">
            <app-example title="nLoading state" [code]="loadingCode">
              <div class="flex flex-wrap items-center justify-center gap-3">
                <button n-button [nLoading]="true" type="button">Saving…</button>
                <button n-button nVariant="outline" [nLoading]="true" type="button">Loading</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <div class="flex flex-wrap items-center justify-center gap-3">
                <button n-button [nDisabled]="true" type="button">Disabled</button>
                <button n-button nVariant="destructive" [nDisabled]="true" type="button">Delete</button>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Click counter</h3>
          <div class="mt-3">
            <app-example title="(nClick) output" [code]="clickCode">
              <div class="flex flex-col items-center gap-3">
                <button n-button type="button" (nClick)="count.set(count() + 1)">Clicked {{ count() }} times</button>
                <button n-button nVariant="ghost" nSize="sm" type="button" (nClick)="count.set(0)">Reset</button>
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
export class ButtonDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly count = signal(0);

  protected readonly variantsCode = `<button n-button>Default</button>
<button n-button nVariant="secondary">Secondary</button>
<button n-button nVariant="success">Success</button>
<button n-button nVariant="warning">Warning</button>
<button n-button nVariant="destructive">Destructive</button>
<button n-button nVariant="outline">Outline</button>
<button n-button nVariant="ghost">Ghost</button>
<button n-button nVariant="link">Link</button>`;

  protected readonly sizesCode = `<button n-button nSize="sm">Small</button>
<button n-button>Default</button>
<button n-button nSize="lg">Large</button>
<button n-button nSize="icon" nAriaLabel="Add">
  <svg ...></svg>
</button>`;

  protected readonly iconCode = `<!-- icon-only buttons: always set nAriaLabel for screen readers -->
<button n-button nSize="icon" nAriaLabel="Edit">
  <svg ...></svg>
</button>
<button n-button nVariant="outline" nSize="icon" nAriaLabel="Delete">
  <svg ...></svg>
</button>`;

  protected readonly loadingCode = `<button n-button [nLoading]="true">Saving…</button>
<button n-button nVariant="outline" [nLoading]="true">Loading</button>`;

  protected readonly disabledCode = `<button n-button [nDisabled]="true">Disabled</button>
<button n-button nVariant="destructive" [nDisabled]="true">Delete</button>`;

  protected readonly clickCode = `count = signal(0);
// template
<button n-button (nClick)="count.set(count() + 1)">
  Clicked {{ count() }} times
</button>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button';

@Component({
  selector: 'app-my-page',
  imports: [ButtonComponent],
  template: \`<button n-button>Click me</button>\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<button n-button nVariant="default" nSize="default">
  Click me
</button>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nVariant', type: "'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' | 'ghost' | 'link'", default: "'default'", description: 'Visual style of the button.' },
    { prop: 'nSize', type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: 'Size of the button.' },
    { prop: 'nType', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'Native button type attribute.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes appended to the host.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows a spinner and blocks click events.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables the button and blocks click events.' },
    { prop: 'nAriaLabel', type: 'string', default: "''", description: 'Accessible label for icon-only buttons (no visible text).' },
    { prop: '(nClick)', type: 'EventEmitter<Event>', default: '—', description: 'Emitted on click when not loading or disabled.' },
  ];
}
