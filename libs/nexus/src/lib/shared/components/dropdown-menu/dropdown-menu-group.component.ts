import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'n-dropdown-menu-group',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'group',
    '[class]': 'nClass()',
  },
})
export class DropdownMenuGroupComponent {
  readonly nClass = input<string>('');
}
