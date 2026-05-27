import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { TooltipDirective } from '../tooltip.directive';

@Component({
  selector: 'demo-tooltip-basic',
  standalone: true,
  imports: [TooltipDirective, ButtonComponent],
  template: `
    <div class="flex items-center justify-center p-8">
      <n-button nTooltip="Save changes">Save</n-button>
    </div>
  `,
})
export class TooltipBasicDemo {}
