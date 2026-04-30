import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-dropdown-menu-label',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'label',
    '[class]': 'classes()',
    '[attr.data-inset]': 'nInset() ? "" : null',
  },
})
export class DropdownMenuLabelComponent {
  readonly nInset = input<boolean>(false);
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'px-2 py-1.5 text-sm font-semibold',
      this.nInset() && 'pl-8',
      this.nClass(),
    ),
  );
}
