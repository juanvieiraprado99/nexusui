import { Component } from '@angular/core';
import { ContextMenuComponent } from '../context-menu.component';
import { ContextMenuContentComponent } from '../context-menu-content.component';
import { ContextMenuItemComponent } from '../context-menu-item.component';
import { ContextMenuSeparatorComponent } from '../context-menu-separator.component';
import { ContextMenuShortcutComponent } from '../context-menu-shortcut.component';
import { ContextMenuTriggerDirective } from '../context-menu-trigger.directive';

@Component({
  selector: 'demo-context-menu-with-shortcuts',
  standalone: true,
  imports: [
    ContextMenuComponent,
    ContextMenuTriggerDirective,
    ContextMenuContentComponent,
    ContextMenuItemComponent,
    ContextMenuSeparatorComponent,
    ContextMenuShortcutComponent,
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
        <n-context-menu-item>
          Desfazer
          <n-context-menu-shortcut>⌘Z</n-context-menu-shortcut>
        </n-context-menu-item>
        <n-context-menu-item>
          Refazer
          <n-context-menu-shortcut>⇧⌘Z</n-context-menu-shortcut>
        </n-context-menu-item>
        <n-context-menu-separator />
        <n-context-menu-item>
          Recortar
          <n-context-menu-shortcut>⌘X</n-context-menu-shortcut>
        </n-context-menu-item>
        <n-context-menu-item>
          Copiar
          <n-context-menu-shortcut>⌘C</n-context-menu-shortcut>
        </n-context-menu-item>
        <n-context-menu-item>
          Colar
          <n-context-menu-shortcut>⌘V</n-context-menu-shortcut>
        </n-context-menu-item>
      </n-context-menu-content>
    </n-context-menu>
  `,
})
export class ContextMenuWithShortcutsDemo {}
