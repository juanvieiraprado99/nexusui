import { Component, signal } from '@angular/core';
import { SliderComponent } from '../slider.component';

@Component({
  selector: 'demo-slider-with-inputs',
  standalone: true,
  imports: [SliderComponent],
  template: `
    <div class="w-96 space-y-6">
      <n-slider
        [(nValue)]="single"
        [nShowInputs]="true"
        nLabel="Single with input"
      />

      <n-slider
        [(nValue)]="range"
        [nRange]="true"
        [nShowInputs]="true"
        nLabel="Range with inputs"
      />
    </div>
  `,
})
export class SliderWithInputsDemo {
  single = signal<number>(30);
  range  = signal<[number, number]>([15, 80]);
}
