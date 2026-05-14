import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { DataTableColumn } from './data-table.types';

export interface DataTableContext {
  readonly columns: Signal<DataTableColumn[]>;
  readonly visibleColumns: Signal<DataTableColumn[]>;
  readonly processedData: Signal<unknown[]>;
  readonly selectedRows: Signal<Set<unknown>>;
  readonly sortKey: Signal<string | null>;
  readonly sortDir: Signal<'asc' | 'desc' | null>;
  readonly filterValue: WritableSignal<string>;
  readonly loading: Signal<boolean>;
  readonly selectable: Signal<boolean>;
  readonly serverSide: Signal<boolean>;
  readonly allSelected: Signal<boolean>;
  readonly someSelected: Signal<boolean>;
  readonly size: Signal<'compact' | 'default' | 'comfortable'>;
  readonly striped: Signal<boolean>;
  readonly stickyHeader: Signal<boolean>;
  toggleSort(key: string): void;
  toggleRow(row: unknown): void;
  toggleAll(): void;
  isSelected(row: unknown): boolean;
  toggleColumnVisibility(key: string): void;
  isColumnVisible(key: string): boolean;
  exportCsv(filename?: string): void;
}

export const DATA_TABLE_CONTEXT = new InjectionToken<DataTableContext>('DATA_TABLE_CONTEXT');
