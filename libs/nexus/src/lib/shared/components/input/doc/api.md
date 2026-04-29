# Input API

## Inputs

| Input          | Type                                                                                     | Default     | Description                                                         |
|----------------|------------------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------|
| `nValue`       | `string`                                                                                 | `''`        | Two-way bindable value (`model()`). Use with `[(nValue)]`.          |
| `nSize`        | `'sm' \| 'default' \| 'lg'`                                                             | `'default'` | Size variant                                                        |
| `nType`        | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url' \| 'number'`            | `'text'`    | Native input type                                                   |
| `nLabel`       | `string`                                                                                 | `''`        | Optional label text. Renders a `<label>` linked to the input.       |
| `nPlaceholder` | `string`                                                                                 | `''`        | Native placeholder text                                             |
| `nDisabled`    | `boolean`                                                                                | `false`     | Disables the input                                                  |
| `nLoading`     | `boolean`                                                                                | `false`     | Shows animated spinner; also disables the input                     |
| `nRequired`    | `boolean`                                                                                | `false`     | Marks field as required; sets `aria-required` and renders `*`       |
| `nError`       | `string \| null`                                                                         | `null`      | Error message. Sets `aria-invalid` and renders error text.          |
| `nHint`        | `string \| null`                                                                         | `null`      | Hint text shown below the input (hidden when `nError` is set).      |
| `nClass`       | `string`                                                                                 | `''`        | Extra classes applied to the outer wrapper `<div>`                  |
| `nInputClass`  | `string`                                                                                 | `''`        | Extra classes applied to the native `<input>` element               |
| `nAriaLabel`   | `string`                                                                                 | `''`        | `aria-label` for inputs without a visible `nLabel`                  |
| `nId`          | `string`                                                                                 | `''`        | Override the auto-generated input ID (useful for stable SSR IDs)    |

## Outputs

| Output    | Type         | Description                                       |
|-----------|--------------|---------------------------------------------------|
| `nChange` | `string`     | Emits on every input event with the current value |
| `nBlur`   | `FocusEvent` | Emits when the input loses focus                  |

## Forms Integration

`n-input` implements `ControlValueAccessor` and works with both reactive and template-driven forms.

```html
<!-- Signal two-way binding (no forms module needed) -->
<n-input [(nValue)]="myValue" nLabel="Name" />

<!-- Template-driven -->
<n-input [(ngModel)]="email" nLabel="Email" />

<!-- Reactive -->
<n-input [formControl]="ctrl" nLabel="Email" />
```

## Selector

`n-input`

## Data Slots

| Attribute                   | Element  | Purpose                            |
|-----------------------------|----------|------------------------------------|
| `data-slot="input-root"`    | `div`    | Outermost wrapper                  |
| `data-slot="label"`         | `label`  | Label element                      |
| `data-slot="input-wrapper"` | `div`    | Flex row containing input + spinner|
| `data-slot="input"`         | `input`  | The native input element           |
| `data-slot="error"`         | `p`      | Error message paragraph            |
| `data-slot="hint"`          | `p`      | Hint message paragraph             |
