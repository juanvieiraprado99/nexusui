import { Directive, inject } from '@angular/core';
import { DIALOG_CONTEXT } from './dialog.context';

@Directive({
  selector: '[n-dialog-close]',
  standalone: true,
  host: {
    'data-slot': 'close',
    '(click)': 'ctx.close()',
  },
})
export class DialogCloseDirective {
  protected readonly ctx = inject(DIALOG_CONTEXT);
}
