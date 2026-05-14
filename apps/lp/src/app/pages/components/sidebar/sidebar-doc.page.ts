import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SidebarProviderComponent,
  SidebarComponent,
  SidebarTriggerComponent,
  SidebarRailComponent,
  SidebarHeaderComponent,
  SidebarContentComponent,
  SidebarFooterComponent,
  SidebarGroupComponent,
  SidebarGroupLabelComponent,
  SidebarMenuComponent,
  SidebarMenuItemComponent,
  SidebarMenuButtonComponent,
  SidebarMenuBadgeComponent,
  SidebarSeparatorComponent,
} from '../../../shared/components/sidebar';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

interface NavItem {
  label: string;
  icon: string;
  badge?: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar-doc-page',
  imports: [
    SidebarProviderComponent, SidebarComponent, SidebarTriggerComponent, SidebarRailComponent,
    SidebarHeaderComponent, SidebarContentComponent, SidebarFooterComponent,
    SidebarGroupComponent, SidebarGroupLabelComponent,
    SidebarMenuComponent, SidebarMenuItemComponent, SidebarMenuButtonComponent,
    SidebarMenuBadgeComponent, SidebarSeparatorComponent,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Sidebar</h1>
          <p class="mt-2 text-muted-foreground">A composable sidebar navigation with collapsible modes (icon strip, offcanvas), keyboard shortcut (Ctrl+B), and localStorage persistence.</p>
        </header>

        <div class="mt-8">
          <app-example title="Icon collapse (nCollapsible=&quot;icon&quot;)" [code]="iconCode">
            <div class="h-80 w-full overflow-hidden rounded-lg border border-border">
              <n-sidebar-provider [nDefaultOpen]="true">
                <n-sidebar nCollapsible="icon">
                  <n-sidebar-header class="h-14 flex items-center px-4">
                    <span class="font-semibold text-sm group-data-[collapsible=icon]:hidden">Nexus UI</span>
                    <span class="font-semibold text-sm hidden group-data-[collapsible=icon]:block">N</span>
                  </n-sidebar-header>
                  <n-sidebar-content>
                    <n-sidebar-group>
                      <n-sidebar-group-label>Navigation</n-sidebar-group-label>
                      <n-sidebar-menu>
                        @for (item of navItems; track item.label) {
                          <n-sidebar-menu-item>
                            <n-sidebar-menu-button [nActive]="item.active ?? false">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" [innerHTML]="item.icon" aria-hidden="true"></svg>
                              <span>{{ item.label }}</span>
                              @if (item.badge) {
                                <n-sidebar-menu-badge>{{ item.badge }}</n-sidebar-menu-badge>
                              }
                            </n-sidebar-menu-button>
                          </n-sidebar-menu-item>
                        }
                      </n-sidebar-menu>
                    </n-sidebar-group>
                  </n-sidebar-content>
                  <n-sidebar-rail />
                </n-sidebar>
                <main class="flex flex-1 flex-col gap-4 p-4">
                  <div class="flex items-center gap-2">
                    <n-sidebar-trigger />
                    <span class="text-sm text-muted-foreground">Use Ctrl+B or the trigger to toggle.</span>
                  </div>
                  <div class="flex-1 rounded-lg bg-muted/20 border border-dashed border-border flex items-center justify-center">
                    <span class="text-sm text-muted-foreground">Page content</span>
                  </div>
                </main>
              </n-sidebar-provider>
            </div>
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
                <app-code-block code="npx @nexuslabs/cli add sidebar" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">sidebar/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/sidebar/</code>.</li>
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

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Offcanvas mode</h3>
          <div class="mt-3">
            <app-example title='nCollapsible="offcanvas"' [code]="offcanvasCode">
              <div class="h-80 w-full overflow-hidden rounded-lg border border-border">
                <n-sidebar-provider [nDefaultOpen]="false">
                  <n-sidebar nCollapsible="offcanvas">
                    <n-sidebar-header class="h-14 flex items-center px-4">
                      <span class="font-semibold text-sm">Nexus UI</span>
                    </n-sidebar-header>
                    <n-sidebar-content>
                      @for (group of navGroups; track group.title) {
                        <n-sidebar-group>
                          <n-sidebar-group-label>{{ group.title }}</n-sidebar-group-label>
                          <n-sidebar-menu>
                            @for (item of group.items; track item.label) {
                              <n-sidebar-menu-item>
                                <n-sidebar-menu-button [nActive]="item.active ?? false">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" [innerHTML]="item.icon" aria-hidden="true"></svg>
                                  <span>{{ item.label }}</span>
                                </n-sidebar-menu-button>
                              </n-sidebar-menu-item>
                            }
                          </n-sidebar-menu>
                        </n-sidebar-group>
                        <n-sidebar-separator />
                      }
                    </n-sidebar-content>
                  </n-sidebar>
                  <main class="flex flex-1 flex-col gap-4 p-4">
                    <div class="flex items-center gap-2">
                      <n-sidebar-trigger />
                      <span class="text-sm text-muted-foreground">Sidebar hidden — click trigger to open.</span>
                    </div>
                    <div class="flex-1 rounded-lg bg-muted/20 border border-dashed border-border flex items-center justify-center">
                      <span class="text-sm text-muted-foreground">Page content</span>
                    </div>
                  </main>
                </n-sidebar-provider>
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-medium text-muted-foreground">SidebarProviderComponent (n-sidebar-provider)</h3>
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
                @for (row of providerApiRows; track row.prop) {
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
          <h3 class="mt-6 text-sm font-medium text-muted-foreground">SidebarComponent (n-sidebar)</h3>
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
                @for (row of sidebarApiRows; track row.prop) {
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
export class SidebarDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>', active: true },
    { label: 'Components', icon: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>', badge: '12' },
    { label: 'Settings', icon: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>' },
  ];

  protected readonly navGroups = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>', active: true },
        { label: 'Analytics', icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { label: 'Profile', icon: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
        { label: 'Billing', icon: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>' },
      ],
    },
  ];

  protected readonly iconCode = `<n-sidebar-provider [nDefaultOpen]="true">
  <n-sidebar nCollapsible="icon">
    <n-sidebar-header>...</n-sidebar-header>
    <n-sidebar-content>
      <n-sidebar-group>
        <n-sidebar-group-label>Navigation</n-sidebar-group-label>
        <n-sidebar-menu>
          <n-sidebar-menu-item>
            <n-sidebar-menu-button [nActive]="true">
              Dashboard
            </n-sidebar-menu-button>
          </n-sidebar-menu-item>
        </n-sidebar-menu>
      </n-sidebar-group>
    </n-sidebar-content>
    <n-sidebar-rail />
  </n-sidebar>
  <main class="flex flex-1 flex-col">
    <n-sidebar-trigger />
    <!-- page content -->
  </main>
</n-sidebar-provider>`;

  protected readonly offcanvasCode = `<n-sidebar-provider [nDefaultOpen]="false">
  <n-sidebar nCollapsible="offcanvas">
    <n-sidebar-content>
      <n-sidebar-group>
        <n-sidebar-menu>
          <n-sidebar-menu-item>
            <n-sidebar-menu-button>Dashboard</n-sidebar-menu-button>
          </n-sidebar-menu-item>
        </n-sidebar-menu>
      </n-sidebar-group>
    </n-sidebar-content>
  </n-sidebar>
  <main>
    <n-sidebar-trigger />
    <!-- page content -->
  </main>
</n-sidebar-provider>`;

  protected readonly importCode = `import { Component } from '@angular/core';
import {
  SidebarProviderComponent,
  SidebarComponent,
  SidebarTriggerComponent,
  SidebarRailComponent,
  SidebarHeaderComponent,
  SidebarContentComponent,
  SidebarFooterComponent,
  SidebarGroupComponent,
  SidebarGroupLabelComponent,
  SidebarMenuComponent,
  SidebarMenuItemComponent,
  SidebarMenuButtonComponent,
} from './shared/components/sidebar';

@Component({
  selector: 'app-my-page',
  imports: [
    SidebarProviderComponent, SidebarComponent, SidebarTriggerComponent,
    SidebarRailComponent, SidebarHeaderComponent, SidebarContentComponent,
    SidebarFooterComponent, SidebarGroupComponent, SidebarGroupLabelComponent,
    SidebarMenuComponent, SidebarMenuItemComponent, SidebarMenuButtonComponent,
  ],
  template: \`...\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-sidebar-provider>
  <n-sidebar nCollapsible="icon">
    <n-sidebar-content>
      <n-sidebar-group>
        <n-sidebar-menu>
          <n-sidebar-menu-item>
            <n-sidebar-menu-button>Item</n-sidebar-menu-button>
          </n-sidebar-menu-item>
        </n-sidebar-menu>
      </n-sidebar-group>
    </n-sidebar-content>
    <n-sidebar-rail />
  </n-sidebar>
  <main class="flex flex-1 flex-col">
    <n-sidebar-trigger />
    <router-outlet />
  </main>
</n-sidebar-provider>`;

  protected readonly providerApiRows: ApiRow[] = [
    { prop: 'nDefaultOpen', type: 'boolean', default: 'true', description: 'Initial open state. Overridden by localStorage if key is set.' },
    { prop: 'nStorageKey', type: 'string', default: "'sidebar:state'", description: 'localStorage key for persisting open state.' },
  ];

  protected readonly sidebarApiRows: ApiRow[] = [
    { prop: 'nVariant', type: "'sidebar' | 'floating' | 'inset'", default: "'sidebar'", description: 'Visual style of the sidebar panel.' },
    { prop: 'nSide', type: "'left' | 'right'", default: "'left'", description: 'Which edge the sidebar appears on.' },
    { prop: 'nCollapsible', type: "'offcanvas' | 'icon' | 'none'", default: "'offcanvas'", description: "Collapse behavior: 'icon' collapses to icon strip, 'offcanvas' hides completely." },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes for the sidebar panel.' },
  ];
}
