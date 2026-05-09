import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-dialog-header',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'header',
    '[class]': 'classes()',
  },
})
export class DialogHeaderComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('flex flex-col gap-1.5 text-center sm:text-left', this.nClass()),
  );
}
