# Badge API

## `n-badge` / `a[n-badge]`

O seletor de tag `n-badge` renderiza um `<span>`-like host. O seletor de atributo `a[n-badge]`
aplica os mesmos estilos a uma âncora, produzindo um badge clicável (com `cursor-pointer`,
hover e `focus-visible` ring).

### Inputs

| Input      | Tipo                                                                          | Default     | Descrição                                  |
|------------|-------------------------------------------------------------------------------|-------------|--------------------------------------------|
| `nVariant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning'` | `'default'` | Variante visual                      |
| `nSize`    | `'sm' \| 'default' \| 'lg'`                                                    | `'default'` | Tamanho (padding + tipografia)             |
| `nClass`   | `string`                                                                      | `''`        | Classes extras (merged via tailwind-merge) |

### Conteúdo

Texto ou elementos via `<ng-content />`.

### `data-slot`

| Slot    | Elemento       |
|---------|----------------|
| `badge` | host `n-badge` |
