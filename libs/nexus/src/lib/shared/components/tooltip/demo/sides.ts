import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { TooltipDirective } from '../tooltip.directive';

@Component({
  selector: 'demo-tooltip-sides',
  standalone: true,
  imports: [TooltipDirective, ButtonComponent],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-4 p-8">
      <n-button nTooltip="Top tooltip" nTooltipSide="top">Top</n-button>
      <n-button nTooltip="Right tooltip" nTooltipSide="right">Right</n-button>
      <n-button nTooltip="Bottom tooltip" nTooltipSide="bottom">Bottom</n-button>
      <n-button nTooltip="Left tooltip" nTooltipSide="left">Left</n-button>
    </div>
  `,
})
export class TooltipSidesDemo {}
