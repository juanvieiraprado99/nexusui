import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonGroupComponent } from '../../../shared/components/button-group';
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
  selector: 'app-button-group-doc-page',
  imports: [
    ButtonGroupComponent,
    ButtonComponent,
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
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Button Group</h1>
          <p class="mt-2 text-muted-foreground">Groups related buttons visually and functionally. Propagates variant, size, and disabled state to children. Supports horizontal and vertical layouts with keyboard arrow navigation.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-button-group nAriaLabel="Text alignment">
              <button n-button nVariant="outline">Left</button>
              <button n-button nVariant="outline">Center</button>
              <button n-button nVariant="outline">Right</button>
            </n-button-group>
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
                <app-code-block code="npx @nexuslabs/cli add button-group" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">button-group/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/button-group/</code>.</li>
                  <li class="pt-3">Also install the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">button</code> component (required).</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Vertical</h3>
          <div class="mt-3">
            <app-example title='nOrientation="vertical"' [code]="verticalCode">
              <n-button-group nOrientation="vertical" nAriaLabel="Actions" class="w-48">
                <button n-button nVariant="outline">Profile</button>
                <button n-button nVariant="outline">Settings</button>
                <button n-button nVariant="outline">Sign out</button>
              </n-button-group>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize propagation" [code]="sizesCode">
              <div class="flex flex-col gap-4">
                <n-button-group nSize="sm" nAriaLabel="Small group">
                  <button n-button nVariant="outline">Small</button>
                  <button n-button nVariant="outline">Group</button>
                  <button n-button nVariant="outline">Buttons</button>
                </n-button-group>
                <n-button-group nAriaLabel="Default group">
                  <button n-button nVariant="outline">Default</button>
                  <button n-button nVariant="outline">Group</button>
                  <button n-button nVariant="outline">Buttons</button>
                </n-button-group>
                <n-button-group nSize="lg" nAriaLabel="Large group">
                  <button n-button nVariant="outline">Large</button>
                  <button n-button nVariant="outline">Group</button>
                  <button n-button nVariant="outline">Buttons</button>
                </n-button-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3">
            <app-example title="nVariant propagation" [code]="variantsCode">
              <div class="flex flex-col gap-4">
                <n-button-group nVariant="default" nAriaLabel="Default variant">
                  <button n-button>Bold</button>
                  <button n-button>Italic</button>
                  <button n-button>Underline</button>
                </n-button-group>
                <n-button-group nVariant="outline" nAriaLabel="Outline variant">
                  <button n-button>Bold</button>
                  <button n-button>Italic</button>
                  <button n-button>Underline</button>
                </n-button-group>
                <n-button-group nVariant="secondary" nAriaLabel="Secondary variant">
                  <button n-button>Bold</button>
                  <button n-button>Italic</button>
                  <button n-button>Underline</button>
                </n-button-group>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled</h3>
          <div class="mt-3">
            <app-example title="[nDisabled]" [code]="disabledCode">
              <n-button-group [nDisabled]="true" nAriaLabel="Disabled group">
                <button n-button nVariant="outline">Bold</button>
                <button n-button nVariant="outline">Italic</button>
                <button n-button nVariant="outline">Underline</button>
              </n-button-group>
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
export class ButtonGroupDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly defaultCode = `<n-button-group nAriaLabel="Text alignment">
  <button n-button nVariant="outline">Left</button>
  <button n-button nVariant="outline">Center</button>
  <button n-button nVariant="outline">Right</button>
</n-button-group>`;

  protected readonly verticalCode = `<n-button-group nOrientation="vertical" nAriaLabel="Actions" class="w-48">
  <button n-button nVariant="outline">Profile</button>
  <button n-button nVariant="outline">Settings</button>
  <button n-button nVariant="outline">Sign out</button>
</n-button-group>`;

  protected readonly sizesCode = `<n-button-group nSize="sm" nAriaLabel="Small">
  <button n-button nVariant="outline">Small</button>
  <button n-button nVariant="outline">Group</button>
</n-button-group>

<n-button-group nSize="lg" nAriaLabel="Large">
  <button n-button nVariant="outline">Large</button>
  <button n-button nVariant="outline">Group</button>
</n-button-group>`;

  protected readonly variantsCode = `<n-button-group nVariant="default" nAriaLabel="Default">
  <button n-button>Bold</button>
  <button n-button>Italic</button>
</n-button-group>

<n-button-group nVariant="outline" nAriaLabel="Outline">
  <button n-button>Bold</button>
  <button n-button>Italic</button>
</n-button-group>`;

  protected readonly disabledCode = `<n-button-group [nDisabled]="true" nAriaLabel="Disabled group">
  <button n-button nVariant="outline">Bold</button>
  <button n-button nVariant="outline">Italic</button>
  <button n-button nVariant="outline">Underline</button>
</n-button-group>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { ButtonGroupComponent } from './shared/components/button-group';
import { ButtonComponent } from './shared/components/button';

@Component({
  selector: 'app-my-page',
  imports: [ButtonGroupComponent, ButtonComponent],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-button-group nAriaLabel="Actions">
  <button n-button nVariant="outline">One</button>
  <button n-button nVariant="outline">Two</button>
  <button n-button nVariant="outline">Three</button>
</n-button-group>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nOrientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of the group.' },
    { prop: 'nSize', type: "ButtonVariants['nSize']", default: 'undefined', description: 'Propagates size to all child buttons.' },
    { prop: 'nVariant', type: "ButtonVariants['nVariant']", default: 'undefined', description: 'Propagates variant to all child buttons.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disables all child buttons.' },
    { prop: 'nAriaLabel', type: 'string', default: "''", description: 'Accessible label for the group element.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Additional CSS classes on the root element.' },
  ];
}
