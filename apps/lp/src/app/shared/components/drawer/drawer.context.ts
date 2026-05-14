import { InjectionToken, Signal } from '@angular/core';

export interface DrawerContext {
  readonly open: Signal<boolean>;
  readonly persistent: Signal<boolean>;
  readonly role: Signal<'dialog' | 'navigation'>;
  readonly drawerId: Signal<string>;
  readonly titleId: Signal<string>;
  readonly descriptionId: Signal<string>;
  readonly triggerEl: Signal<HTMLElement | null>;
  setOpen(value: boolean): void;
  close(): void;
  setTriggerEl(el: HTMLElement | null): void;
}

export const DRAWER_CONTEXT = new InjectionToken<DrawerContext>('DRAWER_CONTEXT');
