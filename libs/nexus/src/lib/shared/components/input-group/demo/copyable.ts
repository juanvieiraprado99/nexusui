import { Component } from '@angular/core';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-copyable',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective],
  template: `
    <n-input-group nCopyable nAddonBefore="Token">
      <input nInputGroup type="text" value="nexus-api-key-abc123" readonly />
    </n-input-group>
  `,
})
export class InputGroupCopyableDemo {}
