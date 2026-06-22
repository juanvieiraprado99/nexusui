import { Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { POPOVER_CONTEXT } from './popover.context';

@Directive({
  selector: '[n-popover-trigger]',
  standalone: true,
  host: {
    'data-slot': 'trigger',
    '[attr.aria-haspopup]': "ctx.modal() ? 'dialog' : 'true'",
    '[id]': 'ctx.triggerId',
    '[attr.aria-expanded]': 'ctx.open()',
    '[attr.aria-controls]': 'ctx.open() ? ctx.contentId : null',
    '[attr.data-state]': 'ctx.open() ? "open" : "closed"',
    '(click)': 'handleClick($event)',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'handleMouseLeave()',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class PopoverTriggerDirective implements OnDestroy {
  protected readonly ctx = inject(POPOVER_CONTEXT);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.ctx.setTriggerEl(this._host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx.setTriggerEl(null);
    this.ctx.cancelScheduledClose();
  }

  protected handleClick(event: MouseEvent): void {
    if (this.ctx.triggerMode() !== 'click') return;
    event.preventDefault();
    this.ctx.toggle();
  }

  protected handleMouseEnter(): void {
    if (this.ctx.triggerMode() !== 'hover') return;
    this.ctx.openPopover();
  }

  protected handleMouseLeave(): void {
    if (this.ctx.triggerMode() !== 'hover') return;
    this.ctx.scheduleClose(false, 150);
  }

  protected handleFocus(): void {
    if (this.ctx.triggerMode() !== 'focus') return;
    this.ctx.openPopover();
  }

  protected handleBlur(): void {
    if (this.ctx.triggerMode() !== 'focus') return;
    this.ctx.scheduleClose(false, 150);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (this.ctx.triggerMode() !== 'click') return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.ctx.toggle();
    }
  }
}
