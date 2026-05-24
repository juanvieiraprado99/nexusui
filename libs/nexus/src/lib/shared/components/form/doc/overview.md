# Form

Layout primitives for composing accessible form fields. Each piece is independent — use only what you need.

## Components

| Component | Selector | Role |
|---|---|---|
| `NFormFieldComponent` | `n-form-field` | Grid wrapper. Provides field context (auto ID, description/message IDs). |
| `NFormLabelComponent` | `label[n-form-label]` | Label with optional required asterisk. Auto-binds `for` from context. |
| `NFormControlComponent` | `n-form-control` | Structural wrapper for the control. Exposes `fieldId`, `descriptionId`, `messageId` signals via template ref. |
| `NFormDescriptionComponent` | `n-form-description` | Hint text. Auto-receives `id` from context for `aria-describedby`. |
| `NFormMessageComponent` | `n-form-message` | Validation message. Variants: `default`, `error`, `success`, `warning`. Sets `role="alert"` on error. |

## Basic usage

```html
<n-form-field>
  <label n-form-label>Username</label>
  <n-form-control #ctrl>
    <input [id]="ctrl.fieldId()" type="text" placeholder="@username" />
  </n-form-control>
  <n-form-description>This is your public display name.</n-form-description>
</n-form-field>
```

Use `#ctrl` on `n-form-control` to get the generated `fieldId()` and bind it to the native input `id`. The label's `for` attribute is auto-linked via the shared field context.

## Required fields

```html
<n-form-field>
  <label n-form-label nRequired>Email</label>
  <n-form-control #ctrl>
    <input [id]="ctrl.fieldId()" type="email" required />
  </n-form-control>
</n-form-field>
```

`nRequired` renders a `*` asterisk (aria-hidden) and applies the required variant style to the label.

## Validation messages

```html
<n-form-field>
  <label n-form-label [nRequired]="true" [nInvalid]="email.invalid && email.touched">
    Email
  </label>
  <n-form-control #ctrl>
    <input
      [id]="ctrl.fieldId()"
      [attr.aria-invalid]="isInvalid || null"
      [attr.aria-describedby]="isInvalid ? ctrl.messageId() : ctrl.descriptionId()"
      type="email"
    />
  </n-form-control>
  @if (isInvalid) {
    <n-form-message nType="error">Please enter a valid email.</n-form-message>
  } @else {
    <n-form-description>We'll never share your email.</n-form-description>
  }
</n-form-field>
```

Use `ctrl.messageId()` and `ctrl.descriptionId()` from the template ref to wire `aria-describedby` correctly.

## Message types

```html
<n-form-message nType="error">Required field.</n-form-message>
<n-form-message nType="success">Looks good!</n-form-message>
<n-form-message nType="warning">Weak password.</n-form-message>
<n-form-message nType="default">Helper text.</n-form-message>
```
