# API — Button Group

## `n-button-group` inputs

| Input          | Type                          | Default        | Description                                           |
|----------------|-------------------------------|----------------|-------------------------------------------------------|
| `nOrientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | Layout direction                                      |
| `nSize`        | `'sm' \| 'default' \| 'lg' \| 'icon'` | `undefined` | Propagates to all child buttons              |
| `nVariant`     | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `undefined` | Propagates to all child buttons |
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
- Keyboard navigation: `←/→` (horizontal) or `↑/↓` (vertical) cycle through non-disabled buttons.
