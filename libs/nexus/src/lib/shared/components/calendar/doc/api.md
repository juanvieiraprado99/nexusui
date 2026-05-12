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
| `nLocale` | `string` | `navigator.language` | Locale for weekday/month labels |
| `nWeekStartsOn` | `0 \| 1` | `0` | Week start: 0 = Sunday, 1 = Monday |
| `nClass` | `string` | `''` | Additional CSS classes on root |
| `nId` | `string` | `''` | Override the root element id |

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

## Keyboard navigation

| Key | Action |
|-----|--------|
| Arrow keys | Move focus between days |
| `Home` / `End` | First / last day of current week |
| `PageUp` / `PageDown` | Previous / next month |
| `Ctrl+PageUp` / `Ctrl+PageDown` | Previous / next year |
| `Enter` / `Space` | Select focused day |
