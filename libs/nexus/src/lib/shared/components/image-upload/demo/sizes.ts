import { Component } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';

@Component({
  selector: 'demo-image-upload-sizes',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <n-image-upload nSize="sm" nLabel="Small" nHint="nSize=&quot;sm&quot;" />
      <n-image-upload nSize="default" nLabel="Default" nHint="nSize=&quot;default&quot;" />
      <n-image-upload nSize="lg" nLabel="Large" nHint="nSize=&quot;lg&quot;" />
    </div>
  `,
})
export class ImageUploadSizesDemo {}
