import { Component } from '@angular/core';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-loading',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective],
  template: `
    <n-input-group nAddonBefore="@" nLoading>
      <input nInputGroup type="text" placeholder="usuario" disabled />
    </n-input-group>
  `,
})
export class InputGroupLoadingDemo {}
