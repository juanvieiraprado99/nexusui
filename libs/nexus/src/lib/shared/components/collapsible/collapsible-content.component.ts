import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { collapsibleContentVariants } from './collapsible.variants';
import { COLLAPSIBLE_CONTEXT } from './collapsible.tokens';

@Component({
  selector: 'n-collapsible-content',
  standalone: true,
  template: `
    <div
      class="grid transition-[grid-template-rows] duration-200 ease-out"
      [style.grid-template-rows]="ctx.isOpen() ? '1fr' : '0fr'"
    >
      <div class="overflow-hidden">
        @if (shouldRender()) {
          <div [class]="contentClasses()" data-slot="content">
            <ng-content />
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': 'ctx.contentId',
    '[attr.role]': '"region"',
    '[attr.aria-labelledby]': 'ctx.triggerId',
    '[attr.data-state]': 'ctx.isOpen() ? "open" : "closed"',
    class: 'block',
  },
})
export class CollapsibleContentComponent {
  protected readonly ctx = inject(COLLAPSIBLE_CONTEXT);

  readonly nClass = input<string>('');

  private readonly _hasBeenOpened = signal(false);

  protected readonly shouldRender = computed(() =>
    this.ctx.isLazy()
      ? this.ctx.isOpen()
      : this._hasBeenOpened() || this.ctx.isOpen(),
  );

  protected readonly contentClasses = computed(() =>
    mergeClasses(collapsibleContentVariants({ nVariant: this.ctx.variant() }), this.nClass()),
  );

  constructor() {
    effect(() => {
      if (this.ctx.isOpen() && !this._hasBeenOpened()) {
        this._hasBeenOpened.set(true);
      }
    });
  }
}
