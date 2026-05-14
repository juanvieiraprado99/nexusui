import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer.component';
import { DrawerTriggerDirective } from '../drawer-trigger.directive';
import { DrawerContentComponent } from '../drawer-content.component';
import { DrawerHeaderComponent } from '../drawer-header.component';
import { DrawerTitleComponent } from '../drawer-title.component';
import { DrawerDescriptionComponent } from '../drawer-description.component';
import { DrawerCloseDirective } from '../drawer-close.directive';

@Component({
  selector: 'demo-drawer-positions',
  standalone: true,
  imports: [
    DrawerComponent,
    DrawerTriggerDirective,
    DrawerContentComponent,
    DrawerHeaderComponent,
    DrawerTitleComponent,
    DrawerDescriptionComponent,
    DrawerCloseDirective,
  ],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (pos of positions; track pos.value) {
        <n-drawer>
          <button n-drawer-trigger class="px-4 py-2 rounded-md border text-sm font-medium">
            {{ pos.label }}
          </button>
          <n-drawer-content [nPosition]="pos.value">
            <n-drawer-header>
              <n-drawer-title>Drawer {{ pos.label }}</n-drawer-title>
              <n-drawer-description>Abre pela {{ pos.label }}.</n-drawer-description>
            </n-drawer-header>
            <div class="flex-1 overflow-y-auto px-6 py-2">
              <p class="text-sm text-muted-foreground">Conteúdo do drawer.</p>
            </div>
            <div class="px-6 py-4 shrink-0">
              <button n-drawer-close class="px-4 py-2 rounded-md border text-sm font-medium w-full">
                Fechar
              </button>
            </div>
          </n-drawer-content>
        </n-drawer>
      }
    </div>
  `,
})
export class DrawerPositionsDemo {
  readonly positions = [
    { value: 'right' as const,  label: 'Direita' },
    { value: 'left' as const,   label: 'Esquerda' },
    { value: 'bottom' as const, label: 'Baixo' },
    { value: 'top' as const,    label: 'Cima' },
  ];
}
