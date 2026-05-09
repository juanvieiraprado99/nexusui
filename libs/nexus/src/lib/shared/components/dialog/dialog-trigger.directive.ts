import { Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.context';

@Directive({
  selector: '[n-dialog-trigger]',
  standalone: true,
  host: {
    'data-slot': 'trigger',
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'ctx.open()',
    '[attr.aria-controls]': 'ctx.open() ? ctx.dialogId() : null',
    '[attr.data-state]': 'ctx.open() ? "open" : "closed"',
    '(click)': 'ctx.setOpen(true)',
  },
})
export class DialogTriggerDirective implements OnDestroy {
  protected readonly ctx = inject(DIALOG_CONTEXT);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.ctx.setTriggerEl(this._host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx.setTriggerEl(null);
  }
}
