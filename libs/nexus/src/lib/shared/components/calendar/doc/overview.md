# Calendar

A standalone calendar component for single date selection, multiple dates, or date ranges. Supports keyboard navigation and Angular reactive forms.

## Usage

```ts
import { CalendarComponent } from './calendar';
```

### Single (default)

```html
<n-calendar [(nValue)]="date" />
```

### Multiple

```html
<n-calendar nMode="multiple" [(nValue)]="dates" />
```

### Range

```html
<n-calendar nMode="range" [(nValue)]="range" />
```

### With min/max

```html
<n-calendar [nMin]="minDate" [nMax]="maxDate" [(nValue)]="date" />
```

### Custom disabled dates

```html
<n-calendar [nDisabledDate]="isWeekend" [(nValue)]="date" />
```

```ts
isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
```

### Reactive forms

```html
<n-calendar [formControl]="ctrl" />
```

## Value types

| Mode | Type |
|------|------|
| `single` | `Date \| null` |
| `multiple` | `Date[] \| null` |
| `range` | `[Date, Date] \| [Date] \| null` |
