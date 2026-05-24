# API

## Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `nWidth` | `number` | `400` | Canvas width in px |
| `nHeight` | `number` | `200` | Canvas height in px |
| `nStrokeColor` | `string` | `'#000000'` | Pen stroke color |
| `nStrokeWidth` | `number` | `2` | Pen stroke width in px |
| `nBackgroundColor` | `string` | `'transparent'` | Canvas background color |
| `nOutputFormat` | `SignatureOutputFormat` | `'base64-png'` | Output format: `'base64-png'`, `'base64-svg'`, or `'svg'` |
| `nPlaceholder` | `string` | `'Assine aqui'` | Watermark text shown when empty |
| `nClearLabel` | `string` | `'Limpar'` | Label for the clear button |
| `nLabel` | `string` | `''` | Label text above the canvas |
| `nDisabled` | `boolean` | `false` | Disables drawing |
| `nRequired` | `boolean` | `false` | Marks field as required (`aria-required`) |
| `nError` | `string \| null` | `null` | Error message shown below the canvas |
| `nHint` | `string \| null` | `null` | Hint text shown below the canvas |
| `nClass` | `string` | `''` | Extra CSS classes on the root wrapper |
| `nId` | `string` | `''` | Override the auto-generated element ID |
| `nAriaLabel` | `string` | `''` | `aria-label` when no visible label is used |

## Two-way binding

| Model | Type | Description |
|---|---|---|
| `nValue` | `string` | The signature output string. Format depends on `nOutputFormat`. |

## Outputs

| Output | Type | Description |
|---|---|---|
| `nChange` | `string` | Emitted when a stroke is completed or the canvas is cleared |
| `nBegin` | `void` | Emitted when the user starts drawing |
| `nEnd` | `void` | Emitted when a stroke ends |
| `nClear` | `void` | Emitted when the canvas is cleared |

## Methods

| Method | Description |
|---|---|
| `undo()` | Removes the last committed stroke |
| `clear()` | Clears all strokes and emits empty value |

## Data slots

| Slot | Element | Description |
|---|---|---|
| `root` | `div` | Outermost wrapper |
| `control-wrapper` | `div` | Canvas + action buttons container |
| `control` | `canvas` | The drawable canvas |
| `error` | `p` | Error message (`role="alert"`) |
| `hint` | `p` | Hint text |

## Types

```typescript
type SignatureOutputFormat = 'base64-png' | 'base64-svg' | 'svg';
```

| Format | Description |
|---|---|
| `base64-png` | `data:image/png;base64,...` — raster image, exact pixel rendering |
| `base64-svg` | `data:image/svg+xml;base64,...` — vector, scalable, smaller size |
| `svg` | Raw SVG markup string — easy to parse or embed directly in HTML |
