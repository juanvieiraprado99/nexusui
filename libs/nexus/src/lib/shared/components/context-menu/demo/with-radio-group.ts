import { Component, signal } from '@angular/core';
import { ContextMenuComponent } from '../context-menu.component';
import { ContextMenuContentComponent } from '../context-menu-content.component';
import { ContextMenuItemComponent } from '../context-menu-item.component';
import { ContextMenuLabelComponent } from '../context-menu-label.component';
import { ContextMenuRadioGroupComponent } from '../context-menu-radio-group.component';
import { ContextMenuRadioItemComponent } from '../context-menu-radio-item.component';
import { ContextMenuSeparatorComponent } from '../context-menu-separator.component';
import { ContextMenuTriggerDirective } from '../context-menu-trigger.directive';

@Component({
  selector: 'demo-context-menu-with-radio-group',
  standalone: true,
  imports: [
    ContextMenuComponent,
    ContextMenuTriggerDirective,
    ContextMenuContentComponent,
    ContextMenuLabelComponent,
    ContextMenuSeparatorComponent,
    ContextMenuRadioGroupComponent,
    ContextMenuRadioItemComponent,
    ContextMenuItemComponent,
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
        <n-context-menu-label>Tema</n-context-menu-label>
        <n-context-menu-separator />
        <n-context-menu-radio-group [(nValue)]="theme">
          <n-context-menu-radio-item nValue="light">Claro</n-context-menu-radio-item>
          <n-context-menu-radio-item nValue="dark">Escuro</n-context-menu-radio-item>
          <n-context-menu-radio-item nValue="system">Sistema</n-context-menu-radio-item>
        </n-context-menu-radio-group>
        <n-context-menu-separator />
        <n-context-menu-item>Configurações</n-context-menu-item>
      </n-context-menu-content>
    </n-context-menu>
  `,
})
export class ContextMenuWithRadioGroupDemo {
  theme = signal<string>('system');
}
