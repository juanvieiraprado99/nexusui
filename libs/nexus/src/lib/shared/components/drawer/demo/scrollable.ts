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
  selector: 'demo-drawer-scrollable',
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
      <button n-drawer-trigger class="px-4 py-2 rounded-md border text-sm font-medium">
        Abrir conteúdo longo
      </button>

      <n-drawer-content [nScrollable]="true">
        <n-drawer-header>
          <n-drawer-title>Termos de uso</n-drawer-title>
          <n-drawer-description>Header e footer fixos; o corpo rola.</n-drawer-description>
        </n-drawer-header>

        <div class="flex-1 overflow-y-auto px-6 py-2 space-y-3">
          @for (n of paragraphs; track n) {
            <p class="text-sm text-muted-foreground">
              Parágrafo {{ n }} — conteúdo de exemplo que ultrapassa a altura do painel e força o scroll interno.
            </p>
          }
        </div>

        <n-drawer-footer>
          <button n-drawer-close class="px-4 py-2 rounded-md border text-sm font-medium">
            Recusar
          </button>
          <button n-drawer-close class="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">
            Aceitar
          </button>
        </n-drawer-footer>
      </n-drawer-content>
    </n-drawer>
  `,
})
export class DrawerScrollableDemo {
  readonly paragraphs = Array.from({ length: 20 }, (_, i) => i + 1);
}
