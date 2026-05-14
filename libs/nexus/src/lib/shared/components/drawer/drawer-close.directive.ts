import { Directive, inject } from '@angular/core';
import { DRAWER_CONTEXT } from './drawer.context';

@Directive({
  selector: '[n-drawer-close]',
  standalone: true,
  host: {
    'data-slot': 'close',
    '(click)': 'ctx.close()',
  },
})
export class DrawerCloseDirective {
  protected readonly ctx = inject(DRAWER_CONTEXT);
}
