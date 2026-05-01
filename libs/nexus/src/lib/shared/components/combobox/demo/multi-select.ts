import { Component, signal } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { ComboboxContentComponent } from '../combobox-content.component';
import { ComboboxItemComponent } from '../combobox-item.component';
import { ComboboxTriggerComponent } from '../combobox-trigger.component';

@Component({
  selector: 'demo-combobox-multi-select',
  standalone: true,
  imports: [
    ComboboxComponent,
    ComboboxTriggerComponent,
    ComboboxContentComponent,
    ComboboxItemComponent,
  ],
  template: `
    <n-combobox [(nValues)]="values" [nMultiple]="true" class="w-64">
      <n-combobox-trigger nPlaceholder="Select skills..." />
      <n-combobox-content>
        <n-combobox-item nValue="angular" nLabel="Angular">Angular</n-combobox-item>
        <n-combobox-item nValue="react" nLabel="React">React</n-combobox-item>
        <n-combobox-item nValue="vue" nLabel="Vue">Vue</n-combobox-item>
        <n-combobox-item nValue="node" nLabel="Node.js">Node.js</n-combobox-item>
        <n-combobox-item nValue="python" nLabel="Python">Python</n-combobox-item>
      </n-combobox-content>
    </n-combobox>
    <p class="mt-2 text-sm text-muted-foreground">Selected: {{ values().join(', ') || 'none' }}</p>
  `,
})
export class ComboboxMultiSelectDemo {
  values = signal<string[]>([]);
}
