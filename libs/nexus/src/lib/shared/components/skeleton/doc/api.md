# Skeleton API

## Inputs

| Input     | Type                                          | Default     | Description                                        |
|-----------|-----------------------------------------------|-------------|----------------------------------------------------|
| `nColor`  | `string`                                      | `''`        | Qualquer cor CSS (`#f87171`, `rgb(...)`, `oklch(...)`), aplicada como `background-color` inline; vazio usa `bg-muted` |
| `nShape`  | `'default' \| 'circle'`                       | `'default'` | `'default'` arredonda cantos; `'circle'` full       |
| `nClass`  | `string`                                      | `''`        | Classes extras (merged via tailwind-merge); use para dimensionar (`h-*`, `w-*`) |

## Selector

`n-skeleton`

## Exemplos

```html
<!-- linha de texto -->
<n-skeleton nClass="h-4 w-full" />

<!-- avatar circular -->
<n-skeleton nShape="circle" nClass="h-12 w-12" />

<!-- cor customizada -->
<n-skeleton nColor="#f87171" nClass="h-4 w-full" />
```
