# API — Button Group

## `n-button-group` inputs

| Input          | Type                          | Default        | Description                                           |
|----------------|-------------------------------|----------------|-------------------------------------------------------|
| `nOrientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | Layout direction                                      |
| `nSize`        | `'sm' \| 'default' \| 'lg' \| 'icon'` | `undefined` (inherit) | Propaga para todos os botões filhos; `undefined` = cada botão mantém o próprio |
| `nVariant`     | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'destructive' \| 'outline' \| 'ghost' \| 'link'` | `undefined` (inherit) | Propaga para todos os botões filhos; `undefined` = cada botão mantém o próprio |
| `nDisabled`    | `boolean`                     | `false`        | Disables all child buttons                            |
| `nAriaLabel`   | `string`                      | `''`           | `aria-label` for the group (recommended for a11y)    |
| `nClass`       | `string`                      | `''`           | Extra classes merged onto the host                    |

## Data attributes

| Attribute          | Values                      | Description              |
|--------------------|-----------------------------|--------------------------|
| `data-slot`        | `button-group`              | Slot identifier          |
| `data-orientation` | `horizontal` \| `vertical`  | Current orientation      |

## Notes

- Child buttons inherit `nSize`, `nVariant`, and `nDisabled` from the group via Angular DI context. Individual button overrides still work — group values are only applied when the button does not supply its own.
- Keyboard navigation: `←/→` (horizontal) or `↑/↓` (vertical) cycle through non-disabled buttons. A navegação mira nos botões filhos diretos (`button`, `a[n-button]`, `n-button`) e pula os desabilitados (`disabled` ou `aria-disabled`).
