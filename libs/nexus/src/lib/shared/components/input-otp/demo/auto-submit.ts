import { Component, signal } from '@angular/core';
import { InputOtpComponent } from '../input-otp.component';

@Component({
  selector: 'demo-input-otp-auto-submit',
  standalone: true,
  imports: [InputOtpComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-input-otp
        nLabel="Auto-submit OTP"
        nHint="Form submits automatically when all 6 digits are entered."
        [nLength]="6"
        (nComplete)="onComplete($event)"
      />
      @if (result()) {
        <p class="text-sm font-medium text-green-600 dark:text-green-400">
          Submitted: {{ result() }}
        </p>
      }
    </div>
  `,
})
export class InputOtpDemoAutoSubmit {
  protected readonly result = signal('');

  protected onComplete(value: string): void {
    this.result.set(value);
  }
}
