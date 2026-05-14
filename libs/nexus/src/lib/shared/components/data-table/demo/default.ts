import { Component } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumn } from '../data-table.types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const USERS: User[] = [
  { id: 1, name: 'Ana Silva', email: 'ana@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bruno Costa', email: 'bruno@example.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Carla Mendes', email: 'carla@example.com', role: 'Viewer', status: 'inactive' },
  { id: 4, name: 'Diego Ramos', email: 'diego@example.com', role: 'Editor', status: 'active' },
  { id: 5, name: 'Eva Martins', email: 'eva@example.com', role: 'Viewer', status: 'active' },
];

@Component({
  selector: 'demo-data-table-default',
  standalone: true,
  imports: [DataTableComponent, DataTableEmptyComponent],
  template: `
    <n-data-table [nData]="users" [nColumns]="columns">
      <n-data-table-empty>Nenhum usuário encontrado.</n-data-table-empty>
    </n-data-table>
  `,
})
export class DataTableDefaultDemo {
  readonly users = USERS;

  readonly columns: DataTableColumn<User>[] = [
    { key: 'name', header: 'Nome', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'role', header: 'Papel', accessor: 'role' },
    { key: 'status', header: 'Status', accessor: 'status' },
  ];
}
