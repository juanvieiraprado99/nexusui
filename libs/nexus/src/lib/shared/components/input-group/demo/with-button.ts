import { Component } from '@angular/core';

import { ButtonComponent } from '../../button';
import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-with-button',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective, ButtonComponent],
  template: `
    <n-input-group [nAddonAfter]="searchBtn">
      <input nInputGroup type="search" placeholder="Pesquisar..." />
    </n-input-group>

    <ng-template #searchBtn>
      <button n-button nVariant="ghost" nSize="sm" type="button">Buscar</button>
    </ng-template>
  `,
})
export class InputGroupWithButtonDemo {}
