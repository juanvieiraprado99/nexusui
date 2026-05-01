import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxComponent } from '../checkbox.component';

@Component({
  selector: 'demo-checkbox-with-form',
  standalone: true,
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="flex flex-col gap-4 w-72">
      <n-checkbox
        formControlName="terms"
        nLabel="I accept the terms and conditions"
        [nRequired]="true"
        [nError]="termsError()"
      />
      <n-checkbox
        formControlName="marketing"
        nLabel="Send me product updates"
        nHint="Optional — unsubscribe any time."
      />
      <button
        type="submit"
        class="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Submit
      </button>
      @if (submitted()) {
        <p class="text-sm text-muted-foreground">
          Terms: {{ form.value.terms }} — Marketing: {{ form.value.marketing }}
        </p>
      }
    </form>
  `,
})
export class CheckboxDemoWithForm {
  protected readonly form = new FormGroup({
    terms:     new FormControl(false, Validators.requiredTrue),
    marketing: new FormControl(false),
  });

  protected submitted = () => this._submitted;
  private _submitted = false;

  protected termsError(): string | null {
    const ctrl = this.form.get('terms');
    if (ctrl?.invalid && (ctrl.touched || this._submitted)) return 'You must accept the terms.';
    return null;
  }

  protected submit(): void {
    this._submitted = true;
    this.form.markAllAsTouched();
  }
}
