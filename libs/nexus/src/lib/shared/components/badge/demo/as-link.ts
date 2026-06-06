import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'demo-badge-as-link',
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <a n-badge href="#" nVariant="default">Link</a>
      <a n-badge href="#" nVariant="outline">Docs</a>
      <a n-badge href="#" nVariant="secondary">v1.0.0</a>
    </div>
  `,
})
export class BadgeAsLinkDemo {}
