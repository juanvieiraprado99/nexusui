import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'demo-avatar-fallback',
  standalone: true,
  imports: [AvatarComponent],
  template: `
    <div class="flex items-center gap-4">
      <n-avatar nName="João Prado" />
      <n-avatar nName="Maria Silva" />
      <n-avatar nName="Pedro Alves Santos" />
      <n-avatar nName="Ana" />
      <n-avatar nSrc="https://broken-url.example.com/img.png" nName="Imagem Quebrada" />
      <n-avatar />
    </div>
  `,
})
export class AvatarFallbackDemo {}
