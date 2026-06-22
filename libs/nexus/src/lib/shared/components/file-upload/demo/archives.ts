import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-archives',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      class="w-full max-w-lg"
      nLabel="Arquivo compactado"
      nAccept="archives"
      nPreview="icon"
      nHint="ZIP, RAR, TAR, 7Z · máximo 500 MB"
      [nMaxSize]="500 * 1024 * 1024"
    />
  `,
})
export class FileUploadArchivesDemo {}
