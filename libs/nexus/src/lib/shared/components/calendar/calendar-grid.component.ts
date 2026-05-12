import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { mergeClasses } from '../../utils/merge-classes';
import type { CalendarDay } from './calendar.types';
import { getDayAriaLabel, getDayId } from './calendar.utils';
import { calendarDayButtonVariants, calendarDayVariants, calendarWeekdayVariants } from './calendar.variants';

@Component({
  selector: 'n-calendar-grid',
  standalone: true,
  template: `
    <div #gridContainer>
      <div class="grid w-fit grid-cols-7 text-center" role="row">
        @for (label of weekdayLabels(); track label) {
          <div [class]="weekdayClasses()" role="columnheader" aria-label="{{ label }}">
            {{ label }}
          </div>
        }
      </div>

      <div class="mt-1 grid w-fit auto-rows-min grid-cols-7" role="rowgroup">
        @for (day of calendarDays(); track day.date.getTime(); let i = $index) {
          <div [class]="dayContainerClasses()" role="gridcell">
            <button
              type="button"
              [id]="getDayId(i)"
              [class]="dayButtonClasses(day)"
              (click)="onDayClick(day.date, i)"
              [disabled]="day.isDisabled"
              [attr.aria-selected]="day.isSelected"
              [attr.aria-label]="getDayAriaLabel(day)"
              [attr.tabindex]="getFocusedDayIndex() === i ? 0 : -1"
              role="button"
            >
              {{ day.date.getDate() }}
            </button>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex justify-center',
    '[attr.role]': '"grid"',
    '(keydown.ArrowLeft.prevent)': 'onKeyDown($event)',
    '(keydown.ArrowRight.prevent)': 'onKeyDown($event)',
    '(keydown.ArrowUp.prevent)': 'onKeyDown($event)',
    '(keydown.ArrowDown.prevent)': 'onKeyDown($event)',
    '(keydown.Home.prevent)': 'onKeyDown($event)',
    '(keydown.End.prevent)': 'onKeyDown($event)',
    '(keydown.PageUp.prevent)': 'onKeyDown($event)',
    '(keydown.PageDown.prevent)': 'onKeyDown($event)',
    '(keydown.Enter.prevent)': 'onKeyDown($event)',
    '(keydown.Space.prevent)': 'onKeyDown($event)',
  },
  exportAs: 'nCalendarGrid',
})
export class CalendarGridComponent {
  private readonly gridContainer = viewChild.required<ElementRef<HTMLElement>>('gridContainer');

  readonly calendarDays = input.required<CalendarDay[]>();
  readonly weekdayLabels = input.required<string[]>();
  readonly disabled = input<boolean>(false);

  readonly dateSelect = output<{ date: Date; index: number }>();
  readonly previousMonth = output<{ position: string; dayOfWeek: number }>();
  readonly nextMonth = output<{ position: string; dayOfWeek: number }>();
  readonly navigateYear = output<number>();

  private readonly focusedDayIndex = signal<number>(-1);

  protected readonly weekdayClasses = computed(() => mergeClasses(calendarWeekdayVariants()));
  protected readonly dayContainerClasses = computed(() => mergeClasses(calendarDayVariants()));

  protected dayButtonClasses(day: CalendarDay): string {
    return mergeClasses(
      calendarDayButtonVariants({
        selected: day.isSelected,
        today: day.isToday,
        outside: !day.isCurrentMonth,
        disabled: day.isDisabled,
        rangeStart: day.isRangeStart ?? false,
        rangeEnd: day.isRangeEnd ?? false,
        inRange: day.isInRange ?? false,
      }),
    );
  }

  protected onDayClick(date: Date, index: number): void {
    if (this.disabled()) return;
    this.focusedDayIndex.set(index);
    this.dateSelect.emit({ date, index });
  }

  protected getDayId(index: number): string {
    return getDayId(index);
  }

  protected getDayAriaLabel(day: CalendarDay): string {
    return getDayAriaLabel(day);
  }

  protected getFocusedDayIndex(): number {
    const focused = this.focusedDayIndex();
    if (focused >= 0) return focused;

    const days = this.calendarDays();
    const selectedIndex = days.findIndex(d => d.isSelected);
    if (selectedIndex >= 0) return selectedIndex;

    const todayIndex = days.findIndex(d => d.isToday && d.isCurrentMonth);
    if (todayIndex >= 0) return todayIndex;

    const firstEnabled = days.findIndex(d => d.isCurrentMonth && !d.isDisabled);
    return firstEnabled >= 0 ? firstEnabled : 0;
  }

  setFocusedDayIndex(index: number): void {
    this.focusedDayIndex.set(index);
    this.setFocus(index);
  }

  resetFocus(): void {
    this.setFocus(this.getFocusedDayIndex());
  }

  onKeyDown(e: Event): void {
    if (this.disabled()) return;

    const event = e as KeyboardEvent;
    const days = this.calendarDays();
    if (days.length === 0) return;

    const currentIndex = this.getFocusedDayIndex();
    let newIndex: number | null = null;

    switch (event.key) {
      case 'ArrowLeft':  newIndex = this.navigate(currentIndex, -1, days); break;
      case 'ArrowRight': newIndex = this.navigate(currentIndex, 1, days);  break;
      case 'ArrowUp':    newIndex = this.navigate(currentIndex, -7, days); break;
      case 'ArrowDown':  newIndex = this.navigate(currentIndex, 7, days);  break;
      case 'Home':
        newIndex = this.findEnabledInRange(Math.floor(currentIndex / 7) * 7, Math.floor(currentIndex / 7) * 7 + 6, days);
        break;
      case 'End':
        newIndex = this.findEnabledInRange(Math.floor(currentIndex / 7) * 7 + 6, Math.floor(currentIndex / 7) * 7, days, true);
        break;
      case 'PageUp':
        if (event.ctrlKey) this.navigateYear.emit(-1);
        else this.previousMonth.emit({ position: 'default', dayOfWeek: -1 });
        break;
      case 'PageDown':
        if (event.ctrlKey) this.navigateYear.emit(1);
        else this.nextMonth.emit({ position: 'default', dayOfWeek: -1 });
        break;
      case 'Enter':
      case ' ': {
        const focusedDay = days[currentIndex];
        if (focusedDay && !focusedDay.isDisabled) {
          this.dateSelect.emit({ date: focusedDay.date, index: currentIndex });
        }
        break;
      }
      default: break;
    }

    if (newIndex !== null && newIndex !== currentIndex) {
      this.setFocus(newIndex);
    }
  }

  private navigate(currentIndex: number, step: number, days: CalendarDay[]): number | null {
    const targetIndex = currentIndex + step;

    if (targetIndex >= 0 && targetIndex < days.length) {
      return this.findEnabledInRange(targetIndex, currentIndex, days);
    }

    const dayOfWeek = currentIndex % 7;
    if (step === -1) this.previousMonth.emit({ position: 'last', dayOfWeek: -1 });
    else if (step === 1) this.nextMonth.emit({ position: 'first', dayOfWeek: -1 });
    else if (step === -7) this.previousMonth.emit({ position: 'lastWeek', dayOfWeek });
    else if (step === 7) this.nextMonth.emit({ position: 'firstWeek', dayOfWeek });

    return null;
  }

  private findEnabledInRange(start: number, fallback: number, days: CalendarDay[], reverse = false): number {
    const clampedStart = Math.max(0, Math.min(start, days.length - 1));
    const clampedFallback = Math.max(0, Math.min(fallback, days.length - 1));

    if (!reverse) {
      for (let i = clampedStart; i < days.length; i++) {
        if (!days[i].isDisabled) return i;
      }
      for (let i = clampedStart - 1; i >= 0; i--) {
        if (!days[i].isDisabled) return i;
      }
    } else {
      for (let i = clampedStart; i >= 0; i--) {
        if (!days[i].isDisabled) return i;
      }
      for (let i = clampedStart + 1; i < days.length; i++) {
        if (!days[i].isDisabled) return i;
      }
    }

    return clampedFallback;
  }

  private setFocus(index: number): void {
    this.focusedDayIndex.set(index);
    setTimeout(() => {
      const el = this.gridContainer()?.nativeElement.querySelector(`#${getDayId(index)}`) as HTMLElement;
      el?.focus();
    }, 0);
  }
}
