import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-error',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <n-image-upload
      class="w-full max-w-lg"
      nLabel="Comprovante"
      nAccept="images"
      [nRequired]="true"
      nError="Envie um comprovante válido."
    />
  `,
})
export class ImageUploadErrorDemo {}
