import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-videos',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      class="w-full max-w-lg"
      nLabel="Vídeo"
      nAccept="videos"
      nPreview="icon"
      nHint="MP4, MOV, AVI · máximo 100 MB"
      [nMaxSize]="100 * 1024 * 1024"
    />
  `,
})
export class ImageUploadVideosDemo {}
