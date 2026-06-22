import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-with-crop',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      nLabel="Banner"
      nHint="Proporção 16:9 · imagem será recortada antes de enviar"
      [nCrop]="true"
      [nCropAspectRatio]="16 / 9"
      (nFileCrop)="onCrop($event)"
    />
  `,
})
export class FileUploadWithCropDemo {
  onCrop(blob: Blob): void {
    console.log('Recortado:', (blob.size / 1024).toFixed(1), 'KB');
  }
}
