import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar.component';

@Component({
  selector: 'demo-progress-bar-striped',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div class="flex flex-col gap-4 w-full">
      <n-progress-bar [nValue]="60" [nStriped]="true" nLabel="Striped" />
      <n-progress-bar [nValue]="60" [nStriped]="true" nVariant="success" nLabel="Striped success" />
      <n-progress-bar [nValue]="60" [nStriped]="true" nVariant="warning" nLabel="Striped warning" />
    </div>
  `,
})
export class ProgressBarDemoStriped {}
