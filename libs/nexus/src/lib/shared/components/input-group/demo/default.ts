import { Component } from '@angular/core';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-default',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective],
  template: `
    <n-input-group nAddonBefore="https://">
      <input nInputGroup type="text" placeholder="dominio.com" />
    </n-input-group>
  `,
})
export class InputGroupDefaultDemo {}
