import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../input.component';

@Component({
  selector: 'demo-input-with-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="flex w-full flex-col gap-4">
      <n-input
        formControlName="email"
        nLabel="E-mail usando um form por volta"
        nPlaceholder="voce@exemplo.com"
        [nRequired]="true"
        nHint="Usaremos para enviar o recibo"
        [nError]="form.controls.email.touched && form.controls.email.invalid ? 'E-mail inválido' : null"
      />
      <p class="text-muted-foreground text-sm">
        Valor:
        <span class="text-foreground font-medium">{{ form.controls.email.value || 'vazio' }}</span>
      </p>
    </form>

    <div class="flex w-full flex-col gap-4">
      <n-input
        [formControl]="email2"
        nLabel="E-mail sem usar um form por volta"
        nPlaceholder="voce@exemplo.com"
        [nRequired]="true"
        nHint="Usaremos para enviar o recibo"
        [nError]="email2.touched && email2.invalid ? 'E-mail inválido' : null"
      />
      <p class="text-muted-foreground text-sm">
        Valor:
        <span class="text-foreground font-medium">{{ email2.value || 'vazio' }}</span>
      </p>
    </div>
  `,
})
export class InputDemoWithForm {
  readonly form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  email2 = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] });
}
