import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'demo-pagination-with-page-size',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginationComponent],
  template: `
    <n-pagination
      [nTotalItems]="243"
      [(nPage)]="page"
      [(nPageSize)]="pageSize"
      [nShowPageSizeSelector]="true"
      [nPageSizeOptions]="[10, 25, 50]" />
    <p class="mt-2 text-sm text-muted-foreground">
      Page {{ page() }} — {{ pageSize() }} rows per page
    </p>
  `,
})
export class PaginationWithPageSizeDemo {
  page     = signal(1);
  pageSize = signal(10);
}
