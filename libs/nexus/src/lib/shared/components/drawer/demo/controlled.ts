import { Component, signal } from '@angular/core';
import { DrawerComponent } from '../drawer.component';
import { DrawerContentComponent } from '../drawer-content.component';
import { DrawerHeaderComponent } from '../drawer-header.component';
import { DrawerFooterComponent } from '../drawer-footer.component';
import { DrawerTitleComponent } from '../drawer-title.component';
import { DrawerDescriptionComponent } from '../drawer-description.component';

@Component({
  selector: 'demo-drawer-controlled',
  standalone: true,
  imports: [
    DrawerComponent,
    DrawerContentComponent,
    DrawerHeaderComponent,
    DrawerFooterComponent,
    DrawerTitleComponent,
    DrawerDescriptionComponent,
  ],
  template: `
    <div class="flex flex-col items-center gap-3">
      <button
        type="button"
        class="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium"
        (click)="open.set(true)"
      >
        Abrir via signal externo
      </button>
      <span class="text-xs text-muted-foreground">Estado: {{ open() ? 'aberto' : 'fechado' }}</span>

      <n-drawer [(nOpen)]="open" (nOpenChange)="onOpenChange($event)">
        <n-drawer-content>
          <n-drawer-header>
            <n-drawer-title>Drawer controlado</n-drawer-title>
            <n-drawer-description>Aberto e fechado por um signal externo via [(nOpen)].</n-drawer-description>
          </n-drawer-header>

          <div class="flex-1 overflow-y-auto px-6 py-2">
            <p class="text-sm text-muted-foreground">O estado vive no componente pai.</p>
          </div>

          <n-drawer-footer>
            <button
              type="button"
              class="px-4 py-2 rounded-md border text-sm font-medium"
              (click)="open.set(false)"
            >
              Fechar
            </button>
          </n-drawer-footer>
        </n-drawer-content>
      </n-drawer>
    </div>
  `,
})
export class DrawerControlledDemo {
  readonly open = signal(false);

  onOpenChange(value: boolean): void {
    // sincronize aqui qualquer estado derivado (analytics, etc.)
    void value;
  }
}
