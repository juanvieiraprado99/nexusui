import { InjectionToken, Signal } from '@angular/core';

export interface DrawerContext {
  readonly open: Signal<boolean>;
  readonly persistent: Signal<boolean>;
  readonly role: Signal<'dialog' | 'navigation'>;
  readonly drawerId: Signal<string>;
  readonly titleId: Signal<string>;
  readonly descriptionId: Signal<string>;
  readonly triggerEl: Signal<HTMLElement | null>;
  readonly hasTitle: Signal<boolean>;
  readonly hasDescription: Signal<boolean>;
  setOpen(value: boolean): void;
  close(): void;
  setTriggerEl(el: HTMLElement | null): void;
  setHasTitle(value: boolean): void;
  setHasDescription(value: boolean): void;
}

export const DRAWER_CONTEXT = new InjectionToken<DrawerContext>('DRAWER_CONTEXT');
