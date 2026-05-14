import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { DRAWER_CONTEXT } from './drawer.context';

@Component({
  selector: 'n-drawer-title',
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
export class DrawerTitleComponent {
  protected readonly ctx = inject(DRAWER_CONTEXT);
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('text-lg font-semibold leading-none tracking-tight', this.nClass()),
  );
}
