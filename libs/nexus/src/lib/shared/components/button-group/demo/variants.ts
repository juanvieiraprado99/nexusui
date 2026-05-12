import { Component } from '@angular/core';
import { ButtonGroupComponent } from '../button-group.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'demo-button-group-variants',
  standalone: true,
  imports: [ButtonGroupComponent, ButtonComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-button-group nVariant="default" nAriaLabel="Default variant">
        <button n-button>Bold</button>
        <button n-button>Italic</button>
        <button n-button>Underline</button>
      </n-button-group>

      <n-button-group nVariant="outline" nAriaLabel="Outline variant">
        <button n-button>Bold</button>
        <button n-button>Italic</button>
        <button n-button>Underline</button>
      </n-button-group>

      <n-button-group nVariant="secondary" nAriaLabel="Secondary variant">
        <button n-button>Bold</button>
        <button n-button>Italic</button>
        <button n-button>Underline</button>
      </n-button-group>
    </div>
  `,
})
export class ButtonGroupVariantsDemo {}
