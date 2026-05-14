import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertComponent } from '../../../shared/components/alert';
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
  selector: 'app-alert-doc-page',
  imports: [AlertComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Alert</h1>
          <p class="mt-2 text-muted-foreground">Displays a callout for user attention with optional dismiss and auto-dismiss behavior.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-alert nTitle="Heads up!" nDescription="You can add components to your app using the CLI." />
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
                <app-code-block code="npx @nexuslabs/cli add alert" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">alert.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">alert.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/alert/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nType: default · info · success · warning · destructive" [code]="variantsCode">
              <div class="flex flex-col gap-3 w-full">
                <n-alert nTitle="Default" nDescription="This is a default alert." />
                <n-alert nType="info" nTitle="Info" nDescription="This is an informational alert." />
                <n-alert nType="success" nTitle="Success" nDescription="Your changes have been saved." />
                <n-alert nType="warning" nTitle="Warning" nDescription="Please review before continuing." />
                <n-alert nType="destructive" nTitle="Error" nDescription="Something went wrong. Please try again." />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Dismissible</h3>
          <div class="mt-3">
            <app-example title="nDismissible" [code]="dismissibleCode">
              <div class="w-full">
                <n-alert nType="info" nTitle="Dismissible" nDescription="Click × to dismiss this alert." [nDismissible]="true" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Auto-dismiss</h3>
          <div class="mt-3">
            <app-example title="nAutoDismissDuration" [code]="autoDismissCode">
              <div class="w-full">
                <n-alert nType="success" nTitle="Auto-dismiss" nDescription="This alert disappears after 3 seconds." [nAutoDismissDuration]="3000" />
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
export class AlertDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<n-alert
  nTitle="Heads up!"
  nDescription="You can add components to your app using the CLI."
/>`;

  protected readonly variantsCode = `<n-alert nTitle="Default" nDescription="Default alert." />
<n-alert nType="info" nTitle="Info" nDescription="Informational alert." />
<n-alert nType="success" nTitle="Success" nDescription="Changes saved." />
<n-alert nType="warning" nTitle="Warning" nDescription="Review before continuing." />
<n-alert nType="destructive" nTitle="Error" nDescription="Something went wrong." />`;

  protected readonly dismissibleCode = `<n-alert
  nType="info"
  nTitle="Dismissible"
  nDescription="Click × to dismiss."
  [nDismissible]="true"
  (nDismiss)="onDismiss()"
/>`;

  protected readonly autoDismissCode = `<n-alert
  nType="success"
  nTitle="Auto-dismiss"
  nDescription="Disappears after 3 seconds."
  [nAutoDismissDuration]="3000"
/>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { AlertComponent } from './shared/components/alert';

@Component({
  selector: 'app-my-page',
  imports: [AlertComponent],
  template: \`<n-alert nTitle="Heads up!" nDescription="..." />\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-alert
  nType="default"
  nTitle="Alert title"
  nDescription="Alert description text."
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nType', type: "'default' | 'info' | 'success' | 'warning' | 'destructive'", default: "'default'", description: 'Visual style and icon variant.' },
    { prop: 'nTitle', type: 'string | TemplateRef<void>', default: "''", description: 'Alert title text or template.' },
    { prop: 'nDescription', type: 'string | TemplateRef<void>', default: "''", description: 'Alert body text or template.' },
    { prop: 'nIcon', type: 'TemplateRef<void>', default: '—', description: 'Custom icon template. Overrides the default type icon.' },
    { prop: 'nDismissible', type: 'boolean', default: 'false', description: 'Shows a dismiss (×) button.' },
    { prop: 'nAutoDismissDuration', type: 'number', default: '0', description: 'Auto-dismiss delay in ms. 0 disables it.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes appended to the host.' },
    { prop: '(nDismiss)', type: 'EventEmitter<void>', default: '—', description: 'Emitted when the alert is dismissed.' },
  ];
}
