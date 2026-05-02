import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-disabled',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <n-radio-group [(nValue)]="value" nLabel="Plano de envio">
      <n-radio nValue="standard" nLabel="Padrão" />
      <n-radio nValue="express" nLabel="Express" />
      <n-radio nValue="overnight" nLabel="Entrega no mesmo dia" [nDisabled]="true" />
    </n-radio-group>
  `,
})
export class RadioDisabledDemo {
  value = signal<string | null>('standard');
}
