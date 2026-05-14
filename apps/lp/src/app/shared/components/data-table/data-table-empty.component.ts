import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-data-table-empty',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'empty-content',
  },
})
export class DataTableEmptyComponent {
  readonly nClass = input<string>('');

  protected classes(): string {
    return mergeClasses('flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground', this.nClass());
  }
}
