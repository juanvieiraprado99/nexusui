# Calendar API

## `n-calendar` inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nMode` | `'single' \| 'multiple' \| 'range'` | `'single'` | Selection mode |
| `nValue` | `CalendarValue` | `null` | Selected value (two-way) |
| `nMin` | `Date \| null` | `null` | Minimum selectable date |
| `nMax` | `Date \| null` | `null` | Maximum selectable date |
| `nDisabled` | `boolean` | `false` | Disables all interactions |
| `nDisabledDate` | `(date: Date) => boolean \| null` | `null` | Custom predicate to disable specific dates |
| `nLocale` | `string` | `''` | Locale for weekday/month labels. Empty = browser locale (`navigator.language`), resolved after render for SSR safety; falls back to `en-US` |
| `nWeekStartsOn` | `0 \| 1` | `0` | Week start: 0 = Sunday, 1 = Monday |
| `nAnimateSelection` | `boolean` | `true` | Single mode: animates a sliding pill from the old to the newly selected day. No effect in `multiple`/`range` |
| `nLabel` | `string` | `''` | Visible label rendered above the grid |
| `nError` | `string \| null` | `null` | Error message (`role="alert"`); sets `aria-invalid` on the grid |
| `nHint` | `string \| null` | `null` | Helper text below the grid (hidden while an error shows) |
| `nRequired` | `boolean` | `false` | Marks the field required (`*` indicator + `aria-required`) |
| `nAriaLabel` | `string` | `''` | Accessible label for the grid when no visible `nLabel` is set |
| `nClass` | `string` | `''` | Additional CSS classes on root |
| `nId` | `string` | `''` | Override the root element id (also seeds day-cell ids) |

## `n-calendar` outputs

| Output | Type | Description |
|--------|------|-------------|
| `nChange` | `CalendarValue` | Fires when selection changes |

## Types

```ts
type CalendarMode = 'single' | 'multiple' | 'range';
type CalendarValue = Date | Date[] | null;
type DisabledDateFn = (date: Date) => boolean;
```

## `data-slot`

| Slot | Element |
|------|---------|
| `root` | Outermost calendar container |
| `label` | `<label>` rendered when `nLabel` is set |
| `error` | Error message (`role="alert"`) |
| `hint` | Helper text below the grid |

## Keyboard navigation

| Key | Action |
|-----|--------|
| Arrow keys | Move focus between days |
| `Home` / `End` | First / last day of current week |
| `PageUp` / `PageDown` | Previous / next month |
| `Ctrl+PageUp` / `Ctrl+PageDown` | Previous / next year |
| `Enter` / `Space` | Select focused day |
