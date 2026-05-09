import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { DIALOG_CONTEXT } from './dialog.context';

@Component({
  selector: 'n-dialog-title',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'title',
    'role': 'heading',
    'aria-level': '2',
    '[id]': 'ctx.titleId()',
    '[class]': 'classes()',
  },
})
export class DialogTitleComponent {
  protected readonly ctx = inject(DIALOG_CONTEXT);
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('text-lg font-semibold leading-none tracking-tight', this.nClass()),
  );
}
