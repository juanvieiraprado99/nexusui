import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-sidebar-menu-action, button[n-sidebar-menu-action]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'nAriaLabel()',
    'data-slot': 'menu-action',
  },
})
export class SidebarMenuActionComponent {
  readonly nAriaLabel = input<string>('');
  readonly nShowOnHover = input<boolean>(false);
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md',
      'text-muted-foreground outline-none ring-ring transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus-visible:ring-2',
      '[&>svg]:size-4',
      this.nShowOnHover() && 'opacity-0 group-hover/menu-item:opacity-100',
      'peer-hover/menu-button:text-accent-foreground',
      this.nClass(),
    ),
  );
}
