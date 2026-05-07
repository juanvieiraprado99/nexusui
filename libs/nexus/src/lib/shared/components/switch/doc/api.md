# Switch API

## Inputs

| Input             | Type                                         | Default     | Description                                      |
|-------------------|----------------------------------------------|-------------|--------------------------------------------------|
| `nChecked`        | `model<boolean>`                             | `false`     | Two-way bindable checked state                   |
| `nSize`           | `'sm' \| 'default' \| 'lg'`                 | `'default'` | Track and thumb size                             |
| `nColor`          | `'default' \| 'success' \| 'danger' \| 'warning'` | `'default'` | Track color when checked                    |
| `nLabel`          | `string`                                     | `''`        | Visible label rendered next to the switch        |
| `nDisabled`       | `boolean`                                    | `false`     | Disables interaction                             |
| `nRequired`       | `boolean`                                    | `false`     | Marks field as required                          |
| `nError`          | `string \| null`                             | `null`      | Error message (shown below switch)               |
| `nHint`           | `string \| null`                             | `null`      | Hint text (hidden when error is shown)           |
| `nLoading`        | `boolean`                                    | `false`     | Shows spinner, blocks interaction                |
| `nShowTrackLabel` | `boolean`                                    | `false`     | Renders ON/OFF text inside the track             |
| `nTrackLabelOn`   | `string`                                     | `'ON'`      | Text inside track when checked                   |
| `nTrackLabelOff`  | `string`                                     | `'OFF'`     | Text inside track when unchecked                 |
| `nClass`          | `string`                                     | `''`        | Extra classes applied to the root wrapper        |
| `nId`             | `string`                                     | `''`        | Overrides the auto-generated element ID          |
| `nAriaLabel`      | `string`                                     | `''`        | `aria-label` when no visible label is present    |

## Outputs

| Output    | Type              | Description                            |
|-----------|-------------------|----------------------------------------|
| `nChange` | `OutputRef<boolean>` | Emits new checked state on toggle   |
| `nBlur`   | `OutputRef<FocusEvent>` | Emits when the button loses focus |

## Content projection

| Selector    | Description                                      |
|-------------|--------------------------------------------------|
| `[nIconOn]` | Rendered inside thumb when checked (not loading) |
| `[nIconOff]`| Rendered inside thumb when unchecked (not loading)|

## data-slot

| Slot              | Element       | Description                              |
|-------------------|---------------|------------------------------------------|
| `root`            | `div`         | Outermost wrapper                        |
| `control-wrapper` | `div`         | Row containing button and label          |
| `control`         | `button`      | The track button                         |
| `thumb`           | `span`        | The sliding thumb                        |
| `spinner`         | `svg`         | Spinner shown during loading             |
| `icon-on`         | `span`        | Wrapper for nIconOn projected content    |
| `icon-off`        | `span`        | Wrapper for nIconOff projected content   |
| `track-label-on`  | `span`        | Label text inside track (checked)        |
| `track-label-off` | `span`        | Label text inside track (unchecked)      |
| `label`           | `n-label`     | Visible label element                    |
| `error`           | `p`           | Error message                            |
| `hint`            | `p`           | Hint text                                |
