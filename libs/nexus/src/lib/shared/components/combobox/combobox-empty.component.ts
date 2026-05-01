import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { COMBOBOX_CONTEXT } from './combobox.tokens';

@Component({
  selector: 'n-combobox-empty',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty',
    '[hidden]': '!shouldShow()',
  },
})
export class ComboboxEmptyComponent {
  protected readonly ctx = inject(COMBOBOX_CONTEXT);

  protected readonly shouldShow = computed(
    () => this.ctx.open() && this.ctx.query().length > 0 && this.ctx.visibleCount() === 0,
  );
}
