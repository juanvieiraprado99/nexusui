import { Component, signal } from '@angular/core';
import { RadioComponent } from '../radio.component';
import { RadioGroupComponent } from '../radio-group.component';

@Component({
  selector: 'demo-radio-colors',
  standalone: true,
  imports: [RadioComponent, RadioGroupComponent],
  template: `
    <div class="flex flex-col gap-6">
      <n-radio-group [(nValue)]="a" nColor="default" nLabel="Default" nOrientation="horizontal">
        <n-radio nValue="1" nLabel="Opção 1" />
        <n-radio nValue="2" nLabel="Opção 2" />
      </n-radio-group>
      <n-radio-group [(nValue)]="b" nColor="success" nLabel="Success" nOrientation="horizontal">
        <n-radio nValue="1" nLabel="Aceitar" />
        <n-radio nValue="2" nLabel="Recusar" />
      </n-radio-group>
      <n-radio-group [(nValue)]="c" nColor="destructive" nLabel="Destructive" nOrientation="horizontal">
        <n-radio nValue="1" nLabel="Excluir conta" />
        <n-radio nValue="2" nLabel="Manter conta" />
      </n-radio-group>
    </div>
  `,
})
export class RadioColorsDemo {
  a = signal<string | null>('1');
  b = signal<string | null>('1');
  c = signal<string | null>('2');
}
