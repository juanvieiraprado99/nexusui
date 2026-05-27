import type { CalendarDay, CalendarDayConfig, CalendarMode, CalendarValue } from './calendar.types';

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function isDateDisabled(date: Date, minDate: Date | null, maxDate: Date | null): boolean {
  const day = startOfDay(date);
  if (minDate && day < startOfDay(minDate)) return true;
  if (maxDate && day > startOfDay(maxDate)) return true;
  return false;
}

export function makeSafeDate(year: number, month: number, day = 1): Date {
  const date = new Date(year, month, day);
  date.setHours(12, 0, 0, 0);
  return date;
}

export function generateCalendarDays(config: CalendarDayConfig): CalendarDay[] {
  const { year, month, mode, selectedDates, minDate, maxDate, disabled, disabledDateFn } = config;

  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const days: CalendarDay[] = [];
  const cur = new Date(startDate);

  let rangeStart: Date | null = null;
  let rangeEnd: Date | null = null;
  if (mode === 'range' && selectedDates.length > 0) {
    rangeStart = selectedDates[0];
    rangeEnd = selectedDates.length > 1 ? selectedDates[1] : null;
  }

  while (cur <= endDate) {
    const date = new Date(cur);
    const isCurrentMonth = date.getMonth() === month;
    const isToday = isSameDay(date, today);
    const isDisabledDate =
      disabled ||
      isDateDisabled(date, minDate, maxDate) ||
      (disabledDateFn ? disabledDateFn(date) : false);

    let isSelected = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;

    if (mode === 'single') {
      isSelected = selectedDates.length > 0 && isSameDay(date, selectedDates[0]);
    } else if (mode === 'multiple') {
      isSelected = selectedDates.some(d => isSameDay(date, d));
    } else if (mode === 'range') {
      if (rangeStart && isSameDay(date, rangeStart)) {
        isRangeStart = true;
        isSelected = true;
      }
      if (rangeEnd && isSameDay(date, rangeEnd)) {
        isRangeEnd = true;
        isSelected = true;
      }
      if (rangeStart && rangeEnd && !isRangeStart && !isRangeEnd) {
        const t = date.getTime();
        isInRange = t > rangeStart.getTime() && t < rangeEnd.getTime();
      }
    }

    days.push({ date, isCurrentMonth, isToday, isSelected, isDisabled: isDisabledDate, isRangeStart, isRangeEnd, isInRange });
    cur.setDate(cur.getDate() + 1);
  }

  return days;
}

export function getSelectedDatesArray(value: CalendarValue, mode: CalendarMode): Date[] {
  if (!value) return [];
  if (mode === 'single') return [value as Date];
  if ((mode === 'multiple' || mode === 'range') && Array.isArray(value)) return value;
  return [];
}

export function getDayId(prefix: string, index: number): string {
  return `${prefix}-day-${index}`;
}

export function getDayAriaLabel(day: CalendarDay): string {
  const dateStr = day.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return [
    dateStr,
    day.isToday && 'Today',
    day.isSelected && 'Selected',
    day.isRangeStart && 'Range start',
    day.isRangeEnd && 'Range end',
    day.isInRange && 'In range',
    !day.isCurrentMonth && 'Outside month',
    day.isDisabled && 'Disabled',
  ]
    .filter(Boolean)
    .join(', ');
}

export function getWeekdayLabels(locale: string, weekStartsOn: 0 | 1): string[] {
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStartsOn + i) % 7;
    // Jan 7, 2024 is a Sunday
    const date = new Date(2024, 0, 7 + dayIndex);
    labels.push(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date));
  }
  return labels;
}

export function getMonthNames(locale: string): string[] {
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2024, i, 1)),
  );
}

export function normalizeCalendarValue(v: CalendarValue): CalendarValue {
  if (!v) return v;
  if (v instanceof Date) return toValidDate(v);
  if (Array.isArray(v)) {
    return v.reduce<Date[]>((acc, d) => {
      const date = toValidDate(d);
      if (date) acc.push(date);
      return acc;
    }, []);
  }
  return toValidDate(v);
}

export function toValidDate(value: unknown): Date | null {
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;

  if (typeof value === 'number' && value.toString().length === 8) {
    const s = value.toString();
    return makeSafeDate(+s.slice(0, 4), +s.slice(4, 6) - 1, +s.slice(6, 8));
  }

  if (typeof value === 'string' && /^\d{8}$/.test(value)) {
    return makeSafeDate(+value.slice(0, 4), +value.slice(4, 6) - 1, +value.slice(6, 8));
  }

  const date = new Date(value as string | number | Date);
  if (isNaN(date.getTime())) return null;
  return makeSafeDate(date.getFullYear(), date.getMonth(), date.getDate());
}
