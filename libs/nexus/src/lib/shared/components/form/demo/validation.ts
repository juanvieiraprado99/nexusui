import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import {
  NFormControlComponent,
  NFormDescriptionComponent,
  NFormFieldComponent,
  NFormLabelComponent,
} from '../form.component';

@Component({
  selector: 'demo-form-validation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    NFormFieldComponent,
    NFormLabelComponent,
    NFormControlComponent,
    NFormDescriptionComponent,
  ],
  template: `
    <div class="w-80 space-y-4">
      <n-form-field [nInvalid]="isInvalid()" nRequired>
        <label n-form-label>Email</label>
        <n-form-control #ctrl>
          <n-input
            [nId]="ctrl.fieldId()"
            type="email"
            nPlaceholder="you@example.com"
            [formControl]="email"
            [nError]="isInvalid() ? (email.errors?.['required'] ? 'Email is required.' : 'Please enter a valid email.') : null"
          />
        </n-form-control>
        @if (!isInvalid()) {
          <n-form-description>We'll never share your email.</n-form-description>
        }
      </n-form-field>

      <button
        type="button"
        (click)="email.markAsTouched()"
        class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Validate
      </button>
    </div>
  `,
})
export class FormDemoValidation {
  readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  isInvalid() {
    return this.email.invalid && this.email.touched;
  }
}
