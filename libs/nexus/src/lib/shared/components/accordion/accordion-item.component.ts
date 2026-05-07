import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { ACCORDION_CONTEXT, ACCORDION_ITEM_CONTEXT, type AccordionItemContext } from './accordion.tokens';

let _accordionItemCounter = 0;

@Component({
  selector: 'n-accordion-item',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'nDisabled() ? "" : null',
    'data-slot': 'item',
  },
  providers: [
    {
      provide: ACCORDION_ITEM_CONTEXT,
      useFactory: (cmp: AccordionItemComponent) => cmp.itemContext,
      deps: [forwardRef(() => AccordionItemComponent)],
    },
  ],
})
export class AccordionItemComponent {
  private readonly _ctx = inject(ACCORDION_CONTEXT);
  private readonly _id  = `n-accordion-item-${++_accordionItemCounter}`;

  readonly nValue    = input.required<string>();
  readonly nDisabled = input<boolean>(false);
  readonly nClass    = input<string>('');

  protected readonly isOpen = computed(() => this._ctx.openValues().has(this.nValue()));

  protected readonly classes = computed(() => mergeClasses('block', this.nClass()));

  readonly itemContext: AccordionItemContext = {
    value:     this.nValue,
    disabled:  this.nDisabled,
    isOpen:    this.isOpen,
    triggerId: `${this._id}-trigger`,
    contentId: `${this._id}-content`,
  };
}
