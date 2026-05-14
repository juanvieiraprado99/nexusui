import { InjectionToken, Signal } from '@angular/core';

export interface CollapsibleContext {
  readonly isOpen: Signal<boolean>;
  readonly isDisabled: Signal<boolean>;
  readonly isLazy: Signal<boolean>;
  readonly variant: Signal<'default' | 'bordered' | 'card'>;
  readonly contentId: string;
  readonly triggerId: string;
  toggle(): void;
}

export const COLLAPSIBLE_CONTEXT = new InjectionToken<CollapsibleContext>('CollapsibleContext');
