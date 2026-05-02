import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
} from '../index';

@Component({
  selector: 'demo-select-loading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent],
  template: `
    <n-select [(nValue)]="value" [nLoading]="true" class="w-full max-w-xs">
      <n-select-trigger nPlaceholder="Loading options..." />
      <n-select-content>
        <n-select-item nValue="a" nLabel="Alpha" />
        <n-select-item nValue="b" nLabel="Beta" />
        <n-select-item nValue="c" nLabel="Gamma" />
      </n-select-content>
    </n-select>
  `,
})
export class SelectLoadingDemo {
  value = signal('');
}
