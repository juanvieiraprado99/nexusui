import { Component, signal } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { ComboboxContentComponent } from '../combobox-content.component';
import { ComboboxEmptyComponent } from '../combobox-empty.component';
import { ComboboxGroupComponent } from '../combobox-group.component';
import { ComboboxItemComponent } from '../combobox-item.component';
import { ComboboxTriggerComponent } from '../combobox-trigger.component';

@Component({
  selector: 'demo-combobox-with-groups',
  standalone: true,
  imports: [
    ComboboxComponent,
    ComboboxTriggerComponent,
    ComboboxContentComponent,
    ComboboxItemComponent,
    ComboboxGroupComponent,
    ComboboxEmptyComponent,
  ],
  template: `
    <n-combobox [(nValue)]="value" class="w-64">
      <n-combobox-trigger nPlaceholder="Select a language..." />
      <n-combobox-content>
        <n-combobox-group nLabel="Frontend">
          <n-combobox-item nValue="typescript" nLabel="TypeScript">TypeScript</n-combobox-item>
          <n-combobox-item nValue="javascript" nLabel="JavaScript">JavaScript</n-combobox-item>
        </n-combobox-group>
        <n-combobox-group nLabel="Backend">
          <n-combobox-item nValue="go" nLabel="Go">Go</n-combobox-item>
          <n-combobox-item nValue="rust" nLabel="Rust">Rust</n-combobox-item>
          <n-combobox-item nValue="python" nLabel="Python">Python</n-combobox-item>
        </n-combobox-group>
        <n-combobox-empty class="py-6 text-center text-sm text-muted-foreground">
          No language found.
        </n-combobox-empty>
      </n-combobox-content>
    </n-combobox>
  `,
})
export class ComboboxWithGroupsDemo {
  value = signal('');
}
