import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-sidebar-menu-item',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'menu-item',
    'role': 'listitem',
  },
})
export class SidebarMenuItemComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('group/menu-item relative flex flex-col', this.nClass()),
  );
}
