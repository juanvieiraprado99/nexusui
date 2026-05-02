import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { DATEPICKER_CTX, type DisabledDateFn } from './datepicker.tokens';
import { datepickerDayVariants } from './datepicker.variants';
import {
  addDays,
  addMonths,
  addYears,
  buildMonthGrid,
  clamp,
  formatDate,
  formatMonthYear,
  getWeekdayLabels,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
} from './datepicker.utils';

@Component({
  selector: 'n-datepicker-calendar',
  standalone: true,
  template: `
    <div
      #root
      [id]="nId() || null"
      data-slot="content"
      role="dialog"
      [attr.aria-label]="'Calendário'"
      [class]="rootClasses()"
      (keydown)="handleKeydown($event)"
    >
      <div data-slot="header" class="flex items-center justify-between mb-3">
        <button
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
          [disabled]="!canGoPrev()"
          [attr.aria-label]="'Mês anterior'"
          (click)="goMonth(-1)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="text-sm font-medium capitalize" aria-live="polite">
          {{ headerLabel() }}
        </div>

        <button
          type="button"
          class="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed"
          [disabled]="!canGoNext()"
          [attr.aria-label]="'Próximo mês'"
          (click)="goMonth(1)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <div role="grid" data-slot="grid" class="select-none">
        <div role="row" class="grid grid-cols-7 mb-1">
          @for (label of weekdayLabels(); track label) {
            <div role="columnheader" class="text-[0.7rem] font-medium text-muted-foreground text-center py-1 capitalize">
              {{ label }}
            </div>
          }
        </div>

        @for (week of weeks(); track $index) {
          <div role="row" class="grid grid-cols-7 gap-0.5">
            @for (cell of week; track cell.date.getTime()) {
              <button
                type="button"
                role="gridcell"
                data-slot="item"
                [tabindex]="isFocused(cell.date) ? 0 : -1"
                [attr.aria-selected]="isSelected(cell.date)"
                [attr.aria-disabled]="isDisabled(cell.date) ? true : null"
                [attr.aria-current]="cell.isToday ? 'date' : null"
                [disabled]="isDisabled(cell.date)"
                [class]="dayClasses(cell)"
                (click)="select(cell.date)"
                (focus)="onCellFocus(cell.date)"
              >
                {{ cell.date.getDate() }}
              </button>
            }
          </div>
        }
      </div>

      @if (showFooter()) {
        <div data-slot="footer" class="mt-3 flex items-center justify-between border-t border-border pt-3">
          @if (nShowToday()) {
            <button
              type="button"
              class="text-xs font-medium text-primary hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
              [disabled]="isDisabled(today())"
              (click)="select(today())"
            >
              Hoje
            </button>
          } @else {
            <span></span>
          }
          @if (nClearable()) {
            <button
              type="button"
              class="text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
              (click)="clear()"
            >
              Limpar
            </button>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class DatepickerCalendarComponent implements AfterViewInit {
  readonly nValue        = input<Date | null>(null);
  readonly nMin          = input<Date | null>(null);
  readonly nMax          = input<Date | null>(null);
  readonly nDisabledDate = input<DisabledDateFn | null>(null);
  readonly nLocale       = input<string>(typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  readonly nWeekStartsOn = input<0 | 1>(0);
  readonly nShowToday    = input<boolean>(true);
  readonly nClearable    = input<boolean>(true);
  readonly nClass        = input<string>('');
  readonly nAutoFocus    = input<boolean>(false);
  readonly nId           = input<string>('');

  readonly nChange = output<Date>();
  readonly nClear  = output<void>();

  private readonly _ctx = inject(DATEPICKER_CTX, { optional: true });
  private readonly _rootEl = viewChild<ElementRef<HTMLElement>>('root');

  protected readonly today = computed(() => startOfDay(new Date()));

  private readonly _resolvedValue = computed(() => this._ctx?.value() ?? this.nValue());
  private readonly _resolvedMin   = computed(() => this._ctx?.min() ?? this.nMin());
  private readonly _resolvedMax   = computed(() => this._ctx?.max() ?? this.nMax());
  private readonly _resolvedDisabledFn = computed(() => this._ctx?.disabledDate() ?? this.nDisabledDate());
  private readonly _resolvedLocale = computed(() => this._ctx?.locale() ?? this.nLocale());
  private readonly _resolvedWeekStart = computed(() => this._ctx?.weekStartsOn() ?? this.nWeekStartsOn());

  private readonly _viewDate = signal<Date>(startOfMonth(new Date()));
  private readonly _focusedDate = signal<Date>(startOfDay(new Date()));

  protected readonly weekdayLabels = computed(() =>
    getWeekdayLabels(this._resolvedLocale(), this._resolvedWeekStart()),
  );

  protected readonly cells = computed(() =>
    buildMonthGrid(this._viewDate(), this._resolvedWeekStart()),
  );

  protected readonly weeks = computed(() => {
    const all = this.cells();
    const out: typeof all[] = [];
    for (let i = 0; i < all.length; i += 7) out.push(all.slice(i, i + 7));
    return out;
  });

  protected readonly headerLabel = computed(() =>
    formatMonthYear(this._viewDate(), this._resolvedLocale()),
  );

  protected readonly canGoPrev = computed(() => {
    const min = this._resolvedMin();
    if (!min) return true;
    const prevMonthEnd = addDays(startOfMonth(this._viewDate()), -1);
    return !isBefore(prevMonthEnd, min);
  });

  protected readonly canGoNext = computed(() => {
    const max = this._resolvedMax();
    if (!max) return true;
    const nextMonthStart = startOfMonth(addMonths(this._viewDate(), 1));
    return !isAfter(nextMonthStart, max);
  });

  protected readonly showFooter = computed(() => this.nShowToday() || this.nClearable());

  constructor() {
    effect(() => {
      const v = this._resolvedValue();
      const target = v ? startOfMonth(v) : startOfMonth(new Date());
      this._viewDate.set(target);
      this._focusedDate.set(v ? startOfDay(v) : startOfDay(new Date()));
    });
  }

  ngAfterViewInit(): void {
    if (this.nAutoFocus()) {
      queueMicrotask(() => this.focusActiveCell());
    }
  }

  protected isSelected(date: Date): boolean {
    return isSameDay(date, this._resolvedValue());
  }

  protected isFocused(date: Date): boolean {
    return isSameDay(date, this._focusedDate());
  }

  protected isDisabled(date: Date): boolean {
    const min = this._resolvedMin();
    const max = this._resolvedMax();
    if (min && isBefore(date, min)) return true;
    if (max && isAfter(date, max)) return true;
    const fn = this._resolvedDisabledFn();
    if (fn && fn(date)) return true;
    return false;
  }

  protected dayClasses(cell: { date: Date; inMonth: boolean }): string {
    const date = cell.date;
    let state: 'default' | 'selected' | 'today' | 'outside' | 'disabled' = 'default';
    if (this.isDisabled(date)) state = 'disabled';
    else if (this.isSelected(date)) state = 'selected';
    else if (isSameDay(date, this.today())) state = 'today';
    else if (!cell.inMonth) state = 'outside';
    return mergeClasses(datepickerDayVariants({ state }));
  }

  protected rootClasses() {
    return mergeClasses(
      'rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-md',
      this.nClass(),
    );
  }

  protected goMonth(delta: number): void {
    this._viewDate.set(startOfMonth(addMonths(this._viewDate(), delta)));
  }

  protected select(date: Date): void {
    if (this.isDisabled(date)) return;
    const clamped = clamp(startOfDay(date), this._resolvedMin(), this._resolvedMax());
    this._focusedDate.set(clamped);
    if (this._ctx) this._ctx.selectDate(clamped);
    this.nChange.emit(clamped);
  }

  protected clear(): void {
    this.nClear.emit();
  }

  protected onCellFocus(date: Date): void {
    this._focusedDate.set(date);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    const focused = this._focusedDate();
    let next: Date | null = null;
    switch (event.key) {
      case 'ArrowLeft': next = addDays(focused, -1); break;
      case 'ArrowRight': next = addDays(focused, 1); break;
      case 'ArrowUp': next = addDays(focused, -7); break;
      case 'ArrowDown': next = addDays(focused, 7); break;
      case 'PageUp': next = event.shiftKey ? addYears(focused, -1) : addMonths(focused, -1); break;
      case 'PageDown': next = event.shiftKey ? addYears(focused, 1) : addMonths(focused, 1); break;
      case 'Home': {
        const start = this._resolvedWeekStart();
        const offset = (focused.getDay() - start + 7) % 7;
        next = addDays(focused, -offset);
        break;
      }
      case 'End': {
        const start = this._resolvedWeekStart();
        const offset = (focused.getDay() - start + 7) % 7;
        next = addDays(focused, 6 - offset);
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.select(focused);
        return;
      default: return;
    }
    if (!next) return;
    event.preventDefault();
    const clamped = clamp(next, this._resolvedMin(), this._resolvedMax());
    this._focusedDate.set(clamped);
    if (!isSameDay(this._viewDate(), clamped) && (clamped.getMonth() !== this._viewDate().getMonth() || clamped.getFullYear() !== this._viewDate().getFullYear())) {
      this._viewDate.set(startOfMonth(clamped));
    }
    queueMicrotask(() => this.focusActiveCell());
  }

  private focusActiveCell(): void {
    const root = this._rootEl()?.nativeElement;
    if (!root) return;
    const btn = root.querySelector<HTMLButtonElement>('button[role="gridcell"][tabindex="0"]');
    btn?.focus();
  }

  protected formatLabel(d: Date): string {
    return formatDate(d, this._resolvedLocale());
  }
}
