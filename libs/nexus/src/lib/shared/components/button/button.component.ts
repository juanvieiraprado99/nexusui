import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { buttonVariants, type ButtonVariants } from './button.variants';

@Component({
  selector: 'n-button, button[n-button], a[n-button]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()' },
})
export class ButtonComponent {
  readonly nType = input<ButtonVariants['nType']>('default');
  readonly nSize = input<ButtonVariants['nSize']>('default');
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(buttonVariants({ nType: this.nType(), nSize: this.nSize() }), this.nClass()),
  );
}
