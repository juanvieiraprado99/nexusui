import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'demo-badge-default',
  standalone: true,
  imports: [BadgeComponent],
  template: `<n-badge>Badge</n-badge>`,
})
export class BadgeDefaultDemo {}
