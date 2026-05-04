import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { badgeVariants, type BadgeVariants } from './badge.variants';

@Component({
  selector: 'n-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': 'classes()',
    'data-slot': 'badge',
  },
})
export class BadgeComponent {
  readonly nVariant = input<BadgeVariants['nVariant']>('default');
  readonly nClass   = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(badgeVariants({ nVariant: this.nVariant() }), this.nClass()),
  );
}
