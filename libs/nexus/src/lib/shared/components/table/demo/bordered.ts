import { Component } from '@angular/core';

import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
} from '../table.component';

@Component({
  selector: 'demo-table-bordered',
  standalone: true,
  imports: [
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeadComponent,
    TableCellComponent,
  ],
  template: `
    <table n-table nVariant="bordered">
      <thead n-table-header>
        <tr n-table-row>
          <th n-table-head>Name</th>
          <th n-table-head>Status</th>
          <th n-table-head>Role</th>
          <th n-table-head class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody n-table-body>
        @for (row of rows; track row.name) {
          <tr n-table-row>
            <td n-table-cell class="font-medium">{{ row.name }}</td>
            <td n-table-cell>{{ row.status }}</td>
            <td n-table-cell>{{ row.role }}</td>
            <td n-table-cell class="text-right">{{ row.amount }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class TableBorderedDemo {
  rows = [
    { name: 'Alice Johnson', status: 'Active', role: 'Admin', amount: '$250.00' },
    { name: 'Bob Smith', status: 'Inactive', role: 'User', amount: '$150.00' },
    { name: 'Carol White', status: 'Active', role: 'Editor', amount: '$350.00' },
    { name: 'David Brown', status: 'Pending', role: 'User', amount: '$75.00' },
  ];
}
