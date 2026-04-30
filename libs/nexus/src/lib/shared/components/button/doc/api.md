# Button API

## Inputs

| Input          | Type                                                                           | Default     | Description                                         |
|----------------|--------------------------------------------------------------------------------|-------------|-----------------------------------------------------|
| `nVariant`     | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Variante visual                                     |
| `nSize`        | `'default' \| 'sm' \| 'lg' \| 'icon'`                                         | `'default'` | Tamanho                                             |
| `nType`  | `'button' \| 'submit' \| 'reset'`                                              | `'button'`  | Atributo HTML `type` — use `'submit'` em formulários |
| `nClass`       | `string`                                                                       | `''`        | Classes extras (merged via tailwind-merge)          |
| `nLoading`     | `boolean`                                                                      | `false`     | Spinner animado; bloqueia clique e desabilita botão |
| `nDisabled`    | `boolean`                                                                      | `false`     | Desabilita explicitamente via signal                |

## Outputs

| Output    | Type    | Quando emite                                  |
|-----------|---------|-----------------------------------------------|
| `nClick`  | `Event` | Clique válido: não `nDisabled` nem `nLoading` |

## Selector

`n-button`, `button[n-button]`, `a[n-button]`

## Exemplos

```html
<!-- submit em formulário -->
<button n-button nType="submit">Enviar</button>

<!-- variante visual -->
<n-button nVariant="destructive">Deletar</n-button>
```
