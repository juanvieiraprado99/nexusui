import { Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton.component';

@Component({
  selector: 'demo-skeleton-shapes',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div class="flex items-center gap-6">
      <n-skeleton nShape="circle" nClass="h-16 w-16" />
      <n-skeleton nShape="circle" nClass="h-10 w-10" />
      <n-skeleton nShape="circle" nClass="h-8 w-8" />
      <n-skeleton nClass="h-16 w-16" />
      <n-skeleton nClass="h-10 w-24" />
      <n-skeleton nClass="h-8 w-32" />
    </div>
  `,
})
export class SkeletonShapesDemo {}
