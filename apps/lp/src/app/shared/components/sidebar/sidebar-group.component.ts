import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-sidebar-group',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'group',
  },
})
export class SidebarGroupComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('relative flex w-full min-w-0 flex-col py-2', this.nClass()),
  );
}
