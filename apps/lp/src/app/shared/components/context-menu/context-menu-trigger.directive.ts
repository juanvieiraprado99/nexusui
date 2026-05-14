import { Directive, ElementRef, inject } from '@angular/core';
import { CONTEXT_MENU_CONTEXT } from './context-menu.tokens';

@Directive({
  selector: '[n-context-menu-trigger]',
  standalone: true,
  host: {
    'data-slot': 'trigger',
    'aria-haspopup': 'menu',
    '[attr.data-state]': 'ctx.open() ? "open" : "closed"',
    '(contextmenu)': 'handleContextMenu($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class ContextMenuTriggerDirective {
  protected readonly ctx = inject(CONTEXT_MENU_CONTEXT);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected handleContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.ctx.openAt(event.clientX, event.clientY);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'F10' && event.shiftKey) {
      event.preventDefault();
      const rect = this._host.nativeElement.getBoundingClientRect();
      this.ctx.openAt(rect.left, rect.bottom);
    }
  }
}
