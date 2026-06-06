import { Component, signal } from '@angular/core';
import { DrawerComponent } from '../drawer.component';
import { DrawerTriggerDirective } from '../drawer-trigger.directive';
import { DrawerContentComponent } from '../drawer-content.component';
import { DrawerHeaderComponent } from '../drawer-header.component';
import { DrawerTitleComponent } from '../drawer-title.component';
import { DrawerCloseDirective } from '../drawer-close.directive';

@Component({
  selector: 'demo-drawer-backdrop-handle',
  standalone: true,
  imports: [
    DrawerComponent,
    DrawerTriggerDirective,
    DrawerContentComponent,
    DrawerHeaderComponent,
    DrawerTitleComponent,
    DrawerCloseDirective,
  ],
  template: `
    <div class="flex flex-col items-center gap-3">
      <label class="flex items-center gap-2 text-xs text-muted-foreground">
        <input type="checkbox" [checked]="showHandle()" (change)="showHandle.set(!showHandle())" />
        Mostrar handle
      </label>

      <n-drawer>
        <button n-drawer-trigger class="px-4 py-2 rounded-md border text-sm font-medium">
          Abrir bottom sheet (sem backdrop)
        </button>

        <n-drawer-content nPosition="bottom" [nBackdrop]="false" [nHandle]="showHandle()">
          <n-drawer-header>
            <n-drawer-title>Bottom sheet</n-drawer-title>
          </n-drawer-header>

          <div class="flex-1 overflow-y-auto px-6 py-2">
            <p class="text-sm text-muted-foreground">
              Sem camada escura atrás — o conteúdo da página continua visível.
            </p>
          </div>

          <div class="px-6 py-4 shrink-0">
            <button n-drawer-close class="px-4 py-2 rounded-md border text-sm font-medium w-full">
              Fechar
            </button>
          </div>
        </n-drawer-content>
      </n-drawer>
    </div>
  `,
})
export class DrawerBackdropHandleDemo {
  readonly showHandle = signal(true);
}
