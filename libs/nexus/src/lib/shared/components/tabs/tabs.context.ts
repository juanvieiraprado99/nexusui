import { InjectionToken, Signal } from '@angular/core';
import type { TabsVariants } from './tabs.variants';

export interface TabsContext {
  readonly tabId: string;
  readonly activeValue: Signal<string>;
  readonly orientation: Signal<'horizontal' | 'vertical'>;
  readonly variant: Signal<TabsVariants['nVariant']>;
  readonly stretch: Signal<boolean>;
  setActive(value: string): void;
  getTriggerId(value: string): string;
  getPanelId(value: string): string;
}

export const TABS_CONTEXT = new InjectionToken<TabsContext>('TabsContext');
