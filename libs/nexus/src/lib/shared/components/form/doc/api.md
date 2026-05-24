# Form API

## NFormFieldComponent `n-form-field`

| Input | Type | Default | Description |
|---|---|---|---|
| `nClass` | `string` | `''` | Extra classes merged onto the host. |

Provides `N_FORM_FIELD_CONTEXT` to all descendant components.

## NFormLabelComponent `label[n-form-label]`

| Input | Type | Default | Description |
|---|---|---|---|
| `nClass` | `string` | `''` | Extra classes. |
| `nFor` | `string` | `''` | Explicit `for` override. Auto-inferred from context when omitted. |
| `nRequired` | `boolean` | `false` | Renders `*` asterisk and applies required label style. |
| `nInvalid` | `boolean` | `false` | Applies `text-destructive` to the label. |

## NFormControlComponent `n-form-control`

| Input | Type | Default | Description |
|---|---|---|---|
| `nClass` | `string` | `''` | Extra classes. |

| Public signal | Type | Description |
|---|---|---|
| `fieldId` | `Signal<string>` | Generated field ID (e.g. `n-field-1`). Bind to native input `[id]`. |
| `descriptionId` | `Signal<string>` | ID for the description element (`{fieldId}-description`). |
| `messageId` | `Signal<string>` | ID for the message element (`{fieldId}-message`). |

## NFormDescriptionComponent `n-form-description`

| Input | Type | Default | Description |
|---|---|---|---|
| `nClass` | `string` | `''` | Extra classes. |
| `nId` | `string` | `''` | Explicit ID override. Auto-inferred from context when omitted. |

## NFormMessageComponent `n-form-message`

| Input | Type | Default | Description |
|---|---|---|---|
| `nClass` | `string` | `''` | Extra classes. |
| `nType` | `NFormMessageType` | `'default'` | Visual variant. One of `default`, `error`, `success`, `warning`. |
| `nId` | `string` | `''` | Explicit ID override. Auto-inferred from context when omitted. |

Sets `role="alert"` automatically when `nType="error"`.

## Data slots

| Slot | Element |
|---|---|
| `control-wrapper` | `NFormControlComponent` host |
| `description` | `NFormDescriptionComponent` host |
| `message` | `NFormMessageComponent` host |

## Context token

`N_FORM_FIELD_CONTEXT` (`InjectionToken<NFormFieldContext>`) — inject in custom controls nested inside `n-form-field` to access `fieldId`, `descriptionId`, and `messageId` signals.
