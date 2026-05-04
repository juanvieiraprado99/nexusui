import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let _groupIdCounter = 0;

@Component({
  selector: 'n-combobox-group',
  standalone: true,
  template: `
    @if (nLabel()) {
      <div
        [id]="labelId"
        class="px-2 py-1.5 text-xs font-semibold text-muted-foreground"
        data-slot="group-label"
      >
        {{ nLabel() }}
      </div>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'group',
    '[attr.aria-labelledby]': 'nLabel() ? labelId : null',
  },
})
export class ComboboxGroupComponent {
  readonly nLabel = input<string>('');
  protected readonly labelId = `n-combobox-group-${++_groupIdCounter}`;
}
