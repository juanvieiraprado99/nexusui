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
<!-- botão só de ícone: use nAriaLabel para acessibilidade -->
<n-button nSize="icon" nAriaLabel="Avançar">...</n-button>
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

> Em `<a n-button>` e `<n-button>` não existe atributo `disabled` nativo. Ao usar
> `nDisabled`/`nLoading`, o botão recebe `data-disabled` (`pointer-events-none`),
> `aria-disabled="true"` e `tabindex="-1"` — mantendo a desabilitação acessível.
