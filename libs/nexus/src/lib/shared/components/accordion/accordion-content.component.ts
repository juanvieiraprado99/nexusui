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
import { ACCORDION_ITEM_CONTEXT } from './accordion.tokens';

@Component({
  selector: 'n-accordion-content',
  standalone: true,
  template: `
    <div
      class="grid transition-[grid-template-rows] duration-200 ease-out"
      [style.grid-template-rows]="isOpen() ? '1fr' : '0fr'"
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
    'role': 'region',
    '[attr.id]': 'itemCtx.contentId',
    '[attr.aria-labelledby]': 'itemCtx.triggerId',
    'class': 'block',
  },
})
export class AccordionContentComponent {
  protected readonly itemCtx = inject(ACCORDION_ITEM_CONTEXT);

  readonly nClass = input<string>('');

  protected readonly isOpen = computed(() => this.itemCtx.isOpen());

  private readonly _hasBeenOpened = signal(false);

  protected readonly shouldRender = computed(() => this._hasBeenOpened() || this.isOpen());

  protected readonly contentClasses = computed(() =>
    mergeClasses('px-4 pb-4 pt-0 text-sm text-foreground', this.nClass()),
  );

  constructor() {
    effect(() => {
      if (this.isOpen() && !this._hasBeenOpened()) {
        this._hasBeenOpened.set(true);
      }
    });
  }
}
