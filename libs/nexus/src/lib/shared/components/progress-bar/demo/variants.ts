import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar.component';

@Component({
  selector: 'demo-progress-bar-variants',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div class="flex flex-col gap-4 w-full">
      <n-progress-bar nVariant="default" [nValue]="50" nLabel="Default" />
      <n-progress-bar nVariant="success" [nValue]="100" nLabel="Success" />
      <n-progress-bar nVariant="warning" [nValue]="70" nLabel="Warning" />
      <n-progress-bar nVariant="destructive" [nValue]="30" nLabel="Destructive" />
    </div>
  `,
})
export class ProgressBarDemoVariants {}
