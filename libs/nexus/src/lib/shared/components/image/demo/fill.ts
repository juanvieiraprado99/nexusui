import { Component } from '@angular/core';
import { ImageComponent } from '../image.component';

@Component({
  selector: 'demo-image-fill',
  imports: [ImageComponent],
  template: `
    <div class="relative h-64 w-full overflow-hidden rounded-lg">
      <n-image
        nSrc="https://picsum.photos/seed/fill/1200/600"
        nAlt="Fill mode image"
        [nFill]="true"
        nFit="cover"
      />
    </div>
  `,
})
export class ImageFillDemo {}
