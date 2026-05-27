import { Component, computed, signal } from '@angular/core';
import { ImageUploadComponent } from '../image-upload.component';
import type { AcceptPreset } from '../image-upload.types';

const PRESETS: { value: AcceptPreset | string; label: string }[] = [
  { value: 'images',       label: 'images' },
  { value: 'images-raster', label: 'images-raster' },
  { value: 'documents',    label: 'documents' },
  { value: 'spreadsheets', label: 'spreadsheets' },
  { value: 'archives',     label: 'archives' },
  { value: 'all',          label: 'all' },
  { value: '.pdf,.png',    label: '.pdf,.png (manual)' },
];

@Component({
  selector: 'demo-image-upload-accept-presets',
  standalone: true,
  imports: [ImageUploadComponent],
  template: `
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <div class="flex flex-wrap gap-2">
        @for (p of presets; track p.value) {
          <button
            class="rounded-md border px-3 py-1 text-xs font-mono transition-colors"
            [class]="active() === p.value
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-background text-muted-foreground border-border hover:border-foreground/30'"
            (click)="active.set(p.value)"
          >{{ p.label }}</button>
        }
      </div>
      <n-image-upload
        nLabel="Arquivo"
        [nAccept]="active()"
        [nHint]="hint()"
      />
    </div>
  `,
})
export class ImageUploadAcceptPresetsDemo {
  readonly presets = PRESETS;
  readonly active  = signal<AcceptPreset | string>('images');
  readonly hint    = computed(() => `nAccept='${this.active()}'`);
}
