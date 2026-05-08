import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'demo-pagination-compact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginationComponent],
  template: `
    <n-pagination [nTotalPages]="50" [(nPage)]="page" [nCompact]="true" />
  `,
})
export class PaginationCompactDemo {
  page = signal(1);
}
