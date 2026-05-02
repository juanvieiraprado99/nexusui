import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-card',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <n-radio-group [(nValue)]="plan" nVariant="card" nLabel="Escolha um plano">
      <n-radio
        nValue="starter"
        nLabel="Starter"
        nDescription="Para projetos pessoais — até 3 colaboradores."
      />
      <n-radio
        nValue="team"
        nLabel="Team"
        nDescription="Time pequeno com colaboração em tempo real."
      />
      <n-radio
        nValue="business"
        nLabel="Business"
        nDescription="SLA dedicado, SSO, auditoria avançada."
      />
    </n-radio-group>
  `,
})
export class RadioCardDemo {
  plan = signal<string | null>('team');
}
