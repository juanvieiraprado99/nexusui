import { Component } from '@angular/core';

@Component({
  selector: 'demo-image-cdn',
  template: `
    <div class="space-y-4 rounded-lg border border-border/60 bg-muted/30 p-4 text-sm">
      <p class="text-muted-foreground">
        Configure a CDN loader once in <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">app.config.ts</code>.
        All <code class="rounded bg-muted px-1 py-0.5 font-mono text-xs">n-image</code> components use it automatically.
      </p>
      <pre class="rounded-md bg-muted p-3 text-xs text-foreground overflow-x-auto"><code>{{ configCode }}</code></pre>
      <pre class="rounded-md bg-muted p-3 text-xs text-foreground overflow-x-auto"><code>{{ usageCode }}</code></pre>
    </div>
  `,
})
export class ImageCdnDemo {
  protected readonly configCode = `import { provideImgixLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideImgixLoader('https://my-domain.imgix.net'),
    // or: provideCloudinaryLoader, provideImageKitLoader, provideNetlifyImageLoader
  ],
};`;

  protected readonly usageCode = `<n-image
  nSrc="images/product.jpg"
  nAlt="Product"
  [nWidth]="600"
  [nHeight]="600"
  [nPriority]="true"
  [nLoaderParams]="{ auto: 'format', q: 80 }"
/>`;
}
