import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DataTableComponent,
  DataTableColumnToggleComponent,
} from '../../../shared/components/data-table';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-data-table-doc-page',
  imports: [
    DataTableComponent, DataTableColumnToggleComponent,
    DocsLayoutComponent, CodeBlockComponent, ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Data Table</h1>
          <p class="mt-2 text-muted-foreground">A fully-featured data table with sorting, filtering, row selection, column visibility toggle, CSV export, and skeleton loading.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-data-table [nData]="users" [nColumns]="columns" />
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add data-table" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">data-table/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/data-table/</code>.</li>
                  <li class="pt-3">Also install <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">checkbox</code> and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">skeleton</code> components (required by data-table).</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="ts" />
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Sortable</h3>
          <div class="mt-3">
            <app-example title="sortable: true on column definition" [code]="sortableCode">
              <n-data-table [nData]="users" [nColumns]="sortableColumns" />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Row selection</h3>
          <div class="mt-3">
            <app-example title="nSelectable + [(nSelectedRows)]" [code]="selectionCode">
              <div class="flex flex-col gap-2">
                <n-data-table [nData]="users" [nColumns]="columns" [nSelectable]="true" [(nSelectedRows)]="selectedRows" />
                <p class="text-xs text-muted-foreground">Selected: {{ selectedRows().length }} row(s)</p>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Loading skeleton</h3>
          <div class="mt-3">
            <app-example title="nLoading" [code]="loadingCode">
              <n-data-table [nData]="[]" [nColumns]="columns" [nLoading]="true" [nSkeletonRows]="5" />
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Filter + Column toggle</h3>
          <div class="mt-3">
            <app-example title="nFilterValue + n-data-table-column-toggle" [code]="filterCode">
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <input
                    class="h-9 w-48 rounded-md border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Filter…"
                    [value]="filterValue()"
                    (input)="filterValue.set($any($event.target).value)"
                  />
                </div>
                <n-data-table [nData]="users" [nColumns]="sortableColumns" [nFilterValue]="filterValue()">
                  <n-data-table-column-toggle />
                </n-data-table>
              </div>
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Prop</th>
                  <th class="px-4 py-2 text-left font-medium">Type</th>
                  <th class="px-4 py-2 text-left font-medium">Default</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of apiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class DataTableDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly selectedRows = signal<User[]>([]);
  protected readonly filterValue = signal('');

  protected readonly users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Inactive' },
  ];

  protected readonly columns = [
    { key: 'name', header: 'Name', accessor: 'name' as keyof User },
    { key: 'email', header: 'Email', accessor: 'email' as keyof User },
    { key: 'role', header: 'Role', accessor: 'role' as keyof User },
    { key: 'status', header: 'Status', accessor: 'status' as keyof User },
  ];

  protected readonly sortableColumns = [
    { key: 'name', header: 'Name', accessor: 'name' as keyof User, sortable: true, filterable: true },
    { key: 'email', header: 'Email', accessor: 'email' as keyof User, sortable: true, filterable: true },
    { key: 'role', header: 'Role', accessor: 'role' as keyof User, sortable: true },
    { key: 'status', header: 'Status', accessor: 'status' as keyof User },
  ];

  protected readonly defaultCode = `columns = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'email', header: 'Email', accessor: 'email' },
  { key: 'role', header: 'Role', accessor: 'role' },
];

// template
<n-data-table [nData]="users" [nColumns]="columns" />`;

  protected readonly sortableCode = `columns = [
  { key: 'name', header: 'Name', accessor: 'name', sortable: true },
  { key: 'email', header: 'Email', accessor: 'email', sortable: true },
];

<n-data-table [nData]="users" [nColumns]="columns" />`;

  protected readonly selectionCode = `selectedRows = signal<User[]>([]);

<n-data-table
  [nData]="users"
  [nColumns]="columns"
  [nSelectable]="true"
  [(nSelectedRows)]="selectedRows"
/>`;

  protected readonly loadingCode = `<n-data-table
  [nData]="[]"
  [nColumns]="columns"
  [nLoading]="true"
  [nSkeletonRows]="5"
/>`;

  protected readonly filterCode = `filterValue = signal('');

<input [value]="filterValue()" (input)="filterValue.set($event.target.value)" />
<n-data-table [nData]="data" [nColumns]="columns" [nFilterValue]="filterValue()">
  <n-data-table-column-toggle />
</n-data-table>`;

  protected readonly importCode = `import { Component, signal } from '@angular/core';
import {
  DataTableComponent,
  DataTableColumnToggleComponent,
  DataTableColumn,
} from './shared/components/data-table';

@Component({
  selector: 'app-my-page',
  imports: [DataTableComponent, DataTableColumnToggleComponent],
  template: \`...\`,
})
export class MyPage {
  columns: DataTableColumn<User>[] = [
    { key: 'name', header: 'Name', accessor: 'name', sortable: true },
    { key: 'email', header: 'Email', accessor: 'email' },
  ];

  users = [
    { name: 'Alice', email: 'alice@example.com' },
  ];
}`;

  protected readonly usageCode = `columns = [
  { key: 'id', header: 'ID', accessor: 'id' },
  { key: 'name', header: 'Name', accessor: 'name', sortable: true },
];

// template
<n-data-table [nData]="rows" [nColumns]="columns" />`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nData', type: 'T[]', default: '[]', description: 'Array of data rows.' },
    { prop: 'nColumns', type: 'DataTableColumn<T>[]', default: '[]', description: 'Column definitions including key, header, accessor, and options.' },
    { prop: 'nLoading', type: 'boolean', default: 'false', description: 'Shows skeleton rows instead of data.' },
    { prop: 'nSkeletonRows', type: 'number', default: '5', description: 'Number of skeleton rows shown during loading.' },
    { prop: 'nSelectable', type: 'boolean', default: 'false', description: 'Enables checkbox column for row selection.' },
    { prop: 'nSelectedRows', type: 'T[]', default: '[]', description: 'Two-way bindable selected rows array.' },
    { prop: 'nSize', type: "'compact' | 'default' | 'comfortable'", default: "'default'", description: 'Row density.' },
    { prop: 'nStriped', type: 'boolean', default: 'false', description: 'Alternating row background colors.' },
    { prop: 'nStickyHeader', type: 'boolean', default: 'false', description: 'Keeps the header fixed while scrolling.' },
    { prop: 'nFilterValue', type: 'string', default: "''", description: 'Global filter string. Matches filterable columns.' },
    { prop: 'nServerSide', type: 'boolean', default: 'false', description: 'Disables client-side sorting and filtering.' },
    { prop: '(nSortChange)', type: 'EventEmitter<{key, dir}>', default: '—', description: 'Emitted when sort column or direction changes.' },
    { prop: '(nFilterChange)', type: 'EventEmitter<string>', default: '—', description: 'Emitted when the filter value changes.' },
    { prop: '(nExport)', type: 'EventEmitter<void>', default: '—', description: 'Emitted when the CSV export is triggered.' },
  ];
}
