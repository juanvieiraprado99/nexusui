import { Component, ChangeDetectionStrategy, input, computed, output, inject, ElementRef } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { buttonVariants, type ButtonVariants } from './button.variants';
import { BUTTON_GROUP_CONTEXT } from '../button-group/button-group.tokens';

@Component({
  selector: 'n-button, button[n-button], a[n-button]',
  standalone: true,
  template: `
    @if (nLoading()) {
      <svg
        class="animate-spin h-4 w-4 shrink-0 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.type]': 'hostType()',
    '[attr.role]': 'hostRole()',
    '[attr.disabled]': 'hostDisabled()',
    '[attr.data-disabled]': 'isDisabled() || nLoading() ? "" : null',
    '[attr.tabindex]': 'hostTabindex()',
    '[attr.aria-label]': 'nAriaLabel() || null',
    '[attr.aria-busy]': 'nLoading()',
    '[attr.aria-disabled]': 'isDisabled() || nLoading() ? true : null',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ButtonComponent {
  private readonly group = inject(BUTTON_GROUP_CONTEXT, { optional: true });
  private readonly tag = inject(ElementRef<HTMLElement>).nativeElement.tagName.toLowerCase();

  readonly nVariant    = input<ButtonVariants['nVariant']>('default');
  readonly nSize       = input<ButtonVariants['nSize']>('default');
  readonly nType = input<'button' | 'submit' | 'reset'>('button');
  readonly nClass      = input<string>('');
  readonly nLoading    = input<boolean>(false);
  readonly nDisabled   = input<boolean>(false);
  readonly nAriaLabel  = input<string>('');

  readonly nClick = output<Event>();

  protected readonly isDisabled = computed(() => this.nDisabled() || (this.group?.nDisabled() ?? false));

  protected readonly hostType = computed(() => (this.tag === 'button' ? this.nType() : null));
  protected readonly hostRole = computed(() => (this.tag === 'n-button' ? 'button' : null));

  protected readonly hostDisabled = computed(() =>
    this.tag === 'button' && (this.isDisabled() || this.nLoading()) ? true : null,
  );

  protected readonly hostTabindex = computed(() =>
    this.tag === 'n-button' ? (this.isDisabled() || this.nLoading() ? -1 : 0) : null,
  );

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
      event.stopImmediatePropagation();
      return;
    }
    this.nClick.emit(event);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (this.tag !== 'n-button') return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.handleClick(event);
  }
}
