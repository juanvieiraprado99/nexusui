import { Component } from '@angular/core';
import { ButtonGroupComponent } from '../button-group.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'demo-button-group-default',
  standalone: true,
  imports: [ButtonGroupComponent, ButtonComponent],
  template: `
    <n-button-group nAriaLabel="Text alignment">
      <button n-button nVariant="outline">Left</button>
      <button n-button nVariant="outline">Center</button>
      <button n-button nVariant="outline">Right</button>
    </n-button-group>
  `,
})
export class ButtonGroupDefaultDemo {}
