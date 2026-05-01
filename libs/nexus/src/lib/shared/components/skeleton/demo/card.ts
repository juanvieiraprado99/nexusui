import { Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton.component';

@Component({
  selector: 'demo-skeleton-card',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div class="flex items-center gap-4 w-72">
      <n-skeleton nShape="circle" nClass="h-12 w-12 shrink-0" />
      <div class="flex flex-col gap-2 flex-1">
        <n-skeleton nClass="h-4 w-full" />
        <n-skeleton nClass="h-4 w-4/5" />
        <n-skeleton nClass="h-3 w-1/2" />
      </div>
    </div>
  `,
})
export class SkeletonCardDemo {}
