import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ContextMenuComponent,
  ContextMenuTriggerDirective,
  ContextMenuContentComponent,
  ContextMenuItemComponent,
  ContextMenuCheckboxItemComponent,
  ContextMenuRadioGroupComponent,
  ContextMenuRadioItemComponent,
  ContextMenuLabelComponent,
  ContextMenuSeparatorComponent,
  ContextMenuShortcutComponent,
  ContextMenuSubComponent,
  ContextMenuSubTriggerComponent,
  ContextMenuSubContentComponent,
} from '../../../shared/components/context-menu';
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
  selector: 'app-context-menu-doc-page',
  imports: [
    ContextMenuComponent, ContextMenuTriggerDirective, ContextMenuContentComponent,
    ContextMenuItemComponent, ContextMenuCheckboxItemComponent,
    ContextMenuRadioGroupComponent, ContextMenuRadioItemComponent,
    ContextMenuLabelComponent, ContextMenuSeparatorComponent,
    ContextMenuShortcutComponent, ContextMenuSubComponent,
    ContextMenuSubTriggerComponent, ContextMenuSubContentComponent,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Context Menu</h1>
          <p class="mt-2 text-muted-foreground">Displays a menu anchored to the right-click position of a trigger element. Supports keyboard navigation, submenus, checkboxes, and radio groups.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-context-menu>
              <div n-context-menu-trigger
                class="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
                Right-click here
              </div>
              <n-context-menu-content>
                <n-context-menu-item>Back</n-context-menu-item>
                <n-context-menu-item>Forward</n-context-menu-item>
                <n-context-menu-item>Reload</n-context-menu-item>
                <n-context-menu-separator />
                <n-context-menu-item nVariant="destructive">Delete</n-context-menu-item>
              </n-context-menu-content>
            </n-context-menu>
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
                <app-code-block code="npx @nexuslabs/cli add context-menu" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install &#64;angular/cdk clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">context-menu/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/context-menu/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Checkbox items</h3>
          <div class="mt-3">
            <app-example title="[(nChecked)] toggle without closing" [code]="checkboxCode">
              <n-context-menu>
                <div n-context-menu-trigger
                  class="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
                  Right-click for checkbox items
                </div>
                <n-context-menu-content>
                  <n-context-menu-label>Appearance</n-context-menu-label>
                  <n-context-menu-separator />
                  <n-context-menu-checkbox-item [(nChecked)]="showToolbar">Show Toolbar</n-context-menu-checkbox-item>
                  <n-context-menu-checkbox-item [(nChecked)]="showStatusBar">Show Status Bar</n-context-menu-checkbox-item>
                </n-context-menu-content>
              </n-context-menu>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Radio group</h3>
          <div class="mt-3">
            <app-example title="Exclusive selection via n-context-menu-radio-group" [code]="radioCode">
              <n-context-menu>
                <div n-context-menu-trigger
                  class="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
                  Right-click for radio group
                </div>
                <n-context-menu-content>
                  <n-context-menu-label>View mode</n-context-menu-label>
                  <n-context-menu-separator />
                  <n-context-menu-radio-group [(nValue)]="viewMode">
                    <n-context-menu-radio-item nValue="grid">Grid</n-context-menu-radio-item>
                    <n-context-menu-radio-item nValue="list">List</n-context-menu-radio-item>
                    <n-context-menu-radio-item nValue="columns">Columns</n-context-menu-radio-item>
                  </n-context-menu-radio-group>
                </n-context-menu-content>
              </n-context-menu>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Submenu</h3>
          <div class="mt-3">
            <app-example title="Nested menu via n-context-menu-sub" [code]="submenuCode">
              <n-context-menu>
                <div n-context-menu-trigger
                  class="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
                  Right-click for submenu
                </div>
                <n-context-menu-content>
                  <n-context-menu-item>Cut</n-context-menu-item>
                  <n-context-menu-item>Copy</n-context-menu-item>
                  <n-context-menu-separator />
                  <n-context-menu-sub>
                    <n-context-menu-sub-trigger>Share</n-context-menu-sub-trigger>
                    <n-context-menu-sub-content>
                      <n-context-menu-item>Email</n-context-menu-item>
                      <n-context-menu-item>Link</n-context-menu-item>
                      <n-context-menu-item>Messages</n-context-menu-item>
                    </n-context-menu-sub-content>
                  </n-context-menu-sub>
                </n-context-menu-content>
              </n-context-menu>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Shortcuts</h3>
          <div class="mt-3">
            <app-example title="Keyboard shortcuts via n-context-menu-shortcut" [code]="shortcutsCode">
              <n-context-menu>
                <div n-context-menu-trigger
                  class="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground select-none">
                  Right-click for shortcuts
                </div>
                <n-context-menu-content>
                  <n-context-menu-item>
                    Undo <n-context-menu-shortcut>⌘Z</n-context-menu-shortcut>
                  </n-context-menu-item>
                  <n-context-menu-item>
                    Redo <n-context-menu-shortcut>⌘⇧Z</n-context-menu-shortcut>
                  </n-context-menu-item>
                  <n-context-menu-separator />
                  <n-context-menu-item>
                    Cut <n-context-menu-shortcut>⌘X</n-context-menu-shortcut>
                  </n-context-menu-item>
                  <n-context-menu-item>
                    Copy <n-context-menu-shortcut>⌘C</n-context-menu-shortcut>
                  </n-context-menu-item>
                  <n-context-menu-item>
                    Paste <n-context-menu-shortcut>⌘V</n-context-menu-shortcut>
                  </n-context-menu-item>
                </n-context-menu-content>
              </n-context-menu>
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
export class ContextMenuDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly showToolbar = signal(true);
  protected readonly showStatusBar = signal(false);
  protected readonly viewMode = signal('grid');

  protected readonly defaultCode = `<n-context-menu>
  <div n-context-menu-trigger class="...">
    Right-click here
  </div>
  <n-context-menu-content>
    <n-context-menu-item>Back</n-context-menu-item>
    <n-context-menu-item>Forward</n-context-menu-item>
    <n-context-menu-separator />
    <n-context-menu-item nVariant="destructive">Delete</n-context-menu-item>
  </n-context-menu-content>
</n-context-menu>`;

  protected readonly checkboxCode = `showToolbar = signal(true);
showStatusBar = signal(false);

// template
<n-context-menu-checkbox-item [(nChecked)]="showToolbar">
  Show Toolbar
</n-context-menu-checkbox-item>`;

  protected readonly radioCode = `viewMode = signal('grid');

// template
<n-context-menu-radio-group [(nValue)]="viewMode">
  <n-context-menu-radio-item nValue="grid">Grid</n-context-menu-radio-item>
  <n-context-menu-radio-item nValue="list">List</n-context-menu-radio-item>
</n-context-menu-radio-group>`;

  protected readonly submenuCode = `<n-context-menu-sub>
  <n-context-menu-sub-trigger>Share</n-context-menu-sub-trigger>
  <n-context-menu-sub-content>
    <n-context-menu-item>Email</n-context-menu-item>
    <n-context-menu-item>Link</n-context-menu-item>
  </n-context-menu-sub-content>
</n-context-menu-sub>`;

  protected readonly shortcutsCode = `<n-context-menu-item>
  Undo <n-context-menu-shortcut>⌘Z</n-context-menu-shortcut>
</n-context-menu-item>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  ContextMenuComponent,
  ContextMenuTriggerDirective,
  ContextMenuContentComponent,
  ContextMenuItemComponent,
  ContextMenuSeparatorComponent,
} from './shared/components/context-menu';

@Component({
  selector: 'app-my-page',
  imports: [
    ContextMenuComponent, ContextMenuTriggerDirective,
    ContextMenuContentComponent, ContextMenuItemComponent,
    ContextMenuSeparatorComponent,
  ],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-context-menu>
  <div n-context-menu-trigger class="...">
    Right-click area
  </div>
  <n-context-menu-content>
    <n-context-menu-item>Action</n-context-menu-item>
    <n-context-menu-separator />
    <n-context-menu-item nVariant="destructive">Delete</n-context-menu-item>
  </n-context-menu-content>
</n-context-menu>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nOpen', type: 'boolean', default: 'false', description: 'Two-way bindable open state.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Custom ID for the context menu.' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when the menu opens or closes.' },
    { prop: 'ContextMenuItemComponent.nVariant', type: "'default' | 'destructive'", default: "'default'", description: 'Visual style of the menu item.' },
    { prop: 'ContextMenuItemComponent.nDisabled', type: 'boolean', default: 'false', description: 'Disables the menu item.' },
    { prop: 'ContextMenuItemComponent.(nSelect)', type: 'EventEmitter<void>', default: '—', description: 'Emitted when the item is selected.' },
    { prop: 'ContextMenuCheckboxItemComponent.nChecked', type: 'boolean', default: 'false', description: 'Two-way bindable checked state.' },
    { prop: 'ContextMenuRadioGroupComponent.nValue', type: 'string', default: "''", description: 'Two-way bindable selected value.' },
  ];
}
