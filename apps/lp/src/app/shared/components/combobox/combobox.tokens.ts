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
  readonly activeId: Signal<string | null>;
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
  registerItemLabel(value: string, label: string): () => void;
  navigateItems(direction: 1 | -1): void;
  setNavigateHandler(fn: ((direction: 1 | -1) => void) | null): void;
  /** Sync the keyboard-navigation active item (e.g. on mouse hover). */
  setActiveItem(value: string | null): void;
  setActiveHandler(fn: ((value: string | null) => void) | null): void;
  /** Set the id of the currently active option for aria-activedescendant. */
  setActiveId(id: string | null): void;
}

export const COMBOBOX_CONTEXT = new InjectionToken<ComboboxContext>('COMBOBOX_CONTEXT');
