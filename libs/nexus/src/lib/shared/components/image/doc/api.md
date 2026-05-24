# API

## ImageComponent (`n-image`)

### Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nSrc` | `string` | — | **Required.** Image URL passed to `ngSrc`. |
| `nAlt` | `string` | — | **Required.** Alt text for accessibility. |
| `nWidth` | `number` | `undefined` | Intrinsic width in pixels. Required when `nFill` is false. |
| `nHeight` | `number` | `undefined` | Intrinsic height in pixels. Required when `nFill` is false. |
| `nFill` | `boolean` | `false` | Fill parent container. Parent must have `position: relative` and defined dimensions. |
| `nPriority` | `boolean` | `false` | Disables lazy loading, adds `fetchpriority="high"`. Use for above-the-fold images. |
| `nSkeleton` | `boolean` | `true` | Show animated skeleton placeholder while loading. |
| `nFallbackSrc` | `string` | `undefined` | Fallback image URL shown when `nSrc` fails to load. |
| `nLoaderParams` | `Record<string, string \| number>` | `{}` | Extra parameters forwarded to the configured CDN loader. |
| `nRatio` | `'auto' \| 'square' \| 'video' \| 'portrait' \| 'landscape'` | `'auto'` | Aspect ratio applied to the wrapper element. |
| `nRounded` | `'none' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'full'` | `'none'` | Border radius applied to the wrapper element. |
| `nFit` | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'` | Object-fit applied to the `<img>` element. |
| `nClass` | `string` | `''` | Extra Tailwind classes applied to the wrapper element. |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `nLoad` | `void` | Emits when the image finishes loading. |
| `nError` | `void` | Emits when the image fails to load. |

### Content projection

| Selector | Description |
|----------|-------------|
| `[nImageFallback]` | Custom fallback template rendered when `nSrc` fails and `nFallbackSrc` is not set. Should be positioned absolutely (`absolute inset-0`) to fill the wrapper. |

### Data slots

| Slot | Element | Description |
|------|---------|-------------|
| `root` | `div` | Outer wrapper with aspect ratio, rounding, and overflow hidden. |
| `skeleton` | `div` | Animated placeholder shown while image loads. |
| `fallback` | `img` | Fallback image rendered when using `nFallbackSrc`. |
