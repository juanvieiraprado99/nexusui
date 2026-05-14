import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SIDEBAR_CONTEXT } from './sidebar.context';

@Component({
  selector: 'n-sidebar-group-label',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'group-label',
  },
})
export class SidebarGroupLabelComponent {
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SIDEBAR_CONTEXT);

  protected readonly classes = computed(() =>
    mergeClasses(
      'flex h-8 shrink-0 items-center gap-2 rounded-md px-2',
      'text-xs font-medium text-muted-foreground uppercase tracking-wider',
      'overflow-hidden whitespace-nowrap transition-[opacity,height] duration-200',
      this.ctx.collapsed() && 'opacity-0 h-0 py-0',
      this.nClass(),
    ),
  );
}
