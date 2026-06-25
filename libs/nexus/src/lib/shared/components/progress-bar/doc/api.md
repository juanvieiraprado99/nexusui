# Progress Bar API

## Inputs

| Input            | Type                                                    | Default       | Description                                          |
|------------------|---------------------------------------------------------|---------------|------------------------------------------------------|
| `nValue`         | `number`                                                | `0`           | Progress value, clamped to 0–100.                    |
| `nVariant`       | `'default' \| 'success' \| 'warning' \| 'destructive'` | `'default'`   | Fill color variant.                                  |
| `nSize`          | `'sm' \| 'default' \| 'lg'`                            | `'default'`   | Track height.                                        |
| `nIndeterminate` | `boolean`                                               | `false`       | Animated state for unknown-duration progress.        |
| `nAnimation`     | `'slide' \| 'bounce' \| 'pulse'`                       | `'slide'`     | Indeterminate animation style. Only applies when `nIndeterminate` is `true`. |
| `nStriped`       | `boolean`                                               | `false`       | Adds a diagonal stripe pattern to the fill. Stripes animate when `nAnimated` or `nIndeterminate`. |
| `nLabel`         | `string`                                                | `''`          | Accessible label (`aria-label` on the track).        |
| `nShowValue`     | `boolean`                                               | `false`       | Renders the percentage text below the track.         |
| `nAnimated`      | `boolean`                                               | `true`        | Enables CSS width transition on value change.        |
| `nClass`         | `string`                                                | `''`          | Extra Tailwind classes appended to the host wrapper. |

## Selector

`n-progress-bar`

## Data Slots

| Slot          | Element   | Description                              |
|---------------|-----------|------------------------------------------|
| `root`        | `div`     | Track container. Carries ARIA attributes.|
| `fill`        | `div`     | Animated fill bar.                       |
| `value-label` | `span`    | Percentage label (when `nShowValue`).    |

## Accessibility

- `role="progressbar"` on the track.
- `aria-valuenow` / `aria-valuemin` / `aria-valuemax` set automatically.
- `aria-valuenow` is omitted when `nIndeterminate` is `true`.
- `aria-busy="true"` set when `nIndeterminate`.
- Use `nLabel` to provide an accessible name when there is no visible label nearby.
