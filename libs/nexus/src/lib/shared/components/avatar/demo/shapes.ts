import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'demo-avatar-shapes',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="flex items-center gap-4">
      <n-avatar nShape="circle" nName="Maria Silva" />
      <n-avatar nShape="square" nName="Maria Silva" />
      <n-avatar nShape="circle" nSrc="https://github.com/shadcn.png" nName="shadcn" />
      <n-avatar nShape="square" nSrc="https://github.com/shadcn.png" nName="shadcn" />
    </div>
  `,
})
export class AvatarShapesDemo {}
