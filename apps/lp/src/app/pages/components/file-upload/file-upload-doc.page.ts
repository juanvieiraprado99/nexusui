import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FileUploadComponent } from '../../../shared/components/file-upload';
import { UploadFile } from '../../../shared/components/file-upload/file-upload.types';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-file-upload-doc-page',
  imports: [
    FileUploadComponent,
    ReactiveFormsModule,
    DocsLayoutComponent,
    CodeBlockComponent,
    ExampleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">File Upload</h1>
          <p class="mt-2 text-muted-foreground">
            A drag &amp; drop uploader for images, videos, audio, documents and archives. Supports
            type/size/dimension validation, image cropping, upload progress, an avatar variant, and
            full reactive-forms integration via <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">ControlValueAccessor</code>.
          </p>
        </header>

        <!-- Default -->
        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <n-file-upload
              class="w-full max-w-md"
              nLabel="Imagem"
              nAccept="images"
              [nMaxSize]="2 * 1024 * 1024"
              nHint="PNG, JPG ou WebP até 2 MB"
            />
          </app-example>
        </div>

        <!-- Avatar -->
        <div class="mt-6">
          <app-example title="Avatar" [code]="avatarCode">
            <div class="flex items-end gap-6">
              <n-file-upload nVariant="avatar" nSize="sm" nAriaLabel="Foto pequena" />
              <n-file-upload nVariant="avatar" [nCrop]="true" [nCropAspectRatio]="1" nAriaLabel="Foto" />
              <n-file-upload nVariant="avatar" nSize="lg" nAriaLabel="Foto grande" />
            </div>
          </app-example>
        </div>

        <!-- Multiple -->
        <div class="mt-6">
          <app-example title="Multiple files" [code]="multipleCode">
            <n-file-upload
              class="w-full max-w-md"
              nLabel="Anexos"
              [nMultiple]="true"
              [nMaxFiles]="5"
              nAccept="all"
              nPreview="icon"
              nHint="Até 5 arquivos"
            />
          </app-example>
        </div>

        <!-- Crop -->
        <div class="mt-6">
          <app-example title="Image crop" [code]="cropCode">
            <n-file-upload
              class="w-full max-w-md"
              nLabel="Capa"
              nAccept="images"
              [nCrop]="true"
              [nCropAspectRatio]="16 / 9"
              (nFileCrop)="onCrop($event)"
            />
          </app-example>
        </div>

        <!-- Accept presets -->
        <div class="mt-6">
          <app-example title="Accept presets" [code]="presetsCode">
            <div class="grid w-full max-w-md gap-4">
              <n-file-upload nLabel="Documentos" nAccept="documents" nPreview="icon" />
              <n-file-upload nLabel="Vídeos" nAccept="videos" nPreview="icon" />
              <n-file-upload nLabel="Arquivos compactados" nAccept="archives" nPreview="icon" />
            </div>
          </app-example>
        </div>

        <!-- Progress -->
        <div class="mt-6">
          <app-example title="Upload progress" [code]="progressCode">
            <div class="w-full max-w-md space-y-3">
              <n-file-upload
                nLabel="Enviando"
                nAccept="images"
                [nProgress]="progress()"
                (nFileSelect)="simulateUpload()"
              />
              <button
                type="button"
                class="rounded-md bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80"
                (click)="simulateUpload()"
              >
                Simular upload
              </button>
            </div>
          </app-example>
        </div>

        <!-- Reactive form -->
        <div class="mt-6">
          <app-example title="Reactive form" [code]="reactiveCode">
            <div class="w-full max-w-md space-y-2">
              <n-file-upload
                [formControl]="avatar"
                nVariant="avatar"
                nAriaLabel="Foto de perfil"
                nError="Selecione uma foto."
              />
              <p class="text-xs text-muted-foreground">
                Status: {{ avatar.valid ? 'válido' : 'obrigatório' }}
              </p>
            </div>
          </app-example>
        </div>

        <!-- Installation -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'cli'" (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'" [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'">CLI</button>
              <button role="tab" type="button" [attr.aria-selected]="installTab() === 'manual'" (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'" [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'">Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add file-upload" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install dependencies:
                    <div class="mt-2 ml-5"><app-code-block code="npm install class-variance-authority" language="bash" /></div>
                  </li>
                  <li class="pt-3">Copy all files from the <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">file-upload/</code> directory into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/file-upload/</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <!-- API -->
        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>

          <h3 class="mt-4 text-sm font-medium text-muted-foreground">FileUploadComponent (n-file-upload)</h3>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Prop</th>
                  <th class="px-4 py-2 text-left font-medium">Type</th>
                  <th class="px-4 py-2 text-left font-medium">Default</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of apiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">nAccept presets</h3>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Preset</th>
                  <th class="px-4 py-2 text-left font-medium">Resolved accept</th>
                </tr>
              </thead>
              <tbody>
                @for (row of presetRows; track row.preset) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.preset }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.accept }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class FileUploadDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');
  protected readonly progress = signal(-1);
  protected readonly avatar = new FormControl<UploadFile[]>([], { nonNullable: true, validators: [Validators.required] });

  protected onCrop(_blob: Blob): void {
    // Hook for the cropped result — upload it, etc.
  }

  protected simulateUpload(): void {
    this.progress.set(0);
    const id = setInterval(() => {
      const next = this.progress() + 10;
      this.progress.set(next);
      if (next >= 100) clearInterval(id);
    }, 200);
  }

  protected readonly defaultCode = `<n-file-upload
  nLabel="Imagem"
  nAccept="images"
  [nMaxSize]="2 * 1024 * 1024"
  nHint="PNG, JPG ou WebP até 2 MB"
/>`;

  protected readonly avatarCode = `<n-file-upload nVariant="avatar" nSize="sm" nAriaLabel="Foto" />
<n-file-upload nVariant="avatar" [nCrop]="true" [nCropAspectRatio]="1" nAriaLabel="Foto" />
<n-file-upload nVariant="avatar" nSize="lg" nAriaLabel="Foto" />`;

  protected readonly multipleCode = `<n-file-upload
  nLabel="Anexos"
  [nMultiple]="true"
  [nMaxFiles]="5"
  nAccept="all"
  nPreview="icon"
  nHint="Até 5 arquivos"
/>`;

  protected readonly cropCode = `<n-file-upload
  nLabel="Capa"
  nAccept="images"
  [nCrop]="true"
  [nCropAspectRatio]="16 / 9"
  (nFileCrop)="onCrop($event)"
/>`;

  protected readonly presetsCode = `<n-file-upload nLabel="Documentos" nAccept="documents" nPreview="icon" />
<n-file-upload nLabel="Vídeos" nAccept="videos" nPreview="icon" />
<n-file-upload nLabel="Arquivos compactados" nAccept="archives" nPreview="icon" />`;

  protected readonly progressCode = `<n-file-upload
  nLabel="Enviando"
  nAccept="images"
  [nProgress]="progress()"
  (nFileSelect)="simulateUpload()"
/>`;

  protected readonly reactiveCode = `avatar = new FormControl<UploadFile[]>([], {
  nonNullable: true,
  validators: [Validators.required],
});`;

  protected readonly importCode = `import { FileUploadComponent } from '@/components/file-upload';

@Component({
  imports: [FileUploadComponent],
  // ...
})
export class MyPage {}`;

  protected readonly usageCode = `<n-file-upload
  nLabel="Imagem"
  nAccept="images"
  [nMaxSize]="2 * 1024 * 1024"
  [nCrop]="true"
  (nFileSelect)="onSelect($event)"
  (nFileReject)="onReject($event)"
/>`;

  protected readonly apiRows: ApiRow[] = [
    { prop: 'nVariant', type: "'dropzone' | 'avatar'", default: "'dropzone'", description: 'Visual style.' },
    { prop: 'nSize', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Control size.' },
    { prop: 'nAccept', type: 'AcceptPreset | string', default: "'image/*'", description: 'Named preset or raw accept string.' },
    { prop: 'nMaxSize', type: 'number', default: '0', description: 'Max size in bytes (0 = unlimited).' },
    { prop: 'nMultiple', type: 'boolean', default: 'false', description: 'Allow multiple files.' },
    { prop: 'nMaxFiles', type: 'number', default: '10', description: 'File limit when nMultiple is true.' },
    { prop: 'nMinWidth / nMinHeight', type: 'number', default: '0', description: 'Minimum image dimensions in px (0 = off).' },
    { prop: 'nMaxWidth / nMaxHeight', type: 'number', default: '0', description: 'Maximum image dimensions in px (0 = off).' },
    { prop: 'nPreview', type: "'image' | 'icon'", default: "'image'", description: 'Show image thumbnail or a generic file icon.' },
    { prop: 'nProgress', type: 'number', default: '-1', description: 'Upload progress 0–100 (-1 hides the bar).' },
    { prop: 'nCrop', type: 'boolean', default: 'false', description: 'Enable the image crop action.' },
    { prop: 'nCropAspectRatio', type: 'number | null', default: 'null', description: 'Locked crop ratio (e.g. 16/9, 1) or free.' },
    { prop: 'nDisabled', type: 'boolean', default: 'false', description: 'Disable the control.' },
    { prop: 'nRequired', type: 'boolean', default: 'false', description: 'Mark as required.' },
    { prop: 'nLabel', type: 'string', default: "''", description: 'Visible label.' },
    { prop: 'nError', type: 'string | null', default: 'null', description: 'Manual error message.' },
    { prop: 'nHint', type: 'string | null', default: 'null', description: 'Helper text shown below the control.' },
    { prop: 'nAriaLabel', type: 'string', default: "''", description: 'Accessible label (avatar without a visible nLabel).' },
    { prop: 'nClass', type: 'string', default: "''", description: 'Extra Tailwind classes on the wrapper.' },
    { prop: 'nId', type: 'string', default: "''", description: 'Element id (auto-generated when omitted).' },
    { prop: 'nValue', type: 'UploadFile[]', default: '[]', description: 'Two-way bound list of selected files.' },
    { prop: 'nFileSelect', type: 'OutputEmitterRef<File[]>', default: '—', description: 'Emits files that passed all validations.' },
    { prop: 'nFileCrop', type: 'OutputEmitterRef<Blob>', default: '—', description: 'Emits the cropped blob after confirmation.' },
    { prop: 'nFileReject', type: 'OutputEmitterRef<UploadError[]>', default: '—', description: 'Emits rejected files with a reason.' },
  ];

  protected readonly presetRows = [
    { preset: 'all', accept: '*/*' },
    { preset: 'images', accept: 'image/*' },
    { preset: 'images-raster', accept: '.jpg,.jpeg,.png,.webp,.gif,.avif' },
    { preset: 'documents', accept: '.pdf,.doc,.docx,.txt,.rtf,.odt' },
    { preset: 'spreadsheets', accept: '.csv,.xls,.xlsx,.ods' },
    { preset: 'videos', accept: 'video/*' },
    { preset: 'audio', accept: 'audio/*' },
    { preset: 'archives', accept: '.zip,.rar,.tar,.gz,.7z' },
  ];
}
