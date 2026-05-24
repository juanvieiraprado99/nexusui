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
import { TABS_CONTEXT, type TabsContext } from './tabs.context';
import type { TabsVariants } from './tabs.variants';

let _tabsCounter = 0;

@Component({
  selector: 'n-tabs',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.data-orientation]': 'nOrientation()',
    'data-slot': 'root',
  },
  providers: [
    {
      provide: TABS_CONTEXT,
      useFactory: (cmp: TabsComponent) => cmp.context,
      deps: [forwardRef(() => TabsComponent)],
    },
  ],
})
export class TabsComponent {
  readonly nValue        = model<string>('');
  readonly nDefaultValue = input<string>('');
  readonly nOrientation  = input<'horizontal' | 'vertical'>('horizontal');
  readonly nVariant      = input<TabsVariants['nVariant']>('pills');
  readonly nStretch      = input<boolean>(false);
  readonly nClass        = input<string>('');

  readonly nValueChange = output<string>();

  private readonly _tabId = `n-tabs-${++_tabsCounter}`;

  private readonly _activeValue = computed(() => this.nValue() || this.nDefaultValue());

  protected readonly classes = computed(() =>
    mergeClasses(
      'flex',
      this.nOrientation() === 'vertical' ? 'flex-row items-start gap-0' : 'flex-col',
      this.nClass(),
    ),
  );

  readonly context: TabsContext = {
    tabId:        this._tabId,
    activeValue:  this._activeValue,
    orientation:  this.nOrientation,
    variant:      this.nVariant,
    stretch:      this.nStretch,
    setActive: (value: string) => {
      this.nValue.set(value);
      this.nValueChange.emit(value);
    },
    getTriggerId: (value: string) => `${this._tabId}-trigger-${value.replace(/\s+/g, '-')}`,
    getPanelId:   (value: string) => `${this._tabId}-panel-${value.replace(/\s+/g, '-')}`,
  };
}
