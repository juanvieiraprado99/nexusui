import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer.component';
import { DrawerTriggerDirective } from '../drawer-trigger.directive';
import { DrawerContentComponent } from '../drawer-content.component';
import { DrawerHeaderComponent } from '../drawer-header.component';
import { DrawerTitleComponent } from '../drawer-title.component';
import { DrawerCloseDirective } from '../drawer-close.directive';

@Component({
  selector: 'demo-drawer-sizes',
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
    <div class="flex flex-wrap gap-2">
      @for (size of sizes; track size.value) {
        <n-drawer>
          <button n-drawer-trigger class="px-4 py-2 rounded-md border text-sm font-medium">
            {{ size.label }}
          </button>
          <n-drawer-content [nSize]="size.value">
            <n-drawer-header>
              <n-drawer-title>Tamanho {{ size.label }}</n-drawer-title>
            </n-drawer-header>
            <div class="flex-1 overflow-y-auto px-6 py-2">
              <p class="text-sm text-muted-foreground">Largura: {{ size.label }}</p>
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
export class DrawerSizesDemo {
  readonly sizes = [
    { value: 'sm' as const,   label: 'sm' },
    { value: 'md' as const,   label: 'md' },
    { value: 'lg' as const,   label: 'lg' },
    { value: 'xl' as const,   label: 'xl' },
    { value: 'full' as const, label: 'full' },
  ];
}
