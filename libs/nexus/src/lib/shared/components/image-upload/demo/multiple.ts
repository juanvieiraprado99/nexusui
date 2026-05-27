import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';
import type { UploadError } from '../image-upload.types';

@Component({
  selector: 'demo-image-upload-multiple',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      nLabel="Galeria"
      nHint="Até 5 imagens · máximo 10 MB cada"
      [nMultiple]="true"
      [nMaxFiles]="5"
      [nMaxSize]="10 * 1024 * 1024"
      (nFileReject)="onReject($event)"
    />
  `,
})
export class ImageUploadMultipleDemo {
  onReject(errors: UploadError[]): void {
    console.warn('Rejeitados:', errors);
  }
}
