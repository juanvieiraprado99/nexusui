import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-audio',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
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
export class FileUploadAudioDemo {}
