import { ChangeDetectionStrategy, Component, effect, resource, signal, untracked } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumn } from '../data-table.types';
import { PaginationComponent } from '../../pagination/pagination.component';

interface Post {
  id: number;
  userId: number;
  title: string;
}

const PAGE_SIZE = 10;

@Component({
  selector: 'demo-data-table-server-side-paginated',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, DataTableEmptyComponent, PaginationComponent],
  template: `
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <input
          type="text"
          class="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Buscar posts..."
          (input)="onFilterInput($any($event.target).value)"
        />
        @if (posts.isLoading()) {
          <span class="text-xs text-muted-foreground animate-pulse">Carregando...</span>
        }
        @if (posts.error()) {
          <span class="text-xs text-destructive">Erro ao buscar dados.</span>
        }
        @if (!posts.isLoading() && total() > 0) {
          <span class="ml-auto text-xs text-muted-foreground">
            {{ total() }} posts
          </span>
        }
      </div>

      <n-data-table
        [nData]="posts.value()?.data ?? []"
        [nColumns]="columns"
        [nLoading]="posts.isLoading()"
        [nServerSide]="true"
        (nSortChange)="onSort($event)"
      >
        <n-data-table-empty>
          @if (filter()) {
            Nenhum post encontrado para "{{ filter() }}".
          } @else {
            Nenhum post.
          }
        </n-data-table-empty>
      </n-data-table>

      <div class="flex justify-end">
        <n-pagination
          [(nPage)]="page"
          [nTotalItems]="total()"
          [nPageSize]="pageSize"
          [nDisabled]="posts.isLoading()"
          [nShowFirstLast]="true"
        />
      </div>

      <p class="text-xs text-muted-foreground">
        Fonte: <code class="bg-muted rounded px-1 font-mono">jsonplaceholder.typicode.com/posts</code>
        — 100 posts páginados (<code class="bg-muted rounded px-1 font-mono">_page</code> + <code class="bg-muted rounded px-1 font-mono">_limit</code>), total via header <code class="bg-muted rounded px-1 font-mono">X-Total-Count</code>.
      </p>
    </div>
  `,
})
export class DataTableServerSidePaginatedDemo {
  readonly filter  = signal('');
  readonly page    = signal(1);
  readonly sortKey = signal<string | null>(null);
  readonly sortDir = signal<'asc' | 'desc' | null>(null);
  readonly total   = signal(0);

  readonly pageSize = PAGE_SIZE;

  private _debounceTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // reset to page 1 when filter or sort changes
    effect(() => {
      this.filter();
      this.sortKey();
      untracked(() => this.page.set(1));
    });
  }

  readonly posts = resource({
    params: () => ({
      page:  this.page(),
      q:     this.filter(),
      sort:  this.sortKey(),
      order: this.sortDir(),
    }),
    loader: async ({ params, abortSignal }) => {
      const qs = new URLSearchParams({
        _page:  params.page.toString(),
        _limit: PAGE_SIZE.toString(),
      });
      if (params.q)    qs.set('q', params.q);
      if (params.sort) {
        qs.set('_sort', params.sort);
        qs.set('_order', params.order ?? 'asc');
      }
      const url = `https://jsonplaceholder.typicode.com/posts?${qs}`;
      const res = await fetch(url, { signal: abortSignal });
      const count = parseInt(res.headers.get('X-Total-Count') ?? '0', 10);
      const data: Post[] = await res.json();
      this.total.set(count);
      return { data, total: count };
    },
  });

  readonly columns: DataTableColumn<Post>[] = [
    { key: 'id',     header: 'ID',      accessor: 'id',     sortable: true, align: 'right', width: '64px' },
    { key: 'userId', header: 'User ID', accessor: 'userId', sortable: true, align: 'right', width: '80px' },
    { key: 'title',  header: 'Título',  accessor: 'title',  sortable: true },
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
