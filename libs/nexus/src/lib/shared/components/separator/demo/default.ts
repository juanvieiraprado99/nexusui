import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeparatorComponent } from '../index';

@Component({
  selector: 'demo-separator-default',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeparatorComponent],
  template: `
    <div class="w-full max-w-sm space-y-3 text-sm">
      <p>Above separator</p>
      <n-separator />
      <p>Below separator</p>
    </div>
  `,
})
export class SeparatorDefaultDemo {}
