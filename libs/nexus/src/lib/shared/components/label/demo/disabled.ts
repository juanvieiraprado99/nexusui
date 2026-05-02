import { Component } from '@angular/core';
import { LabelComponent } from '../label.component';

@Component({
  selector: 'demo-label-disabled',
  standalone: true,
  imports: [LabelComponent],
  template: `
    <n-label nFor="city" [nDisabled]="true">Cidade</n-label>
    <input id="city" type="text" disabled class="border rounded px-2 py-1" />
  `,
})
export class LabelDisabledDemo {}
