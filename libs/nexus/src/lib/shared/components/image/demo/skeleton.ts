import { Component, signal } from '@angular/core';
import { ImageComponent } from '../image.component';

@Component({
  selector: 'demo-image-skeleton',
  imports: [ImageComponent],
  template: `
    <div class="space-y-4">
      <n-image
        [nSrc]="src()"
        nAlt="Image with skeleton loader"
        [nWidth]="800"
        [nHeight]="450"
        nRatio="video"
        nRounded="default"
        [nSkeleton]="true"
        class="w-full max-w-lg"
        (nLoad)="loaded.set(true)"
      />
      <p class="text-xs text-muted-foreground">
        {{ loaded() ? 'Image loaded.' : 'Skeleton shows while the image is loading.' }}
      </p>
      <button
        type="button"
        class="rounded-md bg-muted px-3 py-1.5 text-xs font-medium"
        (click)="reload()"
      >
        Reload image
      </button>
    </div>
  `,
})
export class ImageSkeletonDemo {
  protected readonly src = signal('https://picsum.photos/seed/skel/800/450');
  protected readonly loaded = signal(false);

  protected reload(): void {
    this.loaded.set(false);
    this.src.set(`https://picsum.photos/seed/skel${Date.now()}/800/450`);
  }
}
