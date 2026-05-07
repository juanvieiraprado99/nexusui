import { Component, signal } from '@angular/core';
import { SwitchComponent } from '../switch.component';

@Component({
  selector: 'demo-switch-loading',
  standalone: true,
  imports: [SwitchComponent],
  template: `
    <div class="flex flex-col gap-3">
      <n-switch [nLoading]="true"  nLabel="Saving changes…" [nChecked]="true" />
      <n-switch [nLoading]="false" nLabel="Ready"           [(nChecked)]="enabled" />
    </div>
  `,
})
export class SwitchDemoLoading {
  enabled = signal(false);
}
