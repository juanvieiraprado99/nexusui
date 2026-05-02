import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeparatorComponent } from '../index';

@Component({
  selector: 'demo-separator-gradient',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeparatorComponent],
  template: `
    <div class="w-full max-w-sm space-y-3 text-sm">
      <p>Fade-out edges</p>
      <n-separator [nGradient]="true" />
      <p>Subtle section break</p>
    </div>
  `,
})
export class SeparatorGradientDemo {}
