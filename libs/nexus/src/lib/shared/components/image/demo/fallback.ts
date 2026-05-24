import { Component } from '@angular/core';
import { ImageComponent } from '../image.component';

@Component({
  selector: 'demo-image-fallback',
  imports: [ImageComponent],
  template: `
    <div class="flex flex-wrap gap-6">
      <div class="space-y-1">
        <n-image
          nSrc="https://broken.example.com/missing.jpg"
          nAlt="Image with URL fallback"
          [nWidth]="200"
          [nHeight]="150"
          nFallbackSrc="https://picsum.photos/seed/fallback/200/150"
          nRounded="default"
        />
        <p class="text-center text-xs text-muted-foreground">nFallbackSrc</p>
      </div>

      <div class="space-y-1">
        <n-image
          nSrc="https://broken.example.com/missing2.jpg"
          nAlt="Image with slot fallback"
          [nWidth]="200"
          [nHeight]="150"
          nRatio="landscape"
          nRounded="default"
        >
          <div
            nImageFallback
            class="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-muted text-muted-foreground"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
            <span class="text-xs">Image not found</span>
          </div>
        </n-image>
        <p class="text-center text-xs text-muted-foreground">Custom slot fallback</p>
      </div>
    </div>
  `,
})
export class ImageFallbackDemo {}
