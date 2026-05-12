import { Component } from '@angular/core';
import { ButtonGroupComponent } from '../button-group.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'demo-button-group-sizes',
  standalone: true,
  imports: [ButtonGroupComponent, ButtonComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-button-group nSize="sm" nAriaLabel="Small group">
        <button n-button nVariant="outline">Small</button>
        <button n-button nVariant="outline">Group</button>
        <button n-button nVariant="outline">Buttons</button>
      </n-button-group>

      <n-button-group nAriaLabel="Default group">
        <button n-button nVariant="outline">Default</button>
        <button n-button nVariant="outline">Group</button>
        <button n-button nVariant="outline">Buttons</button>
      </n-button-group>

      <n-button-group nSize="lg" nAriaLabel="Large group">
        <button n-button nVariant="outline">Large</button>
        <button n-button nVariant="outline">Group</button>
        <button n-button nVariant="outline">Buttons</button>
      </n-button-group>
    </div>
  `,
})
export class ButtonGroupSizesDemo {}
