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
| `nAriaLabel`   | `string`                                                                       | `''`        | Rótulo acessível — use em botões só de ícone (sem texto) |

## Outputs

| Output    | Type    | Quando emite                                  |
|-----------|---------|-----------------------------------------------|
| `nClick`  | `Event` | Clique válido: não `nDisabled` nem `nLoading` |

> **Estado desabilitado em âncoras / custom element:** `<button n-button>` recebe o
> atributo nativo `disabled`. Já `<a n-button>` e `<n-button>` **não** têm `disabled`
> nativo — a desabilitação é aplicada via `data-disabled` (`pointer-events-none`),
> `aria-disabled="true"` e `tabindex="-1"`, mantendo o comportamento acessível.

## Selector

`n-button`, `button[n-button]`, `a[n-button]`

## Exemplos

```html
<!-- submit em formulário -->
<button n-button nType="submit">Enviar</button>

<!-- variante visual -->
<n-button nVariant="destructive">Deletar</n-button>
```
