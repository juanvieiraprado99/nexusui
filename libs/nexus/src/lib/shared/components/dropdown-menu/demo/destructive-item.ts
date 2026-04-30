import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { DropdownMenuContentComponent } from '../dropdown-menu-content.component';
import { DropdownMenuItemComponent } from '../dropdown-menu-item.component';
import { DropdownMenuSeparatorComponent } from '../dropdown-menu-separator.component';
import { DropdownMenuShortcutComponent } from '../dropdown-menu-shortcut.component';
import { DropdownMenuTriggerDirective } from '../dropdown-menu-trigger.directive';

@Component({
  selector: 'demo-dropdown-menu-destructive-item',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent,
    DropdownMenuShortcutComponent,
  ],
  template: `
    <n-dropdown-menu>
      <button n-button n-dropdown-menu-trigger nVariant="outline">Sessão</button>
      <n-dropdown-menu-content>
        <n-dropdown-menu-item>Perfil</n-dropdown-menu-item>
        <n-dropdown-menu-item>Configurações</n-dropdown-menu-item>
        <n-dropdown-menu-separator />
        <n-dropdown-menu-item nVariant="destructive" (nSelect)="logout()">
          Sair
          <n-dropdown-menu-shortcut>⇧⌘Q</n-dropdown-menu-shortcut>
        </n-dropdown-menu-item>
      </n-dropdown-menu-content>
    </n-dropdown-menu>
  `,
})
export class DropdownMenuDestructiveItemDemo {
  logout(): void {
    console.log('logout');
  }
}
