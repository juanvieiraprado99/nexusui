import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DrawerComponent,
  DrawerTriggerDirective,
  DrawerCloseDirective,
  DrawerContentComponent,
  DrawerHeaderComponent,
  DrawerFooterComponent,
  DrawerTitleComponent,
  DrawerDescriptionComponent,
} from '../../../shared/components/drawer';
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
  selector: 'app-drawer-doc-page',
  imports: [
    DrawerComponent, DrawerTriggerDirective, DrawerCloseDirective,
    DrawerContentComponent, DrawerHeaderComponent, DrawerFooterComponent,
    DrawerTitleComponent, DrawerDescriptionComponent,
    ButtonComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Drawer</h1>
          <p class="mt-2 text-muted-foreground">A panel that slides in from the edge of the screen, used for navigation, forms, or contextual content.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-drawer>
              <button n-button n-drawer-trigger type="button">Open Drawer</button>
              <n-drawer-content>
                <n-drawer-header>
                  <n-drawer-title>Drawer title</n-drawer-title>
                  <n-drawer-description>This is the drawer description.</n-drawer-description>
                </n-drawer-header>
                <div class="px-6 py-4 flex-1 overflow-y-auto">
                  <p class="text-sm text-muted-foreground">Drawer body content goes here. This area is scrollable when content overflows.</p>
                </div>
                <n-drawer-footer>
                  <button n-button n-drawer-close type="button">Confirm</button>
                  <button n-button nVariant="outline" n-drawer-close type="button">Cancel</button>
                </n-drawer-footer>
              </n-drawer-content>
            </n-drawer>
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
                <app-code-block code="npx @nexuslabs/cli add drawer" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install &#64;angular/cdk clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">drawer/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/drawer/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Positions</h3>
          <div class="mt-3">
            <app-example title="nPosition: left · right · top · bottom" [code]="positionsCode">
              <div class="flex flex-wrap gap-2">
                @for (pos of ['left', 'right', 'top', 'bottom']; track pos) {
                  <n-drawer>
                    <button n-button nVariant="outline" nSize="sm" n-drawer-trigger type="button">{{ pos }}</button>
                    <n-drawer-content [nPosition]="$any(pos)">
                      <n-drawer-header>
                        <n-drawer-title>{{ pos }} drawer</n-drawer-title>
                        <n-drawer-description>Slides in from the {{ pos }}.</n-drawer-description>
                      </n-drawer-header>
                      <div class="px-6 py-4 flex-1">
                        <p class="text-sm text-muted-foreground">Content inside the {{ pos }} drawer.</p>
                      </div>
                      <n-drawer-footer>
                        <button n-button nSize="sm" n-drawer-close type="button">Close</button>
                      </n-drawer-footer>
                    </n-drawer-content>
                  </n-drawer>
                }
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: sm · md · lg · xl · full" [code]="sizesCode">
              <div class="flex flex-wrap gap-2">
                @for (size of ['sm', 'md', 'lg', 'xl', 'full']; track size) {
                  <n-drawer>
                    <button n-button nVariant="outline" nSize="sm" n-drawer-trigger type="button">{{ size }}</button>
                    <n-drawer-content [nSize]="$any(size)">
                      <n-drawer-header>
                        <n-drawer-title>Size: {{ size }}</n-drawer-title>
                      </n-drawer-header>
                      <div class="px-6 py-4 flex-1">
                        <p class="text-sm text-muted-foreground">nSize="{{ size }}"</p>
                      </div>
                      <n-drawer-footer>
                        <button n-button n-drawer-close type="button">Close</button>
                      </n-drawer-footer>
                    </n-drawer-content>
                  </n-drawer>
                }
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Navigation drawer</h3>
          <div class="mt-3">
            <app-example title='nRole="navigation"' [code]="navigationCode">
              <n-drawer>
                <button n-button nVariant="outline" n-drawer-trigger type="button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                  Menu
                </button>
                <n-drawer-content nRole="navigation" nPosition="left" nSize="sm">
                  <n-drawer-header>
                    <n-drawer-title>Navigation</n-drawer-title>
                  </n-drawer-header>
                  <nav class="px-4 py-2 flex flex-col gap-1 flex-1">
                    @for (item of navItems; track item) {
                      <a href="#" n-drawer-close class="rounded-md px-3 py-2 text-sm hover:bg-accent">{{ item }}</a>
                    }
                  </nav>
                </n-drawer-content>
              </n-drawer>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Persistent</h3>
          <div class="mt-3">
            <app-example title="nPersistent" [code]="persistentCode">
              <n-drawer [nPersistent]="true">
                <button n-button nVariant="outline" n-drawer-trigger type="button">Open persistent</button>
                <n-drawer-content>
                  <n-drawer-header>
                    <n-drawer-title>Unsaved changes</n-drawer-title>
                    <n-drawer-description>Backdrop click and Esc shake the panel instead of closing.</n-drawer-description>
                  </n-drawer-header>
                  <div class="px-6 py-4 flex-1">
                    <p class="text-sm text-muted-foreground">Close explicitly with the button below.</p>
                  </div>
                  <n-drawer-footer>
                    <button n-button n-drawer-close type="button">Discard &amp; close</button>
                  </n-drawer-footer>
                </n-drawer-content>
              </n-drawer>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Controlled</h3>
          <div class="mt-3">
            <app-example title="[(nOpen)]" [code]="controlledCode">
              <div class="flex flex-col items-center gap-3">
                <button n-button (click)="drawerOpen.set(true)" type="button">Open via signal</button>
                <span class="text-xs text-muted-foreground">State: {{ drawerOpen() ? 'open' : 'closed' }}</span>
                <n-drawer [(nOpen)]="drawerOpen">
                  <n-drawer-content>
                    <n-drawer-header>
                      <n-drawer-title>Controlled drawer</n-drawer-title>
                      <n-drawer-description>Open state lives in the parent via [(nOpen)].</n-drawer-description>
                    </n-drawer-header>
                    <div class="px-6 py-4 flex-1">
                      <p class="text-sm text-muted-foreground">Driven by an external signal.</p>
                    </div>
                    <n-drawer-footer>
                      <button n-button nVariant="outline" (click)="drawerOpen.set(false)" type="button">Close</button>
                    </n-drawer-footer>
                  </n-drawer-content>
                </n-drawer>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">No backdrop &amp; handle</h3>
          <div class="mt-3">
            <app-example title='[nBackdrop]="false"' [code]="backdropCode">
              <n-drawer>
                <button n-button nVariant="outline" n-drawer-trigger type="button">Open bottom sheet</button>
                <n-drawer-content nPosition="bottom" [nBackdrop]="false" [nHandle]="true">
                  <n-drawer-header>
                    <n-drawer-title>Bottom sheet</n-drawer-title>
                  </n-drawer-header>
                  <div class="px-6 py-4 flex-1">
                    <p class="text-sm text-muted-foreground">No dimmed layer — page stays visible behind.</p>
                  </div>
                  <n-drawer-footer>
                    <button n-button n-drawer-close type="button">Close</button>
                  </n-drawer-footer>
                </n-drawer-content>
              </n-drawer>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Scrollable</h3>
          <div class="mt-3">
            <app-example title="nScrollable" [code]="scrollableCode">
              <n-drawer>
                <button n-button nVariant="outline" n-drawer-trigger type="button">Open long content</button>
                <n-drawer-content [nScrollable]="true">
                  <n-drawer-header>
                    <n-drawer-title>Terms of use</n-drawer-title>
                    <n-drawer-description>Sticky header/footer; the body scrolls.</n-drawer-description>
                  </n-drawer-header>
                  <div class="px-6 py-4 flex-1 overflow-y-auto space-y-3">
                    @for (n of paragraphs; track n) {
                      <p class="text-sm text-muted-foreground">Paragraph {{ n }} — sample content that overflows the panel height and forces internal scrolling.</p>
                    }
                  </div>
                  <n-drawer-footer>
                    <button n-button nVariant="outline" n-drawer-close type="button">Decline</button>
                    <button n-button n-drawer-close type="button">Accept</button>
                  </n-drawer-footer>
                </n-drawer-content>
              </n-drawer>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-medium text-muted-foreground">DrawerComponent (n-drawer)</h3>
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">DrawerContentComponent (n-drawer-content)</h3>
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
export class DrawerDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly navItems = ['Home', 'Components', 'Get Started', 'Installation', 'Changelog'];
  protected readonly drawerOpen = signal(false);
  protected readonly paragraphs = Array.from({ length: 20 }, (_, i) => i + 1);

  protected readonly defaultCode = `<n-drawer>
  <button n-button n-drawer-trigger type="button">Open Drawer</button>
  <n-drawer-content>
    <n-drawer-header>
      <n-drawer-title>Title</n-drawer-title>
      <n-drawer-description>Description</n-drawer-description>
    </n-drawer-header>
    <div class="px-6 py-4 flex-1 overflow-y-auto">
      Body content
    </div>
    <n-drawer-footer>
      <button n-button n-drawer-close type="button">Confirm</button>
      <button n-button nVariant="outline" n-drawer-close type="button">Cancel</button>
    </n-drawer-footer>
  </n-drawer-content>
</n-drawer>`;

  protected readonly positionsCode = `<n-drawer>
  <button n-button n-drawer-trigger type="button">Open</button>
  <n-drawer-content nPosition="right">
    ...
  </n-drawer-content>
</n-drawer>`;

  protected readonly sizesCode = `<n-drawer>
  <button n-button n-drawer-trigger type="button">Open</button>
  <n-drawer-content nSize="lg">
    ...
  </n-drawer-content>
</n-drawer>`;

  protected readonly navigationCode = `<n-drawer>
  <button n-button n-drawer-trigger type="button">Menu</button>
  <n-drawer-content nRole="navigation" nPosition="left" nSize="sm">
    <nav class="px-4 py-2 flex flex-col gap-1">
      <a href="/" n-drawer-close>Home</a>
      <a href="/components" n-drawer-close>Components</a>
    </nav>
  </n-drawer-content>
</n-drawer>`;

  protected readonly persistentCode = `<n-drawer nPersistent>
  <button n-button n-drawer-trigger type="button">Open</button>
  <n-drawer-content>
    <n-drawer-header>
      <n-drawer-title>Unsaved changes</n-drawer-title>
    </n-drawer-header>
    <div class="px-6 py-4 flex-1">Backdrop/Esc shake instead of closing.</div>
    <n-drawer-footer>
      <button n-button n-drawer-close type="button">Discard & close</button>
    </n-drawer-footer>
  </n-drawer-content>
</n-drawer>`;

  protected readonly controlledCode = `// component
protected readonly drawerOpen = signal(false);

// template
<button n-button (click)="drawerOpen.set(true)" type="button">Open</button>
<n-drawer [(nOpen)]="drawerOpen">
  <n-drawer-content>
    <n-drawer-header>
      <n-drawer-title>Controlled drawer</n-drawer-title>
    </n-drawer-header>
    <div class="px-6 py-4 flex-1">Open state lives in the parent.</div>
    <n-drawer-footer>
      <button n-button (click)="drawerOpen.set(false)" type="button">Close</button>
    </n-drawer-footer>
  </n-drawer-content>
</n-drawer>`;

  protected readonly backdropCode = `<n-drawer>
  <button n-button n-drawer-trigger type="button">Open</button>
  <n-drawer-content nPosition="bottom" [nBackdrop]="false" [nHandle]="true">
    <n-drawer-header>
      <n-drawer-title>Bottom sheet</n-drawer-title>
    </n-drawer-header>
    <div class="px-6 py-4 flex-1">No dimmed layer behind.</div>
  </n-drawer-content>
</n-drawer>`;

  protected readonly scrollableCode = `<n-drawer>
  <button n-button n-drawer-trigger type="button">Open</button>
  <n-drawer-content nScrollable>
    <n-drawer-header>
      <n-drawer-title>Terms of use</n-drawer-title>
    </n-drawer-header>
    <div class="px-6 py-4 flex-1 overflow-y-auto">
      <!-- long content scrolls here -->
    </div>
    <n-drawer-footer>
      <button n-button n-drawer-close type="button">Accept</button>
    </n-drawer-footer>
  </n-drawer-content>
</n-drawer>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  DrawerComponent,
  DrawerTriggerDirective,
  DrawerCloseDirective,
  DrawerContentComponent,
  DrawerHeaderComponent,
  DrawerFooterComponent,
  DrawerTitleComponent,
  DrawerDescriptionComponent,
} from './shared/components/drawer';

@Component({
  selector: 'app-my-page',
  imports: [
    DrawerComponent, DrawerTriggerDirective, DrawerCloseDirective,
    DrawerContentComponent, DrawerHeaderComponent, DrawerFooterComponent,
    DrawerTitleComponent, DrawerDescriptionComponent,
  ],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-drawer>
  <button n-button n-drawer-trigger type="button">Open</button>
  <n-drawer-content>
    <n-drawer-header>
      <n-drawer-title>Title</n-drawer-title>
    </n-drawer-header>
    <div class="px-6 py-4 flex-1">Content</div>
    <n-drawer-footer>
      <button n-button n-drawer-close type="button">Close</button>
    </n-drawer-footer>
  </n-drawer-content>
</n-drawer>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nOpen', type: 'boolean', default: 'false', description: 'Two-way bindable open state.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Custom ID for the drawer panel.' },
    { prop: 'nPersistent', type: 'boolean', default: 'false', description: "Prevents closing on backdrop click or Esc — shakes instead." },
    { prop: 'nRole', type: "'dialog' | 'navigation'", default: "'dialog'", description: 'ARIA role of the drawer panel.' },
    { prop: '(nOpenChange)', type: 'EventEmitter<boolean>', default: '—', description: 'Emitted when open state changes.' },
  ];

  protected readonly contentApiRows: ApiRow[] = [
    { prop: 'nPosition', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Edge from which the drawer slides in.' },
    { prop: 'nSize', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Width (left/right) or height (top/bottom).' },
    { prop: 'nScrollable', type: 'boolean', default: 'false', description: 'Enables scroll overflow on the panel.' },
    { prop: 'nHideClose', type: 'boolean', default: 'false', description: 'Hides the default close button.' },
    { prop: 'nHandle', type: 'boolean', default: 'true', description: 'Shows a drag handle for top/bottom drawers.' },
    { prop: 'nBackdrop', type: 'boolean', default: 'true', description: 'Shows a dark backdrop behind the drawer.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes for the panel.' },
  ];
}
