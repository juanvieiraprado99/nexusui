import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
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

  // Non-lazy content stays mounted (hidden via grid-rows 0fr + overflow-hidden)
  // so state is preserved; lazy content mounts only while open.
  protected readonly shouldRender = computed(() =>
    this.ctx.isLazy() ? this.ctx.isOpen() : true,
  );

  protected readonly contentClasses = computed(() =>
    mergeClasses(collapsibleContentVariants({ nVariant: this.ctx.variant() }), this.nClass()),
  );
}
