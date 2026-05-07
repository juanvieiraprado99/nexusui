import { Component, signal } from '@angular/core';
import { SwitchComponent } from '../switch.component';

@Component({
  selector: 'demo-switch-label-inside',
  standalone: true,
  imports: [SwitchComponent],
  template: `
    <div class="flex items-center gap-6">
      <n-switch
        [(nChecked)]="enabled"
        [nShowTrackLabel]="true"
        nLabel="Status"
      />
      <n-switch
        [(nChecked)]="active"
        [nShowTrackLabel]="true"
        nTrackLabelOn="SIM"
        nTrackLabelOff="NÃO"
        nLabel="Ativo"
      />
      <n-switch
        [(nChecked)]="visible"
        nSize="lg"
        [nShowTrackLabel]="true"
        nTrackLabelOn="SHOW"
        nTrackLabelOff="HIDE"
        nLabel="Visível"
      />
    </div>
  `,
})
export class SwitchDemoLabelInside {
  enabled = signal(false);
  active  = signal(true);
  visible = signal(false);
}
