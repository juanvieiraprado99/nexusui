import { Component } from '@angular/core';
import { DataTableComponent } from '../data-table.component';
import { DataTableEmptyComponent } from '../data-table-empty.component';
import { DataTableColumn } from '../data-table.types';

interface Product {
  name: string;
  category: string;
  price: number;
  stock: number;
}

const PRODUCTS: Product[] = [
  { name: 'Teclado Mecânico', category: 'Periféricos', price: 349.90, stock: 12 },
  { name: 'Monitor 27"', category: 'Monitores', price: 1899.00, stock: 4 },
  { name: 'Mouse Sem Fio', category: 'Periféricos', price: 129.90, stock: 30 },
  { name: 'Headset USB', category: 'Áudio', price: 249.90, stock: 8 },
  { name: 'Webcam HD', category: 'Câmeras', price: 189.90, stock: 15 },
];

@Component({
  selector: 'demo-data-table-sortable',
  standalone: true,
  imports: [DataTableComponent, DataTableEmptyComponent],
  template: `
    <n-data-table [nData]="products" [nColumns]="columns">
      <n-data-table-empty>Nenhum produto encontrado.</n-data-table-empty>
    </n-data-table>
  `,
})
export class DataTableSortableDemo {
  readonly products = PRODUCTS;

  readonly columns: DataTableColumn<Product>[] = [
    { key: 'name', header: 'Produto', accessor: 'name', sortable: true },
    { key: 'category', header: 'Categoria', accessor: 'category', sortable: true },
    {
      key: 'price',
      header: 'Preço',
      accessor: 'price',
      sortable: true,
      align: 'right',
      cell: (v) => `R$ ${(v as number).toFixed(2)}`,
    },
    { key: 'stock', header: 'Estoque', accessor: 'stock', sortable: true, align: 'right' },
  ];
}
