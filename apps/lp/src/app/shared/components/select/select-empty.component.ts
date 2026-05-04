import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SELECT_CONTEXT } from './select.tokens';

@Component({
  selector: 'n-select-empty',
  standalone: true,
  template: `
    <div class="px-2 py-6 text-center text-sm text-muted-foreground">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'empty',
    '[hidden]': '!shouldShow()',
  },
})
export class SelectEmptyComponent {
  protected readonly ctx = inject(SELECT_CONTEXT);

  protected readonly shouldShow = computed(
    () => this.ctx.open() && !this.ctx.loading() && this.ctx.registeredCount() === 0,
  );
}
