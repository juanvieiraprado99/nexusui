import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-skeleton',
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
})
export class SkeletonComponent {
  readonly nShape = input<'default' | 'circle'>('default');
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'block animate-pulse bg-muted',
      this.nShape() === 'circle' ? 'rounded-full' : 'rounded-md',
      this.nClass(),
    ),
  );
}
