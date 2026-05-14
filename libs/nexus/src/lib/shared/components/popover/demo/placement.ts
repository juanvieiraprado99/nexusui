import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { PopoverComponent } from '../popover.component';
import { PopoverContentComponent } from '../popover-content.component';
import { PopoverTriggerDirective } from '../popover-trigger.directive';

@Component({
  selector: 'demo-popover-placement',
  standalone: true,
  imports: [PopoverComponent, PopoverTriggerDirective, PopoverContentComponent, ButtonComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      @for (side of sides; track side) {
        <n-popover>
          <button n-button n-popover-trigger nVariant="outline" nSize="sm">{{ side }}</button>
          <n-popover-content [nSide]="side" nSize="sm">
            <p class="text-center font-medium">nSide="{{ side }}"</p>
          </n-popover-content>
        </n-popover>
      }
    </div>
  `,
})
export class PopoverPlacementDemo {
  readonly sides = ['top', 'bottom', 'left', 'right'] as const;
}
