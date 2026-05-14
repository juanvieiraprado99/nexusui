import { Component } from '@angular/core';
import { ContextMenuComponent } from '../context-menu.component';
import { ContextMenuContentComponent } from '../context-menu-content.component';
import { ContextMenuItemComponent } from '../context-menu-item.component';
import { ContextMenuSeparatorComponent } from '../context-menu-separator.component';
import { ContextMenuSubComponent } from '../context-menu-sub.component';
import { ContextMenuSubContentComponent } from '../context-menu-sub-content.component';
import { ContextMenuSubTriggerComponent } from '../context-menu-sub-trigger.component';
import { ContextMenuTriggerDirective } from '../context-menu-trigger.directive';

@Component({
  selector: 'demo-context-menu-with-submenu',
  standalone: true,
  imports: [
    ContextMenuComponent,
    ContextMenuTriggerDirective,
    ContextMenuContentComponent,
    ContextMenuItemComponent,
    ContextMenuSeparatorComponent,
    ContextMenuSubComponent,
    ContextMenuSubTriggerComponent,
    ContextMenuSubContentComponent,
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
        <n-context-menu-item>Recortar</n-context-menu-item>
        <n-context-menu-item>Copiar</n-context-menu-item>
        <n-context-menu-item>Colar</n-context-menu-item>
        <n-context-menu-separator />
        <n-context-menu-sub>
          <n-context-menu-sub-trigger>Compartilhar</n-context-menu-sub-trigger>
          <n-context-menu-sub-content>
            <n-context-menu-item>E-mail</n-context-menu-item>
            <n-context-menu-item>Slack</n-context-menu-item>
            <n-context-menu-item>Copiar Link</n-context-menu-item>
          </n-context-menu-sub-content>
        </n-context-menu-sub>
        <n-context-menu-separator />
        <n-context-menu-item nVariant="destructive">Excluir</n-context-menu-item>
      </n-context-menu-content>
    </n-context-menu>
  `,
})
export class ContextMenuWithSubmenuDemo {}
