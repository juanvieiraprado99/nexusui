import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'demo-avatar-sizes',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="flex items-center gap-4">
      <n-avatar nSize="xs"      nName="João Prado" />
      <n-avatar nSize="sm"      nName="João Prado" />
      <n-avatar nSize="default" nName="João Prado" />
      <n-avatar nSize="lg"      nName="João Prado" />
      <n-avatar nSize="xl"      nName="João Prado" />
    </div>
  `,
})
export class AvatarSizesDemo {}
