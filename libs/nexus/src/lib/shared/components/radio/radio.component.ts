import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Signal,
  computed,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import {
  RADIO_GROUP_CTX,
  type RadioColor,
  type RadioGroupContext,
  type RadioItemRef,
  type RadioSize,
  type RadioVariant,
} from './radio.tokens';
import {
  radioCardVariants,
  radioIndicatorVariants,
  radioVariants,
} from './radio.variants';

let _radioIdCounter = 0;

@Component({
  selector: 'n-radio',
  standalone: true,
  template: `
    <label [class]="rootClasses()" data-slot="root" [for]="radioId()">
      <span [class]="wrapperClasses()" data-slot="control-wrapper">
        <input
          #control
          type="radio"
          [id]="radioId()"
          [name]="resolvedName()"
          [value]="stringValue()"
          [checked]="isChecked()"
          [disabled]="isDisabled()"
          [required]="isRequired()"
          [attr.tabindex]="tabIndex()"
          [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-invalid]="hasError() ? true : null"
          [attr.aria-required]="isRequired() ? true : null"
          data-slot="control"
          [class]="controlClasses()"
          (change)="handleChange()"
          (focus)="handleFocus()"
          (blur)="handleBlur($event)"
          (keydown)="handleKeydown($event)"
        />
        @if (isChecked()) {
          <span data-slot="indicator" [class]="indicatorClasses()" aria-hidden="true"></span>
        }
      </span>

      <span class="flex flex-col gap-0.5">
        @if (nLabel()) {
          <span [class]="labelClasses()" data-slot="label">
            {{ nLabel() }}
            @if (isRequired() && !inGroup()) {
              <span class="ml-0.5 text-destructive" aria-hidden="true">*</span>
            }
          </span>
        }
        <span data-slot="description" [class]="descriptionClasses()">
          @if (nDescription()) {
            {{ nDescription() }}
          }
          <ng-content select="[slot=description]" />
        </span>
      </span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class RadioComponent<T = string> implements ControlValueAccessor, RadioItemRef {
  readonly nValue       = input.required<T>();
  readonly nLabel       = input<string>('');
  readonly nDescription = input<string>('');
  readonly nDisabled    = input<boolean>(false);
  readonly nRequired    = input<boolean>(false);
  readonly nClass       = input<string>('');
  readonly nAriaLabel   = input<string>('');
  readonly nId          = input<string>('');
  readonly nName        = input<string>('');
  readonly nSize        = input<RadioSize | null>(null);
  readonly nVariant     = input<RadioVariant | null>(null);
  readonly nColor       = input<RadioColor | null>(null);
  readonly nChecked     = model<boolean>(false);

  readonly nChange = output<T>();
  readonly nBlur   = output<FocusEvent>();
  readonly nFocus  = output<FocusEvent>();

  private readonly _group: RadioGroupContext | null = inject(RADIO_GROUP_CTX, { optional: true });
  private readonly _form     = injectFormControl<T | null>(this);
  private readonly _staticId = `n-radio-${++_radioIdCounter}`;
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _hostEl   = inject(ElementRef<HTMLElement>);
  private readonly _controlRef = viewChild<ElementRef<HTMLInputElement>>('control');

  protected readonly inGroup = computed(() => this._group !== null);

  protected readonly resolvedSize: Signal<RadioSize> = computed(
    () => this.nSize() ?? this._group?.size() ?? 'default',
  );
  protected readonly resolvedVariant: Signal<RadioVariant> = computed(
    () => this.nVariant() ?? this._group?.variant() ?? 'default',
  );
  protected readonly resolvedColor: Signal<RadioColor> = computed(
    () => this.nColor() ?? this._group?.color() ?? 'default',
  );

  protected readonly isDisabled = computed(
    () => this.nDisabled() || (this._group?.disabled() ?? false) || (this._group?.loading() ?? false) || this._form.disabledByForm(),
  );
  protected readonly isRequired = computed(
    () => this.nRequired() || (this._group?.required() ?? false),
  );
  protected readonly hasError = computed(
    () => (this._group?.hasError() ?? false) || (this._form.controlInvalid() && this._form.controlTouched()),
  );

  protected readonly isChecked = computed(() => {
    if (this._group) {
      return this._group.value() === this.nValue();
    }
    return this.nChecked();
  });

  protected readonly radioId = computed(() => this.nId() || this._staticId);
  protected readonly errorId = computed(() => `${this.radioId()}-error`);
  protected readonly hintId  = computed(() => `${this.radioId()}-hint`);

  protected readonly resolvedName = computed(
    () => this.nName() || this._group?.name() || `n-radio-name-${this._staticId}`,
  );

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    return null;
  });

  protected readonly tabIndex = computed(() => {
    if (this.isDisabled()) return -1;
    if (!this._group) return 0;
    if (this.isChecked()) return 0;
    const anyChecked = this._group.value() !== null && this._group.value() !== undefined;
    if (!anyChecked && this._group.isFirstEnabled(this)) return 0;
    return -1;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses(
      'relative inline-flex items-center justify-center',
      this.resolvedVariant() === 'card' && 'absolute right-3 top-1/2 -translate-y-1/2',
    ),
  );

  protected readonly controlClasses = computed(() =>
    radioVariants({ nSize: this.resolvedSize(), nColor: this.resolvedColor() }),
  );

  protected readonly indicatorClasses = computed(() =>
    radioIndicatorVariants({ nSize: this.resolvedSize(), nColor: this.resolvedColor() }),
  );

  protected readonly rootClasses = computed(() => {
    if (this.resolvedVariant() === 'card') {
      return mergeClasses(
        radioCardVariants({ nColor: this.resolvedColor() }),
        'relative pr-12',
        this.nClass(),
      );
    }
    return mergeClasses(
      'inline-flex items-start gap-2 cursor-pointer select-none',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
      this.nClass(),
    );
  });

  protected readonly labelClasses = computed(() =>
    mergeClasses('text-sm font-medium leading-none cursor-pointer'),
  );

  protected readonly descriptionClasses = computed(() =>
    mergeClasses('text-xs text-muted-foreground'),
  );

  protected readonly stringValue = computed(() => {
    const v = this.nValue();
    return typeof v === 'string' ? v : JSON.stringify(v);
  });

  constructor() {
    this._group?.register(this);
    this._destroyRef.onDestroy(() => this._group?.unregister(this));
  }

  value(): unknown {
    return this.nValue();
  }

  disabled(): boolean {
    return this.isDisabled();
  }

  focus(): void {
    const el = this._controlRef()?.nativeElement ?? this._hostEl.nativeElement.querySelector('input');
    (el as HTMLInputElement | null)?.focus();
  }

  protected handleChange(): void {
    if (this._group) {
      this._group.select(this.nValue());
    } else {
      this.nChecked.set(true);
      this._form.notifyChange(this.nValue());
    }
    this.nChange.emit(this.nValue());
  }

  protected handleFocus(): void {
    this.nFocus.emit(new FocusEvent('focus'));
  }

  protected handleBlur(event: FocusEvent): void {
    if (this._group) {
      this._group.notifyTouched();
    } else {
      this._form.notifyTouched();
    }
    this.nBlur.emit(event);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (!this._group) return;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this._group.focusNext(this);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this._group.focusPrev(this);
        break;
    }
  }

  writeValue(value: T | null | undefined): void {
    if (this._group) return;
    this.nChecked.set(value === this.nValue());
  }

  registerOnChange(fn: (v: T | null) => void): void {
    this._form.setOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._form.setDisabledByForm(isDisabled);
  }
}
