import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'demo-avatar-default',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="flex items-center gap-4">
      <n-avatar
        nSrc="https://github.com/shadcn.png"
        nName="shadcn"
      />
      <n-avatar nName="João Prado" />
      <n-avatar />
    </div>
  `,
})
export class AvatarDefaultDemo {}
