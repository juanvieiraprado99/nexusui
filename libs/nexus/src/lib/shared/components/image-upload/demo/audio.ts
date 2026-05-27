import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-audio',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      class="w-full max-w-lg"
      nLabel="Áudio"
      nAccept="audio"
      nPreview="icon"
      [nMultiple]="true"
      [nMaxFiles]="10"
      nHint="MP3, WAV, AAC · múltiplos · máximo 20 MB cada"
      [nMaxSize]="20 * 1024 * 1024"
    />
  `,
})
export class ImageUploadAudioDemo {}
