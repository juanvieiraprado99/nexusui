import { Component, signal } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-progress',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      class="w-full max-w-lg"
      nLabel="Upload com progresso"
      nHint="Selecione uma imagem para simular o upload"
      nAccept="images"
      [nProgress]="progress()"
      (nFileSelect)="simulate()"
    />
  `,
})
export class FileUploadProgressDemo {
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
