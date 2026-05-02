import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-sizes',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <div class="flex flex-col gap-6">
      <n-radio-group [(nValue)]="sm" nSize="sm" nLabel="Pequeno" nOrientation="horizontal">
        <n-radio nValue="a" nLabel="Opção A" />
        <n-radio nValue="b" nLabel="Opção B" />
      </n-radio-group>
      <n-radio-group [(nValue)]="md" nLabel="Padrão" nOrientation="horizontal">
        <n-radio nValue="a" nLabel="Opção A" />
        <n-radio nValue="b" nLabel="Opção B" />
      </n-radio-group>
      <n-radio-group [(nValue)]="lg" nSize="lg" nLabel="Grande" nOrientation="horizontal">
        <n-radio nValue="a" nLabel="Opção A" />
        <n-radio nValue="b" nLabel="Opção B" />
      </n-radio-group>
    </div>
  `,
})
export class RadioSizesDemo {
  sm = signal<string | null>('a');
  md = signal<string | null>('a');
  lg = signal<string | null>('a');
}
