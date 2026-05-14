import { Component, signal } from '@angular/core';
import { ContextMenuComponent } from '../context-menu.component';
import { ContextMenuCheckboxItemComponent } from '../context-menu-checkbox-item.component';
import { ContextMenuContentComponent } from '../context-menu-content.component';
import { ContextMenuLabelComponent } from '../context-menu-label.component';
import { ContextMenuSeparatorComponent } from '../context-menu-separator.component';
import { ContextMenuTriggerDirective } from '../context-menu-trigger.directive';

@Component({
  selector: 'demo-context-menu-with-checkboxes',
  standalone: true,
  imports: [
    ContextMenuComponent,
    ContextMenuTriggerDirective,
    ContextMenuContentComponent,
    ContextMenuCheckboxItemComponent,
    ContextMenuLabelComponent,
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
        <n-context-menu-label>Visualização</n-context-menu-label>
        <n-context-menu-separator />
        <n-context-menu-checkbox-item [(nChecked)]="showMinimap">
          Mostrar Minimapa
        </n-context-menu-checkbox-item>
        <n-context-menu-checkbox-item [(nChecked)]="wordWrap">
          Quebra de Linha
        </n-context-menu-checkbox-item>
        <n-context-menu-checkbox-item [(nChecked)]="lineNumbers">
          Números de Linha
        </n-context-menu-checkbox-item>
      </n-context-menu-content>
    </n-context-menu>
  `,
})
export class ContextMenuWithCheckboxesDemo {
  showMinimap = signal(true);
  wordWrap = signal(false);
  lineNumbers = signal(true);
}
