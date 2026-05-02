import { InjectionToken, Signal } from '@angular/core';

export type RadioSize = 'sm' | 'default' | 'lg';
export type RadioVariant = 'default' | 'card';
export type RadioColor = 'default' | 'destructive' | 'success';

export type RadioItemRef = {
  readonly value: () => unknown;
  readonly disabled: () => boolean;
  focus(): void;
};

export type RadioGroupContext = {
  readonly name: Signal<string>;
  readonly value: Signal<unknown>;
  readonly disabled: Signal<boolean>;
  readonly required: Signal<boolean>;
  readonly hasError: Signal<boolean>;
  readonly size: Signal<RadioSize>;
  readonly variant: Signal<RadioVariant>;
  readonly color: Signal<RadioColor>;
  readonly loading: Signal<boolean>;
  select(value: unknown): void;
  notifyTouched(): void;
  register(item: RadioItemRef): void;
  unregister(item: RadioItemRef): void;
  focusNext(current: RadioItemRef): void;
  focusPrev(current: RadioItemRef): void;
  isFirstEnabled(item: RadioItemRef): boolean;
};

export const RADIO_GROUP_CTX = new InjectionToken<RadioGroupContext>('RADIO_GROUP_CTX');
