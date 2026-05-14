import { Directive, inject } from '@angular/core';
import { POPOVER_CONTEXT } from './popover.context';

@Directive({
  selector: '[n-popover-close]',
  standalone: true,
  host: {
    'data-slot': 'close',
    '(click)': 'ctx.close(true)',
  },
})
export class PopoverCloseDirective {
  protected readonly ctx = inject(POPOVER_CONTEXT);
}
