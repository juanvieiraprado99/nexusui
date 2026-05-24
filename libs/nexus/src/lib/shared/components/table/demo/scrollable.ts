import { Component } from '@angular/core';

import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeadComponent,
  TableHeaderComponent,
  TableRowComponent,
  TableScrollComponent,
} from '../table.component';

@Component({
  selector: 'demo-table-scrollable',
  standalone: true,
  imports: [
    TableScrollComponent,
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeadComponent,
    TableCellComponent,
  ],
  template: `
    <n-table-scroll>
      <table n-table>
        <thead n-table-header>
          <tr n-table-row>
            @for (col of columns; track col) {
              <th n-table-head class="whitespace-nowrap">{{ col }}</th>
            }
          </tr>
        </thead>
        <tbody n-table-body>
          @for (row of rows; track row.id) {
            <tr n-table-row>
              <td n-table-cell class="font-medium whitespace-nowrap">{{ row.id }}</td>
              <td n-table-cell class="whitespace-nowrap">{{ row.name }}</td>
              <td n-table-cell class="whitespace-nowrap">{{ row.email }}</td>
              <td n-table-cell class="whitespace-nowrap">{{ row.role }}</td>
              <td n-table-cell class="whitespace-nowrap">{{ row.department }}</td>
              <td n-table-cell class="whitespace-nowrap">{{ row.location }}</td>
              <td n-table-cell class="whitespace-nowrap text-right">{{ row.salary }}</td>
            </tr>
          }
        </tbody>
      </table>
    </n-table-scroll>
  `,
})
export class TableScrollableDemo {
  columns = ['ID', 'Name', 'Email', 'Role', 'Department', 'Location', 'Salary'];

  rows = [
    { id: 'USR-001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', department: 'Engineering', location: 'New York', salary: '$120,000' },
    { id: 'USR-002', name: 'Bob Smith', email: 'bob@example.com', role: 'User', department: 'Design', location: 'San Francisco', salary: '$95,000' },
    { id: 'USR-003', name: 'Carol White', email: 'carol@example.com', role: 'Editor', department: 'Marketing', location: 'Chicago', salary: '$85,000' },
  ];
}
