import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-loading',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <n-radio-group
      [(nValue)]="value"
      nLabel="Carregando opções"
      [nLoading]="loading()"
      [nSkeletonRows]="4"
    >
      <n-radio nValue="a" nLabel="Opção A" />
      <n-radio nValue="b" nLabel="Opção B" />
      <n-radio nValue="c" nLabel="Opção C" />
      <n-radio nValue="d" nLabel="Opção D" />
    </n-radio-group>
  `,
})
export class RadioLoadingDemo {
  value = signal<string | null>(null);
  loading = signal(true);

  constructor() {
    setTimeout(() => this.loading.set(false), 2000);
  }
}
