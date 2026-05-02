import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
} from '../index';

@Component({
  selector: 'demo-select-multiple',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent],
  template: `
    <n-select
      [(nValues)]="values"
      [nMultiple]="true"
      [nClearable]="true"
      nMultiSummary="list"
      class="w-full max-w-xs"
    >
      <n-select-trigger nPlaceholder="Pick languages" />
      <n-select-content>
        <n-select-item nValue="ts" nLabel="TypeScript" />
        <n-select-item nValue="js" nLabel="JavaScript" />
        <n-select-item nValue="py" nLabel="Python" />
        <n-select-item nValue="go" nLabel="Go" />
        <n-select-item nValue="rs" nLabel="Rust" />
        <n-select-item nValue="kt" nLabel="Kotlin" />
      </n-select-content>
    </n-select>
  `,
})
export class SelectMultipleDemo {
  values = signal<string[]>(['ts', 'rs']);
}
