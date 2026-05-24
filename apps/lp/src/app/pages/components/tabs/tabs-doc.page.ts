import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TabsComponent } from '../../../shared/components/tabs/tabs.component';
import { TabsListComponent } from '../../../shared/components/tabs/tabs-list.component';
import { TabsTriggerComponent } from '../../../shared/components/tabs/tabs-trigger.component';
import { TabsContentComponent } from '../../../shared/components/tabs/tabs-content.component';
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
  selector: 'app-tabs-doc-page',
  imports: [
    TabsComponent, TabsListComponent, TabsTriggerComponent, TabsContentComponent,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">

        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Tabs</h1>
          <p class="mt-2 text-muted-foreground">
            Tab-based navigation with three visual variants, vertical orientation,
            controlled mode, and full keyboard navigation (ARIA tablist pattern).
          </p>
        </header>

        <!-- Default -->
        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-tabs nDefaultValue="account" nClass="w-full">
              <n-tabs-list>
                <button n-tabs-trigger nValue="account">Account</button>
                <button n-tabs-trigger nValue="password">Password</button>
                <button n-tabs-trigger nValue="notifications">Notifications</button>
              </n-tabs-list>
              <n-tabs-content nValue="account" nClass="pt-4">
                <p class="text-sm text-muted-foreground">Manage your account settings here.</p>
              </n-tabs-content>
              <n-tabs-content nValue="password" nClass="pt-4">
                <p class="text-sm text-muted-foreground">Change your password and two-factor authentication.</p>
              </n-tabs-content>
              <n-tabs-content nValue="notifications" nClass="pt-4">
                <p class="text-sm text-muted-foreground">Configure your notification preferences.</p>
              </n-tabs-content>
            </n-tabs>
          </app-example>
        </div>

        <!-- Installation -->
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
                <app-code-block code="npx @nexuslabs/cli add tabs" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">tabs/</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/tabs/</code>.</li>
                  <li class="pt-1">Confirm <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> utility exists in <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">shared/utils/merge-classes.ts</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <!-- Examples -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <!-- Variants -->
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Variants</h3>
          <div class="mt-3 space-y-3">
            <app-example title="pills (default)" [code]="variantPillsCode">
              <n-tabs nDefaultValue="a" nVariant="pills" nClass="w-full">
                <n-tabs-list>
                  <button n-tabs-trigger nValue="a">Overview</button>
                  <button n-tabs-trigger nValue="b">Analytics</button>
                  <button n-tabs-trigger nValue="c">Reports</button>
                </n-tabs-list>
                <n-tabs-content nValue="a" nClass="pt-4"><p class="text-sm text-muted-foreground">Project overview and summary.</p></n-tabs-content>
                <n-tabs-content nValue="b" nClass="pt-4"><p class="text-sm text-muted-foreground">Usage metrics and analytics.</p></n-tabs-content>
                <n-tabs-content nValue="c" nClass="pt-4"><p class="text-sm text-muted-foreground">Exportable reports.</p></n-tabs-content>
              </n-tabs>
            </app-example>

            <app-example title="line" [code]="variantLineCode">
              <n-tabs nDefaultValue="a" nVariant="line" nClass="w-full">
                <n-tabs-list>
                  <button n-tabs-trigger nValue="a">Overview</button>
                  <button n-tabs-trigger nValue="b">Analytics</button>
                  <button n-tabs-trigger nValue="c">Reports</button>
                </n-tabs-list>
                <n-tabs-content nValue="a" nClass="pt-4"><p class="text-sm text-muted-foreground">Project overview and summary.</p></n-tabs-content>
                <n-tabs-content nValue="b" nClass="pt-4"><p class="text-sm text-muted-foreground">Usage metrics and analytics.</p></n-tabs-content>
                <n-tabs-content nValue="c" nClass="pt-4"><p class="text-sm text-muted-foreground">Exportable reports.</p></n-tabs-content>
              </n-tabs>
            </app-example>

            <app-example title="boxed" [code]="variantBoxedCode">
              <n-tabs nDefaultValue="a" nVariant="boxed" nClass="w-full">
                <n-tabs-list>
                  <button n-tabs-trigger nValue="a">Overview</button>
                  <button n-tabs-trigger nValue="b">Analytics</button>
                  <button n-tabs-trigger nValue="c">Reports</button>
                </n-tabs-list>
                <n-tabs-content nValue="a" nClass="pt-4"><p class="text-sm text-muted-foreground">Project overview and summary.</p></n-tabs-content>
                <n-tabs-content nValue="b" nClass="pt-4"><p class="text-sm text-muted-foreground">Usage metrics and analytics.</p></n-tabs-content>
                <n-tabs-content nValue="c" nClass="pt-4"><p class="text-sm text-muted-foreground">Exportable reports.</p></n-tabs-content>
              </n-tabs>
            </app-example>
          </div>

          <!-- Orientation -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Orientation</h3>
          <div class="mt-3">
            <app-example title="Vertical (line)" [code]="verticalCode">
              <n-tabs nDefaultValue="profile" nOrientation="vertical" nVariant="line" nClass="w-full">
                <n-tabs-list nClass="min-w-36">
                  <button n-tabs-trigger nValue="profile">Profile</button>
                  <button n-tabs-trigger nValue="security">Security</button>
                  <button n-tabs-trigger nValue="appearance">Appearance</button>
                  <button n-tabs-trigger nValue="integrations" [nDisabled]="true">Integrations</button>
                </n-tabs-list>
                <div class="flex-1 pl-6">
                  <n-tabs-content nValue="profile">
                    <h3 class="text-sm font-medium">Profile</h3>
                    <p class="mt-1 text-sm text-muted-foreground">Update your name, email, and avatar.</p>
                  </n-tabs-content>
                  <n-tabs-content nValue="security">
                    <h3 class="text-sm font-medium">Security</h3>
                    <p class="mt-1 text-sm text-muted-foreground">Manage password and two-factor authentication.</p>
                  </n-tabs-content>
                  <n-tabs-content nValue="appearance">
                    <h3 class="text-sm font-medium">Appearance</h3>
                    <p class="mt-1 text-sm text-muted-foreground">Choose between light, dark, or system theme.</p>
                  </n-tabs-content>
                  <n-tabs-content nValue="integrations">
                    <h3 class="text-sm font-medium">Integrations</h3>
                    <p class="mt-1 text-sm text-muted-foreground">Connect external services.</p>
                  </n-tabs-content>
                </div>
              </n-tabs>
            </app-example>
          </div>

          <!-- Disabled -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Disabled trigger</h3>
          <div class="mt-3">
            <app-example title="nDisabled" [code]="disabledCode">
              <n-tabs nDefaultValue="active" nClass="w-full">
                <n-tabs-list>
                  <button n-tabs-trigger nValue="active">Active</button>
                  <button n-tabs-trigger nValue="draft">Draft</button>
                  <button n-tabs-trigger nValue="archived" [nDisabled]="true">Archived</button>
                </n-tabs-list>
                <n-tabs-content nValue="active" nClass="pt-4">
                  <p class="text-sm text-muted-foreground">3 active items.</p>
                </n-tabs-content>
                <n-tabs-content nValue="draft" nClass="pt-4">
                  <p class="text-sm text-muted-foreground">1 saved draft.</p>
                </n-tabs-content>
                <n-tabs-content nValue="archived" nClass="pt-4">
                  <p class="text-sm text-muted-foreground">Archived items.</p>
                </n-tabs-content>
              </n-tabs>
            </app-example>
          </div>

          <!-- Controlled -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Controlled</h3>
          <div class="mt-3">
            <app-example title="[(nValue)]" [code]="controlledCode">
              <div class="flex flex-col gap-4 w-full">
                <div class="flex items-center gap-3">
                  <span class="text-xs text-muted-foreground">Active tab:</span>
                  <code class="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{{ activeTab() }}</code>
                  <button
                    type="button"
                    class="text-xs text-primary underline underline-offset-2"
                    (click)="activeTab.set('b')"
                  >Go to Tab 2</button>
                </div>
                <n-tabs [(nValue)]="activeTab">
                  <n-tabs-list>
                    <button n-tabs-trigger nValue="a">Tab 1</button>
                    <button n-tabs-trigger nValue="b">Tab 2</button>
                    <button n-tabs-trigger nValue="c">Tab 3</button>
                  </n-tabs-list>
                  <n-tabs-content nValue="a" nClass="pt-4"><p class="text-sm text-muted-foreground">Content for tab 1.</p></n-tabs-content>
                  <n-tabs-content nValue="b" nClass="pt-4"><p class="text-sm text-muted-foreground">Content for tab 2.</p></n-tabs-content>
                  <n-tabs-content nValue="c" nClass="pt-4"><p class="text-sm text-muted-foreground">Content for tab 3.</p></n-tabs-content>
                </n-tabs>
              </div>
            </app-example>
          </div>

          <!-- Stretch -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Stretch</h3>
          <div class="mt-3">
            <app-example title="nStretch — triggers fill full width" [code]="stretchCode">
              <n-tabs nDefaultValue="a" [nStretch]="true" nClass="w-full">
                <n-tabs-list nClass="w-full">
                  <button n-tabs-trigger nValue="a">Overview</button>
                  <button n-tabs-trigger nValue="b">Analytics</button>
                  <button n-tabs-trigger nValue="c">Reports</button>
                </n-tabs-list>
                <n-tabs-content nValue="a" nClass="pt-4"><p class="text-sm text-muted-foreground">Project overview.</p></n-tabs-content>
                <n-tabs-content nValue="b" nClass="pt-4"><p class="text-sm text-muted-foreground">Usage metrics.</p></n-tabs-content>
                <n-tabs-content nValue="c" nClass="pt-4"><p class="text-sm text-muted-foreground">Exportable reports.</p></n-tabs-content>
              </n-tabs>
            </app-example>
          </div>

          <!-- Sizes -->
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3 space-y-3">
            <app-example title="sm · default · lg" [code]="sizesCode">
              <div class="flex flex-col gap-6 w-full">
                <n-tabs nDefaultValue="a" nVariant="line" nClass="w-full">
                  <n-tabs-list>
                    <button n-tabs-trigger nValue="a" nSize="sm">Small</button>
                    <button n-tabs-trigger nValue="b" nSize="sm">Small</button>
                    <button n-tabs-trigger nValue="c" nSize="sm">Small</button>
                  </n-tabs-list>
                  <n-tabs-content nValue="a" nClass="pt-3"><p class="text-xs text-muted-foreground">sm size.</p></n-tabs-content>
                  <n-tabs-content nValue="b" nClass="pt-3"><p class="text-xs text-muted-foreground">sm size.</p></n-tabs-content>
                  <n-tabs-content nValue="c" nClass="pt-3"><p class="text-xs text-muted-foreground">sm size.</p></n-tabs-content>
                </n-tabs>
                <n-tabs nDefaultValue="a" nVariant="line" nClass="w-full">
                  <n-tabs-list>
                    <button n-tabs-trigger nValue="a">Default</button>
                    <button n-tabs-trigger nValue="b">Default</button>
                    <button n-tabs-trigger nValue="c">Default</button>
                  </n-tabs-list>
                  <n-tabs-content nValue="a" nClass="pt-3"><p class="text-sm text-muted-foreground">Default size.</p></n-tabs-content>
                  <n-tabs-content nValue="b" nClass="pt-3"><p class="text-sm text-muted-foreground">Default size.</p></n-tabs-content>
                  <n-tabs-content nValue="c" nClass="pt-3"><p class="text-sm text-muted-foreground">Default size.</p></n-tabs-content>
                </n-tabs>
                <n-tabs nDefaultValue="a" nVariant="line" nClass="w-full">
                  <n-tabs-list>
                    <button n-tabs-trigger nValue="a" nSize="lg">Large</button>
                    <button n-tabs-trigger nValue="b" nSize="lg">Large</button>
                    <button n-tabs-trigger nValue="c" nSize="lg">Large</button>
                  </n-tabs-list>
                  <n-tabs-content nValue="a" nClass="pt-3"><p class="text-base text-muted-foreground">lg size.</p></n-tabs-content>
                  <n-tabs-content nValue="b" nClass="pt-3"><p class="text-base text-muted-foreground">lg size.</p></n-tabs-content>
                  <n-tabs-content nValue="c" nClass="pt-3"><p class="text-base text-muted-foreground">lg size.</p></n-tabs-content>
                </n-tabs>
              </div>
            </app-example>
          </div>
        </section>

        <!-- API Reference -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>

          <!-- n-tabs -->
          <h3 class="mt-6 text-sm font-semibold"><code class="rounded bg-muted px-1.5 py-0.5 font-mono">n-tabs</code></h3>
          <div class="mt-3 overflow-hidden rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-muted/40 text-left text-xs text-muted-foreground">
                  <th class="px-4 py-2.5 font-medium">Prop</th>
                  <th class="px-4 py-2.5 font-medium">Type</th>
                  <th class="px-4 py-2.5 font-medium">Default</th>
                  <th class="px-4 py-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of tabsApiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2.5 text-xs text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- n-tabs-trigger -->
          <h3 class="mt-6 text-sm font-semibold"><code class="rounded bg-muted px-1.5 py-0.5 font-mono">button[n-tabs-trigger]</code></h3>
          <div class="mt-3 overflow-hidden rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-muted/40 text-left text-xs text-muted-foreground">
                  <th class="px-4 py-2.5 font-medium">Prop</th>
                  <th class="px-4 py-2.5 font-medium">Type</th>
                  <th class="px-4 py-2.5 font-medium">Default</th>
                  <th class="px-4 py-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of triggerApiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2.5 text-xs text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- n-tabs-content -->
          <h3 class="mt-6 text-sm font-semibold"><code class="rounded bg-muted px-1.5 py-0.5 font-mono">n-tabs-content</code></h3>
          <div class="mt-3 overflow-hidden rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-muted/40 text-left text-xs text-muted-foreground">
                  <th class="px-4 py-2.5 font-medium">Prop</th>
                  <th class="px-4 py-2.5 font-medium">Type</th>
                  <th class="px-4 py-2.5 font-medium">Default</th>
                  <th class="px-4 py-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of contentApiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2.5 text-xs text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Keyboard -->
          <h3 class="mt-6 text-sm font-semibold">Keyboard navigation</h3>
          <div class="mt-3 overflow-hidden rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-muted/40 text-left text-xs text-muted-foreground">
                  <th class="px-4 py-2.5 font-medium">Key</th>
                  <th class="px-4 py-2.5 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                @for (row of keyboardRows; track row.key) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2.5"><kbd class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">{{ row.key }}</kbd></td>
                    <td class="px-4 py-2.5 text-xs text-muted-foreground">{{ row.action }}</td>
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
export class TabsDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly activeTab  = signal('a');

  protected readonly importCode = `import {
  TabsComponent,
  TabsListComponent,
  TabsTriggerComponent,
  TabsContentComponent,
} from '@/shared/components/tabs';`;

  protected readonly usageCode = `<n-tabs nDefaultValue="account">
  <n-tabs-list>
    <button n-tabs-trigger nValue="account">Account</button>
    <button n-tabs-trigger nValue="password">Password</button>
  </n-tabs-list>

  <n-tabs-content nValue="account" nClass="pt-4">
    Account settings.
  </n-tabs-content>
  <n-tabs-content nValue="password" nClass="pt-4">
    Change your password.
  </n-tabs-content>
</n-tabs>`;

  protected readonly defaultCode = `<n-tabs nDefaultValue="account">
  <n-tabs-list>
    <button n-tabs-trigger nValue="account">Account</button>
    <button n-tabs-trigger nValue="password">Password</button>
    <button n-tabs-trigger nValue="notifications">Notifications</button>
  </n-tabs-list>
  <n-tabs-content nValue="account" nClass="pt-4">...</n-tabs-content>
  <n-tabs-content nValue="password" nClass="pt-4">...</n-tabs-content>
  <n-tabs-content nValue="notifications" nClass="pt-4">...</n-tabs-content>
</n-tabs>`;

  protected readonly variantPillsCode = `<n-tabs nDefaultValue="a" nVariant="pills">
  <n-tabs-list>
    <button n-tabs-trigger nValue="a">Overview</button>
    <button n-tabs-trigger nValue="b">Analytics</button>
    <button n-tabs-trigger nValue="c">Reports</button>
  </n-tabs-list>
  <n-tabs-content nValue="a" nClass="pt-4">...</n-tabs-content>
  <n-tabs-content nValue="b" nClass="pt-4">...</n-tabs-content>
  <n-tabs-content nValue="c" nClass="pt-4">...</n-tabs-content>
</n-tabs>`;

  protected readonly variantLineCode = `<n-tabs nDefaultValue="a" nVariant="line">
  ...
</n-tabs>`;

  protected readonly variantBoxedCode = `<n-tabs nDefaultValue="a" nVariant="boxed">
  ...
</n-tabs>`;

  protected readonly verticalCode = `<n-tabs nDefaultValue="profile" nOrientation="vertical" nVariant="line">
  <n-tabs-list nClass="min-w-36">
    <button n-tabs-trigger nValue="profile">Profile</button>
    <button n-tabs-trigger nValue="security">Security</button>
    <button n-tabs-trigger nValue="integrations" [nDisabled]="true">Integrations</button>
  </n-tabs-list>
  <div class="flex-1 pl-6">
    <n-tabs-content nValue="profile">...</n-tabs-content>
    <n-tabs-content nValue="security">...</n-tabs-content>
    <n-tabs-content nValue="integrations">...</n-tabs-content>
  </div>
</n-tabs>`;

  protected readonly disabledCode = `<n-tabs nDefaultValue="active">
  <n-tabs-list>
    <button n-tabs-trigger nValue="active">Active</button>
    <button n-tabs-trigger nValue="draft">Draft</button>
    <button n-tabs-trigger nValue="archived" [nDisabled]="true">Archived</button>
  </n-tabs-list>
  ...
</n-tabs>`;

  protected readonly controlledCode = `// TypeScript
activeTab = signal('a');

// Template
<n-tabs [(nValue)]="activeTab">
  <n-tabs-list>
    <button n-tabs-trigger nValue="a">Tab 1</button>
    <button n-tabs-trigger nValue="b">Tab 2</button>
  </n-tabs-list>
  <n-tabs-content nValue="a" nClass="pt-4">...</n-tabs-content>
  <n-tabs-content nValue="b" nClass="pt-4">...</n-tabs-content>
</n-tabs>`;

  protected readonly stretchCode = `<n-tabs nDefaultValue="a" [nStretch]="true">
  <n-tabs-list nClass="w-full">
    <button n-tabs-trigger nValue="a">Overview</button>
    <button n-tabs-trigger nValue="b">Analytics</button>
    <button n-tabs-trigger nValue="c">Reports</button>
  </n-tabs-list>
  ...
</n-tabs>`;

  protected readonly sizesCode = `<button n-tabs-trigger nValue="a" nSize="sm">Small</button>
<button n-tabs-trigger nValue="b">Default</button>
<button n-tabs-trigger nValue="c" nSize="lg">Large</button>`;

  protected readonly tabsApiRows: ApiRow[] = [
    { prop: 'nValue',        type: 'string',                       default: "''",           description: 'Active tab value. Use with [(nValue)] for controlled mode.' },
    { prop: 'nDefaultValue', type: 'string',                       default: "''",           description: 'Initial active tab (uncontrolled mode).' },
    { prop: 'nVariant',      type: "'pills' | 'line' | 'boxed'",   default: "'pills'",      description: 'Visual style of the active indicator.' },
    { prop: 'nOrientation',  type: "'horizontal' | 'vertical'",    default: "'horizontal'", description: 'Direction of the tab list and animated indicator.' },
    { prop: 'nStretch',      type: 'boolean',                      default: 'false',        description: 'Triggers grow to fill the full list width.' },
    { prop: 'nClass',        type: 'string',                       default: "''",           description: 'Additional classes on the root element.' },
    { prop: 'nValueChange',  type: 'string (output)',               default: '—',           description: 'Emits the new value when the active tab changes.' },
  ];

  protected readonly triggerApiRows: ApiRow[] = [
    { prop: 'nValue',    type: 'string (required)',       default: '—',          description: 'Unique identifier for this tab. Must match the corresponding n-tabs-content nValue.' },
    { prop: 'nDisabled', type: 'boolean',                 default: 'false',      description: 'Prevents click and keyboard focus on this trigger.' },
    { prop: 'nSize',     type: "'sm' | 'default' | 'lg'", default: "'default'",  description: 'Trigger size (text and padding).' },
    { prop: 'nClass',    type: 'string',                  default: "''",         description: 'Additional classes.' },
  ];

  protected readonly contentApiRows: ApiRow[] = [
    { prop: 'nValue', type: 'string (required)', default: '—',  description: 'Panel identifier. Must match the corresponding trigger nValue.' },
    { prop: 'nClass', type: 'string',             default: "''", description: 'Additional classes on the inner content wrapper (data-slot="content").' },
  ];

  protected readonly keyboardRows: { key: string; action: string }[] = [
    { key: 'ArrowLeft / ArrowRight', action: 'Move focus between triggers (horizontal orientation). Activates the tab.' },
    { key: 'ArrowUp / ArrowDown',    action: 'Move focus between triggers (vertical orientation). Activates the tab.' },
    { key: 'Home',                   action: 'Move focus to the first enabled trigger.' },
    { key: 'End',                    action: 'Move focus to the last enabled trigger.' },
    { key: 'Tab',                    action: 'Move focus from the active trigger into the tab panel.' },
  ];
}
