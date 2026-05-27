import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { TooltipDirective } from '../tooltip.directive';

@Component({
  selector: 'demo-tooltip-template',
  standalone: true,
  imports: [TooltipDirective, ButtonComponent],
  template: `
    <ng-template #richTip>
      <div class="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <span>Requires admin access</span>
      </div>
    </ng-template>

    <div class="flex items-center justify-center p-8">
      <n-button [nTooltip]="richTip">Admin action</n-button>
    </div>
  `,
})
export class TooltipTemplateDemo {}
