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
import { checkboxVariants, type CheckboxVariants } from './checkbox.variants';

let _checkboxIdCounter = 0;

@Component({
  selector: 'n-checkbox',
  standalone: true,
  template: `
    <div [class]="wrapperClasses()" data-slot="root">
      <div class="flex items-center gap-2" data-slot="control-wrapper">
        <div class="relative inline-flex items-center justify-center">
          <input
            type="checkbox"
            [id]="checkboxId()"
            [checked]="nChecked()"
            [indeterminate]="nIndeterminate()"
            [disabled]="isDisabled()"
            [required]="nRequired()"
            [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
            [attr.aria-describedby]="describedBy()"
            [attr.aria-invalid]="hasError() ? true : null"
            [attr.aria-required]="nRequired() ? true : null"
            data-slot="control"
            [class]="checkboxClasses()"
            (change)="handleChange($event)"
            (blur)="handleBlur($event)"
          />
          @if (nIndeterminate()) {
            <svg
              class="pointer-events-none absolute text-primary-foreground"
              [class]="iconSizeClasses()"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          } @else if (nChecked()) {
            <svg
              class="pointer-events-none absolute text-primary-foreground"
              [class]="iconSizeClasses()"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        </div>

        @if (nLabel()) {
          <label [for]="checkboxId()" [class]="labelClasses()" data-slot="label">
            {{ nLabel() }}
            @if (nRequired()) {
              <span class="ml-0.5 text-destructive" aria-hidden="true">*</span>
            }
          </label>
        }
      </div>

      @if (hasError()) {
        <p [id]="errorId()" class="mt-1 text-xs text-destructive" role="alert" data-slot="error">
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
export class CheckboxComponent implements ControlValueAccessor {
  readonly nChecked       = model<boolean>(false);
  readonly nIndeterminate = input<boolean>(false);
  readonly nSize          = input<CheckboxVariants['nSize']>('default');
  readonly nLabel         = input<string>('');
  readonly nDisabled      = input<boolean>(false);
  readonly nRequired      = input<boolean>(false);
  readonly nError         = input<string | null>(null);
  readonly nHint          = input<string | null>(null);
  readonly nClass         = input<string>('');
  readonly nId            = input<string>('');
  readonly nAriaLabel     = input<string>('');

  readonly nChange = output<boolean>();
  readonly nBlur   = output<FocusEvent>();

  private readonly _form     = injectFormControl<boolean>(this);
  private readonly _staticId = `n-checkbox-${++_checkboxIdCounter}`;

  protected readonly isDisabled  = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError    = computed(() => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()));
  protected readonly checkboxId  = computed(() => this.nId() || this._staticId);
  protected readonly errorId     = computed(() => `${this.checkboxId()}-error`);
  protected readonly hintId      = computed(() => `${this.checkboxId()}-hint`);

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint()) return this.hintId();
    return null;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col', this.nClass()),
  );

  protected readonly labelClasses = computed(() =>
    mergeClasses(
      'text-sm font-medium leading-none cursor-pointer select-none',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
    ),
  );

  protected readonly checkboxClasses = computed(() =>
    mergeClasses(checkboxVariants({ nSize: this.nSize() })),
  );

  protected readonly iconSizeClasses = computed(() => {
    const size = this.nSize();
    if (size === 'sm') return 'h-2.5 w-2.5';
    if (size === 'lg') return 'h-3.5 w-3.5';
    return 'h-3 w-3';
  });

  protected handleChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.nChecked.set(checked);
    this._form.notifyChange(checked);
    this.nChange.emit(checked);
  }

  protected handleBlur(event: FocusEvent): void {
    this._form.notifyTouched();
    this.nBlur.emit(event);
  }

  writeValue(value: boolean | null | undefined): void {
    this.nChecked.set(value ?? false);
  }

  registerOnChange(fn: (v: boolean) => void): void {
    this._form.setOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._form.setDisabledByForm(isDisabled);
  }
}
