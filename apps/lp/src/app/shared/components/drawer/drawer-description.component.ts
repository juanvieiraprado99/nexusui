import { ChangeDetectionStrategy, Component, OnDestroy, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { DRAWER_CONTEXT } from './drawer.context';

@Component({
  selector: 'n-drawer-description',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'description',
    '[id]': 'ctx.descriptionId()',
    '[class]': 'classes()',
  },
})
export class DrawerDescriptionComponent implements OnDestroy {
  protected readonly ctx = inject(DRAWER_CONTEXT);
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('text-sm text-muted-foreground', this.nClass()),
  );

  constructor() {
    this.ctx.setHasDescription(true);
  }

  ngOnDestroy(): void {
    this.ctx.setHasDescription(false);
  }
}
