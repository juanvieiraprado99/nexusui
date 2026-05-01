import { Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton.component';

@Component({
  selector: 'demo-skeleton-default',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div class="flex flex-col gap-2 w-64">
      <n-skeleton nClass="h-4 w-full" />
      <n-skeleton nClass="h-4 w-full" />
      <n-skeleton nClass="h-4 w-3/4" />
    </div>
  `,
})
export class SkeletonDefaultDemo {}
