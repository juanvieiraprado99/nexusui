export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function addMonths(d: Date, n: number): Date {
  const x = new Date(d);
  const day = x.getDate();
  x.setDate(1);
  x.setMonth(x.getMonth() + n);
  const last = endOfMonth(x).getDate();
  x.setDate(Math.min(day, last));
  return x;
}

export function addYears(d: Date, n: number): Date {
  return addMonths(d, n * 12);
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function clamp(d: Date, min: Date | null, max: Date | null): Date {
  if (min && d < min) return min;
  if (max && d > max) return max;
  return d;
}

export function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isAfter(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}

export type CalendarCell = {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
};

export function buildMonthGrid(viewDate: Date, weekStartsOn: 0 | 1 = 0): CalendarCell[] {
  const today = startOfDay(new Date());
  const first = startOfMonth(viewDate);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  const cells: CalendarCell[] = [];
  for (let i = 0; i < 42; i++) {
    const date = addDays(gridStart, i);
    cells.push({
      date,
      inMonth: date.getMonth() === viewDate.getMonth(),
      isToday: isSameDay(date, today),
    });
  }
  return cells;
}

export function getWeekdayLabels(locale: string, weekStartsOn: 0 | 1 = 0): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const labels: string[] = [];
  const base = new Date(2024, 0, 7);
  for (let i = 0; i < 7; i++) {
    labels.push(fmt.format(addDays(base, i + weekStartsOn)));
  }
  return labels;
}

export function formatDate(d: Date | null, locale: string, options?: Intl.DateTimeFormatOptions): string {
  if (!d) return '';
  const opts: Intl.DateTimeFormatOptions = options ?? { year: 'numeric', month: 'short', day: '2-digit' };
  return new Intl.DateTimeFormat(locale, opts).format(d);
}

export function formatMonthYear(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(d);
}
