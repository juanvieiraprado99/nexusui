import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { TooltipDirective } from '../tooltip.directive';

@Component({
  selector: 'demo-tooltip-diagonals',
  standalone: true,
  imports: [TooltipDirective, ButtonComponent],
  template: `
    <div class="grid grid-cols-2 gap-4 p-8 place-items-center">
      <n-button nTooltip="Top-left tooltip" nTooltipSide="top-left">Top-left</n-button>
      <n-button nTooltip="Top-right tooltip" nTooltipSide="top-right">Top-right</n-button>
      <n-button nTooltip="Bottom-left tooltip" nTooltipSide="bottom-left">Bottom-left</n-button>
      <n-button nTooltip="Bottom-right tooltip" nTooltipSide="bottom-right">Bottom-right</n-button>
    </div>
  `,
})
export class TooltipDiagonalsDemo {}
