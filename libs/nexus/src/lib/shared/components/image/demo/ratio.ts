import { Component } from '@angular/core';
import { ImageComponent } from '../image.component';

@Component({
  selector: 'demo-image-ratio',
  imports: [ImageComponent],
  template: `
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      @for (item of ratios; track item.label) {
        <div class="space-y-1">
          <n-image
            [nSrc]="item.src"
            [nAlt]="item.label"
            [nFill]="true"
            [nRatio]="item.ratio"
            nRounded="default"
            class="w-full"
          />
          <p class="text-center text-xs text-muted-foreground">{{ item.label }}</p>
        </div>
      }
    </div>
  `,
})
export class ImageRatioDemo {
  protected readonly ratios = [
    { label: 'Square (1:1)', ratio: 'square' as const, src: 'https://picsum.photos/seed/r1/400/400' },
    { label: 'Video (16:9)', ratio: 'video' as const, src: 'https://picsum.photos/seed/r2/800/450' },
    { label: 'Portrait (3:4)', ratio: 'portrait' as const, src: 'https://picsum.photos/seed/r3/300/400' },
    { label: 'Landscape (4:3)', ratio: 'landscape' as const, src: 'https://picsum.photos/seed/r4/400/300' },
  ];
}
