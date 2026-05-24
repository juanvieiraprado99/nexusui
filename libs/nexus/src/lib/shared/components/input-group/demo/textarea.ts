import { Component } from '@angular/core';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-textarea',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective],
  template: `
    <n-input-group nAddonBefore="Nota" nAddonAfter="máx. 500 caracteres">
      <textarea nInputGroup rows="4" placeholder="Descreva o problema..."></textarea>
    </n-input-group>
  `,
})
export class InputGroupTextareaDemo {}
