import { Component, signal } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumnToggleComponent } from '../data-table-column-toggle.component';
import { DataTableColumn } from '../data-table.types';

interface User {
  name: string;
  email: string;
  department: string;
  location: string;
}

const USERS: User[] = [
  { name: 'Ana Silva', email: 'ana@example.com', department: 'Engenharia', location: 'São Paulo' },
  { name: 'Bruno Costa', email: 'bruno@example.com', department: 'Design', location: 'Rio de Janeiro' },
  { name: 'Carla Mendes', email: 'carla@example.com', department: 'Produto', location: 'Belo Horizonte' },
  { name: 'Diego Ramos', email: 'diego@example.com', department: 'Engenharia', location: 'São Paulo' },
  { name: 'Eva Martins', email: 'eva@example.com', department: 'Marketing', location: 'Curitiba' },
  { name: 'Felipe Souza', email: 'felipe@example.com', department: 'Engenharia', location: 'São Paulo' },
];

@Component({
  selector: 'demo-data-table-with-filter',
  standalone: true,
  imports: [DataTableComponent, DataTableEmptyComponent, DataTableColumnToggleComponent],
  template: `
    <div class="space-y-3">
      <input
        type="text"
        class="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        placeholder="Buscar..."
        [value]="filter()"
        (input)="filter.set($any($event.target).value)"
      />
      <n-data-table [nData]="users" [nColumns]="columns" [nFilterValue]="filter()">
        <n-data-table-column-toggle />
        <n-data-table-empty>Nenhum resultado para "{{ filter() }}".</n-data-table-empty>
      </n-data-table>
    </div>
  `,
})
export class DataTableWithFilterDemo {
  readonly users = USERS;
  readonly filter = signal('');

  readonly columns: DataTableColumn<User>[] = [
    { key: 'name', header: 'Nome', accessor: 'name', sortable: true },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'department', header: 'Departamento', accessor: 'department', sortable: true },
    { key: 'location', header: 'Localidade', accessor: 'location', sortable: true },
  ];
}
