import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'demo-badge-sizes',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <n-badge nSize="sm">Small</n-badge>
      <n-badge nSize="default">Default</n-badge>
      <n-badge nSize="lg">Large</n-badge>
    </div>
  `,
})
export class BadgeSizesDemo {}
