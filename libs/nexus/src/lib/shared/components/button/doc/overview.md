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
<n-button nVariant="default">Default</n-button>
<n-button nVariant="secondary">Secondary</n-button>
<n-button nVariant="destructive">Destructive</n-button>
<n-button nVariant="outline">Outline</n-button>
<n-button nVariant="ghost">Ghost</n-button>
<n-button nVariant="link">Link</n-button>
```

### Sizes

```html
<n-button nSize="sm">Small</n-button>
<n-button>Default</n-button>
<n-button nSize="lg">Large</n-button>
<n-button nSize="icon" aria-label="icon">...</n-button>
```

### Submit em formulário

```html
<button n-button nType="submit">Enviar</button>
<button n-button nType="reset" nVariant="outline">Limpar</button>
```

### As anchor

```html
<a n-button href="/path" nVariant="outline">Go to page</a>
```
