import { Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { DROPDOWN_MENU_CONTEXT } from './dropdown-menu.tokens';

@Directive({
  selector: '[n-dropdown-menu-trigger]',
  standalone: true,
  host: {
    type: 'button',
    'data-slot': 'trigger',
    'aria-haspopup': 'menu',
    '[id]': 'ctx.triggerId',
    '[attr.aria-expanded]': 'ctx.open()',
    '[attr.aria-controls]': 'ctx.open() ? ctx.contentId : null',
    '[attr.data-state]': 'ctx.open() ? "open" : "closed"',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class DropdownMenuTriggerDirective implements OnDestroy {
  protected readonly ctx = inject(DROPDOWN_MENU_CONTEXT);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.ctx.setTriggerEl(this._host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx.setTriggerEl(null);
  }

  protected handleClick(event: MouseEvent): void {
    event.preventDefault();
    this.ctx.toggle();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.ctx.openMenu();
    }
  }
}
