import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { DropdownMenuContentComponent } from '../dropdown-menu-content.component';
import { DropdownMenuGroupComponent } from '../dropdown-menu-group.component';
import { DropdownMenuItemComponent } from '../dropdown-menu-item.component';
import { DropdownMenuLabelComponent } from '../dropdown-menu-label.component';
import { DropdownMenuSeparatorComponent } from '../dropdown-menu-separator.component';
import { DropdownMenuTriggerDirective } from '../dropdown-menu-trigger.directive';

@Component({
  selector: 'demo-dropdown-menu-with-groups',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuLabelComponent,
    DropdownMenuSeparatorComponent,
    DropdownMenuGroupComponent,
  ],
  template: `
    <n-dropdown-menu>
      <button n-button n-dropdown-menu-trigger nVariant="outline">Minha conta</button>
      <n-dropdown-menu-content>
        <n-dropdown-menu-label>Conta</n-dropdown-menu-label>
        <n-dropdown-menu-group>
          <n-dropdown-menu-item>Perfil</n-dropdown-menu-item>
          <n-dropdown-menu-item>Cobrança</n-dropdown-menu-item>
        </n-dropdown-menu-group>
        <n-dropdown-menu-separator />
        <n-dropdown-menu-label>Workspace</n-dropdown-menu-label>
        <n-dropdown-menu-group>
          <n-dropdown-menu-item>Equipe</n-dropdown-menu-item>
          <n-dropdown-menu-item>Convidar</n-dropdown-menu-item>
        </n-dropdown-menu-group>
      </n-dropdown-menu-content>
    </n-dropdown-menu>
  `,
})
export class DropdownMenuWithGroupsDemo {}
