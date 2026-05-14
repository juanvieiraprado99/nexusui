import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  model,
  output,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { CalendarGridComponent } from './calendar-grid.component';
import { CalendarNavigationComponent } from './calendar-navigation.component';
import type { CalendarMode, CalendarValue, DisabledDateFn } from './calendar.types';
import {
  generateCalendarDays,
  getSelectedDatesArray,
  getWeekdayLabels,
  isSameDay,
  makeSafeDate,
  normalizeCalendarValue,
} from './calendar.utils';
import { calendarVariants } from './calendar.variants';

@Component({
  selector: 'n-calendar, [n-calendar]',
  standalone: true,
  imports: [CalendarNavigationComponent, CalendarGridComponent],
  template: `
    <div [class]="classes()" data-slot="root">
      <n-calendar-navigation
        [currentMonth]="currentMonthValue()"
        [currentYear]="currentYearValue()"
        [minDate]="nMin()"
        [maxDate]="nMax()"
        [disabled]="isDisabled()"
        [locale]="nLocale()"
        (monthChange)="onMonthChange($event)"
        (yearChange)="onYearChange($event)"
        (previousMonth)="previousMonth()"
        (nextMonth)="nextMonth()"
      />

      <n-calendar-grid
        [calendarDays]="calendarDays()"
        [weekdayLabels]="weekdayLabels()"
        [disabled]="isDisabled()"
        (dateSelect)="onDateSelect($event)"
        (previousMonth)="onGridPreviousMonth($event)"
        (nextMonth)="onGridNextMonth($event)"
        (navigateYear)="onNavigateYear($event)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.tabindex]': '0' },
  exportAs: 'nCalendar',
})
export class CalendarComponent implements ControlValueAccessor {
  private readonly gridRef = viewChild.required(CalendarGridComponent);
  private readonly _form = injectFormControl<CalendarValue>(this);

  readonly nMode    = input<CalendarMode>('single');
  readonly nValue   = model<CalendarValue>(null);
  readonly nMin     = input<Date | null>(null);
  readonly nMax     = input<Date | null>(null);
  readonly nDisabled    = input<boolean>(false);
  readonly nDisabledDate = input<DisabledDateFn | null>(null);
  readonly nLocale  = input<string>(typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  readonly nWeekStartsOn = input<0 | 1>(0);
  readonly nClass   = input<string>('');
  readonly nId      = input<string>('');

  readonly nChange = output<CalendarValue>();

  protected readonly isDisabled = computed(() => this.nDisabled() || this._form.disabledByForm());

  private readonly normalizedValue = computed(() => normalizeCalendarValue(this.nValue()));

  private readonly currentDate = computed(() => {
    const val = this.normalizedValue();
    if (!val) return new Date();
    if (val instanceof Date) return val;
    if (Array.isArray(val) && val.length > 0) return val[0];
    return new Date();
  });

  protected readonly currentMonthValue = linkedSignal(() => this.currentDate().getMonth().toString());
  protected readonly currentYearValue  = linkedSignal(() => this.currentDate().getFullYear().toString());

  protected readonly classes = computed(() => mergeClasses(calendarVariants(), this.nClass()));

  protected readonly weekdayLabels = computed(() =>
    getWeekdayLabels(this.nLocale(), this.nWeekStartsOn()),
  );

  protected readonly calendarDays = computed(() => {
    const currentDate = this.currentDate();
    const navDate = makeSafeDate(
      Number.parseInt(this.currentYearValue()),
      Number.parseInt(this.currentMonthValue()),
      currentDate.getDate(),
    );
    const resolved = Number.isNaN(navDate.getTime()) ? currentDate : navDate;

    return generateCalendarDays({
      year: resolved.getFullYear(),
      month: resolved.getMonth(),
      mode: this.nMode(),
      selectedDates: getSelectedDatesArray(this.normalizedValue(), this.nMode()),
      minDate: this.nMin(),
      maxDate: this.nMax(),
      disabled: this.isDisabled(),
      disabledDateFn: this.nDisabledDate(),
    });
  });

  protected onMonthChange(monthIndex: string): void {
    const parsed = Number.parseInt(monthIndex, 10);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 11) return;

    const year = Number.parseInt(this.currentYearValue());
    const safe = makeSafeDate(Number.isNaN(year) ? this.currentDate().getFullYear() : year, parsed, 1);
    this.currentMonthValue.set(safe.getMonth().toString());
    this.gridRef().setFocusedDayIndex(-1);
  }

  protected onYearChange(year: string): void {
    const parsed = Number.parseInt(year, 10);
    if (Number.isNaN(parsed) || parsed < 1900 || parsed > 2100) return;

    const month = Number.parseInt(this.currentMonthValue());
    const safe = makeSafeDate(parsed, Number.isNaN(month) ? this.currentDate().getMonth() : month, 1);
    this.currentYearValue.set(safe.getFullYear().toString());
    this.gridRef().setFocusedDayIndex(-1);
  }

  protected previousMonth(): void {
    const month = Number.parseInt(this.currentMonthValue());
    const year  = Number.parseInt(this.currentYearValue());
    const date  = makeSafeDate(year, month - 1, 1);
    this.currentMonthValue.set(date.getMonth().toString());
    this.currentYearValue.set(date.getFullYear().toString());
    this.gridRef().setFocusedDayIndex(-1);
  }

  protected nextMonth(): void {
    const month = Number.parseInt(this.currentMonthValue());
    const year  = Number.parseInt(this.currentYearValue());
    const date  = makeSafeDate(year, month + 1, 1);
    this.currentMonthValue.set(date.getMonth().toString());
    this.currentYearValue.set(date.getFullYear().toString());
    this.gridRef().setFocusedDayIndex(-1);
  }

  protected onNavigateYear(direction: number): void {
    const year  = Number.parseInt(this.currentYearValue());
    const month = Number.parseInt(this.currentMonthValue());
    const base  = Number.isNaN(year) ? this.currentDate().getFullYear() : year;
    const baseM = Number.isNaN(month) ? this.currentDate().getMonth() : month;
    const date  = makeSafeDate(base + direction, baseM, 1);
    this.currentYearValue.set(date.getFullYear().toString());
    setTimeout(() => this.gridRef().resetFocus(), 0);
  }

  protected onGridPreviousMonth(event: { position: string; dayOfWeek: number }): void {
    this.previousMonth();
    setTimeout(() => this.resetFocusAfterNavigation(event.position, event.dayOfWeek), 0);
  }

  protected onGridNextMonth(event: { position: string; dayOfWeek: number }): void {
    this.nextMonth();
    setTimeout(() => this.resetFocusAfterNavigation(event.position, event.dayOfWeek), 0);
  }

  protected onDateSelect(event: { date: Date; index: number }): void {
    this.selectDate(event.date);
  }

  /** Resets calendar navigation to display the currently selected date's month/year. */
  resetNavigation(): void {
    const val = this.currentDate();
    this.currentMonthValue.set(val.getMonth().toString());
    this.currentYearValue.set(val.getFullYear().toString());
    this.gridRef().setFocusedDayIndex(-1);
  }

  private selectDate(date: Date): void {
    if (this.isDisabled()) return;

    const mode    = this.nMode();
    const current = this.normalizedValue();

    let next: CalendarValue;

    if (mode === 'single') {
      next = date;
    } else if (mode === 'multiple') {
      const dates = Array.isArray(current) ? [...current] : [];
      const idx   = dates.findIndex(d => isSameDay(d, date));
      if (idx >= 0) dates.splice(idx, 1);
      else dates.push(date);
      next = dates.length > 0 ? dates : null;
    } else {
      const dates = Array.isArray(current) ? [...current] : [];
      if (dates.length === 0) {
        next = [date];
      } else if (dates.length === 1) {
        const start = dates[0];
        if (isSameDay(date, start)) next = null;
        else if (date.getTime() < start.getTime()) next = [date, start];
        else next = [start, date];
      } else {
        next = [date];
      }
    }

    this.nValue.set(next);
    this._form.notifyChange(next);
    this.nChange.emit(next);
    this._form.notifyTouched();
  }

  private resetFocusAfterNavigation(position = 'default', dayOfWeek = -1): void {
    const days = this.calendarDays();
    let targetIndex = -1;

    switch (position) {
      case 'first':
        targetIndex = days.findIndex(d => !d.isDisabled);
        break;
      case 'last':
        for (let i = days.length - 1; i >= 0; i--) {
          if (!days[i].isDisabled) { targetIndex = i; break; }
        }
        break;
      case 'firstWeek':
        if (dayOfWeek >= 0) targetIndex = this.findEnabledFrom(dayOfWeek, days);
        break;
      case 'lastWeek':
        if (dayOfWeek >= 0) {
          const lastWeekStart = Math.floor((days.length - 1) / 7) * 7;
          targetIndex = this.findEnabledFrom(Math.min(lastWeekStart + dayOfWeek, days.length - 1), days);
        }
        break;
      default: {
        const sel   = days.findIndex(d => d.isSelected);
        const today = days.findIndex(d => d.isToday && d.isCurrentMonth);
        const first = days.findIndex(d => d.isCurrentMonth && !d.isDisabled);
        targetIndex = sel >= 0 ? sel : today >= 0 ? today : Math.max(first, 0);
        break;
      }
    }

    if (targetIndex >= 0) this.gridRef().setFocusedDayIndex(targetIndex);
  }

  private findEnabledFrom(start: number, days: { isDisabled: boolean }[]): number {
    const s = Math.max(0, Math.min(start, days.length - 1));
    for (let i = s; i < days.length; i++) { if (!days[i].isDisabled) return i; }
    for (let i = s - 1; i >= 0; i--) { if (!days[i].isDisabled) return i; }
    return s;
  }

  writeValue(value: CalendarValue): void {
    this.nValue.set(value);
  }

  registerOnChange(fn: (value: CalendarValue) => void): void {
    this._form.setOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._form.setDisabledByForm(isDisabled);
  }
}
