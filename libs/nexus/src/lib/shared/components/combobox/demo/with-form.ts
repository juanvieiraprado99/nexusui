import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComboboxComponent } from '../combobox.component';
import { ComboboxContentComponent } from '../combobox-content.component';
import { ComboboxItemComponent } from '../combobox-item.component';
import { ComboboxTriggerComponent } from '../combobox-trigger.component';

@Component({
  selector: 'demo-combobox-with-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ComboboxComponent,
    ComboboxTriggerComponent,
    ComboboxContentComponent,
    ComboboxItemComponent,
  ],
  template: `
    <div class="flex flex-col gap-4">
      <n-combobox [formControl]="control" class="w-64">
        <n-combobox-trigger nPlaceholder="Select a country..." />
        <n-combobox-content>
          <n-combobox-item nValue="br" nLabel="Brazil">Brazil</n-combobox-item>
          <n-combobox-item nValue="us" nLabel="United States">United States</n-combobox-item>
          <n-combobox-item nValue="de" nLabel="Germany">Germany</n-combobox-item>
          <n-combobox-item nValue="jp" nLabel="Japan">Japan</n-combobox-item>
        </n-combobox-content>
      </n-combobox>

      @if (control.invalid && control.touched) {
        <p class="text-sm text-destructive" role="alert">Please select a country.</p>
      }

      <p class="text-sm text-muted-foreground">
        Value: {{ control.value || 'none' }} — Status: {{ control.status }}
      </p>
    </div>
  `,
})
export class ComboboxWithFormDemo {
  control = new FormControl('', Validators.required);
}
