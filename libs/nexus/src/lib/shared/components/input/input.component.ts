import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { inputVariants, type InputVariants } from './input.variants';

let _inputIdCounter = 0;

@Component({
  selector: 'n-input',
  standalone: true,
  template: `
    <div [class]="wrapperClasses()" data-slot="root">

      @if (nLabel()) {
        <label [for]="inputId()" [class]="labelClasses()" data-slot="label">
          {{ nLabel() }}
          @if (nRequired()) {
            <span class="ml-0.5 text-destructive" aria-hidden="true">*</span>
          }
        </label>
      }

      <div class="relative flex items-center" data-slot="control-wrapper">
        <input
          [id]="inputId()"
          [type]="nType()"
          [placeholder]="nPlaceholder()"
          [disabled]="isDisabled()"
          [required]="nRequired()"
          [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-invalid]="hasError() ? true : null"
          [attr.aria-required]="nRequired() ? true : null"
          [attr.aria-busy]="nLoading() ? true : null"
          data-slot="control"
          [class]="inputClasses()"
          [value]="nValue()"
          (input)="handleInput($event)"
          (blur)="handleBlur($event)"
        />

        @if (nLoading()) {
          <div class="pointer-events-none absolute right-3 flex items-center" aria-hidden="true">
            <svg
              class="animate-spin h-4 w-4 shrink-0 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        }
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

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class InputComponent implements ControlValueAccessor {
  readonly nSize        = input<InputVariants['nSize']>('default');
  readonly nType        = input<'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'>('text');
  readonly nLabel       = input<string>('');
  readonly nPlaceholder = input<string>('');
  readonly nDisabled    = input<boolean>(false);
  readonly nLoading     = input<boolean>(false);
  readonly nRequired    = input<boolean>(false);
  readonly nError       = input<string | null>(null);
  readonly nHint        = input<string | null>(null);
  readonly nClass       = input<string>('');
  readonly nAriaLabel   = input<string>('');
  readonly nId          = input<string>('');

  readonly nValue = model<string>('');

  readonly nBlur   = output<FocusEvent>();
  readonly nChange = output<string>();

  private readonly _form     = injectFormControl<string>(this);
  private readonly _staticId = `n-input-${++_inputIdCounter}`;

  protected readonly isDisabled  = computed(() => this.nDisabled() || this.nLoading() || this._form.disabledByForm());
  protected readonly hasError    = computed(() => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()));
  protected readonly inputId     = computed(() => this.nId() || this._staticId);
  protected readonly errorId     = computed(() => `${this.inputId()}-error`);
  protected readonly hintId      = computed(() => `${this.inputId()}-hint`);

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint()) return this.hintId();
    return null;
  });

  protected readonly labelClasses = computed(() =>
    mergeClasses(
      'block text-sm font-medium leading-none mb-1.5',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
    ),
  );

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col', this.nClass()),
  );

  protected readonly inputClasses = computed(() =>
    mergeClasses(
      inputVariants({ nSize: this.nSize() }),
      this.nLoading() && 'pr-9',
    ),
  );

  protected handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.nValue.set(value);
    this._form.notifyChange(value);
    this.nChange.emit(value);
  }

  protected handleBlur(event: FocusEvent): void {
    this._form.notifyTouched();
    this.nBlur.emit(event);
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
