import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-default',
  standalone: true,
  imports: [ButtonComponent],
  template: `<n-button>Button</n-button>`,
})
export class ButtonDemoDefault {}
