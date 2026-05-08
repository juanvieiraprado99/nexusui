import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'demo-pagination-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginationComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-pagination [nTotalPages]="10" [(nPage)]="page" nSize="sm" />
      <n-pagination [nTotalPages]="10" [(nPage)]="page" nSize="default" />
      <n-pagination [nTotalPages]="10" [(nPage)]="page" nSize="lg" />
    </div>
  `,
})
export class PaginationSizesDemo {
  page = signal(5);
}
