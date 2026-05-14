import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SIDEBAR_CONTEXT } from './sidebar.context';

@Component({
  selector: 'n-sidebar-rail',
  standalone: true,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.aria-label]': '"Toggle sidebar"',
    '[attr.title]': '"Toggle sidebar"',
    'data-slot': 'rail',
    'tabindex': '-1',
    '(click)': 'ctx.toggle()',
  },
})
export class SidebarRailComponent {
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SIDEBAR_CONTEXT);

  protected readonly classes = computed(() =>
    mergeClasses(
      'absolute inset-y-0 z-20 hidden w-4 cursor-w-resize',
      '-translate-x-1/2 transition-all ease-linear sm:flex',
      'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
      'hover:after:bg-sidebar-border group-data-[side=left]:right-[-1rem]',
      'group-data-[side=right]:left-[-1rem]',
      this.nClass(),
    ),
  );
}
