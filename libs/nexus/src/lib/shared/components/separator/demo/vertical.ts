import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeparatorComponent } from '../index';

@Component({
  selector: 'demo-separator-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeparatorComponent],
  template: `
    <div class="flex h-12 items-center gap-3 text-sm">
      <span>Profile</span>
      <n-separator nOrientation="vertical" />
      <span>Settings</span>
      <n-separator nOrientation="vertical" />
      <span>Logout</span>
    </div>
  `,
})
export class SeparatorVerticalDemo {}
