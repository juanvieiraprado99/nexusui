import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-sidebar-content',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'content',
  },
})
export class SidebarContentComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('flex flex-1 flex-col gap-1 overflow-auto p-2', this.nClass()),
  );
}
