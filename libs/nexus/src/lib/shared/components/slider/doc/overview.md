# Slider

An accessible range input with support for single value, range (two thumbs), marks/ticks, numeric side inputs, and vertical orientation.

## Usage

```ts
import { SliderComponent } from '@/components/slider';
```

```html
<!-- Single value -->
<n-slider [(nValue)]="volume" nLabel="Volume" />

<!-- Range -->
<n-slider [(nValue)]="priceRange" [nRange]="true" nLabel="Price" />

<!-- With marks -->
<n-slider [(nValue)]="intensity" [nMarks]="marks" [nStep]="25" />

<!-- With side inputs -->
<n-slider [(nValue)]="range" [nRange]="true" [nShowInputs]="true" />

<!-- Vertical -->
<n-slider [(nValue)]="level" nOrientation="vertical" />
```

## With Reactive Forms

```ts
form = new FormGroup({ price: new FormControl<[number, number]>([20, 80]) });
```

```html
<n-slider [nRange]="true" formControlName="price" nLabel="Price range" />
```

## Marks

```ts
marks: SliderMark[] = [
  { value: 0,   label: 'None'   },
  { value: 50,  label: 'Half'   },
  { value: 100, label: 'Full'   },
];
```

```html
<n-slider [nMarks]="marks" [nStep]="50" />
```

## Keyboard navigation

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowUp` | Increase by step |
| `ArrowLeft` / `ArrowDown` | Decrease by step |
| `PageUp` / `PageDown` | Increase / decrease by 10× step |
| `Home` | Jump to minimum |
| `End` | Jump to maximum |

When `nShowTooltip` is enabled the value tooltip appears while dragging **and** when a thumb has keyboard focus. With `nShowInputs`, pressing `Enter` in a side input commits its value (it also commits on blur).
