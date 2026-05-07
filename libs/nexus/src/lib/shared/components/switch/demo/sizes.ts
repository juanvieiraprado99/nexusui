import { Component } from '@angular/core';
import { SwitchComponent } from '../switch.component';

@Component({
  selector: 'demo-switch-sizes',
  standalone: true,
  imports: [SwitchComponent],
  template: `
    <div class="flex items-center gap-6">
      <n-switch nSize="sm"      nLabel="Small"   [nChecked]="true" />
      <n-switch nSize="default" nLabel="Default" [nChecked]="true" />
      <n-switch nSize="lg"      nLabel="Large"   [nChecked]="true" />
    </div>
  `,
})
export class SwitchDemoSizes {}
