import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { LabelComponent } from '../label';
import { DatepickerCalendarComponent } from './datepicker-calendar.component';
import {
  DATEPICKER_CTX,
  type DatepickerContext,
  type DatepickerSize,
  type DisabledDateFn,
} from './datepicker.tokens';
import { datepickerTriggerVariants } from './datepicker.variants';
import { formatDate, startOfDay } from './datepicker.utils';

let _datepickerIdCounter = 0;

@Component({
  selector: 'n-datepicker',
  standalone: true,
  imports: [DatepickerCalendarComponent, LabelComponent],
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
        [disabled]="isDisabled()"
        [class]="triggerClasses()"
        (click)="toggle()"
        (keydown)="handleTriggerKeydown($event)"
      >
        <span class="truncate">
          {{ displayLabel() || nPlaceholder() || 'Selecione uma data' }}
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
        <n-datepicker-calendar
          [nId]="contentId()"
          [nClass]="'min-w-[18rem]'"
          [nAutoFocus]="true"
          (nClear)="clear()"
        />
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
  providers: [
    {
      provide: DATEPICKER_CTX,
      useFactory: (cmp: DatepickerComponent) => cmp.context,
      deps: [forwardRef(() => DatepickerComponent)],
    },
  ],
})
export class DatepickerComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  readonly nValue        = model<Date | null>(null);
  readonly nMin          = input<Date | null>(null);
  readonly nMax          = input<Date | null>(null);
  readonly nDisabledDate = input<DisabledDateFn | null>(null);
  readonly nLocale       = input<string>(typeof navigator !== 'undefined' ? navigator.language : 'en-US');
  readonly nWeekStartsOn = input<0 | 1>(0);
  readonly nFormat       = input<Intl.DateTimeFormatOptions | null>(null);
  readonly nShowToday    = input<boolean>(true);
  readonly nClearable    = input<boolean>(true);

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

  readonly nChange     = output<Date | null>();
  readonly nOpenChange = output<boolean>();

  private readonly _staticId = `n-datepicker-${++_datepickerIdCounter}`;
  private readonly _form     = injectFormControl<Date | null>(this);
  private readonly _open     = signal(false);
  private readonly _overlay  = inject(Overlay);
  private readonly _vcr      = inject(ViewContainerRef);

  @ViewChild('trigger', { static: false }) private _triggerEl?: ElementRef<HTMLButtonElement>;
  @ViewChild('panel', { static: true }) private _panelTpl!: TemplateRef<unknown>;

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _backdropSub?: Subscription;

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

  protected readonly displayLabel = computed(() => {
    const v = this.nValue();
    if (!v) return '';
    return formatDate(v, this.nLocale(), this.nFormat() ?? undefined);
  });

  protected readonly triggerClasses = computed(() =>
    mergeClasses(
      datepickerTriggerVariants({ nSize: this.nSize(), empty: !this.nValue() }),
      this.nClass(),
    ),
  );

  readonly context: DatepickerContext = {
    value: this.nValue,
    min: this.nMin,
    max: this.nMax,
    disabledDate: this.nDisabledDate,
    locale: this.nLocale,
    weekStartsOn: this.nWeekStartsOn,
    disabled: this.isDisabled,
    selectDate: (date: Date) => this.commit(date),
  };

  ngAfterViewInit(): void {
    this._portal = new TemplatePortal(this._panelTpl, this._vcr);
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
    if (returnFocus) queueMicrotask(() => this._triggerEl?.nativeElement.focus());
  }

  protected clear(): void {
    this.nValue.set(null);
    this._form.notifyChange(null);
    this.nChange.emit(null);
    this.close(true);
  }

  private commit(date: Date): void {
    const next = startOfDay(date);
    this.nValue.set(next);
    this._form.notifyChange(next);
    this.nChange.emit(next);
    this.close(true);
  }

  protected handleTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openPanel();
    }
  }

  private attach(): void {
    const trigger = this._triggerEl?.nativeElement;
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
