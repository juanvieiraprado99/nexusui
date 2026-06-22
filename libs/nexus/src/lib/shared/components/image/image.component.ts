import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  input,
  output,
  computed,
  linkedSignal,
  afterRenderEffect,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { mergeClasses } from '../../utils/merge-classes';
import { SkeletonComponent } from '../skeleton';
import { imageWrapperVariants, imageFitVariants, type ImageVariants } from './image.variants';

@Component({
  selector: 'n-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, SkeletonComponent],
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
            [sizes]="nSizes()"
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
            [sizes]="nSizes()"
            [class]="imgClasses()"
            (load)="handleLoad()"
            (error)="handleError()"
          />
        }
      }

      @if (showSkeleton()) {
        <n-skeleton data-slot="skeleton" nClass="absolute inset-0 rounded-none" aria-hidden="true" />
      }

      @if (imageError()) {
        @if (nFallbackSrc()) {
          <img
            data-slot="fallback"
            [src]="nFallbackSrc()!"
            [alt]="nAlt()"
            [width]="nWidth()"
            [height]="nHeight()"
            [class]="imgClasses()"
            loading="lazy"
            decoding="async"
          />
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
  readonly nSizes = input<string>();
  readonly nRatio = input<ImageVariants['nRatio']>('auto');
  readonly nRounded = input<ImageVariants['nRounded']>('none');
  readonly nFit = input<ImageVariants['nFit']>('cover');
  readonly nClass = input<string>('');

  readonly nLoad = output<void>();
  readonly nError = output<void>();

  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    // Browser-only (afterRenderEffect never runs on the server) — SSR-safe.
    // Covers cache hits and SSR hydration: the (load) event does NOT refire for
    // an <img> that is already `complete`, so the skeleton would otherwise stay
    // stuck on top of a fully loaded image. Re-runs whenever nSrc changes.
    afterRenderEffect(() => {
      this.nSrc();
      this.syncLoadedState();
    });
  }

  private syncLoadedState(): void {
    const img = this.elementRef.nativeElement.querySelector<HTMLImageElement>(
      'img:not([data-slot="fallback"])',
    );
    if (!img || !img.complete) return;
    if (img.naturalWidth > 0) {
      this.handleLoad();
    } else {
      this.handleError();
    }
  }

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
