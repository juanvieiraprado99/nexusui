import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'demo-badge-variants',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <n-badge nVariant="default">Default</n-badge>
      <n-badge nVariant="secondary">Secondary</n-badge>
      <n-badge nVariant="destructive">Destructive</n-badge>
      <n-badge nVariant="outline">Outline</n-badge>
      <n-badge nVariant="success">Success</n-badge>
      <n-badge nVariant="warning">Warning</n-badge>
    </div>
  `,
})
export class BadgeVariantsDemo {}
