import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-drawer-header',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'header',
    '[class]': 'classes()',
  },
})
export class DrawerHeaderComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('flex flex-col gap-1.5 px-6 py-4 shrink-0', this.nClass()),
  );
}
