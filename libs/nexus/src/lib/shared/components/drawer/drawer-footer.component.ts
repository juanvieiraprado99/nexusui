import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-drawer-footer',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'footer',
    '[class]': 'classes()',
  },
})
export class DrawerFooterComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 px-6 py-4 shrink-0', this.nClass()),
  );
}
