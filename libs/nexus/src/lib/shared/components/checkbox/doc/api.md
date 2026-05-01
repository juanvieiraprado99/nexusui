# API

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nChecked` | `model<boolean>` | `false` | Two-way bindable checked state |
| `nIndeterminate` | `boolean` | `false` | Indeterminate visual state (dash icon) |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Checkbox size |
| `nLabel` | `string` | `''` | Label text rendered next to the checkbox |
| `nDisabled` | `boolean` | `false` | Disables interaction |
| `nRequired` | `boolean` | `false` | Marks field as required (shows asterisk) |
| `nError` | `string \| null` | `null` | Error message shown below (also triggers error styling) |
| `nHint` | `string \| null` | `null` | Hint text shown below (hidden when error is shown) |
| `nClass` | `string` | `''` | Extra classes on the wrapper element |
| `nId` | `string` | `''` | Override auto-generated id |
| `nAriaLabel` | `string` | `''` | Accessible label when `nLabel` is not used |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `nChange` | `boolean` | Emits checked value on change |
| `nBlur` | `FocusEvent` | Emits when the checkbox loses focus |

## Data slots

| Slot | Element | Description |
|------|---------|-------------|
| `root` | `div` | Outermost wrapper |
| `control-wrapper` | `div` | Flex row containing checkbox + label |
| `control` | `input[type=checkbox]` | Native checkbox element |
| `label` | `label` | Label text |
| `error` | `p` | Validation error message |
| `hint` | `p` | Helper hint text |
