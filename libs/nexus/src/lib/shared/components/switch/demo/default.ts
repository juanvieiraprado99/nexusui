import { Component, signal } from '@angular/core';
import { SwitchComponent } from '../switch.component';

@Component({
  selector: 'demo-switch-default',
  standalone: true,
  imports: [SwitchComponent],
  template: `<n-switch [(nChecked)]="enabled" nLabel="Enable notifications" />`,
})
export class SwitchDemoDefault {
  enabled = signal(false);
}
