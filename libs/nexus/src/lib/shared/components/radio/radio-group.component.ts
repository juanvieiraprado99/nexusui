import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import {
  RADIO_GROUP_CTX,
  type RadioColor,
  type RadioGroupContext,
  type RadioItemRef,
  type RadioSize,
  type RadioVariant,
} from './radio.tokens';

let _radioGroupIdCounter = 0;

@Component({
  selector: 'n-radio-group',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div [class]="wrapperClasses()" data-slot="root">
      @if (nLabel()) {
        <span [id]="labelId()" [class]="labelClasses()" data-slot="label">
          {{ nLabel() }}
          @if (nRequired()) {
            <span class="ml-0.5 text-destructive" aria-hidden="true">*</span>
          }
        </span>
      }

      <div
        role="radiogroup"
        [attr.aria-labelledby]="nLabel() ? labelId() : null"
        [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-required]="nRequired() ? true : null"
        [attr.aria-invalid]="hasError() ? true : null"
        [attr.aria-busy]="nLoading() ? true : null"
        [attr.aria-disabled]="isDisabled() ? true : null"
        [class]="controlWrapperClasses()"
        data-slot="control-wrapper"
      >
        @if (nLoading()) {
          @for (i of skeletonRows(); track i) {
            <n-skeleton class="h-5 w-40" />
          }
        } @else {
          <ng-content />
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
  providers: [
    {
      provide: RADIO_GROUP_CTX,
      useFactory: (group: RadioGroupComponent) => group.ctx,
      deps: [forwardRef(() => RadioGroupComponent)],
    },
  ],
})
export class RadioGroupComponent<T = string> implements ControlValueAccessor {
  readonly nValue       = model<T | null>(null);
  readonly nName        = input<string>('');
  readonly nLabel       = input<string>('');
  readonly nDisabled    = input<boolean>(false);
  readonly nRequired    = input<boolean>(false);
  readonly nLoading     = input<boolean>(false);
  readonly nError       = input<string | null>(null);
  readonly nHint        = input<string | null>(null);
  readonly nClass       = input<string>('');
  readonly nAriaLabel   = input<string>('');
  readonly nId          = input<string>('');
  readonly nOrientation = input<'vertical' | 'horizontal'>('vertical');
  readonly nSize        = input<RadioSize>('default');
  readonly nVariant     = input<RadioVariant>('default');
  readonly nColor       = input<RadioColor>('default');
  readonly nSkeletonRows = input<number>(3);

  readonly nChange = output<T | null>();

  private readonly _form     = injectFormControl<T | null>(this);
  private readonly _staticId = `n-radio-group-${++_radioGroupIdCounter}`;
  private readonly _items    = new Set<RadioItemRef>();
  private readonly _orderedItems = signal<RadioItemRef[]>([]);

  protected readonly isDisabled = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError   = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()),
  );

  protected readonly groupId  = computed(() => this.nId() || this._staticId);
  protected readonly labelId  = computed(() => `${this.groupId()}-label`);
  protected readonly errorId  = computed(() => `${this.groupId()}-error`);
  protected readonly hintId   = computed(() => `${this.groupId()}-hint`);
  protected readonly resolvedName = computed(() => this.nName() || this.groupId());

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint()) return this.hintId();
    return null;
  });

  protected readonly skeletonRows = computed(() =>
    Array.from({ length: Math.max(1, this.nSkeletonRows()) }, (_, i) => i),
  );

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col', this.nClass()),
  );

  protected readonly labelClasses = computed(() =>
    mergeClasses(
      'block text-sm font-medium leading-none mb-2',
      this.isDisabled() && 'opacity-50',
    ),
  );

  protected readonly controlWrapperClasses = computed(() =>
    mergeClasses(
      'flex',
      this.nOrientation() === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col gap-2',
      this.nLoading() && 'pointer-events-none',
    ),
  );

  readonly ctx: RadioGroupContext = {
    name:     computed(() => this.resolvedName()),
    value:    computed<unknown>(() => this.nValue()),
    disabled: computed(() => this.isDisabled()),
    required: computed(() => this.nRequired()),
    hasError: computed(() => this.hasError()),
    size:     computed(() => this.nSize()),
    variant:  computed(() => this.nVariant()),
    color:    computed(() => this.nColor()),
    loading:  computed(() => this.nLoading()),
    select:   (v) => this.handleSelect(v as T),
    notifyTouched: () => this._form.notifyTouched(),
    register:   (item) => this.registerItem(item),
    unregister: (item) => this.unregisterItem(item),
    focusNext:  (current) => this.moveFocus(current, 1),
    focusPrev:  (current) => this.moveFocus(current, -1),
    isFirstEnabled: (item) => {
      const enabled = this._orderedItems().filter((i) => !i.disabled());
      return enabled[0] === item;
    },
  };

  private registerItem(item: RadioItemRef): void {
    this._items.add(item);
    this._orderedItems.set(Array.from(this._items));
  }

  private unregisterItem(item: RadioItemRef): void {
    this._items.delete(item);
    this._orderedItems.set(Array.from(this._items));
  }

  private moveFocus(current: RadioItemRef, dir: 1 | -1): void {
    const items = this._orderedItems().filter((i) => !i.disabled());
    if (items.length === 0) return;
    const idx = items.indexOf(current);
    if (idx < 0) {
      items[0].focus();
      return;
    }
    const next = items[(idx + dir + items.length) % items.length];
    next.focus();
    this.handleSelect(next.value() as T);
  }

  private handleSelect(value: T): void {
    this.nValue.set(value);
    this._form.notifyChange(value);
    this.nChange.emit(value);
  }

  writeValue(value: T | null | undefined): void {
    this.nValue.set(value ?? null);
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
