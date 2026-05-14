import { Component, signal } from '@angular/core';
import { SidebarProviderComponent } from '../sidebar-provider.component';
import { SidebarComponent } from '../sidebar.component';
import { SidebarTriggerComponent } from '../sidebar-trigger.component';
import { SidebarHeaderComponent } from '../sidebar-header.component';
import { SidebarContentComponent } from '../sidebar-content.component';
import { SidebarGroupComponent } from '../sidebar-group.component';
import { SidebarGroupLabelComponent } from '../sidebar-group-label.component';
import { SidebarMenuComponent } from '../sidebar-menu.component';
import { SidebarMenuItemComponent } from '../sidebar-menu-item.component';
import { SidebarMenuButtonComponent } from '../sidebar-menu-button.component';

@Component({
  selector: 'demo-sidebar-collapsible-groups',
  standalone: true,
  imports: [
    SidebarProviderComponent,
    SidebarComponent,
    SidebarTriggerComponent,
    SidebarHeaderComponent,
    SidebarContentComponent,
    SidebarGroupComponent,
    SidebarGroupLabelComponent,
    SidebarMenuComponent,
    SidebarMenuItemComponent,
    SidebarMenuButtonComponent,
  ],
  template: `
    <div class="h-[400px] w-full rounded-lg border border-border overflow-hidden">
      <n-sidebar-provider>
        <n-sidebar nCollapsible="offcanvas">
          <n-sidebar-header>
            <p class="px-2 text-sm font-semibold">Minha App</p>
          </n-sidebar-header>
          <n-sidebar-content>
            @for (group of groups; track group.label) {
              <n-sidebar-group>
                <n-sidebar-group-label>{{ group.label }}</n-sidebar-group-label>
                <n-sidebar-menu>
                  @for (item of group.items; track item.label) {
                    <n-sidebar-menu-item>
                      <n-sidebar-menu-button
                        [nActive]="activeItem() === item.label"
                        (click)="activeItem.set(item.label)"
                      >
                        {{ item.label }}
                      </n-sidebar-menu-button>
                    </n-sidebar-menu-item>
                  }
                </n-sidebar-menu>
              </n-sidebar-group>
            }
          </n-sidebar-content>
        </n-sidebar>

        <div class="flex flex-1 flex-col overflow-hidden">
          <header class="flex h-12 items-center gap-2 border-b border-border px-4">
            <n-sidebar-trigger />
            <span class="text-sm font-medium">{{ activeItem() }}</span>
          </header>
          <main class="flex-1 p-6">
            <p class="text-sm text-muted-foreground">Selecione um item na sidebar.</p>
          </main>
        </div>
      </n-sidebar-provider>
    </div>
  `,
})
export class SidebarCollapsibleGroupsDemo {
  activeItem = signal('Visão Geral');

  groups = [
    {
      label: 'Plataforma',
      items: [
        { label: 'Visão Geral' },
        { label: 'Analytics' },
        { label: 'Usuários' },
      ],
    },
    {
      label: 'Conteúdo',
      items: [
        { label: 'Posts' },
        { label: 'Categorias' },
        { label: 'Mídia' },
      ],
    },
    {
      label: 'Sistema',
      items: [
        { label: 'Configurações' },
        { label: 'Logs' },
      ],
    },
  ];
}
