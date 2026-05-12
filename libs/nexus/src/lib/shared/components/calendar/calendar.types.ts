export type CalendarMode = 'single' | 'multiple' | 'range';
export type CalendarValue = Date | Date[] | null;
export type DisabledDateFn = (date: Date) => boolean;

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
}

export interface CalendarDayConfig {
  year: number;
  month: number;
  mode: CalendarMode;
  selectedDates: Date[];
  minDate: Date | null;
  maxDate: Date | null;
  disabled: boolean;
  disabledDateFn: DisabledDateFn | null;
}
