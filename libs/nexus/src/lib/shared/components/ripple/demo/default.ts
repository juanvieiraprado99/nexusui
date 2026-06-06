import { Component } from '@angular/core';
import { RippleDirective } from '../ripple.directive';

@Component({
  selector: 'demo-ripple-default',
  standalone: true,
  imports: [RippleDirective],
  template: `
    <div
      nRipple
      class="bg-muted text-muted-foreground flex h-24 w-48 cursor-pointer items-center justify-center rounded-lg text-sm font-medium select-none"
    >
      Clique aqui
    </div>
  `,
})
export class RippleDefaultDemo {}
