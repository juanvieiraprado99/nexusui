import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { RippleDirective } from '../ripple.directive';

@Component({
  selector: 'demo-ripple-on-button',
  standalone: true,
  imports: [ButtonComponent, RippleDirective],
  template: `
    <button n-button nRipple nRippleColor="rgba(255,255,255,0.6)">Ripple Button</button>
  `,
})
export class RippleOnButtonDemo {}
