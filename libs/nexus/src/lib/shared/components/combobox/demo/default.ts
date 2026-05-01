import { Component, signal } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { ComboboxContentComponent } from '../combobox-content.component';
import { ComboboxItemComponent } from '../combobox-item.component';
import { ComboboxTriggerComponent } from '../combobox-trigger.component';

@Component({
  selector: 'demo-combobox-default',
  standalone: true,
  imports: [
    ComboboxComponent,
    ComboboxTriggerComponent,
    ComboboxContentComponent,
    ComboboxItemComponent,
  ],
  template: `
    <n-combobox [(nValue)]="value" class="w-64">
      <n-combobox-trigger nPlaceholder="Select a framework..." />
      <n-combobox-content>
        <n-combobox-item nValue="angular" nLabel="Angular">Angular</n-combobox-item>
        <n-combobox-item nValue="react" nLabel="React">React</n-combobox-item>
        <n-combobox-item nValue="vue" nLabel="Vue">Vue</n-combobox-item>
        <n-combobox-item nValue="svelte" nLabel="Svelte">Svelte</n-combobox-item>
        <n-combobox-item nValue="solid" nLabel="SolidJS">SolidJS</n-combobox-item>
      </n-combobox-content>
    </n-combobox>
    <p class="mt-2 text-sm text-muted-foreground">Selected: {{ value() || 'none' }}</p>
  `,
})
export class ComboboxDefaultDemo {
  value = signal('');
}
