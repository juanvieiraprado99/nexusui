import { Component } from '@angular/core';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-disabled',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective],
  template: `
    <n-input-group nAddonBefore="https://" nDisabled>
      <input nInputGroup type="text" placeholder="dominio.com" disabled />
    </n-input-group>
  `,
})
export class InputGroupDisabledDemo {}
