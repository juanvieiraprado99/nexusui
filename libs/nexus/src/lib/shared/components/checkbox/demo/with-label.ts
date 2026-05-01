import { Component } from '@angular/core';
import { CheckboxComponent } from '../checkbox.component';

@Component({
  selector: 'demo-checkbox-with-label',
  standalone: true,
  imports: [CheckboxComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-checkbox nLabel="Subscribe to newsletter" nHint="We'll send you weekly updates." />
      <n-checkbox nLabel="I agree to the terms of service" [nRequired]="true" />
      <n-checkbox
        nLabel="Enable notifications"
        nError="You must enable notifications to continue."
      />
    </div>
  `,
})
export class CheckboxDemoWithLabel {}
