import { Component, signal } from '@angular/core';
import { AlertComponent } from '../alert.component';

@Component({
  selector: 'demo-alert-auto-dismiss',
  standalone: true,
  imports: [AlertComponent],
  template: `
    <div class="flex flex-col gap-3">
      @if (show()) {
        <n-alert
          nType="success"
          nTitle="Auto-dismissing"
          nDescription="This alert will disappear automatically after 4 seconds."
          [nAutoDismissDuration]="4000"
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
export class AlertAutoDismissDemo {
  show = signal(true);
}
