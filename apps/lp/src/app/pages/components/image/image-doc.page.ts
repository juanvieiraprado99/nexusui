import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ImageComponent } from '../../../shared/components/image';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-image-doc-page',
  imports: [ImageComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Image</h1>
          <p class="mt-2 text-muted-foreground">
            An optimized image component powered by Angular's <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">NgOptimizedImage</code>.
            Supports CDN loaders, skeleton placeholders, fallbacks, aspect ratios, and fill mode.
          </p>
        </header>

        <!-- Default -->
        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-image
              nSrc="https://picsum.photos/seed/nexus/800/450"
              nAlt="Landscape photo"
              [nWidth]="800"
              [nHeight]="450"
              nRounded="default"
              class="w-full max-w-lg"
            />
          </app-example>
        </div>

        <!-- Aspect ratios -->
        <div class="mt-6">
          <app-example title="Aspect Ratios" [code]="ratioCode">
            <div class="grid w-full max-w-lg grid-cols-2 gap-4">
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
          </app-example>
        </div>

        <!-- Fill mode -->
        <div class="mt-6">
          <app-example title="Fill Mode" [code]="fillCode">
            <div class="relative h-52 w-full overflow-hidden rounded-lg">
              <n-image
                nSrc="https://picsum.photos/seed/fill/1200/600"
                nAlt="Fill mode demo"
                [nFill]="true"
                nFit="cover"
              />
            </div>
          </app-example>
        </div>

        <!-- Rounded variants -->
        <div class="mt-6">
          <app-example title="Rounded" [code]="roundedCode">
            <div class="flex flex-wrap gap-4">
              @for (r of roundedVariants; track r) {
                <n-image
                  nSrc="https://picsum.photos/seed/round/200/200"
                  [nAlt]="'nRounded=' + r"
                  [nWidth]="80"
                  [nHeight]="80"
                  [nRounded]="r"
                />
              }
            </div>
          </app-example>
        </div>

        <!-- Skeleton -->
        <div class="mt-6">
          <app-example title="Skeleton Loader" [code]="skeletonCode">
            <div class="space-y-3">
              <n-image
                [nSrc]="skeletonSrc()"
                nAlt="Image with skeleton"
                [nWidth]="800"
                [nHeight]="450"
                nRatio="video"
                nRounded="default"
                [nSkeleton]="true"
                class="w-full max-w-sm"
                (nLoad)="skeletonLoaded.set(true)"
              />
              <p class="text-xs text-muted-foreground">
                {{ skeletonLoaded() ? 'Loaded.' : 'Skeleton shows while loading...' }}
              </p>
              <button
                type="button"
                class="rounded-md bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80"
                (click)="reloadSkeleton()"
              >
                Reload
              </button>
            </div>
          </app-example>
        </div>

        <!-- Fallback -->
        <div class="mt-6">
          <app-example title="Fallback" [code]="fallbackCode">
            <div class="flex flex-wrap gap-6">
              <div class="space-y-1">
                <n-image
                  nSrc="https://broken.example.com/missing.jpg"
                  nAlt="URL fallback"
                  [nWidth]="160"
                  [nHeight]="120"
                  nFallbackSrc="https://picsum.photos/seed/fb/160/120"
                  nRounded="default"
                />
                <p class="text-center text-xs text-muted-foreground">nFallbackSrc</p>
              </div>
              <div class="space-y-1">
                <n-image
                  nSrc="https://broken.example.com/missing2.jpg"
                  nAlt="Custom slot fallback"
                  [nWidth]="160"
                  [nHeight]="120"
                  nRatio="landscape"
                  nRounded="default"
                >
                  <div
                    nImageFallback
                    class="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-muted text-muted-foreground"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="m21 15-5-5L5 21"/>
                    </svg>
                    <span class="text-xs">Not found</span>
                  </div>
                </n-image>
                <p class="text-center text-xs text-muted-foreground">Custom slot</p>
              </div>
            </div>
          </app-example>
        </div>

        <!-- Installation -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add image" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">image/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/image/</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <!-- CDN -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">CDN Loaders</h2>
          <p class="mt-2 text-sm text-muted-foreground">
            Configure a loader once in <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">app.config.ts</code>.
            All <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">n-image</code> components in the app use it automatically.
            Pass CDN-specific params via <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">nLoaderParams</code>.
          </p>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="cdnConfigCode" language="ts" filename="app.config.ts" />
            <app-code-block [code]="cdnUsageCode" language="html" />
          </div>
        </section>

        <!-- API -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <h3 class="mt-4 text-sm font-medium text-muted-foreground">ImageComponent (n-image)</h3>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Prop</th>
                  <th class="px-4 py-2 text-left font-medium">Type</th>
                  <th class="px-4 py-2 text-left font-medium">Default</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of apiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class ImageDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly skeletonSrc = signal('https://picsum.photos/seed/skel/800/450');
  protected readonly skeletonLoaded = signal(false);

  protected readonly ratios = [
    { label: 'Square', ratio: 'square' as const, src: 'https://picsum.photos/seed/sq/400/400' },
    { label: 'Video (16:9)', ratio: 'video' as const, src: 'https://picsum.photos/seed/vd/800/450' },
    { label: 'Portrait (3:4)', ratio: 'portrait' as const, src: 'https://picsum.photos/seed/pt/300/400' },
    { label: 'Landscape (4:3)', ratio: 'landscape' as const, src: 'https://picsum.photos/seed/ls/400/300' },
  ];

  protected readonly roundedVariants = ['none', 'sm', 'default', 'lg', 'xl', 'full'] as const;

  protected reloadSkeleton(): void {
    this.skeletonLoaded.set(false);
    this.skeletonSrc.set(`https://picsum.photos/seed/${Date.now()}/800/450`);
  }

  protected readonly defaultCode = `<n-image
  nSrc="https://example.com/photo.jpg"
  nAlt="Landscape photo"
  [nWidth]="800"
  [nHeight]="450"
  nRounded="default"
  class="w-full max-w-lg"
/>`;

  protected readonly ratioCode = `<n-image nSrc="..." nAlt="Square" [nFill]="true" nRatio="square" />
<n-image nSrc="..." nAlt="Video" [nFill]="true" nRatio="video" />
<n-image nSrc="..." nAlt="Portrait" [nFill]="true" nRatio="portrait" />
<n-image nSrc="..." nAlt="Landscape" [nFill]="true" nRatio="landscape" />`;

  protected readonly fillCode = `<div class="relative h-52 w-full overflow-hidden rounded-lg">
  <n-image
    nSrc="https://example.com/banner.jpg"
    nAlt="Banner"
    [nFill]="true"
    nFit="cover"
  />
</div>`;

  protected readonly roundedCode = `<n-image nSrc="..." nAlt="..." [nWidth]="80" [nHeight]="80" nRounded="none" />
<n-image nSrc="..." nAlt="..." [nWidth]="80" [nHeight]="80" nRounded="sm" />
<n-image nSrc="..." nAlt="..." [nWidth]="80" [nHeight]="80" nRounded="default" />
<n-image nSrc="..." nAlt="..." [nWidth]="80" [nHeight]="80" nRounded="lg" />
<n-image nSrc="..." nAlt="..." [nWidth]="80" [nHeight]="80" nRounded="xl" />
<n-image nSrc="..." nAlt="..." [nWidth]="80" [nHeight]="80" nRounded="full" />`;

  protected readonly skeletonCode = `<n-image
  nSrc="https://example.com/photo.jpg"
  nAlt="Photo"
  [nWidth]="800"
  [nHeight]="450"
  nRatio="video"
  nRounded="default"
  [nSkeleton]="true"
  class="w-full"
  (nLoad)="onLoad()"
/>`;

  protected readonly fallbackCode = `<!-- URL fallback -->
<n-image
  nSrc="https://broken.example.com/missing.jpg"
  nAlt="Photo"
  nFallbackSrc="https://example.com/placeholder.jpg"
  [nWidth]="400"
  [nHeight]="300"
/>

<!-- Custom slot fallback -->
<n-image nSrc="..." nAlt="..." [nWidth]="400" [nHeight]="300" nRatio="landscape">
  <div nImageFallback class="absolute inset-0 flex items-center justify-center bg-muted">
    <span class="text-sm text-muted-foreground">Image not found</span>
  </div>
</n-image>`;

  protected readonly importCode = `import { ImageComponent } from '@/components/image';

@Component({
  imports: [ImageComponent],
  // ...
})
export class MyPage {}`;

  protected readonly usageCode = `<n-image
  nSrc="https://example.com/photo.jpg"
  nAlt="A descriptive alt text"
  [nWidth]="800"
  [nHeight]="450"
  nRounded="default"
/>`;

  protected readonly cdnConfigCode = `import { provideImgixLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideImgixLoader('https://my-domain.imgix.net'),
    // or: provideCloudinaryLoader, provideImageKitLoader, provideNetlifyImageLoader
  ],
};`;

  protected readonly cdnUsageCode = `<n-image
  nSrc="images/product.jpg"
  nAlt="Product"
  [nWidth]="600"
  [nHeight]="600"
  [nPriority]="true"
  [nLoaderParams]="{ auto: 'format', q: 80 }"
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nSrc', type: 'string', default: '—', description: 'Required. Image URL passed to ngSrc.' },
    { prop: 'nAlt', type: 'string', default: '—', description: 'Required. Alt text for accessibility.' },
    { prop: 'nWidth', type: 'number', default: 'undefined', description: 'Intrinsic width in pixels. Required when nFill is false.' },
    { prop: 'nHeight', type: 'number', default: 'undefined', description: 'Intrinsic height in pixels. Required when nFill is false.' },
    { prop: 'nFill', type: 'boolean', default: 'false', description: 'Fill parent container. Parent must have position: relative and defined dimensions.' },
    { prop: 'nPriority', type: 'boolean', default: 'false', description: 'Disables lazy loading, adds fetchpriority="high". Use for above-the-fold images.' },
    { prop: 'nSkeleton', type: 'boolean', default: 'true', description: 'Show animated skeleton placeholder while loading.' },
    { prop: 'nFallbackSrc', type: 'string', default: 'undefined', description: 'Fallback image URL shown when nSrc fails to load.' },
    { prop: 'nLoaderParams', type: "Record<string, string | number>", default: '{}', description: 'Extra parameters forwarded to the configured CDN loader.' },
    { prop: 'nRatio', type: "'auto' | 'square' | 'video' | 'portrait' | 'landscape'", default: "'auto'", description: 'Aspect ratio applied to the wrapper element.' },
    { prop: 'nRounded', type: "'none' | 'sm' | 'default' | 'lg' | 'xl' | 'full'", default: "'none'", description: 'Border radius applied to the wrapper element.' },
    { prop: 'nFit', type: "'cover' | 'contain' | 'fill' | 'none'", default: "'cover'", description: 'Object-fit applied to the img element.' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes applied to the wrapper element.' },
    { prop: 'nLoad', type: 'OutputEmitterRef<void>', default: '—', description: 'Emits when the image finishes loading.' },
    { prop: 'nError', type: 'OutputEmitterRef<void>', default: '—', description: 'Emits when the image fails to load.' },
  ];
}
