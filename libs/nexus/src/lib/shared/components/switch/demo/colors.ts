import { Component } from '@angular/core';
import { SwitchComponent } from '../switch.component';

@Component({
  selector: 'demo-switch-colors',
  standalone: true,
  imports: [SwitchComponent],
  template: `
    <div class="flex flex-col gap-3">
      <n-switch nColor="default" nLabel="Default" [nChecked]="true" />
      <n-switch nColor="success" nLabel="Success" [nChecked]="true" />
      <n-switch nColor="danger"  nLabel="Danger"  [nChecked]="true" />
      <n-switch nColor="warning" nLabel="Warning" [nChecked]="true" />
    </div>
  `,
})
export class SwitchDemoColors {}
