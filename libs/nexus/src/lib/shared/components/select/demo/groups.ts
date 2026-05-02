import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SelectComponent,
  SelectContentComponent,
  SelectGroupComponent,
  SelectItemComponent,
  SelectTriggerComponent,
} from '../index';

@Component({
  selector: 'demo-select-groups',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SelectComponent,
    SelectTriggerComponent,
    SelectContentComponent,
    SelectItemComponent,
    SelectGroupComponent,
  ],
  template: `
    <n-select [(nValue)]="value" class="w-full max-w-xs">
      <n-select-trigger nPlaceholder="Pick a timezone" />
      <n-select-content>
        <n-select-group nLabel="Americas">
          <n-select-item nValue="ny" nLabel="New York (GMT-5)" />
          <n-select-item nValue="sao" nLabel="São Paulo (GMT-3)" />
          <n-select-item nValue="la" nLabel="Los Angeles (GMT-8)" />
        </n-select-group>
        <n-select-group nLabel="Europe">
          <n-select-item nValue="lon" nLabel="London (GMT+0)" />
          <n-select-item nValue="ber" nLabel="Berlin (GMT+1)" />
          <n-select-item nValue="ist" nLabel="Istanbul (GMT+3)" />
        </n-select-group>
        <n-select-group nLabel="Asia">
          <n-select-item nValue="tok" nLabel="Tokyo (GMT+9)" />
          <n-select-item nValue="syd" nLabel="Sydney (GMT+10)" />
        </n-select-group>
      </n-select-content>
    </n-select>
  `,
})
export class SelectGroupsDemo {
  value = signal('sao');
}
