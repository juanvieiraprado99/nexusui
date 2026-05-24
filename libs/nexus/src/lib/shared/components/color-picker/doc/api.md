# Color Picker API

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nValue` | `model<string>` | `''` | Two-way binding for the CSS color string |
| `nMode` | `'inline' \| 'popup'` | `'popup'` | Render the picker inline or in a CDK overlay |
| `nFormat` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | Output string format |
| `nShowAlpha` | `boolean` | `false` | Show the alpha (opacity) slider |
| `nPresets` | `string[]` | `[]` | Preset swatch colors (any valid CSS color string) |
| `nShowEyedropper` | `boolean` | `false` | Show eyedropper button (only rendered when `EyeDropper` API is supported) |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of the trigger button |
| `nLabel` | `string` | `''` | Label text |
| `nError` | `string \| null` | `null` | Error message |
| `nHint` | `string \| null` | `null` | Hint text below the trigger |
| `nRequired` | `boolean` | `false` | Marks the field as required |
| `nDisabled` | `boolean` | `false` | Disables all interaction |
| `nClass` | `string` | `''` | Extra classes on the root element |
| `nId` | `string` | `''` | Custom ID (auto-generated if omitted) |
| `nAriaLabel` | `string` | `''` | Accessible label when no `nLabel` is shown |

## Outputs

| Output | Type | When |
|--------|------|------|
| `nChange` | `string` | Color value changed |
| `nOpenChange` | `boolean` | Popup opened or closed (popup mode only) |

## Data slots

| Slot | Element | Description |
|------|---------|-------------|
| `root` | `div` | Outer wrapper |
| `trigger` | `button` | Popup trigger (popup mode) |
| `content` | `div` | Picker panel |
| `control` | `canvas` / `input` | SV canvas and format input |
| `hue-track` | `div` | Hue slider track |
| `hue-thumb` | `div` | Hue slider thumb |
| `alpha-track` | `div` | Alpha slider track |
| `alpha-thumb` | `div` | Alpha slider thumb |
| `swatch` | `button` | Preset/recent swatch button |
| `presets` | `div` | Preset swatches container |
| `recent` | `div` | Recent colors container |
| `error` | `p` | Error message |
| `hint` | `p` | Hint text |

## Recent colors

Last 8 used colors are persisted in `localStorage` under the key `nexus-color-picker-recent` and shown below presets. SSR-safe: only accessed in the browser via `afterNextRender`.
