import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { DIALOG_CONTEXT } from './dialog.context';

@Component({
  selector: 'n-dialog-description',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'description',
    '[id]': 'ctx.descriptionId()',
    '[class]': 'classes()',
  },
})
export class DialogDescriptionComponent {
  protected readonly ctx = inject(DIALOG_CONTEXT);
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('text-sm text-muted-foreground', this.nClass()),
  );
}
