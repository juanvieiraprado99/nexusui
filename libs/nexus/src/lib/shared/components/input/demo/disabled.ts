import { Component } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-disabled',
  standalone: true,
  imports: [InputComponent],
  template: `<n-input [nDisabled]="true" nLabel="Email" nPlaceholder="Disabled input" />`,
})
export class InputDemoDisabled {}
