import { Component } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'demo-alert-variants',
  standalone: true,
  imports: [AlertComponent],
  template: `
    <div class="flex flex-col gap-3">
      <n-alert
        nType="default"
        nTitle="Default"
        nDescription="A general-purpose informational alert."
      />
      <n-alert
        nType="info"
        nTitle="Info"
        nDescription="Your session will expire in 30 minutes."
      />
      <n-alert
        nType="success"
        nTitle="Success"
        nDescription="Your changes have been saved successfully."
      />
      <n-alert
        nType="warning"
        nTitle="Warning"
        nDescription="This action may have unintended consequences."
      />
      <n-alert
        nType="destructive"
        nTitle="Error"
        nDescription="Your session has expired. Please log in again."
      />
    </div>
  `,
})
export class AlertVariantsDemo {}
