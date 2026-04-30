import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { DropdownMenuContentComponent } from '../dropdown-menu-content.component';
import { DropdownMenuItemComponent } from '../dropdown-menu-item.component';
import { DropdownMenuSeparatorComponent } from '../dropdown-menu-separator.component';
import { DropdownMenuSubComponent } from '../dropdown-menu-sub.component';
import { DropdownMenuSubContentComponent } from '../dropdown-menu-sub-content.component';
import { DropdownMenuSubTriggerComponent } from '../dropdown-menu-sub-trigger.component';
import { DropdownMenuTriggerDirective } from '../dropdown-menu-trigger.directive';

@Component({
  selector: 'demo-dropdown-menu-with-submenu',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
    DropdownMenuSeparatorComponent,
    DropdownMenuSubComponent,
    DropdownMenuSubTriggerComponent,
    DropdownMenuSubContentComponent,
  ],
  template: `
    <n-dropdown-menu>
      <button n-button n-dropdown-menu-trigger nVariant="outline">Compartilhar</button>
      <n-dropdown-menu-content>
        <n-dropdown-menu-item>Copiar link</n-dropdown-menu-item>
        <n-dropdown-menu-separator />
        <n-dropdown-menu-sub>
          <n-dropdown-menu-sub-trigger>Convidar</n-dropdown-menu-sub-trigger>
          <n-dropdown-menu-sub-content>
            <n-dropdown-menu-item>Por e-mail</n-dropdown-menu-item>
            <n-dropdown-menu-item>Por mensagem</n-dropdown-menu-item>
            <n-dropdown-menu-item>Por link público</n-dropdown-menu-item>
          </n-dropdown-menu-sub-content>
        </n-dropdown-menu-sub>
        <n-dropdown-menu-item>Mais opções...</n-dropdown-menu-item>
      </n-dropdown-menu-content>
    </n-dropdown-menu>
  `,
})
export class DropdownMenuWithSubmenuDemo {}
