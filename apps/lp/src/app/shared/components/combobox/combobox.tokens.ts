import { InjectionToken, ModelSignal, Signal, WritableSignal } from '@angular/core';

export interface ComboboxContext {
  readonly triggerId: string;
  readonly contentId: string;
  readonly open: WritableSignal<boolean>;
  readonly query: Signal<string>;
  readonly multiple: Signal<boolean>;
  readonly disabled: Signal<boolean>;
  readonly loading: Signal<boolean>;
  readonly clearable: Signal<boolean>;
  readonly visibleCount: Signal<number>;
  readonly value: ModelSignal<string>;
  readonly values: ModelSignal<string[]>;
  readonly selectedLabel: Signal<string>;
  readonly triggerEl: Signal<HTMLElement | null>;
  readonly hasError:    Signal<boolean>;
  readonly required:    Signal<boolean>;
  readonly describedBy: Signal<string | null>;
  readonly labelId:     Signal<string>;
  readonly ariaLabel:   Signal<string>;
  openPanel(): void;
  closePanel(returnFocus?: boolean): void;
  togglePanel(): void;
  selectItem(value: string, label: string): void;
  clearSelection(): void;
  setQuery(q: string): void;
  setTriggerEl(el: HTMLElement | null): void;
  isSelected(value: string): boolean;
  registerItemVisibility(visible: () => boolean): () => void;
  navigateItems(direction: 1 | -1): void;
  setNavigateHandler(fn: ((direction: 1 | -1) => void) | null): void;
}

export const COMBOBOX_CONTEXT = new InjectionToken<ComboboxContext>('COMBOBOX_CONTEXT');
