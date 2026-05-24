import { Component } from '@angular/core';

import {
  TableBodyComponent,
  TableCaptionComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from '../table.component';

@Component({
  selector: 'demo-table-with-caption',
  standalone: true,
  imports: [
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeadComponent,
    TableCellComponent,
    TableCaptionComponent,
  ],
  template: `
    <table n-table>
      <caption n-table-caption>A list of recent invoices.</caption>
      <thead n-table-header>
        <tr n-table-row>
          <th n-table-head>Invoice</th>
          <th n-table-head>Status</th>
          <th n-table-head>Method</th>
          <th n-table-head class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody n-table-body>
        @for (row of rows; track row.invoice) {
          <tr n-table-row>
            <td n-table-cell class="font-medium">{{ row.invoice }}</td>
            <td n-table-cell>{{ row.status }}</td>
            <td n-table-cell>{{ row.method }}</td>
            <td n-table-cell class="text-right">{{ row.amount }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class TableWithCaptionDemo {
  rows = [
    { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { invoice: 'INV-002', status: 'Pending', method: 'Bank Transfer', amount: '$150.00' },
    { invoice: 'INV-003', status: 'Unpaid', method: 'PayPal', amount: '$350.00' },
  ];
}
