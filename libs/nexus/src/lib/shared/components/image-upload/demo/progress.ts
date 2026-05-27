import { Component, signal } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-progress',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      class="w-full max-w-lg"
      nLabel="Upload com progresso"
      nHint="Selecione uma imagem para simular o upload"
      nAccept="images"
      [nProgress]="progress()"
      (nFileSelect)="simulate()"
    />
  `,
})
export class ImageUploadProgressDemo {
  readonly progress = signal(-1);

  simulate(): void {
    this.progress.set(0);
    let pct = 0;
    const tick = setInterval(() => {
      pct += Math.floor(Math.random() * 12) + 4;
      if (pct >= 100) {
        this.progress.set(100);
        clearInterval(tick);
        setTimeout(() => this.progress.set(-1), 1200);
      } else {
        this.progress.set(pct);
      }
    }, 200);
  }
}
