import { Component } from '@angular/core';
import { RippleDirective } from '../ripple.directive';

@Component({
  selector: 'demo-ripple-centered',
  standalone: true,
  imports: [RippleDirective],
  template: `
    <button
      nRipple
      [nRippleCentered]="true"
      class="bg-muted text-muted-foreground flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-lg select-none"
      aria-label="Icon button"
    >
      ★
    </button>
  `,
})
export class RippleCenteredDemo {}
