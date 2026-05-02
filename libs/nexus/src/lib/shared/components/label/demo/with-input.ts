import { Component, signal } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { LabelComponent } from '../label.component';

@Component({
  selector: 'demo-label-with-input',
  standalone: true,
  imports: [LabelComponent, InputComponent],
  template: `
    <div class="flex flex-col gap-1">
      <n-label nFor="custom-input" [nRequired]="true">Apelido</n-label>
      <n-input nId="custom-input" [(nValue)]="value" nPlaceholder="@usuario" />
    </div>
  `,
})
export class LabelWithInputDemo {
  value = signal('');
}
