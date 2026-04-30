import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-dropdown-menu-separator',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'separator',
    'aria-orientation': 'horizontal',
    'data-slot': 'separator',
    '[class]': 'classes()',
  },
})
export class DropdownMenuSeparatorComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('-mx-1 my-1 block h-px bg-muted', this.nClass()),
  );
}
