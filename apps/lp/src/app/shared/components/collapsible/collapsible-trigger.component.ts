import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { collapsibleTriggerVariants } from './collapsible.variants';
import { COLLAPSIBLE_CONTEXT } from './collapsible.tokens';

@Component({
  selector: 'n-collapsible-trigger, button[n-collapsible-trigger]',
  standalone: true,
  template: `
    <span class="flex-1 text-left"><ng-content /></span>
    <svg
      class="h-4 w-4 shrink-0 transition-transform duration-200"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'ctx.triggerId',
    '[attr.role]': '_isNativeButton ? null : "button"',
    '[attr.tabindex]': '_isNativeButton ? null : (ctx.isDisabled() ? -1 : 0)',
    '[attr.aria-expanded]': 'ctx.isOpen()',
    '[attr.aria-controls]': 'ctx.contentId',
    '[attr.disabled]': 'ctx.isDisabled() ? true : null',
    '[attr.aria-disabled]': 'ctx.isDisabled() ? true : null',
    '[attr.data-state]': 'ctx.isOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'ctx.isDisabled() ? "" : null',
    'data-slot': 'trigger',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleKeydown($event)',
    '(keydown.space)': 'handleKeydown($event)',
  },
})
export class CollapsibleTriggerComponent {
  protected readonly ctx = inject(COLLAPSIBLE_CONTEXT);

  // Native <button> handles Enter/Space activation itself; the element form
  // (n-collapsible-trigger) needs role/tabindex + manual keyboard handling.
  protected readonly _isNativeButton =
    inject(ElementRef).nativeElement.tagName === 'BUTTON';

  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(collapsibleTriggerVariants({ nVariant: this.ctx.variant() }), this.nClass()),
  );

  protected handleClick(): void {
    if (!this.ctx.isDisabled()) this.ctx.toggle();
  }

  protected handleKeydown(event: Event): void {
    // Native buttons activate via the synthesized click — avoid double-toggle.
    if (this._isNativeButton) return;
    if (!this.ctx.isDisabled()) {
      event.preventDefault();
      this.ctx.toggle();
    }
  }
}
