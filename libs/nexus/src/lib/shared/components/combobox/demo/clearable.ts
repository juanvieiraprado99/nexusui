import { Component, signal } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { ComboboxContentComponent } from '../combobox-content.component';
import { ComboboxItemComponent } from '../combobox-item.component';
import { ComboboxTriggerComponent } from '../combobox-trigger.component';

@Component({
  selector: 'demo-combobox-clearable',
  standalone: true,
  imports: [
    ComboboxComponent,
    ComboboxTriggerComponent,
    ComboboxContentComponent,
    ComboboxItemComponent,
  ],
  template: `
    <n-combobox [(nValue)]="value" [nClearable]="true" class="w-64">
      <n-combobox-trigger nPlaceholder="Select a color..." />
      <n-combobox-content>
        <n-combobox-item nValue="red" nLabel="Red">Red</n-combobox-item>
        <n-combobox-item nValue="green" nLabel="Green">Green</n-combobox-item>
        <n-combobox-item nValue="blue" nLabel="Blue">Blue</n-combobox-item>
        <n-combobox-item nValue="purple" nLabel="Purple">Purple</n-combobox-item>
      </n-combobox-content>
    </n-combobox>
  `,
})
export class ComboboxClearableDemo {
  value = signal('');
}
