# Combobox API

## `n-combobox`

| Input | Type | Default | Description |
|---|---|---|---|
| `nValue` | `model<string>` | `''` | Selected value (single-select) |
| `nValues` | `model<string[]>` | `[]` | Selected values (multi-select) |
| `nMultiple` | `input<boolean>` | `false` | Enable multi-select mode |
| `nDisabled` | `input<boolean>` | `false` | Disable the combobox |
| `nLoading` | `input<boolean>` | `false` | Show loading spinner |
| `nClearable` | `input<boolean>` | `false` | Show clear button when a value is selected |
| `nId` | `input<string>` | `''` | Override the generated ID |

| Output | Type | Description |
|---|---|---|
| `nFilterChange` | `OutputEmitterRef<string>` | Emitted when the search query changes |

## `n-combobox-trigger`

| Input | Type | Default | Description |
|---|---|---|---|
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Trigger size |
| `nPlaceholder` | `input<string>` | `'Select an option...'` | Placeholder text |
| `nClass` | `input<string>` | `''` | Additional CSS classes |

## `n-combobox-content`

| Input | Type | Default | Description |
|---|---|---|---|
| `nSide` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Preferred side |
| `nAlign` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment |
| `nSideOffset` | `input<number>` | `4` | Offset from trigger (px) |
| `nAlignOffset` | `input<number>` | `0` | Alignment offset (px) |
| `nClass` | `input<string>` | `''` | Additional CSS classes |

## `n-combobox-item`

| Input | Type | Default | Description |
|---|---|---|---|
| `nValue` | `input.required<string>` | — | Item value |
| `nLabel` | `input<string>` | `''` | Label used for client-side filtering |
| `nDisabled` | `input<boolean>` | `false` | Disable the item |
| `nVariant` | `'default' \| 'destructive'` | `'default'` | Visual variant |
| `nClass` | `input<string>` | `''` | Additional CSS classes |

## `n-combobox-group`

| Input | Type | Default | Description |
|---|---|---|---|
| `nLabel` | `input<string>` | `''` | Group label (renders a heading) |

## `n-combobox-empty`

No inputs. Shown automatically when `query.length > 0` and no items are visible.

## Data slots

| Slot | Element | Description |
|---|---|---|
| `root` | `n-combobox` host | Root container |
| `trigger` | trigger `<div>` | Combobox trigger button |
| `content` | listbox `<div>` | Dropdown panel |
| `item` | `n-combobox-item` host | List option |
| `group` | `n-combobox-group` host | Option group |
| `group-label` | group label `<div>` | Group heading |
| `empty` | `n-combobox-empty` host | Empty state container |
