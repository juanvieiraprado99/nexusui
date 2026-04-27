# Button

Displays a button or a component that looks like a button.

## Usage

```ts
import { ButtonComponent } from '@/shared/components/button';
```

```html
<n-button>Click me</n-button>
```

## Examples

### Variants

```html
<n-button nType="default">Default</n-button>
<n-button nType="secondary">Secondary</n-button>
<n-button nType="destructive">Destructive</n-button>
<n-button nType="outline">Outline</n-button>
<n-button nType="ghost">Ghost</n-button>
<n-button nType="link">Link</n-button>
```

### Sizes

```html
<n-button nSize="sm">Small</n-button>
<n-button>Default</n-button>
<n-button nSize="lg">Large</n-button>
<n-button nSize="icon" aria-label="icon">...</n-button>
```

### As anchor

```html
<a n-button href="/path" nType="outline">Go to page</a>
```
