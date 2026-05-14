# Sonner API

## NToasterComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nPosition` | `ToastPosition` | `'bottom-right'` | Where toasts appear on screen |
| `nExpand` | `boolean` | `false` | Expand all toasts instead of stacking |
| `nRichColors` | `boolean` | `false` | Use semantic colors for success/error/warning |
| `nDuration` | `number` | `4000` | Auto-dismiss duration in ms |
| `nVisibleToasts` | `number` | `3` | Max number of visible toasts |

## Toast positions

`'top-left'` | `'top-center'` | `'top-right'` | `'bottom-left'` | `'bottom-center'` | `'bottom-right'`

## toast() API

| Call | Description |
|------|-------------|
| `toast(message)` | Default toast |
| `toast.success(message)` | Success variant |
| `toast.error(message)` | Error variant |
| `toast.warning(message)` | Warning variant |
| `toast.info(message)` | Info variant |
| `toast.promise(promise, opts)` | Loading → success/error lifecycle |
| `toast.dismiss(id?)` | Dismiss one or all toasts |
