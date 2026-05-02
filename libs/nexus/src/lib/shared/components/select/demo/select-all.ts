import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
} from '../index';

@Component({
  selector: 'demo-select-select-all',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent],
  template: `
    <div class="flex flex-col gap-2 w-full max-w-xs">
      <n-select
        [(nValues)]="values"
        [nMultiple]="true"
        [nSelectAll]="true"
        [nMaxSelections]="3"
        [nClearable]="true"
        nHint="Pick up to 3 tags"
      >
        <n-select-trigger nPlaceholder="Pick tags" />
        <n-select-content>
          <n-select-item nValue="bug" nLabel="Bug" />
          <n-select-item nValue="feature" nLabel="Feature" />
          <n-select-item nValue="docs" nLabel="Docs" />
          <n-select-item nValue="refactor" nLabel="Refactor" />
          <n-select-item nValue="test" nLabel="Test" />
          <n-select-item nValue="chore" nLabel="Chore" />
        </n-select-content>
      </n-select>
      <p class="text-xs text-muted-foreground">Selected: {{ values().join(', ') || 'none' }}</p>
    </div>
  `,
})
export class SelectSelectAllDemo {
  values = signal<string[]>([]);
}
