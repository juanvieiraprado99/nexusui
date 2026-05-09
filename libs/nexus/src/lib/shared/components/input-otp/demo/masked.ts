import { Component, signal } from '@angular/core';
import { InputOtpComponent } from '../input-otp.component';

@Component({
  selector: 'demo-input-otp-masked',
  standalone: true,
  imports: [InputOtpComponent],
  template: `
    <n-input-otp
      [nMask]="true"
      [nLength]="4"
      nPattern="numeric"
      nLabel="PIN"
      nHint="Your PIN is hidden for security."
      [(nValue)]="pin"
    />
  `,
})
export class InputOtpDemoMasked {
  readonly pin = signal('');
}
