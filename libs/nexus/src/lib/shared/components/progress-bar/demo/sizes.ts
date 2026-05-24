import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar.component';

@Component({
  selector: 'demo-progress-bar-sizes',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div class="flex flex-col gap-4 w-full">
      <n-progress-bar nSize="sm" [nValue]="40" nLabel="Small" />
      <n-progress-bar nSize="default" [nValue]="60" nLabel="Default" />
      <n-progress-bar nSize="lg" [nValue]="80" nLabel="Large" />
    </div>
  `,
})
export class ProgressBarDemoSizes {}
