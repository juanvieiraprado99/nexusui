# API — TooltipDirective

Selector: `[nTooltip]`

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `nTooltip` | `string \| TemplateRef<unknown>` | required | Tooltip content |
| `nTooltipSide` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Preferred placement side. Flips automatically if there is not enough space. |
| `nTooltipAlign` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along the chosen side |
| `nTooltipDelay` | `number` | `300` | Hover delay in milliseconds before the tooltip appears |
| `nTooltipDisabled` | `boolean` | `false` | When `true`, the tooltip never opens |

## Data slots

| Slot | Element | Description |
|---|---|---|
| `content` | `div` | The tooltip bubble rendered in the CDK overlay |
