import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'demo-avatar-status',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="flex items-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="João P." nStatus="online" />
        <span class="text-xs text-muted-foreground">online</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="Maria S." nStatus="away" />
        <span class="text-xs text-muted-foreground">away</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="Pedro A." nStatus="busy" />
        <span class="text-xs text-muted-foreground">busy</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="Ana L." nStatus="offline" />
        <span class="text-xs text-muted-foreground">offline</span>
      </div>
    </div>
  `,
})
export class AvatarStatusDemo {}
