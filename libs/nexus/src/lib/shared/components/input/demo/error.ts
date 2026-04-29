import { Component } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-error',
  standalone: true,
  imports: [InputComponent],
  template: `
    <n-input
      nLabel="Email"
      nType="email"
      nPlaceholder="name@example.com"
      nError="Please enter a valid email address."
    />
  `,
})
export class InputDemoError {}
