import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SIDEBAR_CONTEXT } from './sidebar.context';

@Component({
  selector: 'n-sidebar-menu-badge',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'badge',
    'aria-hidden': 'true',
  },
})
export class SidebarMenuBadgeComponent {
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SIDEBAR_CONTEXT);

  protected readonly classes = computed(() =>
    mergeClasses(
      'ml-auto tabular-nums text-xs font-medium pointer-events-none select-none',
      'transition-[opacity] duration-200',
      this.ctx.collapsed() && 'opacity-0',
      this.nClass(),
    ),
  );
}
