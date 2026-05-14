import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer.component';
import { DrawerTriggerDirective } from '../drawer-trigger.directive';
import { DrawerContentComponent } from '../drawer-content.component';
import { DrawerCloseDirective } from '../drawer-close.directive';

@Component({
  selector: 'demo-drawer-navigation',
  standalone: true,
  imports: [
    DrawerComponent,
    DrawerTriggerDirective,
    DrawerContentComponent,
    DrawerCloseDirective,
  ],
  template: `
    <n-drawer nRole="navigation">
      <button
        n-drawer-trigger
        class="p-2 rounded-md border"
        aria-label="Abrir menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round" aria-hidden="true">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </button>

      <n-drawer-content nPosition="left" nSize="sm" [nHideClose]="true">
        <div class="flex items-center gap-3 px-6 py-4 border-b shrink-0">
          <div class="h-8 w-8 rounded-full bg-primary"></div>
          <span class="font-semibold text-sm">nexus-ui</span>
        </div>

        <nav class="flex-1 overflow-y-auto px-3 py-4">
          @for (item of navItems; track item.label) {
            <a
              href="#"
              class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                     text-muted-foreground hover:bg-accent hover:text-accent-foreground
                     transition-colors"
              n-drawer-close
            >
              {{ item.label }}
            </a>
          }
        </nav>
      </n-drawer-content>
    </n-drawer>
  `,
})
export class DrawerNavigationDemo {
  readonly navItems = [
    { label: 'Dashboard' },
    { label: 'Componentes' },
    { label: 'Documentação' },
    { label: 'Configurações' },
  ];
}
