import { Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton.component';

@Component({
  selector: 'demo-skeleton-colors',
  standalone: true,
  imports: [SkeletonComponent],
  template: `
    <div class="flex flex-col gap-4 w-64">
      <div class="flex items-center gap-3">
        <n-skeleton nClass="h-8 w-8 shrink-0" />
        <div class="flex flex-col gap-2 flex-1">
          <n-skeleton nClass="h-3 w-full" />
          <n-skeleton nClass="h-3 w-2/3" />
        </div>
      </div>
      <div class="flex items-center gap-3">
        <n-skeleton nColor="#f87171" nClass="h-8 w-8 shrink-0" />
        <div class="flex flex-col gap-2 flex-1">
          <n-skeleton nColor="#f87171" nClass="h-3 w-full" />
          <n-skeleton nColor="#f87171" nClass="h-3 w-2/3" />
        </div>
      </div>
      <div class="flex items-center gap-3">
        <n-skeleton nColor="rgb(167 139 250)" nClass="h-8 w-8 shrink-0" />
        <div class="flex flex-col gap-2 flex-1">
          <n-skeleton nColor="rgb(167 139 250)" nClass="h-3 w-full" />
          <n-skeleton nColor="rgb(167 139 250)" nClass="h-3 w-2/3" />
        </div>
      </div>
      <div class="flex items-center gap-3">
        <n-skeleton nColor="oklch(0.7 0.12 200)" nClass="h-8 w-8 shrink-0" />
        <div class="flex flex-col gap-2 flex-1">
          <n-skeleton nColor="oklch(0.7 0.12 200)" nClass="h-3 w-full" />
          <n-skeleton nColor="oklch(0.7 0.12 200)" nClass="h-3 w-2/3" />
        </div>
      </div>
      <div class="flex items-center gap-3">
        <n-skeleton nColor="#34d399" nClass="h-8 w-8 shrink-0" />
        <div class="flex flex-col gap-2 flex-1">
          <n-skeleton nColor="#34d399" nClass="h-3 w-full" />
          <n-skeleton nColor="#34d399" nClass="h-3 w-2/3" />
        </div>
      </div>
    </div>
  `,
})
export class SkeletonColorsDemo {}
