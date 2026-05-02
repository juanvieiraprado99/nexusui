import { InjectionToken, ModelSignal, Signal, WritableSignal } from '@angular/core';

export interface SelectContext {
  readonly triggerId: string;
  readonly contentId: string;
  readonly open: WritableSignal<boolean>;
  readonly multiple: Signal<boolean>;
  readonly disabled: Signal<boolean>;
  readonly loading: Signal<boolean>;
  readonly clearable: Signal<boolean>;
  readonly selectAll: Signal<boolean>;
  readonly maxSelections: Signal<number | null>;
  readonly multiSummary: Signal<'count' | 'list'>;
  readonly matchTriggerWidth: Signal<boolean>;
  readonly value: ModelSignal<string>;
  readonly values: ModelSignal<string[]>;
  readonly selectedLabel: Signal<string>;
  readonly selectedLabels: Signal<Record<string, string>>;
  readonly triggerEl: Signal<HTMLElement | null>;
  readonly hasError: Signal<boolean>;
  readonly required: Signal<boolean>;
  readonly describedBy: Signal<string | null>;
  readonly labelId: Signal<string>;
  readonly ariaLabel: Signal<string>;
  readonly typeAheadActive: Signal<string | null>;
  readonly registeredCount: Signal<number>;
  openPanel(): void;
  closePanel(returnFocus?: boolean): void;
  togglePanel(): void;
  selectItem(value: string, label: string): void;
  clearSelection(): void;
  selectAllVisible(values: string[]): void;
  isSelected(value: string): boolean;
  canSelectMore(value: string): boolean;
  setTriggerEl(el: HTMLElement | null): void;
  registerItem(value: string, label: string): () => void;
  navigateItems(direction: 1 | -1): void;
  setNavigateHandler(fn: ((direction: 1 | -1) => void) | null): void;
  typeAhead(char: string): void;
  setTypeAheadHandler(fn: ((value: string) => void) | null): void;
}

export const SELECT_CONTEXT = new InjectionToken<SelectContext>('SELECT_CONTEXT');
