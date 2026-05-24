import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { TABS_CONTEXT } from './tabs.context';

@Component({
  selector: 'n-tabs-content',
  standalone: true,
  template: `
    <div [class]="contentClasses()" data-slot="content">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'tabpanel',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'triggerId()',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
    '[attr.tabindex]': 'isActive() ? "0" : "-1"',
    '[attr.hidden]': '!isActive() ? "" : null',
  },
})
export class TabsContentComponent {
  private readonly _ctx = inject(TABS_CONTEXT);

  readonly nValue = input.required<string>();
  readonly nClass = input<string>('');

  protected readonly isActive  = computed(() => this._ctx.activeValue() === this.nValue());
  protected readonly triggerId = computed(() => this._ctx.getTriggerId(this.nValue()));
  protected readonly panelId   = computed(() => this._ctx.getPanelId(this.nValue()));

  protected readonly contentClasses = computed(() =>
    mergeClasses('focus-visible:outline-none', this.nClass()),
  );
}
