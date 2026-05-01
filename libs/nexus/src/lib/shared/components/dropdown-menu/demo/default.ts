import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { DropdownMenuContentComponent } from '../dropdown-menu-content.component';
import { DropdownMenuItemComponent } from '../dropdown-menu-item.component';
import { DropdownMenuTriggerDirective } from '../dropdown-menu-trigger.directive';

@Component({
  selector: 'demo-dropdown-menu-default',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
  ],
  template: `
    <n-dropdown-menu>
      <button n-button n-dropdown-menu-trigger nVariant="outline">Abrir menu</button>
      <n-dropdown-menu-content>
        <n-dropdown-menu-item (nSelect)="action('perfil')">Perfil</n-dropdown-menu-item>
        <n-dropdown-menu-item (nSelect)="action('billing')">Cobrança</n-dropdown-menu-item>
        <n-dropdown-menu-item (nSelect)="action('team')">Equipe</n-dropdown-menu-item>
        <n-dropdown-menu-item [nDisabled]="true">Indisponível</n-dropdown-menu-item>
      </n-dropdown-menu-content>
    </n-dropdown-menu>
  `,
})
export class DropdownMenuDefaultDemo {
  action(name: string): void {
    console.log('select', name);
  }
}
