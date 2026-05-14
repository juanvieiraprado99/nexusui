import { Component } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumn } from '../data-table.types';

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'demo-data-table-loading',
  standalone: true,
  imports: [DataTableComponent, DataTableEmptyComponent],
  template: `
    <n-data-table [nData]="[]" [nColumns]="columns" [nLoading]="true" [nSkeletonRows]="4">
      <n-data-table-empty>Nenhum dado.</n-data-table-empty>
    </n-data-table>
  `,
})
export class DataTableLoadingDemo {
  readonly columns: DataTableColumn<User>[] = [
    { key: 'name', header: 'Nome', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'role', header: 'Papel', accessor: 'role' },
  ];
}
