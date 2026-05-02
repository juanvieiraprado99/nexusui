# Label — API

## Inputs

| Input        | Tipo      | Default | Descrição                                                       |
|--------------|-----------|---------|-----------------------------------------------------------------|
| `nFor`       | `string`  | `''`    | Valor do atributo `for` — referencia o `id` do controle.        |
| `nId`        | `string`  | `''`    | `id` da própria `<label>` — útil para `aria-labelledby`.        |
| `nRequired`  | `boolean` | `false` | Renderiza indicador `*` ao final do texto.                      |
| `nDisabled`  | `boolean` | `false` | Aplica visual desabilitado.                                     |
| `nClass`     | `string`  | `''`    | Classes adicionais; resolvidas via `tailwind-merge`.            |

## Slots

| `data-slot` | Elemento  | Descrição                          |
|-------------|-----------|------------------------------------|
| `label`     | `<label>` | Elemento label visível ao usuário. |

## Conteúdo

Use `<ng-content />` — qualquer markup interno (texto, ícones, tooltips) é projetado.
