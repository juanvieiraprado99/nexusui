import { Component } from '@angular/core';
import { ImageComponent } from '../image.component';

@Component({
  selector: 'demo-image-default',
  imports: [ImageComponent],
  template: `
    <n-image
      nSrc="https://picsum.photos/seed/nexus/800/450"
      nAlt="Landscape photo"
      [nWidth]="800"
      [nHeight]="450"
      nRounded="default"
      class="w-full max-w-lg"
    />
  `,
})
export class ImageDefaultDemo {}
