import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface DropdownMenuContext {
  readonly open: WritableSignal<boolean>;
  readonly triggerEl: Signal<HTMLElement | null>;
  readonly contentId: string;
  readonly triggerId: string;
  setTriggerEl(el: HTMLElement | null): void;
  toggle(): void;
  openMenu(): void;
  close(focusTrigger?: boolean): void;
}

export const DROPDOWN_MENU_CONTEXT = new InjectionToken<DropdownMenuContext>('DROPDOWN_MENU_CONTEXT');

export interface DropdownMenuSubContext extends DropdownMenuContext {
  readonly isSub: true;
  readonly parent: DropdownMenuContext;
}

export const DROPDOWN_MENU_SUB_CONTEXT = new InjectionToken<DropdownMenuSubContext>('DROPDOWN_MENU_SUB_CONTEXT');
