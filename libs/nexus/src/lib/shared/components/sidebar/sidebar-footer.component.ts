import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-sidebar-footer',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'footer',
  },
})
export class SidebarFooterComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('flex flex-col gap-2 p-4', this.nClass()),
  );
}
