import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { mergeClasses } from '../../utils/merge-classes';
import {
  progressBarFillVariants,
  progressBarTrackVariants,
  type ProgressBarFillVariants,
  type ProgressBarTrackVariants,
} from './progress-bar.variants';

export type ProgressBarAnimation = 'slide' | 'bounce' | 'pulse';

@Component({
  selector: 'n-progress-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="trackClasses()"
      role="progressbar"
      [attr.aria-valuenow]="nIndeterminate() ? null : clampedValue()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-label]="nLabel() || null"
      [attr.aria-busy]="nIndeterminate() ? true : null"
      [attr.data-state]="nIndeterminate() ? 'indeterminate' : 'determinate'"
      data-slot="root"
    >
      <div
        [class]="fillClasses()"
        [style.width]="nIndeterminate() ? null : clampedValue() + '%'"
        data-slot="fill"
      ></div>
    </div>
    @if (nShowValue() && !nIndeterminate()) {
      <span
        aria-hidden="true"
        class="mt-1 block text-right text-xs tabular-nums text-muted-foreground"
        data-slot="value-label"
      >{{ clampedValue() }}%</span>
    }
  `,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ProgressBarComponent {
  readonly nValue = input<number>(0);
  readonly nVariant = input<ProgressBarFillVariants['nVariant']>('default');
  readonly nSize = input<ProgressBarTrackVariants['nSize']>('default');
  readonly nIndeterminate = input<boolean>(false);
  readonly nAnimation = input<ProgressBarAnimation>('slide');
  readonly nStriped = input<boolean>(false);
  readonly nLabel = input<string>('');
  readonly nShowValue = input<boolean>(false);
  readonly nAnimated = input<boolean>(true);
  readonly nClass = input<string>('');
  readonly nBarClass = input<string>('');

  protected readonly clampedValue = computed(() => Math.min(100, Math.max(0, this.nValue())));

  protected readonly hostClasses = computed(() => mergeClasses('block w-full', this.nClass()));

  protected readonly trackClasses = computed(() =>
    progressBarTrackVariants({ nSize: this.nSize() }),
  );

  protected readonly fillClasses = computed(() => {
    const isIndeterminate = this.nIndeterminate();
    const animation = this.nAnimation();
    const striped = this.nStriped();
    const animated = this.nAnimated();

    return mergeClasses(
      progressBarFillVariants({ nVariant: this.nVariant() }),
      'h-full rounded-full',
      striped && 'progress-bar-striped',
      striped && (isIndeterminate || animated) && 'progress-bar-striped-animated',
      !isIndeterminate && animated && 'transition-[width] duration-500 ease-in-out',
      isIndeterminate && animation === 'slide' && 'animate-progress-indeterminate w-1/2',
      isIndeterminate && animation === 'bounce' && 'animate-progress-bounce w-1/2',
      isIndeterminate && animation === 'pulse' && 'animate-progress-pulse w-full',
      this.nBarClass(),
    );
  });
}
