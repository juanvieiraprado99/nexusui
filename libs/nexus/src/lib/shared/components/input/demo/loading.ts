import { Component } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-loading',
  standalone: true,
  imports: [InputComponent],
  template: `<n-input [nLoading]="true" nLabel="Search" nType="search" nPlaceholder="Searching..." />`,
})
export class InputDemoLoading {}
