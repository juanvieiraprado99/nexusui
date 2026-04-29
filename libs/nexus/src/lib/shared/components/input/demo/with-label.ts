import { Component } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-with-label',
  standalone: true,
  imports: [InputComponent],
  template: `
    <div class="flex w-72 flex-col gap-4">
      <n-input nLabel="Username" nPlaceholder="johndoe" [nRequired]="true" />
      <n-input
        nLabel="Email"
        nType="email"
        nPlaceholder="name@example.com"
        nHint="We'll never share your email."
      />
      <n-input nLabel="Password" nType="password" nPlaceholder="••••••••" [nRequired]="true" />
    </div>
  `,
})
export class InputDemoWithLabel {}
