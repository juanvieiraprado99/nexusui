import { InjectionToken, Signal } from '@angular/core';

export type DatepickerSize = 'sm' | 'default' | 'lg';
export type DisabledDateFn = (date: Date) => boolean;

export type DatepickerContext = {
  readonly value: Signal<Date | null>;
  readonly min: Signal<Date | null>;
  readonly max: Signal<Date | null>;
  readonly disabledDate: Signal<DisabledDateFn | null>;
  readonly locale: Signal<string>;
  readonly weekStartsOn: Signal<0 | 1>;
  readonly disabled: Signal<boolean>;
  selectDate(date: Date): void;
};

export const DATEPICKER_CTX = new InjectionToken<DatepickerContext>('DATEPICKER_CTX');
