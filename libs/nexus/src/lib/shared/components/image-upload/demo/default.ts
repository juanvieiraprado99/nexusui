import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';
import type { UploadFile, UploadError } from '../image-upload.types';

@Component({
  selector: 'demo-image-upload-default',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      nLabel="Imagem"
      nHint="PNG, JPG ou WebP · máximo 5 MB"
      [nMaxSize]="5 * 1024 * 1024"
      (nFileSelect)="onSelect($event)"
      (nFileReject)="onReject($event)"
    />
  `,
})
export class ImageUploadDefaultDemo {
  onSelect(files: File[]): void {
    console.log('Selecionados:', files.map(f => f.name));
  }

  onReject(errors: UploadError[]): void {
    console.warn('Rejeitados:', errors);
  }
}
