import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumn } from '../data-table.types';
import { PaginationComponent } from '../../pagination/pagination.component';

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  salary: number;
}

const ALL_EMPLOYEES: Employee[] = [
  { id:  1, name: 'Ana Silva',       department: 'Engenharia',  role: 'Tech Lead',          salary: 18000 },
  { id:  2, name: 'Bruno Costa',     department: 'Engenharia',  role: 'Dev Senior',         salary: 14000 },
  { id:  3, name: 'Carla Mendes',    department: 'Design',      role: 'UX Designer',        salary: 11000 },
  { id:  4, name: 'Diego Alves',     department: 'Produto',     role: 'Product Manager',    salary: 15000 },
  { id:  5, name: 'Elisa Rocha',     department: 'Engenharia',  role: 'Dev Pleno',          salary: 10000 },
  { id:  6, name: 'Felipe Santos',   department: 'Dados',       role: 'Data Scientist',     salary: 13000 },
  { id:  7, name: 'Gabriela Lima',   department: 'Design',      role: 'UI Designer',        salary: 9500  },
  { id:  8, name: 'Henrique Nunes',  department: 'Engenharia',  role: 'Dev Junior',         salary: 6000  },
  { id:  9, name: 'Isabela Ferreira',department: 'Dados',       role: 'Data Engineer',      salary: 12000 },
  { id: 10, name: 'João Oliveira',   department: 'Produto',     role: 'Product Designer',   salary: 10500 },
  { id: 11, name: 'Karina Batista',  department: 'Engenharia',  role: 'QA Engineer',        salary: 8500  },
  { id: 12, name: 'Lucas Pereira',   department: 'Dados',       role: 'BI Analyst',         salary: 9000  },
  { id: 13, name: 'Mariana Castro',  department: 'Design',      role: 'Motion Designer',    salary: 9000  },
  { id: 14, name: 'Nicolas Torres',  department: 'Engenharia',  role: 'DevOps Engineer',    salary: 13500 },
  { id: 15, name: 'Olivia Martins',  department: 'Produto',     role: 'Scrum Master',       salary: 11500 },
  { id: 16, name: 'Paulo Gomes',     department: 'Engenharia',  role: 'Dev Pleno',          salary: 10000 },
  { id: 17, name: 'Quinn Barbosa',   department: 'Dados',       role: 'ML Engineer',        salary: 16000 },
  { id: 18, name: 'Renata Souza',    department: 'Design',      role: 'Design Lead',        salary: 13000 },
  { id: 19, name: 'Samuel Pinto',    department: 'Engenharia',  role: 'Backend Engineer',   salary: 12000 },
  { id: 20, name: 'Tatiane Cardoso', department: 'Produto',     role: 'Product Analyst',    salary: 9500  },
  { id: 21, name: 'Ulisses Ramos',   department: 'Engenharia',  role: 'Frontend Engineer',  salary: 11000 },
  { id: 22, name: 'Vanessa Lopes',   department: 'Dados',       role: 'Data Analyst',       salary: 8500  },
  { id: 23, name: 'Wagner Freitas',  department: 'Engenharia',  role: 'Arquiteto',          salary: 20000 },
  { id: 24, name: 'Xenya Teixeira',  department: 'Produto',     role: 'UX Researcher',      salary: 10000 },
  { id: 25, name: 'Yago Monteiro',   department: 'Engenharia',  role: 'SRE',                salary: 14500 },
];

const PAGE_SIZE = 8;

@Component({
  selector: 'demo-data-table-with-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, DataTableEmptyComponent, PaginationComponent],
  template: `
    <div class="space-y-3">
      <n-data-table
        [nData]="pageData()"
        [nColumns]="columns"
      >
        <n-data-table-empty>Nenhum colaborador encontrado.</n-data-table-empty>
      </n-data-table>

      <div class="flex items-center justify-between">
        <span class="text-xs text-muted-foreground">
          {{ (page() - 1) * pageSize + 1 }}–{{ Math.min(page() * pageSize, total) }} de {{ total }} colaboradores
        </span>
        <n-pagination
          [(nPage)]="page"
          [nTotalItems]="total"
          [nPageSize]="pageSize"
          [nShowFirstLast]="true"
        />
      </div>
    </div>
  `,
})
export class DataTableWithPaginationDemo {
  protected readonly Math = Math;

  readonly page     = signal(1);
  readonly pageSize = PAGE_SIZE;
  readonly total    = ALL_EMPLOYEES.length;

  readonly pageData = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return ALL_EMPLOYEES.slice(start, start + PAGE_SIZE);
  });

  readonly columns: DataTableColumn<Employee>[] = [
    { key: 'id',         header: 'ID',          accessor: 'id',         align: 'right', width: '56px' },
    { key: 'name',       header: 'Nome',         accessor: 'name' },
    { key: 'department', header: 'Departamento', accessor: 'department' },
    { key: 'role',       header: 'Cargo',        accessor: 'role' },
    {
      key:      'salary',
      header:   'Salário',
      accessor: 'salary',
      align:    'right',
      cell:     (v) => (v as number).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    },
  ];
}
