import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';
import { BadgeComponent } from '../../badge/badge.component';

@Component({
  selector: 'demo-avatar-status',
  standalone: true,
  imports: [AvatarComponent, BadgeComponent],
  template: `
    <div class="flex items-center gap-6">
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="João P.">
          <n-badge nVariant="success" nClass="absolute bottom-0 right-0 size-3 rounded-full p-0 border-0 ring-2 ring-background" />
        </n-avatar>
        <span class="text-xs text-muted-foreground">online</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="Maria S.">
          <n-badge nVariant="warning" nClass="absolute bottom-0 right-0 size-3 rounded-full p-0 border-0 ring-2 ring-background" />
        </n-avatar>
        <span class="text-xs text-muted-foreground">away</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="Pedro A.">
          <n-badge nVariant="destructive" nClass="absolute bottom-0 right-0 size-3 rounded-full p-0 border-0 ring-2 ring-background" />
        </n-avatar>
        <span class="text-xs text-muted-foreground">busy</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <n-avatar nName="Ana L.">
          <n-badge nVariant="secondary" nClass="absolute bottom-0 right-0 size-3 rounded-full p-0 border-0 ring-2 ring-background" />
        </n-avatar>
        <span class="text-xs text-muted-foreground">offline</span>
      </div>
    </div>
  `,
})
export class AvatarStatusDemo {}
