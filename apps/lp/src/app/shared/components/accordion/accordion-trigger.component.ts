import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { ACCORDION_CONTEXT, ACCORDION_ITEM_CONTEXT } from './accordion.tokens';

@Component({
  selector: 'n-accordion-trigger, button[n-accordion-trigger]',
  standalone: true,
  template: `
    <span class="flex-1 text-left">
      <ng-content />
    </span>

    @if (nIcon() === 'chevron') {
      <svg
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        [class.rotate-180]="isOpen()"
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
    } @else {
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
        <path d="M5 12h14" />
        @if (!isOpen()) {
          <path d="M12 5v14" />
        }
      </svg>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'itemCtx.triggerId',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-controls]': 'itemCtx.contentId',
    '[attr.disabled]': 'isDisabled() ? true : null',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    'data-slot': 'trigger',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleKeydown($event)',
    '(keydown.space)': 'handleKeydown($event)',
  },
})
export class AccordionTriggerComponent {
  private readonly _ctx = inject(ACCORDION_CONTEXT);
  protected readonly itemCtx = inject(ACCORDION_ITEM_CONTEXT);

  readonly nIcon  = input<'chevron' | 'plus-minus'>('chevron');
  readonly nClass = input<string>('');

  protected readonly isOpen     = computed(() => this.itemCtx.isOpen());
  protected readonly isDisabled = computed(() => this.itemCtx.disabled());

  protected readonly classes = computed(() =>
    mergeClasses(
      'flex w-full items-center justify-between px-4 py-4 text-sm font-medium transition-all' +
      ' hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring' +
      ' focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      this.nClass(),
    ),
  );

  protected handleClick(): void {
    if (this.isDisabled()) return;
    this._ctx.toggle(this.itemCtx.value());
  }

  protected handleKeydown(event: Event): void {
    if (this.isDisabled()) return;
    event.preventDefault();
    this._ctx.toggle(this.itemCtx.value());
  }
}
