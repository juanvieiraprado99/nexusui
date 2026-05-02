import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeparatorComponent } from '../index';

@Component({
  selector: 'demo-separator-variants',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeparatorComponent],
  template: `
    <div class="w-full max-w-sm space-y-4 text-xs text-muted-foreground">
      <div>
        <p>solid</p>
        <n-separator nVariant="solid" />
      </div>
      <div>
        <p>dashed</p>
        <n-separator nVariant="dashed" />
      </div>
      <div>
        <p>dotted</p>
        <n-separator nVariant="dotted" />
      </div>
      <div>
        <p>large + strong</p>
        <n-separator nSize="lg" nIntensity="strong" />
      </div>
    </div>
  `,
})
export class SeparatorVariantsDemo {}
