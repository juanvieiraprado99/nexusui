import { Component } from '@angular/core';
import { ContextMenuComponent } from '../context-menu.component';
import { ContextMenuContentComponent } from '../context-menu-content.component';
import { ContextMenuItemComponent } from '../context-menu-item.component';
import { ContextMenuSeparatorComponent } from '../context-menu-separator.component';
import { ContextMenuTriggerDirective } from '../context-menu-trigger.directive';

@Component({
  selector: 'demo-context-menu-default',
  standalone: true,
  imports: [
    ContextMenuComponent,
    ContextMenuTriggerDirective,
    ContextMenuContentComponent,
    ContextMenuItemComponent,
    ContextMenuSeparatorComponent,
  ],
  template: `
    <n-context-menu>
      <div
        n-context-menu-trigger
        class="flex h-40 w-64 select-none items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground"
      >
        Clique com botão direito aqui
      </div>
      <n-context-menu-content>
        <n-context-menu-item>Abrir</n-context-menu-item>
        <n-context-menu-item>Renomear</n-context-menu-item>
        <n-context-menu-item>Duplicar</n-context-menu-item>
        <n-context-menu-separator />
        <n-context-menu-item nVariant="destructive">Excluir</n-context-menu-item>
      </n-context-menu-content>
    </n-context-menu>
  `,
})
export class ContextMenuDefaultDemo {}
