import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

import { mergeClasses } from '../../utils/merge-classes';
import type { CalendarDay } from './calendar.types';
import { getDayAriaLabel, getDayId } from './calendar.utils';
import { calendarDayButtonVariants, calendarDayVariants, calendarWeekdayVariants } from './calendar.variants';

interface CalendarDayView {
  day: CalendarDay;
  id: string;
  classes: string;
  ariaLabel: string;
  tabindex: number;
}

@Component({
  selector: 'n-calendar-grid',
  standalone: true,
  template: `
    <div>
      <div class="grid w-fit grid-cols-7 text-center" role="row">
        @for (label of weekdayLabels(); track label) {
          <div [class]="weekdayClasses()" role="columnheader" aria-label="{{ label }}">
            {{ label }}
          </div>
        }
      </div>

      <div #daysWrapper class="relative mt-1 grid w-fit auto-rows-min grid-cols-7" role="rowgroup">
        @if (animateSelection() && indicator(); as ind) {
          <div
            class="pointer-events-none absolute left-0 top-0 z-0 rounded-md bg-primary transition-transform duration-200 ease-out"
            [style.width.px]="ind.size"
            [style.height.px]="ind.size"
            [style.transform]="indicatorTransform()"
            aria-hidden="true"
          ></div>
        }
        @for (view of dayViews(); track view.day.date.getTime(); let i = $index) {
          <div [class]="dayContainerClasses()" role="gridcell">
            <button
              #dayBtn
              type="button"
              [id]="view.id"
              [class]="view.classes"
              (click)="onDayClick(view.day.date, i)"
              [disabled]="view.day.isDisabled"
              [attr.aria-selected]="view.day.isSelected"
              [attr.aria-label]="view.ariaLabel"
              [attr.tabindex]="view.tabindex"
              role="button"
            >
              {{ view.day.date.getDate() }}
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
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-labelledby]': 'ariaLabelledby()',
    '[attr.aria-describedby]': 'ariaDescribedby()',
    '[attr.aria-invalid]': 'ariaInvalid() ? true : null',
    '[attr.aria-required]': 'ariaRequired() ? true : null',
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
  private readonly _injector = inject(Injector);
  private readonly dayButtonRefs = viewChildren<ElementRef<HTMLButtonElement>>('dayBtn');
  private readonly daysWrapper = viewChild<ElementRef<HTMLElement>>('daysWrapper');

  readonly calendarDays = input.required<CalendarDay[]>();
  readonly weekdayLabels = input.required<string[]>();
  readonly disabled = input<boolean>(false);
  readonly idPrefix = input<string>('n-calendar');
  readonly animateSelection = input<boolean>(false);
  readonly ariaLabel = input<string | null>(null);
  readonly ariaLabelledby = input<string | null>(null);
  readonly ariaDescribedby = input<string | null>(null);
  readonly ariaInvalid = input<boolean>(false);
  readonly ariaRequired = input<boolean>(false);

  readonly dateSelect = output<{ date: Date; index: number }>();
  readonly previousMonth = output<{ position: string; dayOfWeek: number }>();
  readonly nextMonth = output<{ position: string; dayOfWeek: number }>();
  readonly navigateYear = output<number>();

  private readonly focusedDayIndex = signal<number>(-1);

  protected readonly weekdayClasses = computed(() => mergeClasses(calendarWeekdayVariants()));
  protected readonly dayContainerClasses = computed(() => mergeClasses(calendarDayVariants()));

  protected readonly focusedIndex = computed(() => {
    const focused = this.focusedDayIndex();
    if (focused >= 0) return focused;

    const days = this.calendarDays();
    const selectedIndex = days.findIndex(d => d.isSelected);
    if (selectedIndex >= 0) return selectedIndex;

    const todayIndex = days.findIndex(d => d.isToday && d.isCurrentMonth);
    if (todayIndex >= 0) return todayIndex;

    const firstEnabled = days.findIndex(d => d.isCurrentMonth && !d.isDisabled);
    return firstEnabled >= 0 ? firstEnabled : 0;
  });

  protected readonly dayViews = computed<CalendarDayView[]>(() => {
    const prefix = this.idPrefix();
    const focused = this.focusedIndex();
    const animate = this.animateSelection();

    return this.calendarDays().map((day, i) => ({
      day,
      id: getDayId(prefix, i),
      classes: mergeClasses(
        calendarDayButtonVariants({
          selected: day.isSelected,
          today: day.isToday,
          outside: !day.isCurrentMonth,
          disabled: day.isDisabled,
          rangeStart: day.isRangeStart ?? false,
          rangeEnd: day.isRangeEnd ?? false,
          inRange: day.isInRange ?? false,
        }),
        // Animated single-mode: the sliding pill provides the background,
        // so the selected button itself stays transparent (text only).
        animate && day.isSelected && day.isCurrentMonth && 'bg-transparent hover:bg-transparent focus:bg-transparent',
      ),
      ariaLabel: getDayAriaLabel(day),
      tabindex: i === focused ? 0 : -1,
    }));
  });

  protected readonly selectedIndex = computed(() =>
    this.animateSelection()
      ? this.calendarDays().findIndex(d => d.isSelected && d.isCurrentMonth)
      : -1,
  );

  private readonly _indicator = signal<{ x: number; y: number; size: number } | null>(null, {
    equal: (a, b) =>
      a === b || (!!a && !!b && a.x === b.x && a.y === b.y && a.size === b.size),
  });
  protected readonly indicator = this._indicator.asReadonly();

  protected readonly indicatorTransform = computed(() => {
    const ind = this._indicator();
    return ind ? `translate(${ind.x}px, ${ind.y}px)` : 'none';
  });

  constructor() {
    afterRenderEffect({
      earlyRead: () => {
        if (!this.animateSelection()) return null;
        const idx = this.selectedIndex();
        const wrapper = this.daysWrapper()?.nativeElement;
        const refs = this.dayButtonRefs();
        if (idx < 0 || !wrapper || !refs[idx]) return null;

        const wrapRect = wrapper.getBoundingClientRect();
        const btnRect = refs[idx].nativeElement.getBoundingClientRect();
        return {
          x: btnRect.left - wrapRect.left,
          y: btnRect.top - wrapRect.top,
          size: btnRect.width,
        };
      },
      write: pos => this._indicator.set(pos()),
    });
  }

  protected onDayClick(date: Date, index: number): void {
    if (this.disabled()) return;
    this.focusedDayIndex.set(index);
    this.dateSelect.emit({ date, index });
  }

  setFocusedDayIndex(index: number): void {
    this.focusedDayIndex.set(index);
    if (index >= 0) this.focusDay(index);
  }

  resetFocus(): void {
    this.focusDay(this.focusedIndex());
  }

  onKeyDown(e: Event): void {
    if (this.disabled()) return;

    const event = e as KeyboardEvent;
    const days = this.calendarDays();
    if (days.length === 0) return;

    const currentIndex = this.focusedIndex();
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
    this.focusDay(index);
  }

  private focusDay(index: number): void {
    afterNextRender(
      () => {
        const refs = this.dayButtonRefs();
        if (refs.length === 0) return;
        refs[Math.max(0, Math.min(index, refs.length - 1))]?.nativeElement.focus();
      },
      { injector: this._injector },
    );
  }
}
