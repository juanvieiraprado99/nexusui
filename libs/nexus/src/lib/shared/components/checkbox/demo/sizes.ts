import { Component } from '@angular/core';
import { CheckboxComponent } from '../checkbox.component';

@Component({
  selector: 'demo-checkbox-sizes',
  standalone: true,
  imports: [CheckboxComponent],
  template: `
    <div class="flex items-center gap-6">
      <n-checkbox nSize="sm" nLabel="Small" [nChecked]="true" />
      <n-checkbox nSize="default" nLabel="Default" [nChecked]="true" />
      <n-checkbox nSize="lg" nLabel="Large" [nChecked]="true" />
    </div>
  `,
})
export class CheckboxDemoSizes {}
