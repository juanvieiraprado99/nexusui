import { Component } from '@angular/core';
import { CheckboxComponent } from '../checkbox.component';

@Component({
  selector: 'demo-checkbox-disabled',
  standalone: true,
  imports: [CheckboxComponent],
  template: `
    <div class="flex items-center gap-6">
      <n-checkbox nLabel="Unchecked disabled" [nDisabled]="true" />
      <n-checkbox nLabel="Checked disabled" [nChecked]="true" [nDisabled]="true" />
    </div>
  `,
})
export class CheckboxDemoDisabled {}
