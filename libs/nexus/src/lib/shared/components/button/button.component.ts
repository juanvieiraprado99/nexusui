import { Component, ChangeDetectionStrategy, input, computed, output, inject } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { buttonVariants, type ButtonVariants } from './button.variants';
import { BUTTON_GROUP_CONTEXT } from '../button-group/button-group.tokens';

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
  host: {
    '[class]': 'classes()',
    '[attr.type]': 'nType()',
    '[attr.role]': '"button"',
    '[attr.disabled]': 'isDisabled() || nLoading() ? true : null',
    '[attr.aria-busy]': 'nLoading()',
    '[attr.aria-disabled]': 'isDisabled() || nLoading()',
    '(click)': 'handleClick($event)',
  },
})
export class ButtonComponent {
  private readonly group = inject(BUTTON_GROUP_CONTEXT, { optional: true });

  readonly nVariant    = input<ButtonVariants['nVariant']>('default');
  readonly nSize       = input<ButtonVariants['nSize']>('default');
  readonly nType = input<'button' | 'submit' | 'reset'>('button');
  readonly nClass      = input<string>('');
  readonly nLoading    = input<boolean>(false);
  readonly nDisabled   = input<boolean>(false);

  readonly nClick = output<Event>();

  protected readonly isDisabled = computed(() => this.nDisabled() || (this.group?.nDisabled() ?? false));

  protected readonly classes = computed(() =>
    mergeClasses(
      buttonVariants({
        nVariant: this.group?.nVariant() ?? this.nVariant(),
        nSize: this.group?.nSize() ?? this.nSize(),
      }),
      this.nClass(),
    ),
  );

  protected handleClick(event: Event): void {
    if (this.isDisabled() || this.nLoading()) {
      event.preventDefault();
      return;
    }
    this.nClick.emit(event);
  }
}
