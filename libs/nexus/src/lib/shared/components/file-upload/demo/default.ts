import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';
import type { UploadFile, UploadError } from '../file-upload.types';

@Component({
  selector: 'demo-file-upload-default',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      nLabel="Imagem"
      nHint="PNG, JPG ou WebP · máximo 5 MB"
      [nMaxSize]="5 * 1024 * 1024"
      (nFileSelect)="onSelect($event)"
      (nFileReject)="onReject($event)"
    />
  `,
})
export class FileUploadDefaultDemo {
  onSelect(files: File[]): void {
    console.log('Selecionados:', files.map(f => f.name));
  }

  onReject(errors: UploadError[]): void {
    console.warn('Rejeitados:', errors);
  }
}
