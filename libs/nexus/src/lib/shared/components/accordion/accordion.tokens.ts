import { InjectionToken, Signal } from '@angular/core';

export interface AccordionContext {
  readonly type: Signal<'single' | 'multiple'>;
  readonly collapsible: Signal<boolean>;
  readonly openValues: Signal<Set<string>>;
  toggle(value: string): void;
}

export interface AccordionItemContext {
  readonly value: Signal<string>;
  readonly disabled: Signal<boolean>;
  readonly isOpen: Signal<boolean>;
  readonly triggerId: string;
  readonly contentId: string;
}

export const ACCORDION_CONTEXT = new InjectionToken<AccordionContext>('AccordionContext');
export const ACCORDION_ITEM_CONTEXT = new InjectionToken<AccordionItemContext>('AccordionItemContext');
