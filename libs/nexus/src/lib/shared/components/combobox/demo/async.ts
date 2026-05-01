import { Component, signal } from '@angular/core';
import { ComboboxComponent } from '../combobox.component';
import { ComboboxContentComponent } from '../combobox-content.component';
import { ComboboxEmptyComponent } from '../combobox-empty.component';
import { ComboboxItemComponent } from '../combobox-item.component';
import { ComboboxTriggerComponent } from '../combobox-trigger.component';

const ALL_ITEMS = [
  { value: 'angular', label: 'Angular' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'astro', label: 'Astro' },
];

@Component({
  selector: 'demo-combobox-async',
  standalone: true,
  imports: [
    ComboboxComponent,
    ComboboxTriggerComponent,
    ComboboxContentComponent,
    ComboboxItemComponent,
    ComboboxEmptyComponent,
  ],
  template: `
    <n-combobox
      [(nValue)]="value"
      [nLoading]="loading()"
      (nFilterChange)="onFilter($event)"
      class="w-64"
    >
      <n-combobox-trigger nPlaceholder="Search frameworks..." />
      <n-combobox-content>
        @for (item of items(); track item.value) {
          <n-combobox-item [nValue]="item.value" [nLabel]="item.label">
            {{ item.label }}
          </n-combobox-item>
        }
        <n-combobox-empty class="py-6 text-center text-sm text-muted-foreground">
          No results found.
        </n-combobox-empty>
      </n-combobox-content>
    </n-combobox>
  `,
})
export class ComboboxAsyncDemo {
  value = signal('');
  loading = signal(false);
  items = signal(ALL_ITEMS);

  private _timer: ReturnType<typeof setTimeout> | null = null;

  onFilter(query: string): void {
    if (this._timer) clearTimeout(this._timer);
    this.loading.set(true);
    this._timer = setTimeout(() => {
      this.items.set(
        ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase())),
      );
      this.loading.set(false);
    }, 400);
  }
}
