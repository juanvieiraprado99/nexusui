import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-sidebar-separator',
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'role': 'separator',
    'aria-orientation': 'horizontal',
    'data-slot': 'separator',
  },
})
export class SidebarSeparatorComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('mx-2 my-1 h-px bg-border', this.nClass()),
  );
}
