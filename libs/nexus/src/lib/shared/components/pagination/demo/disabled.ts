import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'demo-pagination-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PaginationComponent],
  template: `
    <n-pagination [nTotalPages]="10" [nPage]="5" [nDisabled]="true" />
  `,
})
export class PaginationDisabledDemo {}
