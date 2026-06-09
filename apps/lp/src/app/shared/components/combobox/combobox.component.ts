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
import { injectFormControl } from '@/shared/utils/form-control';
import { LabelComponent } from '@/shared/components/label';
import { COMBOBOX_CONTEXT, type ComboboxContext } from './combobox.tokens';

let _comboboxIdCounter = 0;

@Component({
  selector: 'n-combobox',
  standalone: true,
  imports: [LabelComponent],
  template: `
    <div class="flex flex-col" data-slot="root">

      @if (nLabel()) {
        <n-label [nId]="labelId()" [nRequired]="nRequired()" [nDisabled]="_isDisabled()">
          {{ nLabel() }}
        </n-label>
      }

      <ng-content />

      @if (nError() && hasError()) {
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
        <p
          [id]="hintId()"
          class="mt-1 text-xs text-muted-foreground"
          data-slot="hint"
        >
          {{ nHint() }}
        </p>
      }

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'root' },
  providers: [
    {
      provide: COMBOBOX_CONTEXT,
      useFactory: (cmp: ComboboxComponent) => cmp.context,
      deps: [forwardRef(() => ComboboxComponent)],
    },
  ],
})
export class ComboboxComponent implements ControlValueAccessor {
  readonly nValue    = model<string>('');
  readonly nValues   = model<string[]>([]);
  readonly nMultiple = input<boolean>(false);
  readonly nDisabled = input<boolean>(false);
  readonly nLoading  = input<boolean>(false);
  readonly nClearable = input<boolean>(false);
  readonly nId       = input<string>('');

  readonly nLabel     = input<string>('');
  readonly nError     = input<string | null>(null);
  readonly nHint      = input<string | null>(null);
  readonly nRequired  = input<boolean>(false);
  readonly nAriaLabel = input<string>('');

  readonly nFilterChange = output<string>();

  private readonly _staticId   = `n-combobox-${++_comboboxIdCounter}`;
  private readonly _form       = injectFormControl<string | string[]>(this);
  private readonly _open       = signal(false);
  private readonly _query      = signal('');
  private readonly _activeId   = signal<string | null>(null);
  private readonly _triggerEl  = signal<HTMLElement | null>(null);
  // value -> label map populated by items, used to display the selected label
  // even when the value is set programmatically (form patch / reload).
  private readonly _labelMap = new Map<string, string>();
  private readonly _labelVersion = signal(0);
  // Set of item visibility predicates. A Set gives O(1) register/unregister
  // (the previous array spread was O(n²) on init); a version signal triggers
  // recomputation of visibleCount when the set membership changes.
  private readonly _visibilityFns = new Set<() => boolean>();
  private readonly _visVersion = signal(0);
  protected readonly _isDisabled = computed(() => this.nDisabled() || this._form.disabledByForm());
  private readonly _selectedLabel = computed(() => {
    this._labelVersion();
    return this._labelMap.get(this.nValue()) ?? '';
  });
  private readonly _visibleCount = computed(() => {
    this._visVersion();
    let n = 0;
    this._visibilityFns.forEach(fn => { if (fn()) n++; });
    return n;
  });
  private _navigateHandler: ((direction: 1 | -1) => void) | null = null;
  private _activeHandler: ((value: string | null) => void) | null = null;

  protected readonly comboboxId = computed(() => this.nId() || this._staticId);
  protected readonly labelId    = computed(() => `${this.comboboxId()}-label`);
  protected readonly errorId    = computed(() => `${this.comboboxId()}-error`);
  protected readonly hintId     = computed(() => `${this.comboboxId()}-hint`);

  protected readonly hasError = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()),
  );
  protected readonly isRequired  = computed(() => this.nRequired());
  protected readonly describedBy = computed<string | null>(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())   return this.hintId();
    return null;
  });
  readonly context: ComboboxContext = {
    open: this._open,
    query: this._query.asReadonly(),
    multiple: this.nMultiple,
    disabled: this._isDisabled,
    loading: this.nLoading,
    clearable: this.nClearable,
    visibleCount: this._visibleCount,
    activeId: this._activeId.asReadonly(),
    value: this.nValue,
    values: this.nValues,
    selectedLabel: this._selectedLabel,
    triggerEl: this._triggerEl.asReadonly(),
    hasError:    this.hasError,
    required:    this.isRequired,
    describedBy: this.describedBy,
    labelId:     this.labelId,
    ariaLabel:   this.nAriaLabel,
    get triggerId() {
      return '';
    },
    get contentId() {
      return '';
    },
    openPanel: () => {
      // Reset the query on open (not on close) so the filtered list does not
      // reflow underneath the exit animation.
      this._query.set('');
      this._activeId.set(null);
      this._open.set(true);
    },
    closePanel: (returnFocus = true) => {
      this._open.set(false);
      this._form.notifyTouched();
      if (returnFocus) this._triggerEl()?.focus();
    },
    togglePanel: () => {
      if (this._open()) this.context.closePanel(false);
      else this.context.openPanel();
    },
    selectItem: (value, label) => {
      this._labelMap.set(value, label);
      this._labelVersion.update(v => v + 1);
      if (this.nMultiple()) {
        const current = this.nValues();
        const next = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
        this.nValues.set(next);
        this._form.notifyChange(next);
      } else {
        this.nValue.set(value);
        this._form.notifyChange(value);
        this.context.closePanel(true);
      }
    },
    clearSelection: () => {
      if (this.nMultiple()) {
        this.nValues.set([]);
        this._form.notifyChange([]);
      } else {
        this.nValue.set('');
        this._form.notifyChange('');
      }
    },
    setQuery: (q) => {
      this._query.set(q);
      this.nFilterChange.emit(q);
    },
    setTriggerEl: (el) => this._triggerEl.set(el),
    isSelected: (value) =>
      this.nMultiple() ? this.nValues().includes(value) : this.nValue() === value,
    registerItemVisibility: (visible) => {
      this._visibilityFns.add(visible);
      this._visVersion.update(v => v + 1);
      return () => {
        this._visibilityFns.delete(visible);
        this._visVersion.update(v => v + 1);
      };
    },
    registerItemLabel: (value, label) => {
      // Labels are kept even after the item is destroyed (items only exist
      // while the overlay is attached) so the trigger keeps showing the
      // selected label after the panel closes. The map is bounded by the
      // number of distinct option values.
      this._labelMap.set(value, label);
      this._labelVersion.update(v => v + 1);
      return () => {};
    },
    navigateItems: (direction) => this._navigateHandler?.(direction),
    setNavigateHandler: (fn) => {
      this._navigateHandler = fn;
    },
    setActiveItem: (value) => this._activeHandler?.(value),
    setActiveHandler: (fn) => {
      this._activeHandler = fn;
    },
    setActiveId: (id) => this._activeId.set(id),
  };

  constructor() {
    Object.defineProperty(this.context, 'triggerId', { get: () => `${this.comboboxId()}-trigger` });
    Object.defineProperty(this.context, 'contentId', { get: () => `${this.comboboxId()}-content` });
  }

  writeValue(v: string | string[] | null | undefined): void {
    if (Array.isArray(v)) this.nValues.set(v);
    else this.nValue.set(v ?? '');
  }

  registerOnChange(fn: (v: string | string[]) => void): void {
    this._form.setOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._form.setDisabledByForm(isDisabled);
  }
}
