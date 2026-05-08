import { Component, signal } from '@angular/core';
import { SliderComponent } from '../slider.component';

@Component({
  selector: 'demo-slider-vertical',
  standalone: true,
  imports: [SliderComponent],
  template: `
    <div class="flex items-start gap-10 h-52">
      <div class="flex flex-col items-center gap-2">
        <n-slider [(nValue)]="bass"   nOrientation="vertical" nLabel="Bass"   />
        <span class="text-xs text-muted-foreground">{{ bass() }}</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-slider [(nValue)]="mid"    nOrientation="vertical" nLabel="Mid"    />
        <span class="text-xs text-muted-foreground">{{ mid() }}</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-slider [(nValue)]="treble" nOrientation="vertical" nLabel="Treble" />
        <span class="text-xs text-muted-foreground">{{ treble() }}</span>
      </div>
    </div>
  `,
})
export class SliderVerticalDemo {
  bass   = signal<number>(60);
  mid    = signal<number>(45);
  treble = signal<number>(75);
}
