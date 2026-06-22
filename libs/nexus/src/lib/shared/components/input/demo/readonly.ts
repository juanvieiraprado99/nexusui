import { Component, signal } from '@angular/core';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-readonly',
  standalone: true,
  imports: [InputComponent],
  template: `<n-input nLabel="Username" [(nValue)]="value" [nReadonly]="true" />`,
})
export class InputDemoReadonly {
  value = signal('johndoe');
}
