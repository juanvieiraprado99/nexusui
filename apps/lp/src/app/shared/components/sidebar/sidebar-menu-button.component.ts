import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SIDEBAR_CONTEXT } from './sidebar.context';
import { sidebarMenuButtonVariants, type SidebarMenuButtonVariants } from './sidebar.variants';

@Component({
  selector: 'n-sidebar-menu-button, button[n-sidebar-menu-button], a[n-sidebar-menu-button]',
  standalone: true,
  template: `
    <ng-content select="[data-icon]" />
    <span
      class="flex-1 truncate overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-200 text-left"
      [class.opacity-0]="ctx.collapsed()"
      [class.max-w-0]="ctx.collapsed()"
      data-slot="label"
    >
      <ng-content />
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.data-active]': 'nActive() ? "" : null',
    '[attr.aria-current]': 'nActive() ? "page" : null',
    '[attr.title]': 'ctx.collapsed() && nTooltip() ? nTooltip() : null',
    'data-slot': 'menu-button',
  },
})
export class SidebarMenuButtonComponent {
  readonly nActive = input<boolean>(false);
  readonly nSize = input<SidebarMenuButtonVariants['nSize']>('default');
  readonly nTooltip = input<string>('');
  readonly nDisabled = input<boolean>(false);
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SIDEBAR_CONTEXT);

  protected readonly classes = computed(() =>
    mergeClasses(
      sidebarMenuButtonVariants({ nSize: this.nSize() }),
      this.ctx.collapsed() && 'justify-center px-0 gap-0',
      this.nActive() && 'bg-accent text-accent-foreground font-medium',
      this.nDisabled() && 'pointer-events-none opacity-50',
      this.nClass(),
    ),
  );
}
