import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { accordionVariants, type AccordionVariants } from './accordion.variants';
import { ACCORDION_CONTEXT, type AccordionContext } from './accordion.tokens';

@Component({
  selector: 'n-accordion',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  providers: [
    {
      provide: ACCORDION_CONTEXT,
      useFactory: (cmp: AccordionComponent) => cmp.context,
      deps: [forwardRef(() => AccordionComponent)],
    },
  ],
})
export class AccordionComponent {
  readonly nVariant     = input<AccordionVariants['nVariant']>('default');
  readonly nSize        = input<AccordionVariants['nSize']>('default');
  readonly nType        = input<'single' | 'multiple'>('single');
  readonly nCollapsible = input<boolean>(true);
  readonly nClass       = input<string>('');

  readonly nValue  = model<string>('');
  readonly nValues = model<string[]>([]);

  readonly nOpenChange = output<string | string[]>();

  private readonly _openValues = computed<Set<string>>(() => {
    if (this.nType() === 'single') {
      const v = this.nValue();
      return v ? new Set([v]) : new Set();
    }
    return new Set(this.nValues());
  });

  protected readonly classes = computed(() =>
    mergeClasses(accordionVariants({ nVariant: this.nVariant(), nSize: this.nSize() }), this.nClass()),
  );

  readonly context: AccordionContext = {
    type: this.nType,
    collapsible: this.nCollapsible,
    openValues: this._openValues,
    toggle: (value: string) => {
      if (this.nType() === 'single') {
        const isOpen = this.nValue() === value;
        if (isOpen && !this.nCollapsible()) return;
        const next = isOpen ? '' : value;
        this.nValue.set(next);
        this.nOpenChange.emit(next);
      } else {
        const current = this.nValues();
        const isOpen = current.includes(value);
        const next = isOpen
          ? current.filter(v => v !== value)
          : [...current, value];
        this.nValues.set(next);
        this.nOpenChange.emit(next);
      }
    },
  };
}
