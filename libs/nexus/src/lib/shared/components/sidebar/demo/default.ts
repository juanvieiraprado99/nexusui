import { Component } from '@angular/core';
import { SidebarProviderComponent } from '../sidebar-provider.component';
import { SidebarComponent } from '../sidebar.component';
import { SidebarTriggerComponent } from '../sidebar-trigger.component';
import { SidebarHeaderComponent } from '../sidebar-header.component';
import { SidebarContentComponent } from '../sidebar-content.component';
import { SidebarFooterComponent } from '../sidebar-footer.component';
import { SidebarGroupComponent } from '../sidebar-group.component';
import { SidebarGroupLabelComponent } from '../sidebar-group-label.component';
import { SidebarMenuComponent } from '../sidebar-menu.component';
import { SidebarMenuItemComponent } from '../sidebar-menu-item.component';
import { SidebarMenuButtonComponent } from '../sidebar-menu-button.component';
import { SidebarMenuBadgeComponent } from '../sidebar-menu-badge.component';
import { SidebarSeparatorComponent } from '../sidebar-separator.component';

@Component({
  selector: 'demo-sidebar-default',
  standalone: true,
  imports: [
    SidebarProviderComponent,
    SidebarComponent,
    SidebarTriggerComponent,
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
  ],
  template: `
    <div class="h-[400px] w-full rounded-lg border border-border overflow-hidden">
      <n-sidebar-provider nStorageKey="demo-sidebar">
        <n-sidebar nCollapsible="icon">
          <n-sidebar-header>
            <n-sidebar-menu>
              <n-sidebar-menu-item>
                <n-sidebar-menu-button nSize="lg" nTooltip="Nexus UI">
                  <svg data-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                  <span class="font-semibold">Nexus UI</span>
                </n-sidebar-menu-button>
              </n-sidebar-menu-item>
            </n-sidebar-menu>
          </n-sidebar-header>

          <n-sidebar-content>
            <n-sidebar-group>
              <n-sidebar-group-label>Navegação</n-sidebar-group-label>
              <n-sidebar-menu>
                @for (item of navItems; track item.label) {
                  <n-sidebar-menu-item>
                    <n-sidebar-menu-button [nActive]="item.active" [nTooltip]="item.label">
                      <svg data-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path [attr.d]="item.icon" />
                      </svg>
                      {{ item.label }}
                      @if (item.badge) {
                        <n-sidebar-menu-badge>{{ item.badge }}</n-sidebar-menu-badge>
                      }
                    </n-sidebar-menu-button>
                  </n-sidebar-menu-item>
                }
              </n-sidebar-menu>
            </n-sidebar-group>

            <n-sidebar-separator />

            <n-sidebar-group>
              <n-sidebar-group-label>Configurações</n-sidebar-group-label>
              <n-sidebar-menu>
                @for (item of settingsItems; track item.label) {
                  <n-sidebar-menu-item>
                    <n-sidebar-menu-button [nTooltip]="item.label">
                      <svg data-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path [attr.d]="item.icon" />
                      </svg>
                      {{ item.label }}
                    </n-sidebar-menu-button>
                  </n-sidebar-menu-item>
                }
              </n-sidebar-menu>
            </n-sidebar-group>
          </n-sidebar-content>

          <n-sidebar-footer>
            <n-sidebar-menu>
              <n-sidebar-menu-item>
                <n-sidebar-menu-button nTooltip="Usuário">
                  <svg data-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  João Silva
                </n-sidebar-menu-button>
              </n-sidebar-menu-item>
            </n-sidebar-menu>
          </n-sidebar-footer>
        </n-sidebar>

        <div class="flex flex-1 flex-col overflow-hidden">
          <header class="flex h-12 items-center gap-2 border-b border-border px-4">
            <n-sidebar-trigger />
            <span class="text-sm font-medium text-muted-foreground">Dashboard</span>
          </header>
          <main class="flex-1 p-6 overflow-auto">
            <p class="text-sm text-muted-foreground">
              Use <kbd class="rounded border border-border px-1 text-xs">Ctrl + B</kbd> para alternar a sidebar.
            </p>
          </main>
        </div>
      </n-sidebar-provider>
    </div>
  `,
})
export class SidebarDefaultDemo {
  navItems = [
    { label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', active: true, badge: null },
    { label: 'Mensagens', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', active: false, badge: 5 },
    { label: 'Relatórios', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', active: false, badge: null },
    { label: 'Projetos', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z', active: false, badge: null },
  ];

  settingsItems = [
    { label: 'Configurações', icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
    { label: 'Ajuda', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01' },
  ];
}
