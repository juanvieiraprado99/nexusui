import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  computed,
  forwardRef,
  input,
  model,
  output,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { collapsibleVariants, type CollapsibleVariants } from './collapsible.variants';
import { COLLAPSIBLE_CONTEXT, type CollapsibleContext } from './collapsible.tokens';

let _collapsibleCounter = 0;

@Component({
  selector: 'n-collapsible',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.data-state]': 'nOpen() ? "open" : "closed"',
    '[attr.data-disabled]': 'nDisabled() ? "" : null',
    'data-slot': 'root',
  },
  providers: [
    {
      provide: COLLAPSIBLE_CONTEXT,
      useFactory: (cmp: CollapsibleComponent) => cmp.context,
      deps: [forwardRef(() => CollapsibleComponent)],
    },
  ],
})
export class CollapsibleComponent {
  private readonly _id = `n-collapsible-${++_collapsibleCounter}`;

  readonly nOpen = model<boolean>(false);
  readonly nDisabled = input<boolean>(false);
  readonly nLazy = input<boolean>(false);
  readonly nVariant = input<CollapsibleVariants['nVariant']>('default');
  readonly nClass = input<string>('');

  readonly nOpenChange = output<boolean>();

  protected readonly classes = computed(() =>
    mergeClasses(collapsibleVariants({ nVariant: this.nVariant() }), this.nClass()),
  );

  private readonly _variant: Signal<'default' | 'bordered' | 'card'> = computed(
    () => this.nVariant() ?? 'default',
  );

  readonly context: CollapsibleContext = {
    isOpen: this.nOpen,
    isDisabled: this.nDisabled,
    isLazy: this.nLazy,
    variant: this._variant,
    contentId: `${this._id}-content`,
    triggerId: `${this._id}-trigger`,
    toggle: () => {
      if (this.nDisabled()) return;
      const next = !this.nOpen();
      this.nOpen.set(next);
      this.nOpenChange.emit(next);
    },
  };
}
