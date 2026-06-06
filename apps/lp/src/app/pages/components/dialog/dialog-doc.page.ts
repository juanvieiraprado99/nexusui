import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DialogComponent,
  DialogTriggerDirective,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
  DialogCloseDirective,
} from '../../../shared/components/dialog';
import { ButtonComponent } from '../../../shared/components/button';
import { InputComponent } from '../../../shared/components/input';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';
import type { DialogContentVariants } from '../../../shared/components/dialog';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-dialog-doc-page',
  imports: [
    ReactiveFormsModule,
    DialogComponent,
    DialogTriggerDirective,
    DialogContentComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    DialogCloseDirective,
    ButtonComponent,
    InputComponent,
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
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Dialog</h1>
          <p class="mt-2 text-muted-foreground">A modal dialog built with CDK Overlay and focus trap. Animates open and close with a fade + zoom transition (honoring <code class="bg-muted rounded px-1 font-mono">prefers-reduced-motion</code>). Supports multiple sizes, scrollable content, alert role, and persistent mode with shake animation.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-dialog [(nOpen)]="open">
              <button n-button n-dialog-trigger nVariant="outline">Open dialog</button>
              <n-dialog-content>
                <n-dialog-header>
                  <n-dialog-title>Edit profile</n-dialog-title>
                  <n-dialog-description>
                    Make changes to your profile here. Click save when done.
                  </n-dialog-description>
                </n-dialog-header>
                <div class="grid gap-4 py-4">
                  <p class="text-sm text-muted-foreground">Form content goes here.</p>
                </div>
                <n-dialog-footer>
                  <button n-button nVariant="outline" n-dialog-close>Cancel</button>
                  <button n-button (click)="open.set(false)">Save changes</button>
                </n-dialog-footer>
              </n-dialog-content>
            </n-dialog>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Animation</h2>
          <p class="mt-2 text-sm text-muted-foreground">
            Open and close animate with a CSS fade + zoom (<code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">opacity</code> + <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">scale</code>, 150ms) — no extra setup. The panel mounts at the enter state and transitions on the next frame, then reverses on close. Users with <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">prefers-reduced-motion</code> get an instant open/close.
          </p>
        </section>

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
                <app-code-block code="npx @nexuslabs/cli add dialog" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install @angular/cdk class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">dialog/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/dialog/</code>.</li>
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
            <app-example title="[nSize] on n-dialog-content" [code]="sizesCode">
              <div class="flex flex-wrap gap-2">
                @for (size of sizes; track size) {
                  <n-dialog>
                    <button n-button n-dialog-trigger nVariant="outline">{{ size }}</button>
                    <n-dialog-content [nSize]="size">
                      <n-dialog-header>
                        <n-dialog-title>Size: {{ size }}</n-dialog-title>
                        <n-dialog-description>This dialog uses nSize="{{ size }}".</n-dialog-description>
                      </n-dialog-header>
                      <div class="py-4">
                        <p class="text-sm text-muted-foreground">Dialog content.</p>
                      </div>
                      <div class="flex justify-end">
                        <button n-button n-dialog-close>Close</button>
                      </div>
                    </n-dialog-content>
                  </n-dialog>
                }
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Scrollable</h3>
          <div class="mt-3">
            <app-example title="[nScrollable] + nClass max-h" [code]="scrollableCode">
              <n-dialog>
                <button n-button n-dialog-trigger nVariant="outline">Scrollable dialog</button>
                <n-dialog-content [nScrollable]="true" nClass="max-h-[80vh]">
                  <n-dialog-header>
                    <n-dialog-title>Terms of Service</n-dialog-title>
                    <n-dialog-description>Read carefully before accepting.</n-dialog-description>
                  </n-dialog-header>
                  <div class="overflow-y-auto flex-1 py-4 pr-2">
                    @for (i of loremItems; track i) {
                      <p class="text-sm text-muted-foreground mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    }
                  </div>
                  <n-dialog-footer>
                    <button n-button nVariant="outline" n-dialog-close>Decline</button>
                    <button n-button n-dialog-close>Accept</button>
                  </n-dialog-footer>
                </n-dialog-content>
              </n-dialog>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Alert dialog</h3>
          <div class="mt-3">
            <app-example title='nRole="alertdialog" — no backdrop/Escape dismiss' [code]="alertCode">
              <n-dialog nRole="alertdialog">
                <button n-button n-dialog-trigger nVariant="destructive">Delete account</button>
                <n-dialog-content nSize="sm" [nHideClose]="true">
                  <n-dialog-header>
                    <n-dialog-title>Are you absolutely sure?</n-dialog-title>
                    <n-dialog-description>
                      This action cannot be undone. All your data will be permanently removed from our servers.
                    </n-dialog-description>
                  </n-dialog-header>
                  <n-dialog-footer>
                    <button n-button nVariant="outline" n-dialog-close>Cancel</button>
                    <button n-button nVariant="destructive" n-dialog-close>Continue</button>
                  </n-dialog-footer>
                </n-dialog-content>
              </n-dialog>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">With form + persistent</h3>
          <div class="mt-3">
            <app-example title="[nPersistent] — shake on backdrop/Escape" [code]="formCode">
              <div class="flex flex-col gap-3">
                <n-dialog [(nOpen)]="formOpen" [nPersistent]="true">
                  <button n-button n-dialog-trigger>Edit profile</button>
                  <n-dialog-content>
                    <n-dialog-header>
                      <n-dialog-title>Edit profile</n-dialog-title>
                      <n-dialog-description>
                        Unsaved changes will be lost. Click outside to see the shake.
                      </n-dialog-description>
                    </n-dialog-header>
                    <form [formGroup]="form" (ngSubmit)="submitForm()" class="grid gap-4 py-4" id="profile-form">
                      <n-input formControlName="name" nLabel="Name" [nRequired]="true" />
                      <n-input formControlName="email" nLabel="Email" nType="email" [nRequired]="true" />
                      <n-input formControlName="username" nLabel="Username" />
                    </form>
                    <n-dialog-footer>
                      <button n-button nVariant="outline" n-dialog-close type="button">Cancel</button>
                      <button n-button type="submit" form="profile-form" [nDisabled]="form.invalid">Save changes</button>
                    </n-dialog-footer>
                  </n-dialog-content>
                </n-dialog>
                @if (lastSaved()) {
                  <p class="text-sm text-muted-foreground">
                    Saved: {{ lastSaved()!.name }} &lt;{{ lastSaved()!.email }}&gt;
                  </p>
                }
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>

          <h3 class="mt-4 text-sm font-medium text-muted-foreground">n-dialog</h3>
          <div class="mt-2 overflow-x-auto rounded-lg border border-border/60">
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
                @for (row of dialogApiRows; track row.prop) {
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">n-dialog-content</h3>
          <div class="mt-2 overflow-x-auto rounded-lg border border-border/60">
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
                @for (row of contentApiRows; track row.prop) {
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
export class DialogDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly open = signal(false);
  protected readonly formOpen = signal(false);
  protected readonly lastSaved = signal<{ name: string; email: string; username: string } | null>(null);
  protected readonly loremItems = Array.from({ length: 20 }, (_, i) => i);
  protected readonly sizes: DialogContentVariants['nSize'][] = ['sm', 'default', 'lg', 'xl', 'full'];

  protected readonly form = new FormGroup({
    name:     new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email:    new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    username: new FormControl('', { nonNullable: true }),
  });

  protected submitForm(): void {
    if (this.form.invalid) return;
    this.lastSaved.set(this.form.getRawValue());
    this.formOpen.set(false);
  }

  protected readonly defaultCode = `<n-dialog [(nOpen)]="open">
  <button n-button n-dialog-trigger nVariant="outline">Open dialog</button>
  <n-dialog-content>
    <n-dialog-header>
      <n-dialog-title>Edit profile</n-dialog-title>
      <n-dialog-description>Make changes here. Click save when done.</n-dialog-description>
    </n-dialog-header>
    <div class="py-4"><!-- content --></div>
    <n-dialog-footer>
      <button n-button nVariant="outline" n-dialog-close>Cancel</button>
      <button n-button (click)="open.set(false)">Save changes</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>`;

  protected readonly sizesCode = `@for (size of sizes; track size) {
  <n-dialog>
    <button n-button n-dialog-trigger nVariant="outline">{{ size }}</button>
    <n-dialog-content [nSize]="size">
      <n-dialog-header>
        <n-dialog-title>Size: {{ size }}</n-dialog-title>
      </n-dialog-header>
      <div class="flex justify-end pt-4">
        <button n-button n-dialog-close>Close</button>
      </div>
    </n-dialog-content>
  </n-dialog>
}`;

  protected readonly scrollableCode = `<n-dialog>
  <button n-button n-dialog-trigger nVariant="outline">Scrollable dialog</button>
  <n-dialog-content [nScrollable]="true" nClass="max-h-[80vh]">
    <n-dialog-header>
      <n-dialog-title>Terms of Service</n-dialog-title>
    </n-dialog-header>
    <div class="overflow-y-auto flex-1 py-4"><!-- long content --></div>
    <n-dialog-footer>
      <button n-button n-dialog-close>Accept</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>`;

  protected readonly alertCode = `<n-dialog nRole="alertdialog">
  <button n-button n-dialog-trigger nVariant="destructive">Delete account</button>
  <n-dialog-content nSize="sm" [nHideClose]="true">
    <n-dialog-header>
      <n-dialog-title>Are you absolutely sure?</n-dialog-title>
      <n-dialog-description>This action cannot be undone.</n-dialog-description>
    </n-dialog-header>
    <n-dialog-footer>
      <button n-button nVariant="outline" n-dialog-close>Cancel</button>
      <button n-button nVariant="destructive" n-dialog-close>Continue</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>`;

  protected readonly formCode = `open = signal(false);
form = new FormGroup({
  name:  new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
});

<n-dialog [(nOpen)]="open" [nPersistent]="true">
  <button n-button n-dialog-trigger>Edit profile</button>
  <n-dialog-content>
    <n-dialog-header>
      <n-dialog-title>Edit profile</n-dialog-title>
    </n-dialog-header>
    <form [formGroup]="form" id="profile-form" class="grid gap-4 py-4">
      <n-input formControlName="name" nLabel="Name" [nRequired]="true" />
      <n-input formControlName="email" nLabel="Email" nType="email" [nRequired]="true" />
    </form>
    <n-dialog-footer>
      <button n-button nVariant="outline" n-dialog-close type="button">Cancel</button>
      <button n-button type="submit" form="profile-form">Save</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import {
  DialogComponent,
  DialogTriggerDirective,
  DialogContentComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent,
  DialogCloseDirective,
} from './shared/components/dialog';
import { ButtonComponent } from './shared/components/button';

@Component({
  selector: 'app-my-page',
  imports: [
    DialogComponent, DialogTriggerDirective, DialogContentComponent,
    DialogHeaderComponent, DialogFooterComponent, DialogTitleComponent,
    DialogDescriptionComponent, DialogCloseDirective, ButtonComponent,
  ],
  template: \`...\`,
})
export class MyPage {
  open = signal(false);
}`;

  protected readonly usageCode = `<n-dialog [(nOpen)]="open">
  <button n-button n-dialog-trigger>Open</button>
  <n-dialog-content>
    <n-dialog-header>
      <n-dialog-title>Title</n-dialog-title>
      <n-dialog-description>Description</n-dialog-description>
    </n-dialog-header>
    <!-- content -->
    <n-dialog-footer>
      <button n-button n-dialog-close>Close</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>`;

  protected readonly dialogApiRows: ApiRow[] = [
    { prop: 'nOpen', type: 'boolean', default: 'false', description: 'Two-way bindable open state.' },
    { prop: 'nPersistent', type: 'boolean', default: 'false', description: 'Blocks close on backdrop click and Escape. Shows shake animation instead.' },
    { prop: 'nRole', type: "'dialog' | 'alertdialog'", default: "'dialog'", description: "alertdialog also blocks backdrop/Escape and sets the ARIA role." },
    { prop: 'nId', type: 'string', default: "''", description: 'Custom id for the dialog element.' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when open state changes.' },
  ];

  protected readonly contentApiRows: ApiRow[] = [
    { prop: 'nSize', type: "'sm' | 'default' | 'lg' | 'xl' | 'full'", default: "'default'", description: 'Controls the max-width (or full-screen) of the dialog panel.' },
    { prop: 'nScrollable', type: 'boolean', default: 'false', description: 'Enables scrollable interior with fixed header/footer.' },
    { prop: 'nHideClose', type: 'boolean', default: 'false', description: 'Hides the built-in X close button.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Additional CSS classes on the dialog panel.' },
  ];
}
