import { inject, signal, DestroyRef, afterEveryRender, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, ControlValueAccessor, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  if (ngControl) {
    let currentControl: AbstractControl | null = null;
    let eventsSub: Subscription | null = null;

    const sync = (control: AbstractControl): void => {
      controlInvalid.set(control.invalid);
      controlTouched.set(control.touched);
    };

    // Re-resolve o control a cada render: se a instância de FormControl for trocada
    // em runtime (ex.: binding `[formControl]` que muda), re-assina no control novo
    // em vez de ficar preso ao antigo. afterEveryRender só roda no browser (SSR-safe) e
    // a 1ª passada ocorre após FormControlName.ngOnInit(), quando ngControl.control existe.
    afterEveryRender(() => {
      const control = ngControl.control;
      if (control === currentControl) return;
      eventsSub?.unsubscribe();
      currentControl = control;
      if (control) {
        sync(control);
        eventsSub = control.events.subscribe(() => sync(control));
      } else {
        controlInvalid.set(false);
        controlTouched.set(false);
      }
    });

    destroyRef.onDestroy(() => eventsSub?.unsubscribe());

    formDir?.ngSubmit.pipe(takeUntilDestroyed(destroyRef)).subscribe(() => {
      controlTouched.set(true);
      if (ngControl.control) controlInvalid.set(ngControl.control.invalid);
    });
  }

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
