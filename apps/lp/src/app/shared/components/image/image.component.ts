import { Component, ChangeDetectionStrategy, input, output, computed, linkedSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { mergeClasses } from '../../utils/merge-classes';
import { imageWrapperVariants, imageFitVariants, type ImageVariants } from './image.variants';

@Component({
  selector: 'n-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  host: { class: 'contents' },
  template: `
    <div data-slot="root" [class]="wrapperClasses()">
      @if (!imageError()) {
        @if (nFill()) {
          <img
            [ngSrc]="nSrc()"
            [alt]="nAlt()"
            [fill]="true"
            [priority]="nPriority()"
            [loaderParams]="nLoaderParams()"
            [class]="imgClasses()"
            (load)="handleLoad()"
            (error)="handleError()"
          />
        } @else {
          <img
            [ngSrc]="nSrc()"
            [alt]="nAlt()"
            [width]="nWidth()!"
            [height]="nHeight()!"
            [priority]="nPriority()"
            [loaderParams]="nLoaderParams()"
            [class]="imgClasses()"
            (load)="handleLoad()"
            (error)="handleError()"
          />
        }
      }

      @if (showSkeleton()) {
        <div data-slot="skeleton" class="absolute inset-0 animate-pulse bg-muted" aria-hidden="true"></div>
      }

      @if (imageError()) {
        @if (nFallbackSrc()) {
          <img data-slot="fallback" [src]="nFallbackSrc()!" [alt]="nAlt()" [class]="imgClasses()" />
        } @else {
          <ng-content select="[nImageFallback]" />
        }
      }
    </div>
  `,
})
export class ImageComponent {
  readonly nSrc = input.required<string>();
  readonly nAlt = input.required<string>();
  readonly nWidth = input<number>();
  readonly nHeight = input<number>();
  readonly nFill = input<boolean>(false);
  readonly nPriority = input<boolean>(false);
  readonly nSkeleton = input<boolean>(true);
  readonly nFallbackSrc = input<string>();
  readonly nLoaderParams = input<Record<string, string | number>>({});
  readonly nRatio = input<ImageVariants['nRatio']>('auto');
  readonly nRounded = input<ImageVariants['nRounded']>('none');
  readonly nFit = input<ImageVariants['nFit']>('cover');
  readonly nClass = input<string>('');

  readonly nLoad = output<void>();
  readonly nError = output<void>();

  protected readonly imageLoaded = linkedSignal<boolean>(() => {
    void this.nSrc();
    return false;
  });

  protected readonly imageError = linkedSignal<boolean>(() => {
    void this.nSrc();
    return false;
  });

  protected readonly showSkeleton = computed(
    () => this.nSkeleton() && !this.imageLoaded() && !this.imageError(),
  );

  protected readonly wrapperClasses = computed(() =>
    mergeClasses(
      imageWrapperVariants({ nRatio: this.nRatio(), nRounded: this.nRounded() }),
      this.nClass(),
    ),
  );

  protected readonly imgClasses = computed(() =>
    mergeClasses(
      imageFitVariants({ nFit: this.nFit() }),
      this.nFill() ? 'w-full h-full' : '',
    ),
  );

  protected handleLoad(): void {
    this.imageLoaded.set(true);
    this.nLoad.emit();
  }

  protected handleError(): void {
    this.imageError.set(true);
    this.nError.emit();
  }
}
