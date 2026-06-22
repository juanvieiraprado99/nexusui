import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-mixed',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <n-image-upload
        nLabel="Imagem ou PDF"
        nAccept="image/*,.pdf"
        nPreview="icon"
        [nMultiple]="true"
        [nMaxFiles]="5"
        nHint="Aceita imagens e PDF · string manual"
      />
      <n-image-upload
        nLabel="Qualquer arquivo"
        nAccept="all"
        nPreview="icon"
        nHint="Sem restrição de tipo"
      />
    </div>
  `,
})
export class ImageUploadMixedDemo {}
