import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar.component';

@Component({
  selector: 'demo-progress-bar-default',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `<n-progress-bar [nValue]="60" nLabel="Loading" />`,
})
export class ProgressBarDemoDefault {}
