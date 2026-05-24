import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-clearable',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective, FormsModule],
  template: `
    <n-input-group nClearable>
      <input nInputGroup type="text" [(ngModel)]="value" placeholder="Digite algo..." />
    </n-input-group>
  `,
})
export class InputGroupClearableDemo {
  value = signal('');
}
