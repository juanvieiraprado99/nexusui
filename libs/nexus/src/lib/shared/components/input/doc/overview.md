# Input

Displays a text input field that integrates with Angular reactive and template-driven forms.

## Usage

```ts
import { InputComponent } from '@/shared/components/input';
```

```html
<n-input nLabel="Email" nType="email" nPlaceholder="name@example.com" />
```

## Examples

### With label and hint

```html
<n-input nLabel="Username" nHint="Must be at least 3 characters." />
```

### Error state

```html
<n-input nLabel="Email" nError="Invalid email address." />
```

### Loading state

```html
<n-input nLabel="Search" [nLoading]="true" nType="search" />
```

### Required

```html
<n-input nLabel="Password" nType="password" [nRequired]="true" />
```

### Sizes

```html
<n-input nSize="sm" nPlaceholder="Small" />
<n-input nPlaceholder="Default" />
<n-input nSize="lg" nPlaceholder="Large" />
```

### Without visible label (accessible)

```html
<n-input nAriaLabel="Search the docs" nType="search" />
```

### With ngModel

```html
<n-input [(ngModel)]="value" nLabel="Name" />
```

### With formControl

```html
<n-input formControlName="ctrl" nLabel="Name" />
```
