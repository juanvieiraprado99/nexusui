import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface ContextMenuContext {
  readonly open: WritableSignal<boolean>;
  readonly cursorX: WritableSignal<number>;
  readonly cursorY: WritableSignal<number>;
  readonly contentId: string;
  openAt(x: number, y: number): void;
  close(restoreFocus?: boolean): void;
}

export const CONTEXT_MENU_CONTEXT = new InjectionToken<ContextMenuContext>('CONTEXT_MENU_CONTEXT');

export interface ContextMenuSubContext {
  readonly open: WritableSignal<boolean>;
  readonly triggerEl: Signal<HTMLElement | null>;
  readonly contentId: string;
  readonly triggerId: string;
  readonly parent: ContextMenuContext;
  setTriggerEl(el: HTMLElement | null): void;
  toggle(): void;
  openMenu(): void;
  close(focusTrigger?: boolean): void;
}

export const CONTEXT_MENU_SUB_CONTEXT = new InjectionToken<ContextMenuSubContext>(
  'CONTEXT_MENU_SUB_CONTEXT',
);

export interface ContextMenuRadioGroupContext {
  readonly value: WritableSignal<string | null>;
  select(value: string): void;
}

export const CONTEXT_MENU_RADIO_GROUP_CONTEXT =
  new InjectionToken<ContextMenuRadioGroupContext>('CONTEXT_MENU_RADIO_GROUP_CONTEXT');
