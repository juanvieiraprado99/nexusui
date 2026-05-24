import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar.component';

@Component({
  selector: 'demo-progress-bar-animations',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div class="flex flex-col gap-6 w-full">
      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted-foreground">slide (default)</span>
        <n-progress-bar [nIndeterminate]="true" nAnimation="slide" nLabel="Slide" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted-foreground">bounce</span>
        <n-progress-bar [nIndeterminate]="true" nAnimation="bounce" nLabel="Bounce" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted-foreground">pulse</span>
        <n-progress-bar [nIndeterminate]="true" nAnimation="pulse" nLabel="Pulse" />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted-foreground">striped + animated</span>
        <n-progress-bar [nIndeterminate]="true" [nStriped]="true" nLabel="Striped indeterminate" />
      </div>
    </div>
  `,
})
export class ProgressBarDemoAnimations {}
