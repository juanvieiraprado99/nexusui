import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar.component';

@Component({
  selector: 'demo-progress-bar-indeterminate',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `<n-progress-bar [nIndeterminate]="true" nLabel="Loading…" />`,
})
export class ProgressBarDemoIndeterminate {}
