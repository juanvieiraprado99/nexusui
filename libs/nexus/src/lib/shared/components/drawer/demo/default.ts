import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer.component';
import { DrawerTriggerDirective } from '../drawer-trigger.directive';
import { DrawerContentComponent } from '../drawer-content.component';
import { DrawerHeaderComponent } from '../drawer-header.component';
import { DrawerFooterComponent } from '../drawer-footer.component';
import { DrawerTitleComponent } from '../drawer-title.component';
import { DrawerDescriptionComponent } from '../drawer-description.component';
import { DrawerCloseDirective } from '../drawer-close.directive';

@Component({
  selector: 'demo-drawer-default',
  standalone: true,
  imports: [
    DrawerComponent,
    DrawerTriggerDirective,
    DrawerContentComponent,
    DrawerHeaderComponent,
    DrawerFooterComponent,
    DrawerTitleComponent,
    DrawerDescriptionComponent,
    DrawerCloseDirective,
  ],
  template: `
    <n-drawer>
      <button n-drawer-trigger class="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">
        Abrir Drawer
      </button>

      <n-drawer-content>
        <n-drawer-header>
          <n-drawer-title>Configurações</n-drawer-title>
          <n-drawer-description>Ajuste suas preferências abaixo.</n-drawer-description>
        </n-drawer-header>

        <div class="flex-1 overflow-y-auto px-6 py-2">
          <p class="text-sm text-muted-foreground">Conteúdo do drawer.</p>
        </div>

        <n-drawer-footer>
          <button n-drawer-close class="px-4 py-2 rounded-md border text-sm font-medium">
            Cancelar
          </button>
          <button class="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">
            Salvar
          </button>
        </n-drawer-footer>
      </n-drawer-content>
    </n-drawer>
  `,
})
export class DrawerDefaultDemo {}
