import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';
import type { UploadError } from '../file-upload.types';

@Component({
  selector: 'demo-file-upload-multiple',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      nLabel="Galeria"
      nHint="Até 5 imagens · máximo 10 MB cada"
      [nMultiple]="true"
      [nMaxFiles]="5"
      [nMaxSize]="10 * 1024 * 1024"
      (nFileReject)="onReject($event)"
    />
  `,
})
export class FileUploadMultipleDemo {
  onReject(errors: UploadError[]): void {
    console.warn('Rejeitados:', errors);
  }
}
