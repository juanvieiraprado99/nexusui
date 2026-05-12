import { Component } from '@angular/core';
import { ButtonGroupComponent } from '../button-group.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'demo-button-group-disabled',
  standalone: true,
  imports: [ButtonGroupComponent, ButtonComponent],
  template: `
    <n-button-group [nDisabled]="true" nAriaLabel="Disabled group">
      <button n-button nVariant="outline">Bold</button>
      <button n-button nVariant="outline">Italic</button>
      <button n-button nVariant="outline">Underline</button>
    </n-button-group>
  `,
})
export class ButtonGroupDisabledDemo {}
