import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { getMonthNames } from './calendar.utils';
import { calendarNavVariants } from './calendar.variants';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-calendar-navigation',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div [class]="navClasses()">
      <button
        type="button"
        n-button
        nVariant="ghost"
        nSize="sm"
        (click)="onPreviousClick()"
        [disabled]="isPreviousDisabled()"
        aria-label="Previous month"
        class="size-7 p-0"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4" aria-hidden="true">
          <path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="flex items-center gap-1">
        <select
          [value]="currentMonth()"
          (change)="onMonthChange($event)"
          [disabled]="disabled()"
          class="h-7 cursor-pointer appearance-none rounded-sm bg-transparent px-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Select month"
        >
          @for (name of monthNames(); track $index) {
            <option [value]="$index.toString()">{{ name }}</option>
          }
        </select>

        <select
          [value]="currentYear()"
          (change)="onYearChange($event)"
          [disabled]="disabled()"
          class="h-7 cursor-pointer appearance-none rounded-sm bg-transparent px-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Select year"
        >
          @for (year of availableYears(); track year) {
            <option [value]="year.toString()">{{ year }}</option>
          }
        </select>
      </div>

      <button
        type="button"
        n-button
        nVariant="ghost"
        nSize="sm"
        (click)="onNextClick()"
        [disabled]="isNextDisabled()"
        aria-label="Next month"
        class="size-7 p-0"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-4" aria-hidden="true">
          <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nCalendarNavigation',
})
export class CalendarNavigationComponent {
  readonly currentMonth = input.required<string>();
  readonly currentYear = input.required<string>();
  readonly minDate = input<Date | null>(null);
  readonly maxDate = input<Date | null>(null);
  readonly disabled = input<boolean>(false);
  readonly locale = input<string>('en-US');

  readonly monthChange = output<string>();
  readonly yearChange = output<string>();
  readonly previousMonth = output<void>();
  readonly nextMonth = output<void>();

  protected readonly navClasses = computed(() => mergeClasses(calendarNavVariants()));

  protected readonly monthNames = computed(() => getMonthNames(this.locale()));

  protected readonly availableYears = computed(() => {
    const minYear = this.minDate()?.getFullYear() ?? new Date().getFullYear() - 100;
    const maxYear = this.maxDate()?.getFullYear() ?? new Date().getFullYear() + 50;
    const years: number[] = [];
    for (let i = minYear; i <= maxYear; i++) years.push(i);
    return years;
  });

  protected readonly isPreviousDisabled = computed(() => {
    if (this.disabled()) return true;
    const minDate = this.minDate();
    if (!minDate) return false;
    const month = Number.parseInt(this.currentMonth());
    const year = Number.parseInt(this.currentYear());
    const lastDayOfPrevMonth = new Date(year, month, 0);
    return lastDayOfPrevMonth.getTime() < minDate.getTime();
  });

  protected readonly isNextDisabled = computed(() => {
    if (this.disabled()) return true;
    const maxDate = this.maxDate();
    if (!maxDate) return false;
    const month = Number.parseInt(this.currentMonth());
    const year = Number.parseInt(this.currentYear());
    const nextMonthStart = new Date(year, month + 1, 1);
    return nextMonthStart.getTime() > maxDate.getTime();
  });

  protected onPreviousClick(): void {
    this.previousMonth.emit();
  }

  protected onNextClick(): void {
    this.nextMonth.emit();
  }

  protected onMonthChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.monthChange.emit(value);
  }

  protected onYearChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.yearChange.emit(value);
  }
}
