# Progress Bar

Displays a visual indicator of task completion. Supports determinate (known value) and indeterminate (unknown duration) states.

## Usage

```ts
import { ProgressBarComponent } from '@/shared/components/progress-bar';
```

```html
<n-progress-bar [nValue]="progress" nLabel="Uploading" />
```

## Examples

### Basic

```html
<n-progress-bar [nValue]="60" />
```

### Indeterminate

```html
<n-progress-bar [nIndeterminate]="true" nLabel="Loading…" />
```

### Variants

```html
<n-progress-bar nVariant="success" [nValue]="100" />
<n-progress-bar nVariant="warning" [nValue]="70" />
<n-progress-bar nVariant="destructive" [nValue]="30" />
```

### Show value label

```html
<n-progress-bar [nValue]="progress" [nShowValue]="true" />
```

## Indeterminate animation

The indeterminate state uses `animate-progress-indeterminate`. Add the following to your global CSS:

```css
@keyframes progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}

.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}
```
