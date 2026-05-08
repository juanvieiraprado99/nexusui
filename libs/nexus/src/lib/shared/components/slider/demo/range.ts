import { Component, signal } from '@angular/core';
import { SliderComponent } from '../slider.component';

@Component({
  selector: 'demo-slider-range',
  standalone: true,
  imports: [SliderComponent],
  template: `
    <div class="w-72 space-y-4">
      <n-slider [(nValue)]="range" [nRange]="true" nLabel="Price range" />
      <p class="text-sm text-muted-foreground">
        {{ range()[0] }} – {{ range()[1] }}
      </p>
    </div>
  `,
})
export class SliderRangeDemo {
  range = signal<[number, number]>([20, 75]);
}
