# Badge API

## `n-badge`

### Inputs

| Input      | Tipo                                                                          | Default     | Descrição                                  |
|------------|-------------------------------------------------------------------------------|-------------|--------------------------------------------|
| `nVariant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning'` | `'default'` | Variante visual                      |
| `nClass`   | `string`                                                                      | `''`        | Classes extras (merged via tailwind-merge) |

### Conteúdo

Texto ou elementos via `<ng-content />`.

### `data-slot`

| Slot    | Elemento       |
|---------|----------------|
| `badge` | host `n-badge` |

## Relação com Avatar

`n-avatar-badge` usa `BadgeComponent` internamente. O mapeamento de status → variante:

| Status    | Variant       |
|-----------|---------------|
| `online`  | `success`     |
| `offline` | `secondary`   |
| `away`    | `warning`     |
| `busy`    | `destructive` |
