import { Component, signal } from '@angular/core';
import { InputOtpComponent } from '../input-otp.component';

@Component({
  selector: 'demo-input-otp-with-separator',
  standalone: true,
  imports: [InputOtpComponent],
  template: `
    <div class="flex flex-col gap-6">
      <n-input-otp
        [nLength]="6"
        [nSeparatorIndex]="3"
        nLabel="Code with separator (3 + 3)"
        [(nValue)]="code6"
      />
      <n-input-otp
        [nLength]="8"
        [nSeparatorIndex]="4"
        nLabel="Code with separator (4 + 4)"
        [(nValue)]="code8"
      />
    </div>
  `,
})
export class InputOtpDemoWithSeparator {
  readonly code6 = signal('');
  readonly code8 = signal('');
}
