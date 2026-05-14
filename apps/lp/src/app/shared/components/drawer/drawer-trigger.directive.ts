import { Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { DRAWER_CONTEXT } from './drawer.context';

@Directive({
  selector: '[n-drawer-trigger]',
  standalone: true,
  host: {
    'data-slot': 'trigger',
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'ctx.open()',
    '[attr.aria-controls]': 'ctx.open() ? ctx.drawerId() : null',
    '[attr.data-state]': 'ctx.open() ? "open" : "closed"',
    '(click)': 'ctx.setOpen(true)',
  },
})
export class DrawerTriggerDirective implements OnDestroy {
  protected readonly ctx = inject(DRAWER_CONTEXT);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.ctx.setTriggerEl(this._host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx.setTriggerEl(null);
  }
}
