import { Component } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-sizes',
  standalone: true,
  imports: [InputComponent],
  template: `
    <div class="flex w-72 flex-col gap-4">
      <n-input nSize="sm" nLabel="Small" nPlaceholder="Small" />
      <n-input nLabel="Default" nPlaceholder="Default" />
      <n-input nSize="lg" nLabel="Large" nPlaceholder="Large" />
    </div>
  `,
})
export class InputDemoSizes {}
