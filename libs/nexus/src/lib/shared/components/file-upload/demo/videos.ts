import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-videos',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      class="w-full max-w-lg"
      nLabel="Vídeo"
      nAccept="videos"
      nPreview="icon"
      nHint="MP4, MOV, AVI · máximo 100 MB"
      [nMaxSize]="100 * 1024 * 1024"
    />
  `,
})
export class FileUploadVideosDemo {}
