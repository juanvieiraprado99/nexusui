import { InjectionToken, Signal } from '@angular/core';

export interface DialogContext {
  readonly open: Signal<boolean>;
  readonly persistent: Signal<boolean>;
  readonly role: Signal<'dialog' | 'alertdialog'>;
  readonly dialogId: Signal<string>;
  readonly titleId: Signal<string>;
  readonly descriptionId: Signal<string>;
  readonly triggerEl: Signal<HTMLElement | null>;
  setOpen(value: boolean): void;
  close(): void;
  setTriggerEl(el: HTMLElement | null): void;
}

export const DIALOG_CONTEXT = new InjectionToken<DialogContext>('DIALOG_CONTEXT');
