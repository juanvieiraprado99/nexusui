import { inject, signal, DestroyRef, afterNextRender, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, ControlValueAccessor, FormGroupDirective } from '@angular/forms';

export type FormControlRef<T> = {
  readonly controlInvalid: Signal<boolean>;
  readonly controlTouched: Signal<boolean>;
  readonly disabledByForm: Signal<boolean>;
  setOnChange(fn: (v: T) => void): void;
  setOnTouched(fn: () => void): void;
  setDisabledByForm(v: boolean): void;
  notifyChange(value: T): void;
  notifyTouched(): void;
};

export function injectFormControl<T = string>(valueAccessor: ControlValueAccessor): FormControlRef<T> {
  const ngControl  = inject(NgControl, { optional: true, self: true });
  const formDir    = inject(FormGroupDirective, { optional: true });
  const destroyRef = inject(DestroyRef);

  if (ngControl) {
    ngControl.valueAccessor = valueAccessor;
  }

  const controlInvalid = signal(false);
  const controlTouched = signal(false);
  const disabledByForm = signal(false);

  let _onChange: (v: T) => void = () => {};
  let _onTouched: () => void    = () => {};

  // afterNextRender garante que FormControlName.ngOnInit() já rodou
  // e ngControl.control está disponível
  afterNextRender(() => {
    const control = ngControl?.control;
    if (control) {
      control.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(() => {
        controlInvalid.set(control.invalid);
        controlTouched.set(control.touched);
      });
    }
    formDir?.ngSubmit.pipe(takeUntilDestroyed(destroyRef)).subscribe(() => {
      controlTouched.set(true);
      if (ngControl?.control) controlInvalid.set(ngControl.control.invalid);
    });
  });

  return {
    controlInvalid: controlInvalid.asReadonly(),
    controlTouched: controlTouched.asReadonly(),
    disabledByForm: disabledByForm.asReadonly(),
    setOnChange(fn)       { _onChange = fn; },
    setOnTouched(fn)      { _onTouched = fn; },
    setDisabledByForm(v)  { disabledByForm.set(v); },
    notifyChange(value)   { _onChange(value); },
    notifyTouched()       { _onTouched(); },
  };
}
