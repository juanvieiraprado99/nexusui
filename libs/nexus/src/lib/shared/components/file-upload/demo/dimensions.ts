import { Component, signal } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';
import type { UploadError } from '../image-upload.types';

@Component({
  selector: 'demo-image-upload-dimensions',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <div class="flex flex-col gap-3 w-full max-w-lg">
      <n-image-upload
        nLabel="Logo"
        nAccept="images"
        nHint="Mínimo 200×200px · máximo 1024×1024px"
        [nMinWidth]="200"
        [nMinHeight]="200"
        [nMaxWidth]="1024"
        [nMaxHeight]="1024"
        (nFileReject)="onReject($event)"
      />
      @if (lastError()) {
        <p class="text-xs text-destructive">{{ lastError() }}</p>
      }
    </div>
  `,
})
export class ImageUploadDimensionsDemo {
  readonly lastError = signal<string>('');

  onReject(errors: UploadError[]): void {
    const dim = errors.find(e => e.reason === 'dimensions');
    this.lastError.set(dim?.message ?? '');
  }
}
