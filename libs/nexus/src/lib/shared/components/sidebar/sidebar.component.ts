import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SIDEBAR_CONTEXT } from './sidebar.context';
import { sidebarVariants, type SidebarVariants } from './sidebar.variants';
import { type SidebarCollapsible, type SidebarSide } from './sidebar.context';

@Component({
  selector: 'n-sidebar',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[attr.data-state]': 'ctx.collapsed() ? "collapsed" : "expanded"',
    '[attr.data-side]': 'nSide()',
    '[attr.data-variant]': 'nVariant()',
    'data-slot': 'sidebar',
  },
})
export class SidebarComponent implements OnInit {
  readonly nVariant = input<SidebarVariants['nVariant']>('sidebar');
  readonly nSide = input<SidebarSide>('left');
  readonly nCollapsible = input<SidebarCollapsible>('offcanvas');
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SIDEBAR_CONTEXT);

  constructor() {
    effect(() => {
      this.ctx.collapsible.set(this.nCollapsible());
    });
  }

  ngOnInit(): void {
    this.ctx.collapsible.set(this.nCollapsible());
  }

  protected readonly classes = computed(() => {
    const open = this.ctx.open();
    const collapsed = this.ctx.collapsed();
    const isMobile = this.ctx.isMobile();
    const collapsible = this.nCollapsible();
    const variant = this.nVariant();
    const side = this.nSide();

    if (isMobile) {
      return mergeClasses(
        'fixed inset-y-0 z-50 flex flex-col w-72',
        side === 'left' ? 'left-0' : 'right-0',
        'transition-transform duration-300',
        open ? 'translate-x-0 ease-out' : side === 'left' ? '-translate-x-full ease-in' : 'translate-x-full ease-in',
        sidebarVariants({ nVariant: variant }),
        this.nClass(),
      );
    }

    let widthClass: string;
    if (collapsible === 'none') {
      widthClass = 'w-64';
    } else if (collapsible === 'offcanvas') {
      widthClass = open ? 'w-64' : 'w-0';
    } else {
      widthClass = collapsed ? 'w-12' : 'w-64';
    }

    return mergeClasses(
      'h-svh flex-col',
      widthClass,
      sidebarVariants({ nVariant: variant }),
      this.nClass(),
    );
  });
}
