# Skeleton API

## Inputs

| Input     | Type                    | Default     | Description                                  |
|-----------|-------------------------|-------------|----------------------------------------------|
| `nShape`  | `'default' \| 'circle'` | `'default'` | `'default'` arredonda cantos; `'circle'` full |
| `nClass`  | `string`                | `''`        | Classes extras (merged via tailwind-merge); use para dimensionar (`h-*`, `w-*`) |

## Selector

`n-skeleton`

## Exemplos

```html
<!-- linha de texto -->
<n-skeleton nClass="h-4 w-full" />

<!-- avatar circular -->
<n-skeleton nShape="circle" nClass="h-12 w-12" />
```
