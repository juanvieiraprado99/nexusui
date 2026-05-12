# API

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `nType` | `'default' \| 'info' \| 'success' \| 'warning' \| 'destructive'` | `'default'` | Semantic color variant |
| `nTitle` | `string \| TemplateRef<void>` | `''` | Alert heading |
| `nDescription` | `string \| TemplateRef<void>` | `''` | Supporting text |
| `nIcon` | `TemplateRef<void>` | — | Custom icon; overrides the default variant icon |
| `nDismissible` | `boolean` | `false` | Shows a dismiss (×) button |
| `nAutoDismissDuration` | `number` | `0` | Auto-dismiss after N ms (0 = disabled) |
| `nClass` | `string` | `''` | Extra Tailwind classes merged onto the host |

## Outputs

| Output | Type | Description |
|---|---|---|
| `nDismiss` | `void` | Emitted when dismissed (button click or auto-dismiss) |

## data-slot

| Slot | Element | Notes |
|---|---|---|
| `alert` | host `n-alert` | Root element |
| `alert-icon` | `<span>` | Icon container |
| `alert-title` | `<div>` | Title text or template |
| `alert-description` | `<div>` | Description text or template |
| `alert-dismiss` | `<button>` | Dismiss button (visible when `nDismissible`) |
