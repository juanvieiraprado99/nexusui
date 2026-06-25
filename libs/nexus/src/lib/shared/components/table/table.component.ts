import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { mergeClasses } from '../../utils/merge-classes';
import {
  tableBodyVariants,
  tableCaptionVariants,
  tableCellVariants,
  tableFooterVariants,
  tableHeaderVariants,
  tableHeadVariants,
  tableRowVariants,
  tableScrollVariants,
  tableVariants,
  type TableSizeVariants,
  type TableVariantVariants,
} from './table.variants';

@Component({
  selector: 'n-table, table[n-table]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTable',
})
export class TableComponent {
  readonly nVariant = input<TableVariantVariants>('default');
  readonly nSize = input<TableSizeVariants>('default');
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      tableVariants({ nVariant: this.nVariant(), nSize: this.nSize() }),
      this.nClass(),
    ),
  );
}

@Component({
  selector: 'n-table-header, thead[n-table-header]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTableHeader',
})
export class TableHeaderComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() => mergeClasses(tableHeaderVariants(), this.nClass()));
}

@Component({
  selector: 'n-table-body, tbody[n-table-body]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTableBody',
})
export class TableBodyComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() => mergeClasses(tableBodyVariants(), this.nClass()));
}

@Component({
  selector: 'n-table-footer, tfoot[n-table-footer]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTableFooter',
})
export class TableFooterComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() => mergeClasses(tableFooterVariants(), this.nClass()));
}

@Component({
  selector: 'n-table-row, tr[n-table-row]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTableRow',
})
export class TableRowComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() => mergeClasses(tableRowVariants(), this.nClass()));
}

@Component({
  selector: 'n-table-head, th[n-table-head]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTableHead',
})
export class TableHeadComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() => mergeClasses(tableHeadVariants(), this.nClass()));
}

@Component({
  selector: 'n-table-cell, td[n-table-cell]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTableCell',
})
export class TableCellComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() => mergeClasses(tableCellVariants(), this.nClass()));
}

@Component({
  selector: 'n-table-caption, caption[n-table-caption]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  exportAs: 'nTableCaption',
})
export class TableCaptionComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(tableCaptionVariants(), this.nClass()),
  );
}

@Component({
  selector: 'n-table-scroll',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    // Scrollable region must be keyboard-focusable so it can be scrolled with arrow keys (WCAG 2.1.1).
    tabindex: '0',
    '[attr.role]': 'nLabel() ? "region" : null',
    '[attr.aria-label]': 'nLabel() || null',
  },
  exportAs: 'nTableScroll',
})
export class TableScrollComponent {
  readonly nClass = input<string>('');
  readonly nLabel = input<string>('');

  protected readonly classes = computed(() => mergeClasses(tableScrollVariants(), this.nClass()));
}
