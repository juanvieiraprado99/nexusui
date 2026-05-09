import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpComponent } from '../input-otp.component';

@Component({
  selector: 'demo-input-otp-with-form',
  standalone: true,
  imports: [InputOtpComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-4">
      <n-input-otp
        formControlName="otp"
        nLabel="Verification Code"
        nHint="Enter the 6-digit code."
        [nLength]="6"
        [nError]="otpError()"
        [nRequired]="true"
      />
      <button
        type="submit"
        class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground
               hover:bg-primary/90 transition-colors w-fit"
      >
        Verify
      </button>
      @if (submitted()) {
        <p class="text-sm text-muted-foreground">
          Submitted: <span class="font-medium text-foreground">{{ form.value.otp }}</span>
        </p>
      }
    </form>
  `,
})
export class InputOtpDemoWithForm {
  protected readonly form = new FormGroup({
    otp: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  protected readonly submitted = signal(false);

  protected otpError(): string | null {
    const ctrl = this.form.controls.otp;
    if (ctrl.invalid && (ctrl.touched || this.submitted())) {
      return 'Please enter the complete 6-digit code.';
    }
    return null;
  }

  protected submit(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();
  }
}
