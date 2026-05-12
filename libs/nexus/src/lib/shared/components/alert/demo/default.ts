import { Component } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'demo-alert-default',
  standalone: true,
  imports: [AlertComponent],
  template: `
    <n-alert
      nTitle="Heads up!"
      nDescription="You can add components to your app using the CLI."
    />
  `,
})
export class AlertDefaultDemo {}
