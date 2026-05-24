import { Component } from '@angular/core';

import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableFooterComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from '../table.component';

@Component({
  selector: 'demo-table-with-footer',
  standalone: true,
  imports: [
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableFooterComponent,
    TableRowComponent,
    TableHeadComponent,
    TableCellComponent,
  ],
  template: `
    <table n-table>
      <thead n-table-header>
        <tr n-table-row>
          <th n-table-head>Description</th>
          <th n-table-head>Qty</th>
          <th n-table-head class="text-right">Unit Price</th>
          <th n-table-head class="text-right">Total</th>
        </tr>
      </thead>
      <tbody n-table-body>
        @for (row of rows; track row.description) {
          <tr n-table-row>
            <td n-table-cell class="font-medium">{{ row.description }}</td>
            <td n-table-cell>{{ row.qty }}</td>
            <td n-table-cell class="text-right">{{ row.unitPrice }}</td>
            <td n-table-cell class="text-right">{{ row.total }}</td>
          </tr>
        }
      </tbody>
      <tfoot n-table-footer>
        <tr n-table-row>
          <td n-table-cell colspan="3" class="text-right font-semibold">Total</td>
          <td n-table-cell class="text-right font-semibold">$975.00</td>
        </tr>
      </tfoot>
    </table>
  `,
})
export class TableWithFooterDemo {
  rows = [
    { description: 'Design Services', qty: 3, unitPrice: '$150.00', total: '$450.00' },
    { description: 'Development', qty: 5, unitPrice: '$75.00', total: '$375.00' },
    { description: 'Consulting', qty: 2, unitPrice: '$75.00', total: '$150.00' },
  ];
}
