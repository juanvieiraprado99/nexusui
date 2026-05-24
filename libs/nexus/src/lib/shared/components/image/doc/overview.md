# Image

An image component built on Angular's `NgOptimizedImage` directive. Provides automatic lazy loading, LCP optimization, CDN loader support, skeleton placeholders, aspect ratio control, and fallback handling.

## Usage

```ts
import { ImageComponent } from '@/components/image';
```

```html
<n-image
  nSrc="https://example.com/photo.jpg"
  nAlt="Description of the image"
  [nWidth]="800"
  [nHeight]="450"
  nRounded="default"
/>
```

## Fill mode

Use `nFill` to stretch the image to fill its parent container. The parent **must** have `position: relative` (or `absolute`/`fixed`) and explicit dimensions.

```html
<div class="relative h-64 w-full">
  <n-image
    nSrc="https://example.com/photo.jpg"
    nAlt="Banner"
    [nFill]="true"
    nFit="cover"
  />
</div>
```

## Priority (above-the-fold)

Mark hero images as priority to disable lazy loading and add `fetchpriority="high"`:

```html
<n-image
  nSrc="https://example.com/hero.jpg"
  nAlt="Hero"
  [nWidth]="1200"
  [nHeight]="600"
  [nPriority]="true"
/>
```

## CDN loaders

Configure a loader once in `app.config.ts`. All `n-image` components in the app will use it automatically:

```ts
import { provideImgixLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideImgixLoader('https://my-domain.imgix.net'),
    // or: provideCloudinaryLoader, provideImageKitLoader, provideNetlifyImageLoader
  ],
};
```

Then pass CDN-specific parameters via `nLoaderParams`:

```html
<n-image
  nSrc="images/product.jpg"
  nAlt="Product"
  [nWidth]="600"
  [nHeight]="600"
  [nLoaderParams]="{ auto: 'format', q: 80 }"
/>
```

## Fallback

Provide a fallback URL or a custom template for broken images:

```html
<!-- URL fallback -->
<n-image
  nSrc="https://example.com/missing.jpg"
  nAlt="Photo"
  nFallbackSrc="https://example.com/placeholder.jpg"
  [nWidth]="400"
  [nHeight]="300"
/>

<!-- Custom slot fallback -->
<n-image nSrc="..." nAlt="..." [nWidth]="400" [nHeight]="300" nRatio="landscape">
  <div nImageFallback class="absolute inset-0 flex items-center justify-center bg-muted">
    Image unavailable
  </div>
</n-image>
```

## Skeleton

A skeleton placeholder is shown by default while the image loads. Works best when combined with `nRatio` or `nFill` (so the wrapper has defined dimensions before the image loads).

```html
<n-image
  nSrc="https://example.com/photo.jpg"
  nAlt="Photo"
  [nWidth]="800"
  [nHeight]="450"
  nRatio="video"
  [nSkeleton]="true"
/>
```
