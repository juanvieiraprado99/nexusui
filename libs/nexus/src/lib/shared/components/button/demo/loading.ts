import { Component } from '@angular/core';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'demo-button-loading',
  standalone: true,
  imports: [ButtonComponent],
  template: `<n-button [nLoading]="true">Salvando...</n-button>`,
})
export class ButtonDemoLoading {}
