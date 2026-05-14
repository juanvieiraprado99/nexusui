import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  effect,
  forwardRef,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { mergeClasses } from '../../utils/merge-classes';
import { CheckboxComponent } from '../checkbox';
import { SkeletonComponent } from '../skeleton';
import { DATA_TABLE_CONTEXT, DataTableContext } from './data-table.tokens';
import { DataTableColumn } from './data-table.types';
import {
  dataTableCellVariants,
  dataTableHeadCellVariants,
} from './data-table.variants';

let _dtIdCounter = 0;

@Component({
  selector: 'n-data-table',
  standalone: true,
  imports: [NgTemplateOutlet, CheckboxComponent, SkeletonComponent],
  template: `
    <div [class]="wrapperClasses()" data-slot="root">

      <div class="flex items-center justify-end gap-2 mb-2" data-slot="toolbar">
        <ng-content select="n-data-table-column-toggle" />
      </div>

      <div class="overflow-auto rounded-md border border-border" data-slot="scroll-wrapper">
        <table class="w-full caption-bottom" data-slot="table">

          <!-- thead -->
          <thead [class]="theadClasses()" data-slot="header">
            <tr class="border-b border-border">
              @if (nSelectable()) {
                <th [class]="thClasses()">
                  <n-checkbox
                    [nChecked]="context.allSelected()"
                    [nIndeterminate]="context.someSelected()"
                    (nChange)="context.toggleAll()"
                    nAriaLabel="Selecionar todas as linhas"
                  />
                </th>
              }
              @for (col of context.visibleColumns(); track col.key) {
                <th
                  [class]="thClasses(col)"
                  [style.width]="col.width ?? null"
                  [attr.aria-sort]="col.sortable ? ariaSort(col.key) : null"
                  data-slot="head-cell"
                >
                  @if (col.sortable) {
                    <button
                      type="button"
                      class="inline-flex items-center gap-1 rounded text-inherit hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      (click)="context.toggleSort(col.key)"
                    >
                      {{ col.header }}
                      @if (context.sortKey() === col.key && context.sortDir() === 'asc') {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>
                      } @else if (context.sortKey() === col.key && context.sortDir() === 'desc') {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                      } @else {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="opacity-40"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                      }
                    </button>
                  } @else {
                    {{ col.header }}
                  }
                </th>
              }
            </tr>
          </thead>

          <!-- tbody -->
          <tbody data-slot="body">
            @if (nLoading()) {
              @for (i of skeletonRows(); track i) {
                <tr class="border-b border-border last:border-0">
                  @if (nSelectable()) {
                    <td [class]="tdClasses()">
                      <n-skeleton nClass="h-4 w-4 rounded" />
                    </td>
                  }
                  @for (col of context.visibleColumns(); track col.key) {
                    <td [class]="tdClasses()">
                      <n-skeleton nClass="h-4 w-full rounded" />
                    </td>
                  }
                </tr>
              }
            } @else if (!context.processedData().length) {
              <tr>
                <td
                  [attr.colspan]="colspan()"
                  class="h-24 text-center text-muted-foreground"
                  data-slot="empty"
                >
                  <ng-content select="n-data-table-empty" />
                </td>
              </tr>
            } @else {
              @for (row of context.processedData(); track trackRow($index, row)) {
                <tr [class]="trClasses(row)" data-slot="row">
                  @if (nSelectable()) {
                    <td [class]="tdClasses()">
                      <n-checkbox
                        [nChecked]="context.isSelected(row)"
                        (nChange)="context.toggleRow(row)"
                        nAriaLabel="Selecionar linha"
                      />
                    </td>
                  }
                  @for (col of context.visibleColumns(); track col.key) {
                    <td
                      [class]="tdClasses(col)"
                      data-slot="cell"
                    >
                      @if (col.cellTemplate) {
                        <ng-container
                          [ngTemplateOutlet]="col.cellTemplate"
                          [ngTemplateOutletContext]="{ $implicit: getCellValue(col, row), row: row }"
                        />
                      } @else {
                        {{ getCellText(col, row) }}
                      }
                    </td>
                  }
                </tr>
              }
            }
          </tbody>

        </table>
      </div>

      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  providers: [
    {
      provide: DATA_TABLE_CONTEXT,
      useFactory: (c: DataTableComponent) => c.context,
      deps: [forwardRef(() => DataTableComponent)],
    },
  ],
})
export class DataTableComponent<T = unknown> {
  readonly nData          = input<T[]>([]);
  readonly nColumns       = input<DataTableColumn<T>[]>([]);
  readonly nLoading       = input<boolean>(false);
  readonly nSelectable    = input<boolean>(false);
  readonly nServerSide    = input<boolean>(false);
  readonly nSize          = input<'compact' | 'default' | 'comfortable'>('default');
  readonly nStriped       = input<boolean>(false);
  readonly nStickyHeader  = input<boolean>(false);
  readonly nFilterValue   = input<string>('');
  readonly nSkeletonRows  = input<number>(5);
  readonly nClass         = input<string>('');

  readonly nSelectedRows  = model<T[]>([]);
  readonly nSortChange    = output<{ key: string; dir: 'asc' | 'desc' | null }>();
  readonly nFilterChange  = output<string>();
  readonly nExport        = output<void>();

  private readonly _staticId     = `n-dt-${++_dtIdCounter}`;
  private readonly _sortKey      = signal<string | null>(null);
  private readonly _sortDir      = signal<'asc' | 'desc' | null>(null);
  private readonly _filterValue  = signal<string>('');
  private readonly _selectedRows = signal<Set<unknown>>(new Set());
  private readonly _hiddenKeys   = signal<Set<string>>(new Set());

  constructor() {
    effect(() => {
      const cols = this.nColumns();
      untracked(() => {
        const hidden = new Set<string>(cols.filter(c => c.hidden).map(c => c.key));
        this._hiddenKeys.set(hidden);
      });
    });

    effect(() => {
      this._filterValue.set(this.nFilterValue());
    });
  }

  private readonly _visibleColumns = computed(() =>
    (this.nColumns() as DataTableColumn[]).filter(c => !this._hiddenKeys().has(c.key)),
  );

  private readonly _processedData = computed(() => {
    let data = this.nData() as unknown[];

    if (!this.nServerSide()) {
      const filter = this._filterValue().toLowerCase().trim();
      if (filter) {
        const cols = (this.nColumns() as DataTableColumn[]).filter(c => c.filterable !== false);
        data = data.filter(row =>
          cols.some(col => {
            const val = this._getValue(col, row);
            return String(val ?? '').toLowerCase().includes(filter);
          }),
        );
      }

      const key = this._sortKey();
      const dir = this._sortDir();
      if (key && dir) {
        const col = (this.nColumns() as DataTableColumn[]).find(c => c.key === key);
        if (col) {
          data = [...data].sort((a, b) => {
            const av = this._getValue(col, a);
            const bv = this._getValue(col, b);
            const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
            return dir === 'asc' ? cmp : -cmp;
          });
        }
      }
    }

    return data;
  });

  private readonly _allSelected = computed(() => {
    const data = this._processedData();
    if (!data.length) return false;
    const sel = this._selectedRows();
    return data.every(row => sel.has(row));
  });

  private readonly _someSelected = computed(() => {
    if (this._allSelected()) return false;
    const sel = this._selectedRows();
    return this._processedData().some(row => sel.has(row));
  });

  readonly context: DataTableContext = {
    columns:                this.nColumns as unknown as Signal<DataTableColumn[]>,
    visibleColumns:         this._visibleColumns,
    processedData:          this._processedData,
    selectedRows:           this._selectedRows.asReadonly(),
    sortKey:                this._sortKey.asReadonly(),
    sortDir:                this._sortDir.asReadonly(),
    filterValue:            this._filterValue,
    loading:                this.nLoading,
    selectable:             this.nSelectable,
    serverSide:             this.nServerSide,
    allSelected:            this._allSelected,
    someSelected:           this._someSelected,
    size:                   this.nSize,
    striped:                this.nStriped,
    stickyHeader:           this.nStickyHeader,
    toggleSort:             (key) => this._toggleSort(key),
    toggleRow:              (row) => this._toggleRow(row),
    toggleAll:              () => this._toggleAll(),
    isSelected:             (row) => this._selectedRows().has(row),
    toggleColumnVisibility: (key) => this._toggleColumnVisibility(key),
    isColumnVisible:        (key) => !this._hiddenKeys().has(key),
    exportCsv:              (filename) => this._exportCsv(filename),
  };

  protected readonly skeletonRows = computed(() =>
    Array.from({ length: this.nSkeletonRows() }, (_, i) => i),
  );

  protected readonly colspan = computed(() => {
    let cols = this.context.visibleColumns().length;
    if (this.nSelectable()) cols += 1;
    return cols;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('w-full', this.nClass()),
  );

  protected readonly theadClasses = computed(() =>
    mergeClasses(
      '[&_tr]:border-b',
      this.nStickyHeader() && 'sticky top-0 z-10 bg-background shadow-sm',
    ),
  );

  protected thClasses(col?: DataTableColumn): string {
    return mergeClasses(
      dataTableHeadCellVariants({ nSize: this.nSize() }),
      col?.align === 'center' && 'text-center',
      col?.align === 'right' && 'text-right',
    );
  }

  protected tdClasses(col?: DataTableColumn): string {
    return mergeClasses(
      dataTableCellVariants({ nSize: this.nSize() }),
      col?.align === 'center' && 'text-center',
      col?.align === 'right' && 'text-right',
    );
  }

  protected trClasses(row: unknown): string {
    return mergeClasses(
      'border-b border-border transition-colors last:border-0',
      'hover:bg-muted/50',
      this.nStriped() && 'odd:bg-muted/20',
      this.context.isSelected(row) && 'bg-muted',
    );
  }

  protected ariaSort(key: string): 'ascending' | 'descending' | 'none' {
    if (this._sortKey() !== key) return 'none';
    return this._sortDir() === 'asc' ? 'ascending' : 'descending';
  }

  protected trackRow(index: number, row: unknown): unknown {
    return row;
  }

  protected getCellValue(col: DataTableColumn, row: unknown): unknown {
    return this._getValue(col, row);
  }

  protected getCellText(col: DataTableColumn, row: unknown): string {
    const val = this._getValue(col, row);
    return col.cell ? col.cell(val, row) : String(val ?? '');
  }

  private _getValue(col: DataTableColumn, row: unknown): unknown {
    if (typeof col.accessor === 'function') {
      return (col.accessor as (r: unknown) => unknown)(row);
    }
    return (row as Record<string, unknown>)[col.accessor as string];
  }

  private _toggleSort(key: string): void {
    const cur = this._sortKey();
    const dir = this._sortDir();
    let newDir: 'asc' | 'desc' | null;
    if (cur !== key) newDir = 'asc';
    else if (dir === 'asc') newDir = 'desc';
    else newDir = null;
    this._sortKey.set(newDir ? key : null);
    this._sortDir.set(newDir);
    this.nSortChange.emit({ key, dir: newDir });
  }

  private _toggleRow(row: unknown): void {
    const sel = new Set(this._selectedRows());
    if (sel.has(row)) sel.delete(row);
    else sel.add(row);
    this._selectedRows.set(sel);
    this.nSelectedRows.set([...sel] as T[]);
  }

  private _toggleAll(): void {
    const data = this._processedData();
    const allSel = this._allSelected();
    const sel = new Set(this._selectedRows());
    if (allSel) data.forEach(row => sel.delete(row));
    else data.forEach(row => sel.add(row));
    this._selectedRows.set(sel);
    this.nSelectedRows.set([...sel] as T[]);
  }

  private _toggleColumnVisibility(key: string): void {
    const hidden = new Set(this._hiddenKeys());
    if (hidden.has(key)) hidden.delete(key);
    else hidden.add(key);
    this._hiddenKeys.set(hidden);
  }

  private _exportCsv(filename = 'data'): void {
    const cols = this._visibleColumns().filter(c => !c.cellTemplate);
    const header = cols.map(c => `"${c.header.replace(/"/g, '""')}"`).join(',');
    const rows = this._processedData().map(row =>
      cols.map(col => {
        const val = this._getValue(col, row);
        const str = col.cell ? col.cell(val, row) : String(val ?? '');
        return `"${str.replace(/"/g, '""')}"`;
      }).join(','),
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.nExport.emit();
  }
}
