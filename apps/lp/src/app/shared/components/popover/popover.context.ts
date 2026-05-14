import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export interface PopoverContext {
  readonly open: WritableSignal<boolean>;
  readonly persistent: Signal<boolean>;
  readonly modal: Signal<boolean>;
  readonly triggerMode: Signal<'click' | 'hover' | 'focus'>;
  readonly triggerEl: Signal<HTMLElement | null>;
  readonly panelEl: Signal<HTMLElement | null>;
  readonly contentId: string;
  readonly triggerId: string;
  setTriggerEl(el: HTMLElement | null): void;
  setPanelEl(el: HTMLElement | null): void;
  toggle(): void;
  openPopover(): void;
  close(focusTrigger?: boolean): void;
  scheduleClose(focusTrigger?: boolean, delay?: number): void;
  cancelScheduledClose(): void;
}

export const POPOVER_CONTEXT = new InjectionToken<PopoverContext>('POPOVER_CONTEXT');
