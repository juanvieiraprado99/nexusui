import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioGroupComponent } from '../radio-group.component';
import { RadioComponent } from '../radio.component';

@Component({
  selector: 'demo-radio-reactive-form',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent, ReactiveFormsModule, FormsModule],
  template: `
    <div [formGroup]="form" class="flex w-full flex-col gap-4">
      <n-radio-group
        formControlName="plan"
        nLabel="Plano"
        [nRequired]="true"
        nHint="Você pode mudar depois"
        [nError]="form.controls.plan.touched && form.controls.plan.invalid ? 'Selecione um plano' : null"
      >
        <n-radio nValue="free" nLabel="Gratuito" />
        <n-radio nValue="pro" nLabel="Pro" />
        <n-radio nValue="enterprise" nLabel="Enterprise" />
      </n-radio-group>
      <p class="text-muted-foreground text-sm">
        Selecionado:
        <span class="text-foreground font-medium">{{ form.controls.plan.value ?? 'nenhum' }}</span>
      </p>
    </div>
  `,
})
export class RadioReactiveFormDemo {
  readonly form = new FormGroup({
    plan: new FormControl<string | null>(null, Validators.required),
  });
}
