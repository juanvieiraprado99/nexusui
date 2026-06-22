import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-archives',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      class="w-full max-w-lg"
      nLabel="Arquivo compactado"
      nAccept="archives"
      nPreview="icon"
      nHint="ZIP, RAR, TAR, 7Z · máximo 500 MB"
      [nMaxSize]="500 * 1024 * 1024"
    />
  `,
})
export class ImageUploadArchivesDemo {}
