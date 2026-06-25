import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { LabelComponent } from '../label';
import {
  sliderMarkDotVariants,
  sliderThumbVariants,
  sliderTrackActiveVariants,
  sliderTrackVariants,
  type SliderVariants,
} from './slider.variants';

export type SliderMark = { value: number; label?: string };

let _sliderIdCounter = 0;

@Component({
  selector: 'n-slider',
  standalone: true,
  imports: [LabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <div data-slot="root" [class]="rootClasses()">
      @if (nLabel()) {
        <n-label [nFor]="sliderId()" [nRequired]="nRequired()" [nDisabled]="isDisabled()">
          {{ nLabel() }}
        </n-label>
      }

      <div data-slot="control-wrapper" [class]="controlWrapperClasses()">
        @if (nShowInputs()) {
          <input
            type="text"
            inputmode="decimal"
            data-slot="input-start"
            [value]="inputStartDisplay()"
            [disabled]="isDisabled()"
            [attr.aria-label]="nRange() ? 'Minimum value' : 'Value'"
            [class]="sideInputClasses()"
            (input)="onInputFilter($event)"
            (keydown.enter)="onInputCommit($event, 0)"
            (blur)="onInputStartBlur($event)"
          />
        }

        <div data-slot="track-wrapper" [class]="trackWrapperClasses()">
          <div #trackEl data-slot="track" [class]="trackClasses()" (pointerdown)="onTrackPointerDown($event)">
            <div data-slot="track-active" [class]="trackActiveClasses()" [style]="activeTrackStyle()"></div>

            @for (mark of nMarks(); track mark.value) {
              <span data-slot="mark" class="absolute" [style]="markOffsetStyle(mark.value)">
                <span data-slot="mark-dot" [class]="markDotClasses(mark)"></span>
                @if (mark.label) {
                  <span data-slot="mark-label" [class]="markLabelClasses()">{{ mark.label }}</span>
                }
              </span>
            }

            <div
              data-slot="thumb-0"
              [attr.tabindex]="isDisabled() ? -1 : 0"
              role="slider"
              [attr.id]="sliderId()"
              [attr.aria-valuenow]="thumbValues()[0]"
              [attr.aria-valuemin]="nMin()"
              [attr.aria-valuemax]="nRange() ? thumbValues()[1] : nMax()"
              [attr.aria-valuetext]="'' + thumbValues()[0]"
              [attr.aria-orientation]="nOrientation()"
              [attr.aria-disabled]="isDisabled() ? true : null"
              [attr.aria-label]="nRange() ? 'Minimum' : nAriaLabel() || nLabel() || null"
              [attr.aria-describedby]="describedBy()"
              [class]="thumbClasses()"
              [style]="thumbOffsetStyle(0)"
              (pointerdown)="onThumbDown($event, 0)"
              (pointermove)="onThumbMove($event, 0)"
              (pointerup)="onThumbUp($event)"
              (keydown)="onThumbKey($event, 0)"
              (focus)="onThumbFocus(0)"
              (blur)="onThumbBlur()"
            >
              @if (nShowTooltip() && isThumbVisible(0)) {
                <div data-slot="tooltip-0" [class]="tooltipClasses()">{{ thumbValues()[0] }}</div>
              }
            </div>

            @if (nRange()) {
              <div
                data-slot="thumb-1"
                [attr.tabindex]="isDisabled() ? -1 : 0"
                role="slider"
                [attr.aria-valuenow]="thumbValues()[1]"
                [attr.aria-valuemin]="thumbValues()[0]"
                [attr.aria-valuemax]="nMax()"
                [attr.aria-valuetext]="'' + thumbValues()[1]"
                [attr.aria-orientation]="nOrientation()"
                [attr.aria-disabled]="isDisabled() ? true : null"
                [attr.aria-label]="'Maximum'"
                [class]="thumbClasses()"
                [style]="thumbOffsetStyle(1)"
                (pointerdown)="onThumbDown($event, 1)"
                (pointermove)="onThumbMove($event, 1)"
                (pointerup)="onThumbUp($event)"
                (keydown)="onThumbKey($event, 1)"
                (focus)="onThumbFocus(1)"
                (blur)="onThumbBlur()"
              >
                @if (nShowTooltip() && isThumbVisible(1)) {
                  <div data-slot="tooltip-1" [class]="tooltipClasses()">{{ thumbValues()[1] }}</div>
                }
              </div>
            }
          </div>
        </div>

        @if (nShowInputs() && nRange()) {
          <input
            type="text"
            inputmode="decimal"
            data-slot="input-end"
            [value]="inputEndDisplay()"
            [disabled]="isDisabled()"
            aria-label="Maximum value"
            [class]="sideInputClasses()"
            (input)="onInputFilter($event)"
            (keydown.enter)="onInputCommit($event, 1)"
            (blur)="onInputEndBlur($event)"
          />
        }
      </div>

      @if (hasError()) {
        <p [id]="errorId()" class="text-destructive mt-1 text-xs" role="alert" data-slot="error">
          {{ nError() }}
        </p>
      }

      @if (nHint() && !hasError()) {
        <p [id]="hintId()" class="text-muted-foreground mt-1 text-xs" data-slot="hint">
          {{ nHint() }}
        </p>
      }
    </div>
  `,
})
export class SliderComponent implements ControlValueAccessor {
  readonly nValue = model<number | [number, number]>(0);
  readonly nMin = input<number>(0);
  readonly nMax = input<number>(100);
  readonly nStep = input<number>(1);
  readonly nRange = input<boolean>(false);
  readonly nOrientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly nMarks = input<SliderMark[]>([]);
  readonly nShowTooltip = input<boolean>(true);
  readonly nShowInputs = input<boolean>(false);
  readonly nDisabled = input<boolean>(false);
  readonly nSize = input<SliderVariants['nSize']>('md');
  readonly nVariant = input<SliderVariants['nVariant']>('default');
  readonly nClass = input<string>('');
  readonly nId = input<string>('');
  readonly nLabel = input<string>('');
  readonly nError = input<string | null>(null);
  readonly nHint = input<string | null>(null);
  readonly nRequired = input<boolean>(false);
  readonly nAriaLabel = input<string>('');

  readonly nChange = output<number | [number, number]>();

  private readonly _form = injectFormControl<number | [number, number]>(this);
  private readonly _staticId = `n-slider-${++_sliderIdCounter}`;
  private readonly _trackRef = viewChild<ElementRef<HTMLDivElement>>('trackEl');

  protected readonly isDragging = signal(false);
  protected readonly activeThumb = signal<0 | 1>(0);
  protected readonly focusedThumb = signal<0 | 1 | null>(null);

  /** Track rect cached on pointer-down to avoid layout reads on every pointermove. */
  private _cachedRect: DOMRect | null = null;

  protected readonly isDisabled = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched())
  );
  protected readonly sliderId = computed(() => this.nId() || this._staticId);
  protected readonly errorId = computed(() => `${this.sliderId()}-error`);
  protected readonly hintId = computed(() => `${this.sliderId()}-hint`);
  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint()) return this.hintId();
    return null;
  });

  protected readonly thumbValues = computed((): [number, number] => {
    const v = this.nValue();
    if (Array.isArray(v)) return v;
    return [v, this.nMax()];
  });

  protected readonly inputStartDisplay = computed(() => String(this.thumbValues()[0]));
  protected readonly inputEndDisplay = computed(() => String(this.thumbValues()[1]));

  // ── Styles ──────────────────────────────────────────────────────────────────

  protected readonly activeTrackStyle = computed((): Record<string, string> => {
    const isVertical = this.nOrientation() === 'vertical';
    const [v0, v1] = this.thumbValues();
    const p0 = this._toPercent(v0);

    if (this.nRange()) {
      const p1 = this._toPercent(v1);
      return isVertical
        ? { bottom: `${p0}%`, height: `${p1 - p0}%`, left: '0', right: '0' }
        : { left: `${p0}%`, width: `${p1 - p0}%`, top: '0', bottom: '0' };
    }
    return isVertical
      ? { bottom: '0', height: `${p0}%`, left: '0', right: '0' }
      : { left: '0', width: `${p0}%`, top: '0', bottom: '0' };
  });

  protected thumbOffsetStyle(index: 0 | 1): Record<string, string> {
    const pct = this._toPercent(this.thumbValues()[index]);
    return this.nOrientation() === 'vertical'
      ? { bottom: `${pct}%`, left: '50%', transform: 'translate(-50%, 50%)' }
      : { left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)' };
  }

  protected markOffsetStyle(value: number): Record<string, string> {
    const pct = this._toPercent(value);
    return this.nOrientation() === 'vertical'
      ? { bottom: `${pct}%`, left: '50%', transform: 'translate(-50%, 50%)' }
      : { left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)' };
  }

  // ── Classes ──────────────────────────────────────────────────────────────────

  protected readonly rootClasses = computed(() => mergeClasses('flex flex-col w-full', this.nClass()));

  protected readonly controlWrapperClasses = computed(() =>
    mergeClasses('flex items-center gap-3', this.nOrientation() === 'vertical' && 'flex-col')
  );

  protected readonly trackWrapperClasses = computed(() =>
    mergeClasses(
      'relative',
      this.nOrientation() === 'vertical' ? 'flex justify-center h-40' : 'flex items-center h-5 flex-1'
    )
  );

  protected readonly trackClasses = computed(() =>
    mergeClasses(
      sliderTrackVariants({ nSize: this.nSize(), nOrientation: this.nOrientation() }),
      !this.isDisabled() && 'cursor-pointer'
    )
  );

  protected readonly trackActiveClasses = computed(() =>
    mergeClasses(sliderTrackActiveVariants({ nVariant: this.nVariant() }))
  );

  protected readonly thumbClasses = computed(() =>
    mergeClasses(
      sliderThumbVariants({ nSize: this.nSize(), nVariant: this.nVariant() }),
      this.isDisabled() && 'opacity-50 pointer-events-none cursor-not-allowed'
    )
  );

  protected readonly tooltipClasses = computed(() =>
    mergeClasses(
      'absolute rounded bg-popover text-popover-foreground text-xs font-medium px-2 py-1 shadow-md whitespace-nowrap pointer-events-none z-20',
      this.nOrientation() === 'vertical'
        ? 'left-6 top-1/2 -translate-y-1/2'
        : 'bottom-full left-1/2 -translate-x-1/2 mb-1'
    )
  );

  // Side inputs use a bare <input> rather than n-input on purpose: n-input is a composed
  // form-field (label + error/hint + spinner, string value) and is too heavy for a compact
  // numeric box beside the track. LabelComponent is reused for the slider's own label.
  protected readonly sideInputClasses = computed(() =>
    mergeClasses(
      'w-16 h-8 px-2 text-sm border border-input rounded-md bg-background text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      this.isDisabled() && 'opacity-50 cursor-not-allowed'
    )
  );

  protected markDotClasses(mark: SliderMark): string {
    return sliderMarkDotVariants({ nActive: this.isMarkActive(mark), nVariant: this.nVariant() });
  }

  protected readonly markLabelClasses = computed(() =>
    mergeClasses(
      'absolute text-xs text-muted-foreground whitespace-nowrap',
      this.nOrientation() === 'vertical' ? 'left-3 top-0 -translate-y-1/2' : 'top-3 left-0 -translate-x-1/2'
    )
  );

  // ── Helpers ──────────────────────────────────────────────────────────────────

  protected isMarkActive(mark: SliderMark): boolean {
    const [v0, v1] = this.thumbValues();
    return this.nRange() ? mark.value >= v0 && mark.value <= v1 : mark.value <= v0;
  }

  private _toPercent(value: number): number {
    const range = this.nMax() - this.nMin();
    if (range === 0) return 0;
    return ((value - this.nMin()) / range) * 100;
  }

  private _snapToStep(value: number): number {
    const step = this.nStep();
    const snapped = Math.round((value - this.nMin()) / step) * step + this.nMin();
    return parseFloat(Math.max(this.nMin(), Math.min(this.nMax(), snapped)).toFixed(10));
  }

  private _pointerToValue(e: PointerEvent): number | null {
    const rect = this._cachedRect ?? this._trackRef()?.nativeElement.getBoundingClientRect();
    if (!rect) return null;
    let ratio: number;
    if (this.nOrientation() === 'vertical') {
      ratio = 1 - (e.clientY - rect.top) / rect.height;
    } else {
      ratio = (e.clientX - rect.left) / rect.width;
    }
    return this._snapToStep(this.nMin() + Math.max(0, Math.min(1, ratio)) * (this.nMax() - this.nMin()));
  }

  private _updateThumb(index: 0 | 1, raw: number): void {
    const [v0, v1] = this.thumbValues();
    if (this.nRange()) {
      if (index === 0) {
        this.nValue.set([Math.max(this.nMin(), Math.min(raw, v1)), v1]);
      } else {
        this.nValue.set([v0, Math.min(this.nMax(), Math.max(raw, v0))]);
      }
    } else {
      this.nValue.set(Math.max(this.nMin(), Math.min(raw, this.nMax())));
    }
  }

  private _emit(): void {
    const v = this.nValue();
    this.nChange.emit(v);
    this._form.notifyChange(v);
  }

  // ── Track click ──────────────────────────────────────────────────────────────

  protected onTrackPointerDown(e: PointerEvent): void {
    if (this.isDisabled()) return;
    const slot = (e.target as HTMLElement).dataset['slot'] ?? '';
    if (slot.startsWith('thumb')) return;

    this._cachedRect = this._trackRef()?.nativeElement.getBoundingClientRect() ?? null;
    const newValue = this._pointerToValue(e);
    if (newValue === null) return;

    if (this.nRange()) {
      const [v0, v1] = this.thumbValues();
      const index = Math.abs(newValue - v0) <= Math.abs(newValue - v1) ? 0 : 1;
      this._updateThumb(index, newValue);
    } else {
      this._updateThumb(0, newValue);
    }

    this._cachedRect = null;
    this._form.notifyTouched();
    this._emit();
  }

  // ── Thumb drag ───────────────────────────────────────────────────────────────

  protected onThumbDown(e: PointerEvent, thumbIndex: 0 | 1): void {
    if (this.isDisabled()) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this._cachedRect = this._trackRef()?.nativeElement.getBoundingClientRect() ?? null;
    this.isDragging.set(true);
    this.activeThumb.set(thumbIndex);
  }

  protected onThumbMove(e: PointerEvent, thumbIndex: 0 | 1): void {
    if (!this.isDragging() || this.activeThumb() !== thumbIndex) return;
    const newValue = this._pointerToValue(e);
    if (newValue === null) return;
    this._updateThumb(thumbIndex, newValue);
  }

  protected onThumbUp(_e: PointerEvent): void {
    if (!this.isDragging()) return;
    this.isDragging.set(false);
    this._cachedRect = null;
    this._form.notifyTouched();
    this._emit();
  }

  protected onThumbFocus(thumbIndex: 0 | 1): void {
    this.focusedThumb.set(thumbIndex);
  }

  protected onThumbBlur(): void {
    this.focusedThumb.set(null);
  }

  /** Tooltip is visible while dragging or when the thumb has keyboard focus. */
  protected isThumbVisible(thumbIndex: 0 | 1): boolean {
    return (this.isDragging() && this.activeThumb() === thumbIndex) || this.focusedThumb() === thumbIndex;
  }

  // ── Keyboard ─────────────────────────────────────────────────────────────────

  protected onThumbKey(e: KeyboardEvent, thumbIndex: 0 | 1): void {
    if (this.isDisabled()) return;
    const step = this.nStep();
    const bigStep = step * 10;
    const current = this.thumbValues()[thumbIndex];
    let next: number;

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = current + step;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = current - step;
    else if (e.key === 'PageUp') next = current + bigStep;
    else if (e.key === 'PageDown') next = current - bigStep;
    else if (e.key === 'Home') next = this.nMin();
    else if (e.key === 'End') next = this.nMax();
    else return;

    e.preventDefault();
    this._updateThumb(thumbIndex, next);
    this._form.notifyTouched();
    this._emit();
  }

  // ── Side inputs ───────────────────────────────────────────────────────────────

  protected onInputFilter(e: Event): void {
    const el = e.target as HTMLInputElement;
    el.value = el.value.replace(/[^0-9.-]/g, '');
  }

  protected onInputCommit(e: Event, index: 0 | 1): void {
    const raw = parseFloat((e.target as HTMLInputElement).value);
    if (!isNaN(raw)) {
      this._updateThumb(index, raw);
      this._form.notifyTouched();
      this._emit();
    }
  }

  protected onInputStartBlur(e: FocusEvent): void {
    this.onInputCommit(e, 0);
  }

  protected onInputEndBlur(e: FocusEvent): void {
    this.onInputCommit(e, 1);
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────────

  writeValue(v: number | [number, number] | null | undefined): void {
    if (v === null || v === undefined) {
      this.nValue.set(this.nRange() ? [this.nMin(), this.nMax()] : this.nMin());
    } else {
      this.nValue.set(v);
    }
  }

  registerOnChange(fn: (v: number | [number, number]) => void): void {
    this._form.setOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }

  setDisabledState(disabled: boolean): void {
    this._form.setDisabledByForm(disabled);
  }
}
