import { Component } from '@angular/core';

import { InputGroupComponent } from '../input-group.component';
import { InputGroupControlDirective } from '../input-group-control.directive';

@Component({
  selector: 'demo-input-group-with-icon',
  standalone: true,
  imports: [InputGroupComponent, InputGroupControlDirective],
  template: `
    <n-input-group [nAddonBefore]="mailIcon">
      <input nInputGroup type="email" placeholder="seu@email.com" />
    </n-input-group>

    <ng-template #mailIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    </ng-template>
  `,
})
export class InputGroupWithIconDemo {}
