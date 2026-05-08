import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'demo-pagination-default',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginationComponent],
  template: `
    <n-pagination [nTotalPages]="20" [(nPage)]="page" />
    <p class="mt-2 text-sm text-muted-foreground">Current page: {{ page() }}</p>
  `,
})
export class PaginationDefaultDemo {
  page = signal(1);
}
