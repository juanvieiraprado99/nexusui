# Separator

Visual divider entre seções. Horizontal ou vertical, com variantes de estilo, gradient, label central.

## Uso básico

```html
<n-separator />
```

## Vertical

```html
<div class="flex h-12 items-center gap-3">
  <span>A</span>
  <n-separator nOrientation="vertical" />
  <span>B</span>
</div>
```

## Com label

```html
<n-separator nLabel="OR" />
```

## Com ícone projetado

```html
<n-separator>
  <svg ...></svg>
</n-separator>
```

## Variantes

- `nVariant`: `solid` | `dashed` | `dotted`
- `nSize`: `sm` | `default` | `lg` (espessura)
- `nIntensity`: `default` | `muted` | `strong`
- `nGradient`: fade nas bordas (apenas solid horizontal)
- `nInset`: aplica `my-4`/`mx-4` automático
- `nDecorative`: `true` remove `role=separator` para casos puramente visuais
