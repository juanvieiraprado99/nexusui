import { ChangeDetectionStrategy, Component, effect, resource, signal, untracked } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumn } from '../data-table.types';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'demo-data-table-server-side',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, DataTableEmptyComponent],
  template: `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <input
          type="text"
          class="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Buscar usuários..."
          (input)="onFilterInput($any($event.target).value)"
        />
        @if (users.isLoading()) {
          <span class="text-xs text-muted-foreground animate-pulse">Carregando...</span>
        }
        @if (users.error()) {
          <span class="text-xs text-destructive">Erro ao buscar dados.</span>
        }
      </div>

      <n-data-table
        [nData]="users.value() ?? []"
        [nColumns]="columns"
        [nLoading]="users.isLoading()"
        [nServerSide]="true"
        (nSortChange)="onSort($event)"
      >
        <n-data-table-empty>
          @if (filter()) {
            Nenhum usuário encontrado para "{{ filter() }}".
          } @else {
            Nenhum usuário.
          }
        </n-data-table-empty>
      </n-data-table>

      <p class="text-xs text-muted-foreground">
        Fonte: <code class="bg-muted rounded px-1 font-mono">jsonplaceholder.typicode.com/users</code>
        — sort e filter via query params, sem paginação.
      </p>
    </div>
  `,
})
export class DataTableServerSideDemo {
  readonly filter  = signal('');
  readonly sortKey = signal<string | null>(null);
  readonly sortDir = signal<'asc' | 'desc' | null>(null);

  private _debounceTimer?: ReturnType<typeof setTimeout>;

  readonly users = resource({
    params: () => ({
      q:     this.filter(),
      sort:  this.sortKey(),
      order: this.sortDir(),
    }),
    loader: async ({ params, abortSignal }) => {
      const qs = new URLSearchParams();
      if (params.q)    qs.set('q', params.q);
      if (params.sort) {
        qs.set('_sort', params.sort);
        qs.set('_order', params.order ?? 'asc');
      }
      const url = `https://jsonplaceholder.typicode.com/users?${qs}`;
      const res = await fetch(url, { signal: abortSignal });
      return res.json() as Promise<User[]>;
    },
  });

  readonly columns: DataTableColumn<User>[] = [
    { key: 'id',      header: 'ID',       accessor: 'id',      sortable: true, align: 'right', width: '60px' },
    { key: 'name',    header: 'Nome',      accessor: 'name',    sortable: true },
    { key: 'email',   header: 'Email',     accessor: 'email',   sortable: true },
    { key: 'phone',   header: 'Telefone',  accessor: 'phone' },
    { key: 'website', header: 'Website',   accessor: 'website' },
  ];

  onFilterInput(value: string): void {
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => this.filter.set(value), 400);
  }

  onSort(event: { key: string; dir: 'asc' | 'desc' | null }): void {
    this.sortKey.set(event.dir ? event.key : null);
    this.sortDir.set(event.dir);
  }
}
