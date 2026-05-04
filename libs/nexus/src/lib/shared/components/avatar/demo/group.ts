import { Component } from '@angular/core';
import { AvatarGroupComponent } from '../avatar-group.component';
import { type AvatarGroupItem } from '../avatar-group.component';

@Component({
  selector: 'demo-avatar-group',
  standalone: true,
  imports: [AvatarGroupComponent],
  template: `
    <div class="flex flex-col gap-6">
      <n-avatar-group [nItems]="members" nAriaLabel="Membros da equipe" />

      <n-avatar-group [nItems]="members" [nMax]="3" nAriaLabel="Membros (máximo 3)" />

      <n-avatar-group [nItems]="members" nSize="sm" nAriaLabel="Membros pequenos" />

      <n-avatar-group [nItems]="members" nShape="square" nAriaLabel="Membros quadrados" />
    </div>
  `,
})
export class AvatarGroupDemo {
  readonly members: AvatarGroupItem[] = [
    { name: 'João Prado',   status: 'online' },
    { name: 'Maria Silva',  status: 'away' },
    { name: 'Pedro Santos', status: 'busy' },
    { name: 'Ana Lima',     status: 'offline' },
    { name: 'Carlos Melo',  status: 'online' },
    { name: 'Laura Costa' },
  ];
}
