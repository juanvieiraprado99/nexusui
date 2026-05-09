import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { LabelComponent } from '../label';
import { inputOtpSlotVariants, type InputOtpVariants } from './input-otp.variants';

let _inputOtpIdCounter = 0;

const PATTERN_REGEX: Record<'numeric' | 'alpha' | 'alphanumeric', RegExp> = {
  numeric:      /^[0-9]$/,
  alpha:        /^[a-zA-Z]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
};

@Component({
  selector: 'n-input-otp',
  standalone: true,
  imports: [LabelComponent],
  template: `
    <div [class]="wrapperClasses()" data-slot="root">

      @if (nLabel()) {
        <n-label [nFor]="inputId()" [nRequired]="nRequired()" [nDisabled]="isDisabled()">
          {{ nLabel() }}
        </n-label>
      }

      <div
        class="flex flex-row items-center gap-2"
        data-slot="slots-wrapper"
        role="group"
        [attr.aria-label]="nLabel() ? null : (nAriaLabel() || 'One-time password')"
        [attr.aria-describedby]="describedBy()"
      >
        @for (i of slotIndices(); track i) {
          @if (nSeparatorIndex() !== null && nSeparatorIndex() === i && i > 0) {
            <span
              class="text-muted-foreground font-light mx-1 self-center select-none"
              data-slot="separator"
              aria-hidden="true"
            >
              &ndash;
            </span>
          }
          <input
            #slotInput
            data-slot="slot"
            [type]="nMask() ? 'password' : 'text'"
            [inputMode]="nPattern() === 'numeric' ? 'numeric' : 'text'"
            maxlength="1"
            autocomplete="one-time-code"
            [id]="i === 0 ? inputId() : null"
            [value]="slots()[i]"
            [disabled]="isDisabled()"
            [attr.aria-label]="'Digit ' + (i + 1) + ' of ' + nLength()"
            [attr.aria-invalid]="hasError() ? true : null"
            [attr.data-filled]="slots()[i] ? true : null"
            [attr.data-active]="activeIndex() === i ? true : null"
            [class]="slotClasses()"
            (keydown)="onKeyDown($event, i)"
            (input)="onInput($event, i)"
            (focus)="activeIndex.set(i)"
            (blur)="onBlur()"
            (paste)="onPaste($event, i)"
          />
        }
      </div>

      @if (hasError()) {
        <p
          [id]="errorId()"
          class="mt-1 text-xs text-destructive animate-error-in"
          role="alert"
          data-slot="error"
        >
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
export class InputOtpComponent implements ControlValueAccessor {
  readonly nValue          = model<string>('');
  readonly nLength         = input<number>(6);
  readonly nPattern        = input<'numeric' | 'alpha' | 'alphanumeric'>('numeric');
  readonly nMask           = input<boolean>(false);
  readonly nSize           = input<InputOtpVariants['nSize']>('default');
  readonly nDisabled       = input<boolean>(false);
  readonly nError          = input<string | null>(null);
  readonly nHint           = input<string | null>(null);
  readonly nLabel          = input<string>('');
  readonly nId             = input<string>('');
  readonly nClass          = input<string>('');
  readonly nSeparatorIndex = input<number | null>(null);
  readonly nAutofocus      = input<boolean>(false);
  readonly nRequired       = input<boolean>(false);
  readonly nAriaLabel      = input<string>('');

  readonly nComplete = output<string>();
  readonly nChange   = output<string>();

  private readonly _form     = injectFormControl<string>(this);
  private readonly _staticId = `n-input-otp-${++_inputOtpIdCounter}`;
  private readonly _slotRefs = viewChildren<ElementRef<HTMLInputElement>>('slotInput');

  protected readonly slots       = signal<string[]>([]);
  protected readonly activeIndex = signal<number>(-1);

  protected readonly isDisabled  = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError    = computed(() =>
    !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()));

  protected readonly inputId     = computed(() => this.nId() || this._staticId);
  protected readonly errorId     = computed(() => `${this.inputId()}-error`);
  protected readonly hintId      = computed(() => `${this.inputId()}-hint`);

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())    return this.hintId();
    return null;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col gap-1.5', this.nClass()));

  protected readonly slotClasses = computed(() =>
    inputOtpSlotVariants({ nSize: this.nSize() }));

  protected readonly slotIndices = computed(() =>
    Array.from({ length: this.nLength() }, (_, i) => i));

  constructor() {
    effect(() => {
      const value = this.nValue();
      const len   = this.nLength();
      const chars = value.split('').slice(0, len);
      this.slots.set(Array.from({ length: len }, (_, i) => chars[i] ?? ''));
    });

    effect(() => {
      if (this.nAutofocus()) queueMicrotask(() => this._focusSlot(0));
    });
  }

  private _focusSlot(index: number): void {
    const refs = this._slotRefs();
    refs[Math.max(0, Math.min(index, refs.length - 1))]?.nativeElement.focus();
  }

  private _syncValue(): void {
    const current = this.slots();
    const joined  = current.join('');
    this.nValue.set(joined);
    this._form.notifyChange(joined);
    this.nChange.emit(joined);
    if (current.every(s => s !== '')) this.nComplete.emit(joined);
  }

  protected onKeyDown(event: KeyboardEvent, index: number): void {
    if (this.isDisabled()) return;

    const { key } = event;

    if (key === 'Backspace') {
      event.preventDefault();
      if (this.slots()[index]) {
        this.slots.update(s => s.map((v, i) => i === index ? '' : v));
        this._syncValue();
      } else if (index > 0) {
        this.slots.update(s => s.map((v, i) => i === index - 1 ? '' : v));
        this._syncValue();
        this._focusSlot(index - 1);
      }
      return;
    }

    if (key === 'Delete') {
      event.preventDefault();
      this.slots.update(s => s.map((v, i) => i === index ? '' : v));
      this._syncValue();
      return;
    }

    if (key === 'ArrowLeft') {
      event.preventDefault();
      this._focusSlot(index - 1);
      return;
    }

    if (key === 'ArrowRight') {
      event.preventDefault();
      this._focusSlot(index + 1);
      return;
    }

    if (key === 'Home') {
      event.preventDefault();
      this._focusSlot(0);
      return;
    }

    if (key === 'End') {
      event.preventDefault();
      const current = this.slots();
      const lastFilled = current.reduceRight((acc, v, i) => acc === -1 && v ? i : acc, -1);
      this._focusSlot(lastFilled >= 0 ? lastFilled : 0);
      return;
    }
  }

  protected onInput(event: Event, index: number): void {
    if (this.isDisabled()) return;

    const el    = event.target as HTMLInputElement;
    const raw   = el.value;
    const regex = PATTERN_REGEX[this.nPattern()];
    const char  = raw.length > 1 ? raw[raw.length - 1] : raw;

    if (!char || !regex.test(char)) {
      el.value = this.slots()[index];
      return;
    }

    this.slots.update(s => s.map((v, i) => i === index ? char : v));
    el.value = char;
    this._syncValue();

    if (index < this.nLength() - 1) {
      this._focusSlot(index + 1);
    }
  }

  protected onPaste(event: ClipboardEvent, startIndex: number): void {
    if (this.isDisabled()) return;
    event.preventDefault();

    const pasted = event.clipboardData?.getData('text') ?? '';
    const regex  = PATTERN_REGEX[this.nPattern()];
    const valid  = pasted.split('').filter(c => regex.test(c));

    if (!valid.length) return;

    this.slots.update(s => {
      const next = [...s];
      valid.forEach((char, offset) => {
        const target = startIndex + offset;
        if (target < next.length) next[target] = char;
      });
      return next;
    });

    this._syncValue();
    this._focusSlot(Math.min(startIndex + valid.length, this.nLength() - 1));
  }

  protected onBlur(): void {
    this.activeIndex.set(-1);
    this._form.notifyTouched();
  }

  writeValue(value: string | null | undefined): void {
    this.nValue.set(value ?? '');
  }

  registerOnChange(fn: (v: string) => void): void {
    this._form.setOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._form.setDisabledByForm(isDisabled);
  }
}
