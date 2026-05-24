# Color Picker

A composable color picker with popup and inline modes. Supports HEX, RGB, and HSL output formats, an optional alpha channel, preset swatches, recent color history, eyedropper, and copy-to-clipboard. Integrates with Angular Reactive Forms via `ControlValueAccessor`.

## Usage

```ts
import { ColorPickerComponent } from '@/components/color-picker';
```

```html
<!-- Popup (default) -->
<n-color-picker nLabel="Brand color" [(nValue)]="color" />

<!-- Inline -->
<n-color-picker nMode="inline" [(nValue)]="color" />

<!-- With alpha channel -->
<n-color-picker [nShowAlpha]="true" nFormat="hex" [(nValue)]="color" />

<!-- With presets -->
<n-color-picker [nPresets]="['#ef4444', '#3b82f6', '#22c55e']" [(nValue)]="color" />

<!-- Reactive Forms -->
<n-color-picker [formControl]="colorControl" nLabel="Pick a color" />
```

## Output formats

The `nFormat` input controls the string format emitted via `nChange` and Angular Forms:

| Format | Example output |
|--------|---------------|
| `hex`  | `#3b82f6` |
| `rgb`  | `rgb(59, 130, 246)` |
| `hsl`  | `hsl(217, 91%, 60%)` |

When `nShowAlpha` is `true` and opacity < 1, alpha is appended: `#3b82f680`, `rgba(59, 130, 246, 0.50)`, `hsla(217, 91%, 60%, 0.50)`.

The format can also be toggled at runtime via the format button in the picker panel.
