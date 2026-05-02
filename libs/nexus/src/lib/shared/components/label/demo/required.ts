import { Component } from '@angular/core';
import { LabelComponent } from '../label.component';

@Component({
  selector: 'demo-label-required',
  standalone: true,
  imports: [LabelComponent],
  template: `
    <n-label nFor="name" [nRequired]="true">Nome</n-label>
    <input id="name" type="text" required class="border rounded px-2 py-1" />
  `,
})
export class LabelRequiredDemo {}
