import { Component, signal } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'demo-alert-dismissible',
  standalone: true,
  imports: [AlertComponent],
  template: `
    <div class="flex flex-col gap-3">
      @if (show()) {
        <n-alert
          nType="info"
          nTitle="Dismissible alert"
          nDescription="Click the × button to dismiss this alert."
          [nDismissible]="true"
          (nDismiss)="show.set(false)"
        />
      } @else {
        <button
          type="button"
          class="text-sm underline text-muted-foreground"
          (click)="show.set(true)"
        >
          Show alert again
        </button>
      }
    </div>
  `,
})
export class AlertDismissibleDemo {
  show = signal(true);
}
