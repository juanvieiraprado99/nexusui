import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
} from '../index';

@Component({
  selector: 'demo-select-with-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    SelectTriggerComponent,
    SelectContentComponent,
    SelectItemComponent,
  ],
  template: `
    <form class="flex flex-col gap-3 w-full max-w-xs" (ngSubmit)="submit()">
      <n-select
        [formControl]="role"
        nLabel="Role"
        [nRequired]="true"
        nError="Please pick a role"
      >
        <n-select-trigger nPlaceholder="Choose role" />
        <n-select-content>
          <n-select-item nValue="admin" nLabel="Admin" />
          <n-select-item nValue="editor" nLabel="Editor" />
          <n-select-item nValue="viewer" nLabel="Viewer" />
        </n-select-content>
      </n-select>

      <button
        type="submit"
        class="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground"
      >
        Save
      </button>

      <p class="text-xs text-muted-foreground">
        Value: {{ role.value || '∅' }} · Status: {{ role.status }}
      </p>
    </form>
  `,
})
export class SelectWithFormDemo {
  role = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  submit(): void {
    this.role.markAllAsTouched();
  }
}
