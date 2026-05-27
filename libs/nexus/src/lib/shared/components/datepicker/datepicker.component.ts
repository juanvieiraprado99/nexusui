import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
  afterNextRender,
  viewChild,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { LabelComponent } from '../label';
import { CalendarComponent } from '../calendar/calendar.component';
import type { CalendarValue } from '../calendar/calendar.types';
import type { DatepickerSize, DisabledDateFn } from './datepicker.tokens';
import { datepickerTriggerVariants } from './datepicker.variants';
import {
  formatDate,
  from12Hour,
  isAfter,
  isBefore,
  resolveIs12Hour,
  setTime,
  startOfDay,
  to12Hour,
} from './datepicker.utils';

let _datepickerIdCounter = 0;

@Component({
  selector: 'n-datepicker',
  standalone: true,
  imports: [CalendarComponent, LabelComponent, CdkTrapFocus],
  template: `
    <div class="flex flex-col" data-slot="root">

      @if (nLabel()) {
        <n-label [nFor]="datepickerId()" [nRequired]="nRequired()" [nDisabled]="isDisabled()">
          {{ nLabel() }}
        </n-label>
      }

      <button
        #trigger
        type="button"
        [id]="datepickerId()"
        data-slot="trigger"
        role="combobox"
        [attr.aria-haspopup]="'dialog'"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="contentId()"
        [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="hasError() ? true : null"
        [attr.aria-required]="nRequired() ? true : null"
        [attr.data-state]="open() ? 'open' : 'closed'"
        [disabled]="isDisabled()"
        [class]="triggerClasses()"
        (click)="toggle()"
        (keydown)="handleTriggerKeydown($event)"
      >
        <span class="truncate">
          {{ displayLabel() || nPlaceholder() || nEmptyLabel() }}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="h-4 w-4 shrink-0 opacity-60 ml-2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <ng-template #panel>
        <div
          [id]="contentId()"
          data-slot="content"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="nCalendarAriaLabel()"
          cdkTrapFocus
          [cdkTrapFocusAutoCapture]="true"
          class="rounded-md border border-border bg-popover shadow-md"
        >
          <n-calendar
            nMode="single"
            [nValue]="nValue()"
            [nMin]="nMin()"
            [nMax]="nMax()"
            [nDisabledDate]="nDisabledDate()"
            [nLocale]="effectiveLocale()"
            [nWeekStartsOn]="nWeekStartsOn()"
            [nDisabled]="isDisabled()"
            (nChange)="onCalendarChange($event)"
          />

          @if (nShowTime()) {
            <div
              data-slot="time"
              class="mx-3 mb-3 flex items-center gap-1.5 border-t border-border pt-3"
            >
              <select
                [attr.aria-label]="nHourLabel()"
                [disabled]="isDisabled()"
                [value]="selectedHour()"
                [class]="timeSelectClasses()"
                (change)="onHourChange($event)"
              >
                @for (h of hourOptions(); track h) {
                  <option [value]="h">{{ pad(h) }}</option>
                }
              </select>
              <span class="text-muted-foreground">:</span>
              <select
                [attr.aria-label]="nMinuteLabel()"
                [disabled]="isDisabled()"
                [value]="selectedMinute()"
                [class]="timeSelectClasses()"
                (change)="onMinuteChange($event)"
              >
                @for (m of minuteOptions(); track m) {
                  <option [value]="m">{{ pad(m) }}</option>
                }
              </select>
              @if (is12Hour()) {
                <select
                  [attr.aria-label]="nMeridiemLabel()"
                  [disabled]="isDisabled()"
                  [value]="selectedMeridiem()"
                  [class]="timeSelectClasses()"
                  (change)="onMeridiemChange($event)"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              }
              <button
                type="button"
                class="ml-auto text-xs font-medium text-primary hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
                [disabled]="isDisabled()"
                (click)="selectNow()"
              >
                {{ nNowLabel() }}
              </button>
            </div>
          }

          @if (nShowToday() || nClearable()) {
            <div class="mx-3 mb-3 flex items-center justify-between border-t border-border pt-3">
              @if (nShowToday()) {
                <button
                  type="button"
                  class="text-xs font-medium text-primary hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
                  [disabled]="isTodayDisabled()"
                  (click)="selectToday()"
                >
                  {{ nTodayLabel() }}
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
                  {{ nClearLabel() }}
                </button>
              }
            </div>
          }
        </div>
      </ng-template>

      @if (hasError()) {
        <p [id]="errorId()" class="mt-1 text-xs text-destructive animate-error-in" role="alert" data-slot="error">
          {{ nError() }}
        </p>
      }

      @if (nHint() && !hasError()) {
        <p [id]="hintId()" class="mt-1 text-xs text-muted-foreground" data-slot="hint">
          {{ nHint() }}
        </p>
      }

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class DatepickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  readonly nValue        = model<Date | null>(null);
  readonly nMin          = input<Date | null>(null);
  readonly nMax          = input<Date | null>(null);
  readonly nDisabledDate = input<DisabledDateFn | null>(null);
  readonly nLocale       = input<string>('');
  readonly nWeekStartsOn = input<0 | 1>(0);
  readonly nFormat       = input<Intl.DateTimeFormatOptions | null>(null);
  readonly nShowToday    = input<boolean>(true);
  readonly nClearable    = input<boolean>(true);

  readonly nShowTime   = input<boolean>(false);
  readonly nMinuteStep = input<number>(1);
  readonly nHourCycle  = input<'auto' | '12' | '24'>('auto');

  readonly nLabel       = input<string>('');
  readonly nPlaceholder = input<string>('');
  readonly nDisabled    = input<boolean>(false);
  readonly nRequired    = input<boolean>(false);
  readonly nError       = input<string | null>(null);
  readonly nHint        = input<string | null>(null);
  readonly nClass       = input<string>('');
  readonly nAriaLabel   = input<string>('');
  readonly nId          = input<string>('');
  readonly nSize        = input<DatepickerSize>('default');

  readonly nEmptyLabel        = input<string>('Selecione uma data');
  readonly nTodayLabel        = input<string>('Hoje');
  readonly nNowLabel          = input<string>('Agora');
  readonly nClearLabel        = input<string>('Limpar');
  readonly nCalendarAriaLabel = input<string>('Calendário');
  readonly nHourLabel         = input<string>('Hora');
  readonly nMinuteLabel       = input<string>('Minuto');
  readonly nMeridiemLabel     = input<string>('Período');

  readonly nChange     = output<Date | null>();
  readonly nOpenChange = output<boolean>();

  private readonly _staticId   = `n-datepicker-${++_datepickerIdCounter}`;
  private readonly _form       = injectFormControl<Date | null>(this);
  private readonly _open       = signal(false);
  private readonly _overlay    = inject(Overlay);
  private readonly _vcr        = inject(ViewContainerRef);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _browserLocale = signal<string>('en-US');

  private readonly _timeOfDay = linkedSignal(() => {
    const v = this.nValue();
    return v ? { h: v.getHours(), m: v.getMinutes() } : { h: 0, m: 0 };
  });

  private readonly _triggerEl = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly _panelTpl = viewChild.required<TemplateRef<unknown>>('panel');

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _backdropSub?: Subscription;

  private readonly _today = computed(() => startOfDay(new Date()));

  protected readonly datepickerId = computed(() => this.nId() || this._staticId);
  protected readonly contentId    = computed(() => `${this.datepickerId()}-content`);
  protected readonly errorId      = computed(() => `${this.datepickerId()}-error`);
  protected readonly hintId       = computed(() => `${this.datepickerId()}-hint`);

  protected readonly open = this._open.asReadonly();

  protected readonly isDisabled = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError   = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()),
  );

  protected readonly describedBy = computed<string | null>(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())   return this.hintId();
    return null;
  });

  protected readonly effectiveLocale = computed(() => this.nLocale() || this._browserLocale());

  protected readonly is12Hour = computed(() =>
    resolveIs12Hour(this.effectiveLocale(), this.nHourCycle()),
  );

  protected readonly hourOptions = computed(() =>
    this.is12Hour()
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 24 }, (_, i) => i),
  );

  protected readonly minuteOptions = computed(() => {
    const step = Math.max(1, Math.floor(this.nMinuteStep()));
    const opts: number[] = [];
    for (let m = 0; m < 60; m += step) opts.push(m);
    return opts;
  });

  protected readonly selectedHour = computed(() => {
    const h = this._timeOfDay().h;
    return this.is12Hour() ? to12Hour(h).hour : h;
  });
  protected readonly selectedMinute   = computed(() => this._timeOfDay().m);
  protected readonly selectedMeridiem = computed(() => to12Hour(this._timeOfDay().h).meridiem);

  protected readonly displayLabel = computed(() => {
    const v = this.nValue();
    if (!v) return '';
    const opts = this.nFormat() ?? this.defaultFormatOptions();
    return formatDate(v, this.effectiveLocale(), opts);
  });

  private defaultFormatOptions(): Intl.DateTimeFormatOptions {
    const base: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    if (this.nShowTime()) {
      base.hour = '2-digit';
      base.minute = '2-digit';
      base.hour12 = this.is12Hour();
    }
    return base;
  }

  protected readonly triggerClasses = computed(() =>
    mergeClasses(
      datepickerTriggerVariants({ nSize: this.nSize(), empty: !this.nValue() }),
      this.nClass(),
    ),
  );

  protected readonly timeSelectClasses = computed(() => {
    const size = this.nSize();
    const sizing =
      size === 'sm' ? 'h-7 text-xs' : size === 'lg' ? 'h-10 text-base' : 'h-8 text-sm';
    return mergeClasses(
      'rounded-md border border-input bg-background px-2 text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      sizing,
    );
  });

  protected pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  protected readonly isTodayDisabled = computed(() => {
    const today = this._today();
    const min = this.nMin();
    const max = this.nMax();
    if (min && isBefore(today, min)) return true;
    if (max && isAfter(today, max)) return true;
    const fn = this.nDisabledDate();
    return fn ? fn(today) : false;
  });

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this._platformId) && typeof navigator !== 'undefined') {
        this._browserLocale.set(navigator.language);
      }
    });
  }

  ngAfterViewInit(): void {
    this._portal = new TemplatePortal(this._panelTpl(), this._vcr);
  }

  ngOnDestroy(): void {
    this.detach();
  }

  protected toggle(): void {
    if (this.isDisabled()) return;
    if (this._open()) this.close(true);
    else this.openPanel();
  }

  private openPanel(): void {
    if (this._open()) return;
    this._open.set(true);
    this.nOpenChange.emit(true);
    this.attach();
  }

  private close(returnFocus: boolean): void {
    if (!this._open()) return;
    this._open.set(false);
    this.nOpenChange.emit(false);
    this.detach();
    this._form.notifyTouched();
    if (returnFocus) queueMicrotask(() => this._triggerEl()?.nativeElement.focus());
  }

  protected onCalendarChange(value: CalendarValue): void {
    if (value instanceof Date) {
      this.commit(value);
    }
  }

  protected selectToday(): void {
    this.commit(this._today());
  }

  /** Sets the time portion to the current clock time without closing the panel. */
  protected selectNow(): void {
    const now = new Date();
    this.applyTime(now.getHours(), now.getMinutes());
  }

  protected clear(): void {
    this.nValue.set(null);
    this._form.notifyChange(null);
    this.nChange.emit(null);
    this.close(true);
  }

  private commit(date: Date): void {
    const next = this.nShowTime()
      ? setTime(date, this._timeOfDay().h, this._timeOfDay().m)
      : startOfDay(date);
    this.nValue.set(next);
    this._form.notifyChange(next);
    this.nChange.emit(next);
    this.close(true);
  }

  protected onHourChange(event: Event): void {
    const raw = Number.parseInt((event.target as HTMLSelectElement).value, 10);
    if (Number.isNaN(raw)) return;
    const h = this.is12Hour() ? from12Hour(raw, this.selectedMeridiem()) : raw;
    this.applyTime(h, this._timeOfDay().m);
  }

  protected onMinuteChange(event: Event): void {
    const m = Number.parseInt((event.target as HTMLSelectElement).value, 10);
    if (Number.isNaN(m)) return;
    this.applyTime(this._timeOfDay().h, m);
  }

  protected onMeridiemChange(event: Event): void {
    const meridiem = (event.target as HTMLSelectElement).value as 'AM' | 'PM';
    const hour12 = to12Hour(this._timeOfDay().h).hour;
    this.applyTime(from12Hour(hour12, meridiem), this._timeOfDay().m);
  }

  /** Updates the time portion and reflects it on the value without closing the panel. */
  private applyTime(h: number, m: number): void {
    this._timeOfDay.set({ h, m });
    const base = this.nValue() ?? this._today();
    const next = setTime(base, h, m);
    this.nValue.set(next);
    this._form.notifyChange(next);
    this.nChange.emit(next);
  }

  protected handleTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openPanel();
    }
  }

  private attach(): void {
    const trigger = this._triggerEl()?.nativeElement;
    if (!trigger || !this._portal) return;
    if (this._overlayRef?.hasAttached()) return;

    const positions = this.buildPositions();
    const config = new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(trigger)
        .withPositions(positions)
        .withFlexibleDimensions(false)
        .withPush(true),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);
    this._backdropSub = this._overlayRef.backdropClick().subscribe(() => this.close(false));
    this._overlayRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.close(true);
      } else if (event.key === 'Tab') {
        this.close(false);
      }
    });
  }

  private detach(): void {
    this._backdropSub?.unsubscribe();
    this._backdropSub = undefined;
    if (this._overlayRef?.hasAttached()) this._overlayRef.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  private buildPositions(): ConnectedPosition[] {
    const offset = 4;
    return [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: offset },
      { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -offset },
      { originX: 'end',   originY: 'bottom', overlayX: 'end',   overlayY: 'top', offsetY: offset },
      { originX: 'end',   originY: 'top',    overlayX: 'end',   overlayY: 'bottom', offsetY: -offset },
    ];
  }

  writeValue(v: Date | null | undefined): void {
    this.nValue.set(v ?? null);
  }
  registerOnChange(fn: (v: Date | null) => void): void {
    this._form.setOnChange(fn);
  }
  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }
  setDisabledState(isDisabled: boolean): void {
    this._form.setDisabledByForm(isDisabled);
  }
}
