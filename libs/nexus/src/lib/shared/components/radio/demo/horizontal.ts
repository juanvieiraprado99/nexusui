import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-horizontal',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <n-radio-group [(nValue)]="value" nLabel="Tamanho" nOrientation="horizontal">
      <n-radio nValue="sm" nLabel="P" />
      <n-radio nValue="md" nLabel="M" />
      <n-radio nValue="lg" nLabel="G" />
      <n-radio nValue="xl" nLabel="GG" />
    </n-radio-group>
  `,
})
export class RadioHorizontalDemo {
  value = signal<string | null>('md');
}
