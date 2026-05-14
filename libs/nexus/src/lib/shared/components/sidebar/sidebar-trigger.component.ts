import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SIDEBAR_CONTEXT } from './sidebar.context';

@Component({
  selector: 'n-sidebar-trigger, button[n-sidebar-trigger]',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
    <span class="sr-only">Toggle sidebar</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.aria-expanded]': 'ctx.open()',
    '[attr.aria-controls]': 'ctx.sidebarId',
    '[attr.aria-label]': '"Toggle sidebar"',
    'data-slot': 'trigger',
    '(click)': 'ctx.toggle()',
  },
})
export class SidebarTriggerComponent {
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SIDEBAR_CONTEXT);

  protected readonly classes = computed(() =>
    mergeClasses(
      'inline-flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground',
      'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
      'transition-colors duration-150',
      this.nClass(),
    ),
  );
}
