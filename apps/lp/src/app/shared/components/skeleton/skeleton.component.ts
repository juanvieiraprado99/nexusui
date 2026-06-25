import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '@/shared/utils/merge-classes';
import { skeletonVariants, type SkeletonVariants } from './skeleton.variants';

@Component({
  selector: 'n-skeleton',
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[style.background-color]': 'nColor() || null',
    '[attr.aria-hidden]': 'true',
  },
})
export class SkeletonComponent {
  /** Any CSS color (e.g. '#f87171', 'rgb(...)', 'oklch(...)'). Empty falls back to `bg-muted`. */
  readonly nColor = input<string>('');
  readonly nShape = input<SkeletonVariants['nShape']>('default');
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      skeletonVariants({ nShape: this.nShape() }),
      this.nClass(),
    ),
  );
}
