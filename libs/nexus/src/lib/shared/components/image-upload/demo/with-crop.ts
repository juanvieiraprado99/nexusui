import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-with-crop',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      nLabel="Banner"
      nHint="Proporção 16:9 · imagem será recortada antes de enviar"
      [nCrop]="true"
      [nCropAspectRatio]="16 / 9"
      (nFileCrop)="onCrop($event)"
    />
  `,
})
export class ImageUploadWithCropDemo {
  onCrop(blob: Blob): void {
    console.log('Recortado:', (blob.size / 1024).toFixed(1), 'KB');
  }
}
