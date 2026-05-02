import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
} from '../index';

@Component({
  selector: 'demo-select-default',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent],
  template: `
    <n-select [(nValue)]="value" class="w-full max-w-xs">
      <n-select-trigger nPlaceholder="Pick a fruit" />
      <n-select-content>
        <n-select-item nValue="apple" nLabel="Apple" />
        <n-select-item nValue="banana" nLabel="Banana" />
        <n-select-item nValue="cherry" nLabel="Cherry" />
        <n-select-item nValue="date" nLabel="Date" />
        <n-select-item nValue="elderberry" nLabel="Elderberry" />
      </n-select-content>
    </n-select>
  `,
})
export class SelectDefaultDemo {
  value = signal('');
}
