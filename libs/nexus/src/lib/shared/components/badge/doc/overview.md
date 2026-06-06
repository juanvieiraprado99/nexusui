# Badge

Exibe um rótulo visual compacto — status, categoria, contagem ou qualquer label contextual.

## Usage

```ts
import { BadgeComponent } from '@/shared/components/badge';
```

```html
<n-badge>New</n-badge>
```

## Examples

### Variants

```html
<n-badge nVariant="default">Default</n-badge>
<n-badge nVariant="secondary">Secondary</n-badge>
<n-badge nVariant="destructive">Destructive</n-badge>
<n-badge nVariant="outline">Outline</n-badge>
<n-badge nVariant="success">Success</n-badge>
<n-badge nVariant="warning">Warning</n-badge>
```

### Sizes

```html
<n-badge nSize="sm">Small</n-badge>
<n-badge nSize="default">Default</n-badge>
<n-badge nSize="lg">Large</n-badge>
```

### As Link

O seletor de atributo `a[n-badge]` renderiza um badge clicável usando uma âncora — útil para tags, versões ou links de categoria.

```html
<a n-badge href="/docs" nVariant="outline">Docs</a>
```

### Com Avatar

O `n-avatar` já possui um indicador de status embutido via input `nStatus` (`online | offline | away | busy`). Use o badge de texto ao lado para complementar.

```html
<n-avatar nName="João Prado" nStatus="online" />
<n-badge nVariant="success">Online</n-badge>
```
