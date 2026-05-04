import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';
import { AvatarComponent } from '../../avatar/avatar.component';

@Component({
  selector: 'demo-badge-with-avatar',
  standalone: true,
  imports: [BadgeComponent, AvatarComponent],
  template: `
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-3">
        <n-avatar nName="João Prado">
          <n-badge nVariant="success" nClass="absolute bottom-0 right-0 size-3 rounded-full p-0 border-0 ring-2 ring-background" />
        </n-avatar>
        <div class="flex flex-col gap-1">
          <span class="text-sm font-medium">João Prado</span>
          <n-badge nVariant="success">Online</n-badge>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <n-avatar nName="Maria Silva">
          <n-badge nVariant="warning" nClass="absolute bottom-0 right-0 size-3 rounded-full p-0 border-0 ring-2 ring-background" />
        </n-avatar>
        <div class="flex flex-col gap-1">
          <span class="text-sm font-medium">Maria Silva</span>
          <n-badge nVariant="warning">Ausente</n-badge>
        </div>
      </div>
    </div>
  `,
})
export class BadgeWithAvatarDemo {}
