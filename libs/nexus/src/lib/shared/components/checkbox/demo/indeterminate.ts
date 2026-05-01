import { Component, computed, signal } from '@angular/core';
import { CheckboxComponent } from '../checkbox.component';

@Component({
  selector: 'demo-checkbox-indeterminate',
  standalone: true,
  imports: [CheckboxComponent],
  template: `
    <div class="flex flex-col gap-3">
      <n-checkbox
        nLabel="Select all"
        [nChecked]="allChecked()"
        [nIndeterminate]="someChecked()"
        (nChange)="toggleAll($event)"
      />
      <div class="ml-6 flex flex-col gap-2">
        @for (item of items(); track item.id) {
          <n-checkbox
            [nLabel]="item.label"
            [nChecked]="item.checked"
            (nChange)="toggle(item.id, $event)"
          />
        }
      </div>
    </div>
  `,
})
export class CheckboxDemoIndeterminate {
  protected readonly items = signal([
    { id: 1, label: 'Dashboard access', checked: true },
    { id: 2, label: 'Settings access', checked: false },
    { id: 3, label: 'Reports access', checked: true },
  ]);

  protected readonly allChecked  = computed(() => this.items().every((i) => i.checked));
  protected readonly someChecked = computed(() => !this.allChecked() && this.items().some((i) => i.checked));

  protected toggle(id: number, checked: boolean): void {
    this.items.update((items) => items.map((i) => (i.id === id ? { ...i, checked } : i)));
  }

  protected toggleAll(checked: boolean): void {
    this.items.update((items) => items.map((i) => ({ ...i, checked })));
  }
}
