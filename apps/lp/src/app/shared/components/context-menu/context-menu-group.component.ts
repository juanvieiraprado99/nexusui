import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'n-context-menu-group',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'group',
    '[class]': 'nClass()',
  },
})
export class ContextMenuGroupComponent {
  readonly nClass = input<string>('');
}
