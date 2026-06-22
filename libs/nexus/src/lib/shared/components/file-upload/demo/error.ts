import { Component } from '@angular/core';
import { FileUploadComponent } from '../file-upload.component';

@Component({
  selector: 'demo-file-upload-error',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <n-file-upload
      class="w-full max-w-lg"
      nLabel="Comprovante"
      nAccept="images"
      [nRequired]="true"
      nError="Envie um comprovante válido."
    />
  `,
})
export class FileUploadErrorDemo {}
