import { Component } from '@angular/core';
import { RippleDirective } from '../ripple.directive';

@Component({
  selector: 'demo-ripple-colors',
  standalone: true,
  imports: [RippleDirective],
  template: `
    <div class="flex flex-wrap gap-3">
      <div
        nRipple
        nRippleColor="#3b82f6"
        class="bg-muted flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg text-xs font-medium select-none"
      >
        Azul
      </div>
      <div
        nRipple
        nRippleColor="#ef4444"
        class="bg-muted flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg text-xs font-medium select-none"
      >
        Vermelho
      </div>
      <div
        nRipple
        nRippleColor="#22c55e"
        class="bg-muted flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg text-xs font-medium select-none"
      >
        Verde
      </div>
    </div>
  `,
})
export class RippleColorsDemo {}
