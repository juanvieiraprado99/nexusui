import { Component, signal } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumn } from '../data-table.types';

interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: 'alta' | 'média' | 'baixa';
}

const TASKS: Task[] = [
  { id: 1, title: 'Revisar PR #42', assignee: 'Ana', priority: 'alta' },
  { id: 2, title: 'Escrever testes unitários', assignee: 'Bruno', priority: 'média' },
  { id: 3, title: 'Atualizar documentação', assignee: 'Carla', priority: 'baixa' },
  { id: 4, title: 'Corrigir bug de login', assignee: 'Diego', priority: 'alta' },
  { id: 5, title: 'Deploy para staging', assignee: 'Eva', priority: 'média' },
];

@Component({
  selector: 'demo-data-table-with-selection',
  standalone: true,
  imports: [DataTableComponent, DataTableEmptyComponent],
  template: `
    <div class="space-y-2">
      <n-data-table
        [nData]="tasks"
        [nColumns]="columns"
        [nSelectable]="true"
        [(nSelectedRows)]="selected"
      >
        <n-data-table-empty>Nenhuma tarefa.</n-data-table-empty>
      </n-data-table>
      @if (selected().length) {
        <p class="text-sm text-muted-foreground">
          {{ selected().length }} tarefa(s) selecionada(s).
        </p>
      }
    </div>
  `,
})
export class DataTableWithSelectionDemo {
  readonly tasks = TASKS;
  readonly selected = signal<Task[]>([]);

  readonly columns: DataTableColumn<Task>[] = [
    { key: 'title', header: 'Tarefa', accessor: 'title' },
    { key: 'assignee', header: 'Responsável', accessor: 'assignee' },
    { key: 'priority', header: 'Prioridade', accessor: 'priority' },
  ];
}
