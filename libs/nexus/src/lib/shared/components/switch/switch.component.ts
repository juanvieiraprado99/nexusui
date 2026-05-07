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
import { LabelComponent } from '../label';
import { switchVariants, switchThumbVariants, type SwitchVariants } from './switch.variants';

let _switchIdCounter = 0;

@Component({
  selector: 'n-switch',
  standalone: true,
  imports: [LabelComponent],
  template: `
    <div [class]="wrapperClasses()" data-slot="root">
      <div class="flex items-center gap-3" data-slot="control-wrapper">
        <button
          type="button"
          role="switch"
          data-slot="control"
          [id]="switchId()"
          [class]="trackClasses()"
          [attr.aria-checked]="nChecked()"
          [attr.aria-required]="nRequired() ? true : null"
          [attr.aria-disabled]="isDisabled() ? true : null"
          [attr.aria-label]="nLabel() ? null : nAriaLabel() || null"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-busy]="nLoading() ? true : null"
          [attr.data-state]="nChecked() ? 'checked' : 'unchecked'"
          [disabled]="isDisabled() || nLoading()"
          (click)="toggle()"
          (blur)="handleBlur($event)"
        >
          @if (nShowTrackLabel()) {
            <span
              data-slot="track-label-on"
              class="absolute left-1.5 text-[10px] font-semibold leading-none text-primary-foreground transition-opacity duration-200"
              [class]="nChecked() ? 'opacity-100' : 'opacity-0'"
              aria-hidden="true"
            >{{ nTrackLabelOn() }}</span>
            <span
              data-slot="track-label-off"
              class="absolute right-1.5 text-[10px] font-semibold leading-none text-muted-foreground transition-opacity duration-200"
              [class]="!nChecked() ? 'opacity-100' : 'opacity-0'"
              aria-hidden="true"
            >{{ nTrackLabelOff() }}</span>
          }
          <span
            data-slot="thumb"
            [class]="thumbClasses()"
            [attr.data-state]="nChecked() ? 'checked' : 'unchecked'"
            aria-hidden="true"
          >
            @if (nLoading()) {
              <svg
                data-slot="spinner"
                class="animate-spin text-muted-foreground"
                [class]="spinnerSizeClasses()"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            }
            <span [class]="nChecked() && !nLoading() ? 'contents' : 'hidden'" data-slot="icon-on">
              <ng-content select="[nIconOn]" />
            </span>
            <span [class]="!nChecked() && !nLoading() ? 'contents' : 'hidden'" data-slot="icon-off">
              <ng-content select="[nIconOff]" />
            </span>
          </span>
        </button>

        @if (nLabel()) {
          <n-label
            [nFor]="switchId()"
            [nRequired]="nRequired()"
            [nDisabled]="isDisabled()"
            nClass="mb-0 cursor-pointer select-none"
          >{{ nLabel() }}</n-label>
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
export class SwitchComponent implements ControlValueAccessor {
  readonly nChecked         = model<boolean>(false);
  readonly nSize            = input<SwitchVariants['nSize']>('default');
  readonly nColor           = input<SwitchVariants['nColor']>('default');
  readonly nLabel           = input<string>('');
  readonly nDisabled        = input<boolean>(false);
  readonly nRequired        = input<boolean>(false);
  readonly nError           = input<string | null>(null);
  readonly nHint            = input<string | null>(null);
  readonly nLoading         = input<boolean>(false);
  readonly nShowTrackLabel  = input<boolean>(false);
  readonly nTrackLabelOn    = input<string>('ON');
  readonly nTrackLabelOff   = input<string>('OFF');
  readonly nClass           = input<string>('');
  readonly nId              = input<string>('');
  readonly nAriaLabel       = input<string>('');

  readonly nChange = output<boolean>();
  readonly nBlur   = output<FocusEvent>();

  private readonly _form     = injectFormControl<boolean>(this);
  private readonly _staticId = `n-switch-${++_switchIdCounter}`;

  protected readonly isDisabled = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError   = computed(() => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()));
  protected readonly switchId   = computed(() => this.nId() || this._staticId);
  protected readonly errorId    = computed(() => `${this.switchId()}-error`);
  protected readonly hintId     = computed(() => `${this.switchId()}-hint`);

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())    return this.hintId();
    return null;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col', this.nClass()),
  );

  protected readonly trackClasses = computed(() => {
    const hasLabel = this.nShowTrackLabel();
    const size = this.nSize() ?? 'default';
    const extraWidth = hasLabel
      ? size === 'sm' ? 'w-[3.5rem]' : size === 'lg' ? 'w-[4.5rem]' : 'w-16'
      : '';
    return mergeClasses(
      switchVariants({ nSize: this.nSize(), nColor: this.nColor() }),
      extraWidth,
    );
  });

  protected readonly thumbClasses = computed(() => {
    const hasLabel = this.nShowTrackLabel();
    const size = this.nSize() ?? 'default';
    const checked = this.nChecked();

    const translateMap: Record<string, { normal: string; label: string }> = {
      sm:      { normal: 'translate-x-4',  label: 'translate-x-9'  },
      default: { normal: 'translate-x-5',  label: 'translate-x-10' },
      lg:      { normal: 'translate-x-7',  label: 'translate-x-11' },
    };
    const t = translateMap[size] ?? translateMap['default'];
    const translate = checked ? (hasLabel ? t.label : t.normal) : 'translate-x-0';

    return mergeClasses(switchThumbVariants({ nSize: this.nSize() }), translate);
  });

  protected readonly spinnerSizeClasses = computed(() => {
    const size = this.nSize() ?? 'default';
    if (size === 'sm') return 'size-2.5';
    if (size === 'lg') return 'size-4';
    return 'size-3';
  });

  protected toggle(): void {
    const next = !this.nChecked();
    this.nChecked.set(next);
    this._form.notifyChange(next);
    this._form.notifyTouched();
    this.nChange.emit(next);
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
