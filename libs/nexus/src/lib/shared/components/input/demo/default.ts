import { Component } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-default',
  standalone: true,
  imports: [InputComponent],
  template: `<n-input nPlaceholder="Enter text..." />`,
})
export class InputDemoDefault {}
