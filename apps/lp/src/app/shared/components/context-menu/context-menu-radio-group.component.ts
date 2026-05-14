import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
} from '@angular/core';
import {
  CONTEXT_MENU_RADIO_GROUP_CONTEXT,
  type ContextMenuRadioGroupContext,
} from './context-menu.tokens';

@Component({
  selector: 'n-context-menu-radio-group',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'radio-group',
    '[class]': 'nClass()',
  },
  providers: [
    {
      provide: CONTEXT_MENU_RADIO_GROUP_CONTEXT,
      useFactory: (cmp: ContextMenuRadioGroupComponent) => cmp.radioContext,
      deps: [forwardRef(() => ContextMenuRadioGroupComponent)],
    },
  ],
})
export class ContextMenuRadioGroupComponent {
  readonly nValue = model<string | null>(null);
  readonly nClass = input<string>('');

  readonly radioContext: ContextMenuRadioGroupContext = {
    value: this.nValue,
    select: (v: string) => this.nValue.set(v),
  };
}
