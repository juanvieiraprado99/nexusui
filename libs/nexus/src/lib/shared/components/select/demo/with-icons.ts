import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  SelectComponent,
  SelectContentComponent,
  SelectItemComponent,
  SelectTriggerComponent,
} from '../index';

@Component({
  selector: 'demo-select-with-icons',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SelectComponent, SelectTriggerComponent, SelectContentComponent, SelectItemComponent],
  template: `
    <n-select [(nValue)]="value" class="w-full max-w-xs">
      <n-select-trigger nPlaceholder="Choose a plan" />
      <n-select-content>
        <n-select-item nValue="free" nLabel="Free" nDescription="Up to 3 projects, community support">
          <svg data-slot="icon-leading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </n-select-item>
        <n-select-item nValue="pro" nLabel="Pro" nDescription="Unlimited projects, priority support">
          <svg data-slot="icon-leading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </n-select-item>
        <n-select-item nValue="enterprise" nLabel="Enterprise" nDescription="Custom limits, SLA, dedicated CSM">
          <svg data-slot="icon-leading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>
          </svg>
        </n-select-item>
      </n-select-content>
    </n-select>
  `,
})
export class SelectWithIconsDemo {
  value = signal('pro');
}
