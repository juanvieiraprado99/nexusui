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

### Striped

```html
<n-progress-bar [nValue]="60" [nStriped]="true" />
<n-progress-bar [nValue]="60" [nStriped]="true" nVariant="success" />
```

### Indeterminate animations

```html
<n-progress-bar [nIndeterminate]="true" nAnimation="slide" />
<n-progress-bar [nIndeterminate]="true" nAnimation="bounce" />
<n-progress-bar [nIndeterminate]="true" nAnimation="pulse" />
<n-progress-bar [nIndeterminate]="true" [nStriped]="true" />
```

## Required global CSS

The indeterminate and striped states rely on keyframes that are not part of Tailwind.
Add the following to your global CSS:

```css
@keyframes progress-indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
}
.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-bounce {
  0%, 100% { transform: translateX(-100%); }
  50%      { transform: translateX(200%); }
}
.animate-progress-bounce {
  animation: progress-bounce 2s ease-in-out infinite;
}

@keyframes progress-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}
.animate-progress-pulse {
  animation: progress-pulse 1.5s ease-in-out infinite;
}

@keyframes progress-stripes {
  0%   { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
.progress-bar-striped {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}
.progress-bar-striped-animated {
  animation: progress-stripes 1s linear infinite;
}

/* Respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-progress-indeterminate,
  .animate-progress-bounce,
  .animate-progress-pulse,
  .progress-bar-striped-animated {
    animation: none;
  }
}
```
