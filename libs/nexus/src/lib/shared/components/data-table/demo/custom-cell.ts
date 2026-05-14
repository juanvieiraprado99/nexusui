import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumnToggleComponent } from '../data-table-column-toggle.component';
import { DataTableColumn } from '../data-table.types';

interface Employee {
  name: string;
  role: string;
  status: 'online' | 'away' | 'offline';
  progress: number;
}

const EMPLOYEES: Employee[] = [
  { name: 'Ana Silva', role: 'Engenheira', status: 'online', progress: 85 },
  { name: 'Bruno Costa', role: 'Designer', status: 'away', progress: 42 },
  { name: 'Carla Mendes', role: 'PM', status: 'offline', progress: 100 },
  { name: 'Diego Ramos', role: 'Engenheiro', status: 'online', progress: 67 },
];

@Component({
  selector: 'demo-data-table-custom-cell',
  standalone: true,
  imports: [DataTableComponent, DataTableEmptyComponent, DataTableColumnToggleComponent],
  template: `
    <n-data-table [nData]="employees" [nColumns]="columns" [nSelectable]="true">
      <n-data-table-column-toggle />
      <n-data-table-empty>Nenhum funcionário.</n-data-table-empty>
    </n-data-table>

    <ng-template #statusTpl let-value>
      <span class="inline-flex items-center gap-1.5">
        <span
          class="h-2 w-2 rounded-full"
          [class.bg-green-500]="value === 'online'"
          [class.bg-yellow-500]="value === 'away'"
          [class.bg-gray-400]="value === 'offline'"
        ></span>
        {{ value }}
      </span>
    </ng-template>

    <ng-template #progressTpl let-value>
      <div class="flex items-center gap-2">
        <div class="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            class="h-full rounded-full bg-primary transition-all"
            [style.width.%]="value"
          ></div>
        </div>
        <span class="text-xs text-muted-foreground w-8 text-right">{{ value }}%</span>
      </div>
    </ng-template>
  `,
})
export class DataTableCustomCellDemo {
  @ViewChild('statusTpl', { static: true }) statusTpl!: TemplateRef<{ $implicit: string }>;
  @ViewChild('progressTpl', { static: true }) progressTpl!: TemplateRef<{ $implicit: number }>;

  readonly employees = EMPLOYEES;

  get columns(): DataTableColumn<Employee>[] {
    return [
      { key: 'name', header: 'Nome', accessor: 'name', sortable: true },
      { key: 'role', header: 'Cargo', accessor: 'role' },
      { key: 'status', header: 'Status', accessor: 'status', cellTemplate: this.statusTpl as TemplateRef<{ $implicit: unknown; row: Employee }> },
      { key: 'progress', header: 'Progresso', accessor: 'progress', sortable: true, cellTemplate: this.progressTpl as TemplateRef<{ $implicit: unknown; row: Employee }> },
    ];
  }
}
