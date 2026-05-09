import { Component } from '@angular/core';
import { InputOtpComponent } from '../input-otp.component';

@Component({
  selector: 'demo-input-otp-sizes',
  standalone: true,
  imports: [InputOtpComponent],
  template: `
    <div class="flex flex-col gap-6">
      <n-input-otp nSize="sm"  nLabel="Small"   [nLength]="6" />
      <n-input-otp             nLabel="Default" [nLength]="6" />
      <n-input-otp nSize="lg"  nLabel="Large"   [nLength]="6" />
    </div>
  `,
})
export class InputOtpDemoSizes {}
