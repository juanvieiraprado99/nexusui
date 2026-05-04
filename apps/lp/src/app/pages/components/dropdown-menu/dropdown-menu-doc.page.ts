import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DropdownMenuComponent,
  DropdownMenuTriggerDirective,
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuLabelComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuGroupComponent,
  DropdownMenuShortcutComponent,
  DropdownMenuSubComponent,
  DropdownMenuSubTriggerComponent,
  DropdownMenuSubContentComponent,
} from '../../../shared/components/dropdown-menu';
import { ButtonComponent } from '../../../shared/components/button';
import { InputComponent } from '../../../shared/components/input';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow { prop: string; type: string; default: string; description: string; }

@Component({
  selector: 'app-dropdown-menu-doc-page',
  imports: [
    DropdownMenuComponent, DropdownMenuTriggerDirective, DropdownMenuContentComponent,
    DropdownMenuItemComponent, DropdownMenuLabelComponent, DropdownMenuSeparatorComponent,
    DropdownMenuGroupComponent, DropdownMenuShortcutComponent,
    DropdownMenuSubComponent, DropdownMenuSubTriggerComponent, DropdownMenuSubContentComponent,
    ButtonComponent, InputComponent, ReactiveFormsModule,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Dropdown Menu</h1>
          <p class="mt-2 text-muted-foreground">A menu that appears on trigger click. Supports labels, separators, shortcuts, and submenus.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-dropdown-menu>
              <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>Open menu</button>
              <n-dropdown-menu-content>
                <n-dropdown-menu-label>My Account</n-dropdown-menu-label>
                <n-dropdown-menu-separator />
                <n-dropdown-menu-item>Profile</n-dropdown-menu-item>
                <n-dropdown-menu-item>Settings</n-dropdown-menu-item>
                <n-dropdown-menu-item>Billing</n-dropdown-menu-item>
                <n-dropdown-menu-separator />
                <n-dropdown-menu-item nVariant="destructive">Sign out</n-dropdown-menu-item>
              </n-dropdown-menu-content>
            </n-dropdown-menu>
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
                <app-code-block code="npx @nexuslabs/cli@alpha add dropdown-menu" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge @angular/cdk" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">dropdown-menu/</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/dropdown-menu/</code>.</li>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">With shortcuts</h3>
          <div class="mt-3">
            <app-example title="n-dropdown-menu-shortcut" [code]="shortcutsCode">
              <n-dropdown-menu>
                <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>Actions</button>
                <n-dropdown-menu-content>
                  <n-dropdown-menu-item>
                    New Tab
                    <n-dropdown-menu-shortcut>⌘T</n-dropdown-menu-shortcut>
                  </n-dropdown-menu-item>
                  <n-dropdown-menu-item>
                    New Window
                    <n-dropdown-menu-shortcut>⌘N</n-dropdown-menu-shortcut>
                  </n-dropdown-menu-item>
                  <n-dropdown-menu-separator />
                  <n-dropdown-menu-item>
                    Close Tab
                    <n-dropdown-menu-shortcut>⌘W</n-dropdown-menu-shortcut>
                  </n-dropdown-menu-item>
                </n-dropdown-menu-content>
              </n-dropdown-menu>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With groups</h3>
          <div class="mt-3">
            <app-example title="n-dropdown-menu-group" [code]="groupsCode">
              <n-dropdown-menu>
                <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>User menu</button>
                <n-dropdown-menu-content>
                  <n-dropdown-menu-group>
                    <n-dropdown-menu-label>Account</n-dropdown-menu-label>
                    <n-dropdown-menu-item>Profile</n-dropdown-menu-item>
                    <n-dropdown-menu-item>Settings</n-dropdown-menu-item>
                  </n-dropdown-menu-group>
                  <n-dropdown-menu-separator />
                  <n-dropdown-menu-group>
                    <n-dropdown-menu-label>Workspace</n-dropdown-menu-label>
                    <n-dropdown-menu-item>Members</n-dropdown-menu-item>
                    <n-dropdown-menu-item>Billing</n-dropdown-menu-item>
                  </n-dropdown-menu-group>
                </n-dropdown-menu-content>
              </n-dropdown-menu>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Destructive item</h3>
          <div class="mt-3">
            <app-example title="nVariant: destructive" [code]="destructiveCode">
              <n-dropdown-menu>
                <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>Session</button>
                <n-dropdown-menu-content>
                  <n-dropdown-menu-item>Profile</n-dropdown-menu-item>
                  <n-dropdown-menu-item>Settings</n-dropdown-menu-item>
                  <n-dropdown-menu-separator />
                  <n-dropdown-menu-item nVariant="destructive">
                    Sign out
                    <n-dropdown-menu-shortcut>⇧⌘Q</n-dropdown-menu-shortcut>
                  </n-dropdown-menu-item>
                </n-dropdown-menu-content>
              </n-dropdown-menu>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With submenu</h3>
          <div class="mt-3">
            <app-example title="n-dropdown-menu-sub" [code]="submenuCode">
              <n-dropdown-menu>
                <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>Share</button>
                <n-dropdown-menu-content>
                  <n-dropdown-menu-item>Copy link</n-dropdown-menu-item>
                  <n-dropdown-menu-separator />
                  <n-dropdown-menu-sub>
                    <n-dropdown-menu-sub-trigger>Invite</n-dropdown-menu-sub-trigger>
                    <n-dropdown-menu-sub-content>
                      <n-dropdown-menu-item>By email</n-dropdown-menu-item>
                      <n-dropdown-menu-item>By message</n-dropdown-menu-item>
                      <n-dropdown-menu-item>Public link</n-dropdown-menu-item>
                    </n-dropdown-menu-sub-content>
                  </n-dropdown-menu-sub>
                  <n-dropdown-menu-item>More options...</n-dropdown-menu-item>
                </n-dropdown-menu-content>
              </n-dropdown-menu>
            </app-example>
          </div>
          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Form actions</h3>
          <div class="mt-3">
            <app-example title="Menu + form integration" [code]="formActionsCode">
              <form [formGroup]="actionForm" (ngSubmit)="publishAction()" class="flex flex-col gap-3 max-w-sm">
                <n-input formControlName="title" nLabel="Title" [nRequired]="true" />
                <n-input formControlName="slug" nLabel="Slug" />
                <div class="flex items-center gap-2">
                  <button n-button type="submit" [nDisabled]="actionForm.invalid">Publish</button>
                  <n-dropdown-menu>
                    <button n-button n-dropdown-menu-trigger nVariant="outline" type="button" aria-label="More actions">⋯</button>
                    <n-dropdown-menu-content>
                      <n-dropdown-menu-item>
                        Save draft
                        <n-dropdown-menu-shortcut>⌘S</n-dropdown-menu-shortcut>
                      </n-dropdown-menu-item>
                      <n-dropdown-menu-item>
                        Duplicate
                        <n-dropdown-menu-shortcut>⌘D</n-dropdown-menu-shortcut>
                      </n-dropdown-menu-item>
                      <n-dropdown-menu-separator />
                      <n-dropdown-menu-item nVariant="destructive">Discard</n-dropdown-menu-item>
                    </n-dropdown-menu-content>
                  </n-dropdown-menu>
                </div>
                @if (lastAction()) {
                  <p class="text-sm text-muted-foreground">Last action: {{ lastAction() }}</p>
                }
              </form>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-semibold">n-dropdown-menu</h3>
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
          <h3 class="mt-6 text-sm font-semibold">Sub-components</h3>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Component</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of subComponents; track row.name) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.name }}</td>
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
export class DropdownMenuDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly lastAction = signal<string | null>(null);
  protected readonly actionForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    slug: new FormControl('', { nonNullable: true }),
  });

  protected publishAction(): void {
    if (this.actionForm.invalid) return;
    this.lastAction.set(`publish: ${JSON.stringify(this.actionForm.value)}`);
  }

  protected readonly defaultCode = `<n-dropdown-menu>
  <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>Open menu</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-label>My Account</n-dropdown-menu-label>
    <n-dropdown-menu-separator />
    <n-dropdown-menu-item>Profile</n-dropdown-menu-item>
    <n-dropdown-menu-item>Settings</n-dropdown-menu-item>
    <n-dropdown-menu-separator />
    <n-dropdown-menu-item nVariant="destructive">Sign out</n-dropdown-menu-item>
  </n-dropdown-menu-content>
</n-dropdown-menu>`;

  protected readonly shortcutsCode = `<n-dropdown-menu>
  <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>Actions</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-item>
      New Tab
      <n-dropdown-menu-shortcut>⌘T</n-dropdown-menu-shortcut>
    </n-dropdown-menu-item>
    <n-dropdown-menu-item>
      Close Tab
      <n-dropdown-menu-shortcut>⌘W</n-dropdown-menu-shortcut>
    </n-dropdown-menu-item>
  </n-dropdown-menu-content>
</n-dropdown-menu>`;

  protected readonly groupsCode = `<n-dropdown-menu>
  <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>User menu</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-group>
      <n-dropdown-menu-label>Account</n-dropdown-menu-label>
      <n-dropdown-menu-item>Profile</n-dropdown-menu-item>
      <n-dropdown-menu-item>Settings</n-dropdown-menu-item>
    </n-dropdown-menu-group>
    <n-dropdown-menu-separator />
    <n-dropdown-menu-group>
      <n-dropdown-menu-label>Workspace</n-dropdown-menu-label>
      <n-dropdown-menu-item>Members</n-dropdown-menu-item>
    </n-dropdown-menu-group>
  </n-dropdown-menu-content>
</n-dropdown-menu>`;
  protected readonly destructiveCode = `<n-dropdown-menu>
  <button n-button nVariant="outline" type="button" n-dropdown-menu-trigger>Session</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-item>Profile</n-dropdown-menu-item>
    <n-dropdown-menu-item>Settings</n-dropdown-menu-item>
    <n-dropdown-menu-separator />
    <n-dropdown-menu-item nVariant="destructive">
      Sign out
      <n-dropdown-menu-shortcut>⇧⌘Q</n-dropdown-menu-shortcut>
    </n-dropdown-menu-item>
  </n-dropdown-menu-content>
</n-dropdown-menu>`;
  protected readonly submenuCode = `<n-dropdown-menu>
  <button n-button nVariant="outline" n-dropdown-menu-trigger>Share</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-item>Copy link</n-dropdown-menu-item>
    <n-dropdown-menu-separator />
    <n-dropdown-menu-sub>
      <n-dropdown-menu-sub-trigger>Invite</n-dropdown-menu-sub-trigger>
      <n-dropdown-menu-sub-content>
        <n-dropdown-menu-item>By email</n-dropdown-menu-item>
        <n-dropdown-menu-item>By message</n-dropdown-menu-item>
      </n-dropdown-menu-sub-content>
    </n-dropdown-menu-sub>
  </n-dropdown-menu-content>
</n-dropdown-menu>`;
  protected readonly formActionsCode = `actionForm = new FormGroup({
  title: new FormControl('', Validators.required),
  slug: new FormControl(''),
});
// template
<form [formGroup]="actionForm">
  <n-input formControlName="title" nLabel="Title" [nRequired]="true" />
  <n-dropdown-menu>
    <button n-button n-dropdown-menu-trigger nVariant="outline" type="button">⋯</button>
    <n-dropdown-menu-content>
      <n-dropdown-menu-item>Save draft <n-dropdown-menu-shortcut>⌘S</n-dropdown-menu-shortcut></n-dropdown-menu-item>
      <n-dropdown-menu-item nVariant="destructive">Discard</n-dropdown-menu-item>
    </n-dropdown-menu-content>
  </n-dropdown-menu>
</form>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  DropdownMenuComponent,
  DropdownMenuTriggerDirective,
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
  DropdownMenuSeparatorComponent,
  DropdownMenuLabelComponent,
} from './shared/components/dropdown-menu';

@Component({ selector: 'app-my-page', imports: [...], template: \`...\` })
export class MyPage {}`;

  protected readonly usageCode = `<n-dropdown-menu>
  <button type="button" n-dropdown-menu-trigger>Open</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-item>Action</n-dropdown-menu-item>
  </n-dropdown-menu-content>
</n-dropdown-menu>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nOpen', type: 'boolean (model)', default: 'false', description: 'Two-way bindable open state of the menu.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Base ID used to derive trigger and content IDs.' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when the menu opens or closes.' },
  ];

  protected readonly subComponents: { name: string; description: string }[] = [
    { name: 'n-dropdown-menu-trigger', description: 'Directive applied to any element to make it toggle the menu.' },
    { name: 'n-dropdown-menu-content', description: 'The overlay panel that contains menu items.' },
    { name: 'n-dropdown-menu-item', description: 'A clickable menu item. Accepts nVariant ("default" | "destructive") and nDisabled.' },
    { name: 'n-dropdown-menu-label', description: 'A non-interactive label used to group items.' },
    { name: 'n-dropdown-menu-separator', description: 'A horizontal line to visually separate groups.' },
    { name: 'n-dropdown-menu-group', description: 'Groups related items together.' },
    { name: 'n-dropdown-menu-shortcut', description: 'Displays a keyboard shortcut aligned to the right of an item.' },
    { name: 'n-dropdown-menu-sub', description: 'Context provider for a nested submenu.' },
    { name: 'n-dropdown-menu-sub-trigger', description: 'Item that opens the submenu on hover or arrow key.' },
    { name: 'n-dropdown-menu-sub-content', description: 'Overlay panel for the submenu content.' },
  ];
}
