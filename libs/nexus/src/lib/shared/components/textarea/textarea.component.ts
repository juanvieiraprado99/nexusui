import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { LabelComponent } from '../label';
import { textareaVariants, type TextareaVariants } from './textarea.variants';

let _textareaIdCounter = 0;

@Component({
  selector: 'n-textarea',
  standalone: true,
  imports: [LabelComponent],
  template: `
    <div [class]="wrapperClasses()" data-slot="root">

      @if (nLabel()) {
        <n-label [nFor]="textareaId()" [nRequired]="nRequired()" [nDisabled]="isDisabled()">
          {{ nLabel() }}
        </n-label>
      }

      <div class="relative" data-slot="control-wrapper">
        <textarea
          #control
          [id]="textareaId()"
          [placeholder]="nPlaceholder()"
          [disabled]="isDisabled()"
          [readonly]="nReadonly()"
          [required]="nRequired()"
          [rows]="nAutoResize() ? nMinRows() : nRows()"
          [attr.maxlength]="nMaxLength() > 0 ? nMaxLength() : null"
          [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-invalid]="hasError() ? true : null"
          [attr.aria-readonly]="nReadonly() ? true : null"
          [attr.aria-required]="nRequired() ? true : null"
          data-slot="control"
          [class]="textareaClasses()"
          [value]="nValue()"
          (input)="handleInput($event)"
          (blur)="handleBlur($event)"
        ></textarea>
      </div>

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

      @if (nCharCount()) {
        <span
          class="mt-1 block text-right text-xs text-muted-foreground tabular-nums"
          [class.text-destructive]="nMaxLength() > 0 && nValue().length >= nMaxLength()"
          data-slot="char-count"
          aria-hidden="true"
        >{{ nMaxLength() > 0 ? nValue().length + ' / ' + nMaxLength() : nValue().length }}</span>
      }

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class TextareaComponent implements ControlValueAccessor {
  readonly nSize        = input<TextareaVariants['nSize']>('default');
  readonly nResize      = input<TextareaVariants['nResize']>('vertical');
  readonly nLabel       = input<string>('');
  readonly nPlaceholder = input<string>('');
  readonly nDisabled    = input<boolean>(false);
  readonly nReadonly    = input<boolean>(false);
  readonly nRequired    = input<boolean>(false);
  readonly nError       = input<string | null>(null);
  readonly nHint        = input<string | null>(null);
  readonly nClass       = input<string>('');
  readonly nAriaLabel   = input<string>('');
  readonly nId          = input<string>('');
  readonly nRows        = input<number>(3);
  readonly nAutoResize  = input<boolean>(false);
  readonly nMinRows     = input<number>(3);
  readonly nMaxRows     = input<number>(0);
  readonly nMaxLength   = input<number>(0);
  readonly nCharCount   = input<boolean>(false);

  readonly nValue  = model<string>('');
  readonly nBlur   = output<FocusEvent>();
  readonly nChange = output<string>();

  private readonly _form       = injectFormControl<string>(this);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _staticId   = `n-textarea-${++_textareaIdCounter}`;
  private readonly _control    = viewChild<ElementRef<HTMLTextAreaElement>>('control');

  constructor() {
    afterNextRender(() => this._maybeAutoResize());
    effect(() => {
      this.nValue();
      this._maybeAutoResize();
    });
  }

  protected readonly isDisabled  = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError    = computed(() => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()));
  protected readonly textareaId  = computed(() => this.nId() || this._staticId);
  protected readonly errorId     = computed(() => `${this.textareaId()}-error`);
  protected readonly hintId      = computed(() => `${this.textareaId()}-hint`);

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())   return this.hintId();
    return null;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col', this.nClass()),
  );

  protected readonly textareaClasses = computed(() =>
    mergeClasses(
      textareaVariants({
        nSize:   this.nSize(),
        nResize: this.nAutoResize() ? 'none' : this.nResize(),
      }),
    ),
  );

  protected handleInput(event: Event): void {
    const el = event.target as HTMLTextAreaElement;
    const value = el.value;
    this.nValue.set(value);
    this._form.notifyChange(value);
    this.nChange.emit(value);

    if (this.nAutoResize()) {
      this._adjustHeight(el);
    }
  }

  protected handleBlur(event: FocusEvent): void {
    this._form.notifyTouched();
    this.nBlur.emit(event);
  }

  private _maybeAutoResize(): void {
    if (!this.nAutoResize()) return;
    const el = this._control()?.nativeElement;
    if (el) this._adjustHeight(el);
  }

  private _adjustHeight(el: HTMLTextAreaElement): void {
    if (!isPlatformBrowser(this._platformId)) return;
    el.style.height = 'auto';
    const style      = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || 20;
    const paddingY   = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const minH       = this.nMinRows() * lineHeight + paddingY;
    const maxRows    = this.nMaxRows();
    const maxH       = maxRows > 0 ? maxRows * lineHeight + paddingY : Infinity;
    const targetH    = Math.min(Math.max(el.scrollHeight, minH), maxH);
    el.style.height    = `${targetH}px`;
    el.style.overflowY = maxRows > 0 && el.scrollHeight > maxH ? 'auto' : 'hidden';
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
