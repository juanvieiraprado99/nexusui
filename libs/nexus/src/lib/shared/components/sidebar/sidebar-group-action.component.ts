import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-sidebar-group-action, button[n-sidebar-group-action]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': 'nAriaLabel()',
    'data-slot': 'group-action',
  },
})
export class SidebarGroupActionComponent {
  readonly nClass = input<string>('');
  readonly nAriaLabel = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md',
      'text-muted-foreground outline-none ring-sidebar-ring transition-colors',
      'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      'focus-visible:ring-2',
      '[&>svg]:size-4',
      this.nClass(),
    ),
  );
}
