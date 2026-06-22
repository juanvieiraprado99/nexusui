import { Component, signal } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';
import type { UploadFile } from '../file-upload.types';

@Component({
  selector: 'demo-file-upload-progress-multiple',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      class="w-full max-w-lg"
      nLabel="Upload paralelo"
      nHint="Cada arquivo tem sua própria barra de progresso"
      nAccept="images"
      [nMultiple]="true"
      [nMaxFiles]="5"
      [(nValue)]="files"
      (nFileSelect)="simulate()"
    />
  `,
})
export class FileUploadProgressMultipleDemo {
  readonly files = signal<UploadFile[]>([]);

  simulate(): void {
    for (const f of this.files()) {
      if (f.progress !== undefined) continue;
      this._run(f.id, Math.floor(Math.random() * 8) + 3);
    }
  }

  private _run(id: string, step: number): void {
    this._set(id, 0);
    const tick = setInterval(() => {
      const current = this.files().find(f => f.id === id);
      if (!current) { clearInterval(tick); return; }
      const next = Math.min(100, (current.progress ?? 0) + step);
      this._set(id, next);
      if (next >= 100) clearInterval(tick);
    }, 250);
  }

  private _set(id: string, progress: number): void {
    this.files.update(list => list.map(f => f.id === id ? { ...f, progress } : f));
  }
}
