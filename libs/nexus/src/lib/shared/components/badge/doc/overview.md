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

### Com Avatar

O `n-avatar-badge` usa `BadgeComponent` internamente para renderizar o indicador de status no avatar.

```html
<n-avatar nName="João Prado">
  <n-avatar-badge nStatus="online" />
</n-avatar>

<!-- status como badge de texto ao lado -->
<n-badge nVariant="success">Online</n-badge>
```
