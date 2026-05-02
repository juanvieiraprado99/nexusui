import { Component } from '@angular/core';
import { LabelComponent } from '../label.component';

@Component({
  selector: 'demo-label-default',
  standalone: true,
  imports: [LabelComponent],
  template: `
    <n-label nFor="email">Email</n-label>
    <input id="email" type="email" class="border rounded px-2 py-1" />
  `,
})
export class LabelDefaultDemo {}
