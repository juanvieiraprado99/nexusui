import { InjectionToken, Signal, WritableSignal } from '@angular/core';

export type SidebarVariant = 'sidebar' | 'inset' | 'floating';
export type SidebarSide = 'left' | 'right';
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

export interface SidebarContext {
  readonly open: Signal<boolean>;
  readonly collapsed: Signal<boolean>;
  readonly isMobile: Signal<boolean>;
  readonly sidebarId: string;
  readonly collapsible: WritableSignal<SidebarCollapsible>;
  toggle(): void;
  setOpen(value: boolean): void;
  toggleCollapsed(): void;
  setCollapsed(value: boolean): void;
}

export const SIDEBAR_CONTEXT = new InjectionToken<SidebarContext>('SidebarContext');
