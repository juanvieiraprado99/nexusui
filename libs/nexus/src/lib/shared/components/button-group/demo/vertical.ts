import { Component } from '@angular/core';
import { ButtonGroupComponent } from '../button-group.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'demo-button-group-vertical',
  standalone: true,
  imports: [ButtonGroupComponent, ButtonComponent],
  template: `
    <n-button-group nOrientation="vertical" nAriaLabel="Actions" class="w-48">
      <button n-button nVariant="outline">Profile</button>
      <button n-button nVariant="outline">Settings</button>
      <button n-button nVariant="outline">Sign out</button>
    </n-button-group>
  `,
})
export class ButtonGroupVerticalDemo {}
