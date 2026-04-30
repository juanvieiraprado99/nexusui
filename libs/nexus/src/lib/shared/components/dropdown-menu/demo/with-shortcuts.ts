import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { DropdownMenuContentComponent } from '../dropdown-menu-content.component';
import { DropdownMenuItemComponent } from '../dropdown-menu-item.component';
import { DropdownMenuShortcutComponent } from '../dropdown-menu-shortcut.component';
import { DropdownMenuTriggerDirective } from '../dropdown-menu-trigger.directive';

@Component({
  selector: 'demo-dropdown-menu-with-shortcuts',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuShortcutComponent,
  ],
  template: `
    <n-dropdown-menu>
      <button n-button n-dropdown-menu-trigger nVariant="outline">Conta</button>
      <n-dropdown-menu-content>
        <n-dropdown-menu-item>
          Perfil
          <n-dropdown-menu-shortcut>⇧⌘P</n-dropdown-menu-shortcut>
        </n-dropdown-menu-item>
        <n-dropdown-menu-item>
          Configurações
          <n-dropdown-menu-shortcut>⌘,</n-dropdown-menu-shortcut>
        </n-dropdown-menu-item>
        <n-dropdown-menu-item>
          Atalhos
          <n-dropdown-menu-shortcut>⌘K</n-dropdown-menu-shortcut>
        </n-dropdown-menu-item>
      </n-dropdown-menu-content>
    </n-dropdown-menu>
  `,
})
export class DropdownMenuWithShortcutsDemo {}
