import { TemplateRef } from '@angular/core';

export interface DataTableColumn<T = unknown> {
  key: string;
  header: string;
  accessor: keyof T | ((row: T) => unknown);
  cell?: (value: unknown, row: T) => string;
  cellTemplate?: TemplateRef<{ $implicit: unknown; row: T }>;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  hidden?: boolean;
}
