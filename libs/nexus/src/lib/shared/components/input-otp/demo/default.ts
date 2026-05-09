import { Component, signal } from '@angular/core';
import { InputOtpComponent } from '../input-otp.component';

@Component({
  selector: 'demo-input-otp-default',
  standalone: true,
  imports: [InputOtpComponent],
  template: `
    <div class="flex flex-col gap-4">
      <n-input-otp
        nLabel="Verification Code"
        nHint="Enter the 6-digit code sent to your phone."
        [(nValue)]="code"
      />
      <p class="text-sm text-muted-foreground">
        Value: <span class="font-medium text-foreground">{{ code() || '——' }}</span>
      </p>
    </div>
  `,
})
export class InputOtpDemoDefault {
  readonly code = signal('');
}
