import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignatureComponent } from '../signature.component';

@Component({
  selector: 'demo-signature-with-form',
  standalone: true,
  imports: [SignatureComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
      <n-signature
        formControlName="signature"
        nLabel="Assinatura"
        [nRequired]="true"
        nHint="Campo obrigatório para confirmar o contrato"
        [nError]="form.controls.signature.touched && form.controls.signature.invalid ? 'Assinatura é obrigatória' : null"
      />
      <button
        type="submit"
        class="self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Confirmar
      </button>
      @if (submitted) {
        <p class="text-sm" [class]="form.valid ? 'text-green-600' : 'text-destructive'">
          {{ form.valid ? 'Formulário enviado com sucesso!' : 'Preencha os campos obrigatórios.' }}
        </p>
      }
    </form>
  `,
})
export class SignatureDemoWithForm {
  submitted = false;

  readonly form = new FormGroup({
    signature: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
  }
}
