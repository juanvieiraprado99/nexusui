# Slider API

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nValue` | `number \| [number, number]` | `0` | Two-way bound value |
| `nMin` | `number` | `0` | Minimum value |
| `nMax` | `number` | `100` | Maximum value |
| `nStep` | `number` | `1` | Snap increment |
| `nRange` | `boolean` | `false` | Enable two-thumb range mode |
| `nOrientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Track direction |
| `nMarks` | `SliderMark[]` | `[]` | Tick marks with optional labels |
| `nShowTooltip` | `boolean` | `true` | Show value tooltip while dragging or when a thumb is focused |
| `nShowInputs` | `boolean` | `false` | Show numeric input(s) beside the track |
| `nDisabled` | `boolean` | `false` | Disabled state |
| `nSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track and thumb size |
| `nVariant` | `'default' \| 'accent'` | `'default'` | Color scheme |
| `nLabel` | `string` | `''` | Accessible label text |
| `nError` | `string \| null` | `null` | Error message |
| `nHint` | `string \| null` | `null` | Hint text |
| `nRequired` | `boolean` | `false` | Required indicator |
| `nAriaLabel` | `string` | `''` | aria-label fallback when no visual label |
| `nId` | `string` | `''` | Override generated id |
| `nClass` | `string` | `''` | Extra classes on the root element |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `nChange` | `number \| [number, number]` | Emitted on drag end and keyboard/input changes |

## Types

```ts
type SliderMark = { value: number; label?: string };
```

## data-slots

| Slot | Element | Description |
|------|---------|-------------|
| `root` | `div` | Outermost container |
| `control-wrapper` | `div` | Wraps track + optional side inputs |
| `track-wrapper` | `div` | Flex container for the track |
| `track` | `div` | The background rail |
| `track-active` | `div` | Filled portion of the rail |
| `mark` | `span` | Positioned tick mark container |
| `mark-dot` | `span` | Visible dot of a tick |
| `mark-label` | `span` | Text label of a tick |
| `thumb-0` | `div` | First (or only) thumb |
| `thumb-1` | `div` | Second thumb (range mode) |
| `tooltip-0` | `div` | Drag tooltip for thumb 0 |
| `tooltip-1` | `div` | Drag tooltip for thumb 1 |
| `input-start` | `input` | Side numeric input for min / single value |
| `input-end` | `input` | Side numeric input for max (range mode) |
| `error` | `p` | Error message |
| `hint` | `p` | Hint text |
