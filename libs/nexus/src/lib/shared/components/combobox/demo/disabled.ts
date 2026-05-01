import { Component, signal } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { ComboboxContentComponent } from '../combobox-content.component';
import { ComboboxItemComponent } from '../combobox-item.component';
import { ComboboxTriggerComponent } from '../combobox-trigger.component';

@Component({
  selector: 'demo-combobox-disabled',
  standalone: true,
  imports: [
    ComboboxComponent,
    ComboboxTriggerComponent,
    ComboboxContentComponent,
    ComboboxItemComponent,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <n-combobox [(nValue)]="value" [nDisabled]="true" class="w-64">
        <n-combobox-trigger nPlaceholder="Select an option..." />
        <n-combobox-content>
          <n-combobox-item nValue="a" nLabel="Option A">Option A</n-combobox-item>
          <n-combobox-item nValue="b" nLabel="Option B">Option B</n-combobox-item>
        </n-combobox-content>
      </n-combobox>

      <n-combobox [(nValue)]="value2" class="w-64">
        <n-combobox-trigger nPlaceholder="With disabled items..." />
        <n-combobox-content>
          <n-combobox-item nValue="a" nLabel="Available">Available</n-combobox-item>
          <n-combobox-item nValue="b" nLabel="Disabled" [nDisabled]="true">Disabled</n-combobox-item>
          <n-combobox-item nValue="c" nLabel="Also available">Also available</n-combobox-item>
        </n-combobox-content>
      </n-combobox>
    </div>
  `,
})
export class ComboboxDisabledDemo {
  value = signal('');
  value2 = signal('');
}
