import { Component } from '@angular/core';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-sizes',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective],
  template: `
    <div class="flex flex-col gap-3">
      <n-input-group nAddonBefore="$" nSize="sm">
        <input nInputGroup type="number" placeholder="0.00" />
      </n-input-group>

      <n-input-group nAddonBefore="$">
        <input nInputGroup type="number" placeholder="0.00" />
      </n-input-group>

      <n-input-group nAddonBefore="$" nSize="lg">
        <input nInputGroup type="number" placeholder="0.00" />
      </n-input-group>
    </div>
  `,
})
export class InputGroupSizesDemo {}
