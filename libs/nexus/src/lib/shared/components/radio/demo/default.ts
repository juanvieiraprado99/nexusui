import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-default',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <n-radio-group [(nValue)]="value" nLabel="Plano de assinatura">
      <n-radio nValue="free" nLabel="Gratuito" />
      <n-radio nValue="pro" nLabel="Pro" />
      <n-radio nValue="enterprise" nLabel="Enterprise" />
    </n-radio-group>
  `,
})
export class RadioDefaultDemo {
  value = signal<string | null>('pro');
}
