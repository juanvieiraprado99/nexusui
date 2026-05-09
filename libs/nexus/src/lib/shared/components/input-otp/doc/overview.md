# Input OTP

Displays a one-time password input with individual character slots, pattern validation, auto-advance, paste support, and reactive forms integration.

## Usage

```ts
import { InputOtpComponent } from '@/shared/components/input-otp';
```

```html
<n-input-otp nLabel="Verification Code" [nLength]="6" [(nValue)]="code" />
```

## Examples

### Basic 6-digit numeric OTP

```html
<n-input-otp [nLength]="6" nLabel="Enter code" [(nValue)]="code" />
```

### With separator (3 + 3 groups)

```html
<n-input-otp [nLength]="6" [nSeparatorIndex]="3" nLabel="Enter code" />
```

### Masked (PIN mode)

```html
<n-input-otp [nMask]="true" [nLength]="4" nPattern="numeric" nLabel="PIN" />
```

### Auto-submit on complete

```html
<n-input-otp [nLength]="6" (nComplete)="verify($event)" />
```

### Error state

```html
<n-input-otp [nLength]="6" nError="Invalid code. Please try again." />
```

### Alphanumeric pattern

```html
<n-input-otp [nLength]="6" nPattern="alphanumeric" nLabel="Invite code" />
```

### With reactive form

```ts
form = new FormGroup({
  otp: new FormControl('', [Validators.required, Validators.minLength(6)]),
});
```

```html
<n-input-otp formControlName="otp" [nLength]="6" nLabel="OTP" />
```

### Sizes

```html
<n-input-otp nSize="sm"  [nLength]="6" />
<n-input-otp             [nLength]="6" />
<n-input-otp nSize="lg"  [nLength]="6" />
```

## Keyboard Navigation

| Key         | Behaviour                                               |
|-------------|---------------------------------------------------------|
| `0–9 / a–z` | Fill slot, advance to next                              |
| `Backspace` | Clear current slot (if filled), or go back and clear    |
| `Delete`    | Clear current slot, stay                                |
| `ArrowLeft` | Focus previous slot                                     |
| `ArrowRight`| Focus next slot                                         |
| `Home`      | Focus first slot                                        |
| `End`       | Focus last filled slot (or first if none filled)        |
| `Tab`       | Native browser focus traversal                          |

## Browser Features

- `autocomplete="one-time-code"` enables SMS autofill on iOS/Android
- `inputmode="numeric"` shows the numeric keyboard on mobile for numeric OTPs
- Paste a full code to fill all slots at once
