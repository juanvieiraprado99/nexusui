import { Component, signal } from '@angular/core';
import { SliderComponent } from '../slider.component';

@Component({
  selector: 'demo-slider-default',
  standalone: true,
  imports: [SliderComponent],
  template: `
    <div class="w-72 space-y-4">
      <n-slider [(nValue)]="value" nLabel="Volume" />
      <p class="text-sm text-muted-foreground">Value: {{ value() }}</p>
    </div>
  `,
})
export class SliderDefaultDemo {
  value = signal<number>(40);
}
