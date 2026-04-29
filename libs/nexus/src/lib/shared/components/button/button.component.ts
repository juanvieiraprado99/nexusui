import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed, output } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { buttonVariants, type ButtonVariants } from './button.variants';

@Component({
  selector: 'n-button, button[n-button], a[n-button]',
  standalone: true,
  template: `
    @if (nLoading()) {
      <span class="animate-spin h-4 w-4 shrink-0 rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.type]': 'nType()',
    '[attr.role]': '"button"',
    '[attr.disabled]': 'nDisabled() || nLoading() ? true : null',
    '[attr.aria-busy]': 'nLoading()',
    '[attr.aria-disabled]': 'nDisabled() || nLoading()',
    '(click)': 'handleClick($event)',
  },
})
export class ButtonComponent {
  readonly nVariant    = input<ButtonVariants['nVariant']>('default');
  readonly nSize       = input<ButtonVariants['nSize']>('default');
  readonly nType = input<'button' | 'submit' | 'reset'>('button');
  readonly nClass      = input<string>('');
  readonly nLoading    = input<boolean>(false);
  readonly nDisabled   = input<boolean>(false);

  readonly onClick = output<Event>();

  protected readonly classes = computed(() =>
    mergeClasses(buttonVariants({ nVariant: this.nVariant(), nSize: this.nSize() }), this.nClass()),
  );

  protected handleClick(event: Event): void {
    if (this.nDisabled() || this.nLoading()) {
      event.preventDefault();
      return;
    }
    this.onClick.emit(event);
  }
}
