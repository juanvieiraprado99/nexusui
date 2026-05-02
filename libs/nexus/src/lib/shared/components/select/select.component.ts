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
import { LabelComponent } from '../label';
import { SELECT_CONTEXT, type SelectContext } from './select.tokens';

let _selectIdCounter = 0;

@Component({
  selector: 'n-select',
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
      provide: SELECT_CONTEXT,
      useFactory: (cmp: SelectComponent) => cmp.context,
      deps: [forwardRef(() => SelectComponent)],
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  readonly nValue            = model<string>('');
  readonly nValues           = model<string[]>([]);
  readonly nMultiple         = input<boolean>(false);
  readonly nDisabled         = input<boolean>(false);
  readonly nLoading          = input<boolean>(false);
  readonly nClearable        = input<boolean>(false);
  readonly nSelectAll        = input<boolean>(false);
  readonly nMaxSelections    = input<number | null>(null);
  readonly nMultiSummary     = input<'count' | 'list'>('count');
  readonly nMatchTriggerWidth = input<boolean>(true);
  readonly nId               = input<string>('');

  readonly nLabel     = input<string>('');
  readonly nError     = input<string | null>(null);
  readonly nHint      = input<string | null>(null);
  readonly nRequired  = input<boolean>(false);
  readonly nAriaLabel = input<string>('');

  readonly nOpenChange = output<boolean>();
  readonly nChange     = output<string | string[]>();

  private readonly _staticId   = `n-select-${++_selectIdCounter}`;
  private readonly _form       = injectFormControl<string | string[]>(this);
  private readonly _open       = signal(false);
  private readonly _triggerEl  = signal<HTMLElement | null>(null);
  private readonly _registry   = signal<Map<string, string>>(new Map());
  private readonly _typeAheadActive = signal<string | null>(null);
  private _typeAheadBuffer = '';
  private _typeAheadTimer: ReturnType<typeof setTimeout> | null = null;
  private _navigateHandler: ((direction: 1 | -1) => void) | null = null;
  private _typeAheadHandler: ((value: string) => void) | null = null;

  protected readonly _isDisabled = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly selectId = computed(() => this.nId() || this._staticId);
  protected readonly labelId  = computed(() => `${this.selectId()}-label`);
  protected readonly errorId  = computed(() => `${this.selectId()}-error`);
  protected readonly hintId   = computed(() => `${this.selectId()}-hint`);

  protected readonly hasError = computed(
    () => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()),
  );
  protected readonly isRequired  = computed(() => this.nRequired());
  protected readonly describedBy = computed<string | null>(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())   return this.hintId();
    return null;
  });

  private readonly _selectedLabel = computed(() => {
    const v = this.nValue();
    if (!v) return '';
    return this._registry().get(v) ?? v;
  });

  private readonly _selectedLabels = computed<Record<string, string>>(() => {
    const map = this._registry();
    const out: Record<string, string> = {};
    for (const v of this.nValues()) out[v] = map.get(v) ?? v;
    return out;
  });

  private readonly _registeredCount = computed(() => this._registry().size);

  readonly context: SelectContext = {
    open: this._open,
    multiple: this.nMultiple,
    disabled: this._isDisabled,
    loading: this.nLoading,
    clearable: this.nClearable,
    selectAll: this.nSelectAll,
    maxSelections: this.nMaxSelections,
    multiSummary: this.nMultiSummary,
    matchTriggerWidth: this.nMatchTriggerWidth,
    value: this.nValue,
    values: this.nValues,
    selectedLabel: this._selectedLabel,
    selectedLabels: this._selectedLabels,
    triggerEl: this._triggerEl.asReadonly(),
    hasError:    this.hasError,
    required:    this.isRequired,
    describedBy: this.describedBy,
    labelId:     this.labelId,
    ariaLabel:   this.nAriaLabel,
    typeAheadActive: this._typeAheadActive.asReadonly(),
    registeredCount: this._registeredCount,
    get triggerId() { return ''; },
    get contentId() { return ''; },
    openPanel: () => {
      if (this._isDisabled()) return;
      this._open.set(true);
      this.nOpenChange.emit(true);
    },
    closePanel: (returnFocus = true) => {
      if (!this._open()) return;
      this._open.set(false);
      this._clearTypeAhead();
      this.nOpenChange.emit(false);
      this._form.notifyTouched();
      if (returnFocus) this._triggerEl()?.focus();
    },
    togglePanel: () => {
      if (this._open()) this.context.closePanel(false);
      else this.context.openPanel();
    },
    selectItem: (value, label) => {
      if (this.nMultiple()) {
        const current = this.nValues();
        const isOn = current.includes(value);
        if (!isOn && !this.context.canSelectMore(value)) return;
        const next = isOn
          ? current.filter(v => v !== value)
          : [...current, value];
        this.nValues.set(next);
        this._form.notifyChange(next);
        this.nChange.emit(next);
      } else {
        this.nValue.set(value);
        this._registerLabel(value, label);
        this._form.notifyChange(value);
        this.nChange.emit(value);
        this.context.closePanel(true);
      }
    },
    clearSelection: () => {
      if (this.nMultiple()) {
        this.nValues.set([]);
        this._form.notifyChange([]);
        this.nChange.emit([]);
      } else {
        this.nValue.set('');
        this._form.notifyChange('');
        this.nChange.emit('');
      }
    },
    selectAllVisible: (values) => {
      if (!this.nMultiple()) return;
      const current = this.nValues();
      const allOn = values.every(v => current.includes(v));
      const next = allOn
        ? current.filter(v => !values.includes(v))
        : Array.from(new Set([...current, ...values]));
      const max = this.nMaxSelections();
      const capped = max != null ? next.slice(0, max) : next;
      this.nValues.set(capped);
      this._form.notifyChange(capped);
      this.nChange.emit(capped);
    },
    isSelected: (value) =>
      this.nMultiple() ? this.nValues().includes(value) : this.nValue() === value,
    canSelectMore: (value) => {
      if (!this.nMultiple()) return true;
      const max = this.nMaxSelections();
      if (max == null) return true;
      const current = this.nValues();
      if (current.includes(value)) return true;
      return current.length < max;
    },
    setTriggerEl: (el) => this._triggerEl.set(el),
    registerItem: (value, label) => {
      this._registry.update(map => {
        const next = new Map(map);
        next.set(value, label);
        return next;
      });
      return () => {
        this._registry.update(map => {
          const next = new Map(map);
          next.delete(value);
          return next;
        });
      };
    },
    navigateItems: (direction) => this._navigateHandler?.(direction),
    setNavigateHandler: (fn) => { this._navigateHandler = fn; },
    typeAhead: (char) => {
      if (!char || char.length !== 1) return;
      this._typeAheadBuffer += char.toLowerCase();
      this._typeAheadActive.set(this._typeAheadBuffer);
      if (this._typeAheadTimer) clearTimeout(this._typeAheadTimer);
      this._typeAheadTimer = setTimeout(() => this._clearTypeAhead(), 600);
      const buffer = this._typeAheadBuffer;
      const match = Array.from(this._registry().entries())
        .find(([, label]) => label.toLowerCase().startsWith(buffer));
      if (match) this._typeAheadHandler?.(match[0]);
    },
    setTypeAheadHandler: (fn) => { this._typeAheadHandler = fn; },
  };

  constructor() {
    Object.defineProperty(this.context, 'triggerId', { get: () => `${this.selectId()}-trigger` });
    Object.defineProperty(this.context, 'contentId', { get: () => `${this.selectId()}-content` });
  }

  private _registerLabel(value: string, label: string): void {
    if (!label) return;
    this._registry.update(map => {
      if (map.get(value) === label) return map;
      const next = new Map(map);
      next.set(value, label);
      return next;
    });
  }

  private _clearTypeAhead(): void {
    this._typeAheadBuffer = '';
    this._typeAheadActive.set(null);
    if (this._typeAheadTimer) {
      clearTimeout(this._typeAheadTimer);
      this._typeAheadTimer = null;
    }
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
