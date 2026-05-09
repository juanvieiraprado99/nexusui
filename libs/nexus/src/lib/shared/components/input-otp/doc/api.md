# Input OTP API

## Inputs

| Input             | Type                                      | Default        | Description                                                      |
|-------------------|-------------------------------------------|----------------|------------------------------------------------------------------|
| `nValue`          | `string`                                  | `''`           | Two-way bindable OTP string. Use with `[(nValue)]`.              |
| `nLength`         | `number`                                  | `6`            | Number of OTP slots.                                             |
| `nPattern`        | `'numeric' \| 'alpha' \| 'alphanumeric'`  | `'numeric'`    | Allowed character set per slot.                                  |
| `nMask`           | `boolean`                                 | `false`        | Show slots as password dots.                                     |
| `nSize`           | `'sm' \| 'default' \| 'lg'`              | `'default'`    | Size variant for each slot.                                      |
| `nDisabled`       | `boolean`                                 | `false`        | Disable all slots.                                               |
| `nError`          | `string \| null`                          | `null`         | Error message. Sets `aria-invalid` on all slots.                 |
| `nHint`           | `string \| null`                          | `null`         | Hint text (hidden when `nError` is set).                         |
| `nLabel`          | `string`                                  | `''`           | Label text linked to the first slot.                             |
| `nId`             | `string`                                  | `''`           | Override the auto-generated ID for SSR stability.                |
| `nClass`          | `string`                                  | `''`           | Extra classes on the root wrapper.                               |
| `nSeparatorIndex` | `number \| null`                          | `null`         | Slot index before which a separator is shown (e.g. `3` = 3+3).  |
| `nAutofocus`      | `boolean`                                 | `false`        | Focus first slot after render.                                   |
| `nRequired`       | `boolean`                                 | `false`        | Marks the field as required.                                     |
| `nAriaLabel`      | `string`                                  | `''`           | `aria-label` on the slot group when no `nLabel` is provided.     |

## Outputs

| Output      | Type     | Description                                          |
|-------------|----------|------------------------------------------------------|
| `nComplete` | `string` | Emits the full OTP string when all slots are filled. |
| `nChange`   | `string` | Emits on any slot value change.                      |

## Forms Integration

`n-input-otp` implements `ControlValueAccessor`. The form value is the full OTP string (e.g. `"123456"`).

```html
<!-- Signal two-way binding -->
<n-input-otp [(nValue)]="code" [nLength]="6" />

<!-- Reactive forms — standalone FormControl -->
<n-input-otp [formControl]="otpCtrl" [nLength]="6" />

<!-- Reactive forms — FormGroup -->
<n-input-otp formControlName="otp" [nLength]="6" />
```

## Selector

`n-input-otp`

## Data Slots

| Attribute                   | Element | Purpose                                      |
|-----------------------------|---------|----------------------------------------------|
| `data-slot="root"`          | `div`   | Outermost wrapper (flex column).             |
| `data-slot="slots-wrapper"` | `div`   | Flex row containing all slot inputs.         |
| `data-slot="slot"`          | `input` | Individual character input (one per slot).   |
| `data-slot="separator"`     | `span`  | Visual separator between slot groups.        |
| `data-slot="error"`         | `p`     | Error message (`role="alert"`).              |
| `data-slot="hint"`          | `p`     | Hint message.                                |

## Data Attributes on Slots

| Attribute     | Values          | Description                               |
|---------------|-----------------|-------------------------------------------|
| `data-filled` | `true` / absent | Present when the slot has a character.    |
| `data-active` | `true` / absent | Present on the currently focused slot.    |
