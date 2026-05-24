import { Component, signal } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar.component';

@Component({
  selector: 'demo-progress-bar-show-value',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div class="flex flex-col gap-6 w-full">
      <n-progress-bar [nValue]="progress()" [nShowValue]="true" nLabel="Upload progress" />
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-accent"
          (click)="decrement()"
        >−10</button>
        <button
          type="button"
          class="rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-accent"
          (click)="increment()"
        >+10</button>
      </div>
    </div>
  `,
})
export class ProgressBarDemoShowValue {
  protected readonly progress = signal(40);

  protected increment(): void {
    this.progress.update((v) => Math.min(100, v + 10));
  }

  protected decrement(): void {
    this.progress.update((v) => Math.max(0, v - 10));
  }
}
