import { Component } from '@angular/core';
import { CheckboxComponent } from '../checkbox.component';

@Component({
  selector: 'demo-checkbox-default',
  standalone: true,
  imports: [CheckboxComponent],
  template: `<n-checkbox nLabel="Accept terms and conditions" />`,
})
export class CheckboxDemoDefault {}
