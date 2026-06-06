import { Component } from '@angular/core';
import { RippleDirective } from '../ripple.directive';

@Component({
  selector: 'demo-ripple-unbounded',
  standalone: true,
  imports: [RippleDirective],
  template: `
    <button
      nRipple
      [nRippleUnbounded]="true"
      [nRippleCentered]="true"
      nRippleColor="#6366f1"
      class="bg-muted text-muted-foreground flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-lg select-none"
      aria-label="Unbounded icon button"
    >
      ♥
    </button>
  `,
})
export class RippleUnboundedDemo {}
