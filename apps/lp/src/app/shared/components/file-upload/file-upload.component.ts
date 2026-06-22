import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '../../utils/form-control';
import { mergeClasses } from '../../utils/merge-classes';
import { ButtonComponent } from '../button';
import { LabelComponent } from '../label';
import { FileUploadCropComponent } from './file-upload-crop.component';
import { fileUploadVariants, type FileUploadVariants } from './file-upload.variants';
import { ACCEPT_PRESETS, ACCEPT_LABELS, type AcceptPreset, type UploadFile, type UploadError } from './file-upload.types';

let _idCounter = 0;

@Component({
  selector: 'n-file-upload',
  standalone: true,
  imports: [ButtonComponent, LabelComponent, FileUploadCropComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents min-w-0' },
  template: `
    <div [class]="wrapperClasses()" data-slot="root">

      @if (nLabel()) {
        <n-label [nRequired]="nRequired()" [nDisabled]="isDisabled()">
          {{ nLabel() }}
        </n-label>
      }

      @if (nVariant() === 'dropzone') {

        <div
          [class]="dropzoneClasses()"
          data-slot="control"
          role="button"
          [attr.tabindex]="isDisabled() ? -1 : 0"
          [attr.aria-disabled]="isDisabled() ? true : null"
          [attr.aria-invalid]="hasError() ? true : null"
          [attr.aria-describedby]="describedBy()"
          (click)="!isDisabled() && fileInput.click()"
          (keydown.enter)="onActivateKey($event, fileInput)"
          (keydown.space)="onActivateKey($event, fileInput)"
          (dragenter)="onDragEnter($event)"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave()"
          (drop)="onDrop($event)"
        >
          <input
            #fileInput
            type="file"
            class="hidden"
            [accept]="_resolvedAccept()"
            [multiple]="nMultiple()"
            [disabled]="isDisabled()"
            (change)="onFileInput($event)"
          />

          @if (nValue().length === 0) {
            <div class="flex flex-col items-center gap-3 text-center pointer-events-none select-none">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground" aria-hidden="true">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                  <path d="M12 12v9"/>
                  <path d="m16 16-4-4-4 4"/>
                </svg>
              </div>
              <div>
                <p class="text-sm">
                  <span class="font-medium text-foreground">Clique para selecionar</span>
                  <span class="text-muted-foreground"> ou arraste aqui</span>
                </p>
                @if (nAccept() && nAccept() !== 'all') {
                  <p class="text-xs text-muted-foreground mt-0.5">{{ _acceptLabel() }}</p>
                }
                @if (nMaxSize() > 0) {
                  <p class="text-xs text-muted-foreground mt-0.5">Máximo {{ formatSize(nMaxSize()) }}</p>
                }
              </div>
            </div>
          } @else {
            <div class="w-full min-w-0 flex flex-col gap-2" (click)="$event.stopPropagation()" (keydown)="$event.stopPropagation()">

              @for (file of nValue(); track file.id; let i = $index) {
                <div class="flex items-center gap-3 rounded-md border border-border bg-background/80 p-2.5" data-slot="item">

                  @if (nPreview() === 'image') {
                    <img [src]="file.preview" [alt]="file.name" class="h-11 w-11 rounded-md object-cover shrink-0 border border-border" />
                  } @else {
                    <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-muted border border-border">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground" aria-hidden="true">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                    </div>
                  }

                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-foreground truncate leading-tight">{{ file.name }}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">{{ formatSize(file.size) }}</p>
                    @if (fileProgress(file) >= 0) {
                      <div class="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden" data-slot="progress">
                        <div class="h-full rounded-full bg-primary transition-all duration-300" [style.width.%]="fileProgress(file)"></div>
                      </div>
                    }
                  </div>

                  <div class="flex items-center gap-1 shrink-0">
                    @if (nCrop()) {
                      <button
                        n-button
                        nVariant="ghost"
                        nSize="icon"
                        nClass="h-7 w-7 text-muted-foreground"
                        aria-label="Recortar imagem"
                        (nClick)="openCrop(file)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>
                      </button>
                    }
                    <button
                      n-button
                      nVariant="ghost"
                      nSize="icon"
                      nClass="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      [attr.aria-label]="'Remover ' + file.name"
                      (nClick)="removeFile(i)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>

                </div>
              }

              @if (nMultiple() && nValue().length < nMaxFiles()) {
                <button
                  n-button
                  nVariant="ghost"
                  nSize="sm"
                  nClass="self-start text-muted-foreground gap-1.5 px-2"
                  (nClick)="fileInput.click()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                  Adicionar mais
                </button>
              }

            </div>
          }
        </div>

      } @else {

        <!-- Avatar variant -->
        <div
          [class]="avatarClasses()"
          data-slot="control"
          role="button"
          [attr.tabindex]="isDisabled() ? -1 : 0"
          [attr.aria-label]="nAriaLabel() || nLabel() || 'Selecionar foto'"
          [attr.aria-disabled]="isDisabled() ? true : null"
          [attr.aria-invalid]="hasError() ? true : null"
          (click)="!isDisabled() && avatarInput.click()"
          (keydown.enter)="onActivateKey($event, avatarInput)"
          (keydown.space)="onActivateKey($event, avatarInput)"
        >
          <input
            #avatarInput
            type="file"
            class="hidden"
            [accept]="_resolvedAccept()"
            [disabled]="isDisabled()"
            (change)="onFileInput($event)"
          />

          @if (nValue()[0] && nPreview() === 'image') {
            <img [src]="nValue()[0].preview" [alt]="nValue()[0].name" class="h-full w-full object-cover" />
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          }

          @if (!isDisabled()) {
            <button
              n-button
              nVariant="default"
              nSize="icon"
              nClass="absolute bottom-0.5 right-0.5 h-6 w-6 rounded-full border-2 border-background"
              aria-label="Alterar foto"
              tabindex="-1"
              (nClick)="$event.stopPropagation(); avatarInput.click()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
          }

          @if (nCrop() && nValue()[0]) {
            <button
              n-button
              nVariant="outline"
              nSize="icon"
              nClass="absolute top-0.5 right-0.5 h-6 w-6 rounded-full text-muted-foreground"
              aria-label="Recortar foto"
              tabindex="-1"
              (nClick)="$event.stopPropagation(); openCrop(nValue()[0])"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>
            </button>
          }

        </div>

      }

      @if (hasError()) {
        <p [id]="errorId()" class="mt-1 text-xs text-destructive animate-error-in" role="alert" data-slot="error">
          {{ nError() }}
        </p>
      }

      @if (nHint() && !hasError()) {
        <p [id]="hintId()" class="mt-1 text-xs text-muted-foreground" data-slot="hint">
          {{ nHint() }}
        </p>
      }

    </div>

    @if (_cropTarget()) {
      <n-file-upload-crop
        [nFile]="_cropTarget()!"
        [nAspectRatio]="nCropAspectRatio()"
        (confirm)="onCropConfirm($event)"
        (cancel)="onCropCancel()"
      />
    }
  `,
})
export class FileUploadComponent implements ControlValueAccessor {
  readonly nVariant         = input<FileUploadVariants['nVariant']>('dropzone');
  readonly nSize            = input<FileUploadVariants['nSize']>('default');
  readonly nAccept          = input<string>('image/*');
  readonly nMaxSize         = input<number>(0);
  readonly nMultiple        = input<boolean>(false);
  readonly nMaxFiles        = input<number>(10);
  readonly nMinWidth        = input<number>(0);
  readonly nMinHeight       = input<number>(0);
  readonly nMaxWidth        = input<number>(0);
  readonly nMaxHeight       = input<number>(0);
  readonly nPreview         = input<'image' | 'icon'>('image');
  readonly nProgress        = input<number>(-1);
  readonly nCrop            = input<boolean>(false);
  readonly nCropAspectRatio = input<number | null>(null);
  readonly nDisabled        = input<boolean>(false);
  readonly nRequired        = input<boolean>(false);
  readonly nLabel           = input<string>('');
  readonly nError           = input<string | null>(null);
  readonly nHint            = input<string | null>(null);
  readonly nClass           = input<string>('');
  readonly nAriaLabel       = input<string>('');
  readonly nId              = input<string>('');

  readonly nValue = model<UploadFile[]>([]);

  readonly nFileSelect = output<File[]>();
  readonly nFileCrop   = output<Blob>();
  readonly nFileReject = output<UploadError[]>();

  private readonly _form       = injectFormControl<UploadFile[]>(this);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _staticId   = `n-file-upload-${++_idCounter}`;

  protected readonly _cropTarget = signal<UploadFile | null>(null);
  protected readonly _isDragging = signal(false);
  private _dragCounter = 0;

  protected readonly isDisabled  = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError    = computed(() => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()));
  protected readonly elementId   = computed(() => this.nId() || this._staticId);
  protected readonly errorId     = computed(() => `${this.elementId()}-error`);
  protected readonly hintId      = computed(() => `${this.elementId()}-hint`);

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint())    return this.hintId();
    return null;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col gap-1.5 min-w-0', this.nClass()),
  );

  protected readonly dropzoneClasses = computed(() =>
    mergeClasses(
      fileUploadVariants({ nVariant: 'dropzone', nSize: this.nSize() }),
      'min-w-0 max-w-full overflow-hidden',
      this.hasError() && 'border-destructive',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
      this.nValue().length > 0 && 'items-stretch justify-start',
      this._isDragging() && 'border-primary bg-primary/5',
    ),
  );

  protected readonly avatarClasses = computed(() =>
    mergeClasses(
      fileUploadVariants({ nVariant: 'avatar', nSize: this.nSize() }),
      this.hasError() && 'border-destructive',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
    ),
  );

  protected readonly _resolvedAccept = computed(() =>
    ACCEPT_PRESETS[this.nAccept() as AcceptPreset] ?? this.nAccept(),
  );

  protected readonly _acceptLabel = computed(() =>
    ACCEPT_LABELS[this.nAccept() as AcceptPreset] ?? this.nAccept(),
  );

  constructor() {
    this._destroyRef.onDestroy(() => {
      for (const f of this.nValue()) URL.revokeObjectURL(f.preview);
    });
  }

  protected onActivateKey(e: Event, input: HTMLInputElement): void {
    if (this.isDisabled()) return;
    e.preventDefault();
    input.click();
  }

  protected onDragEnter(e: DragEvent): void {
    e.preventDefault();
    this._dragCounter++;
    if (!this.isDisabled()) this._isDragging.set(true);
  }

  protected onDragOver(e: DragEvent): void {
    e.preventDefault();
    if (e.dataTransfer && !this.isDisabled()) e.dataTransfer.dropEffect = 'copy';
  }

  protected onDragLeave(): void {
    this._dragCounter--;
    if (this._dragCounter <= 0) {
      this._dragCounter = 0;
      this._isDragging.set(false);
    }
  }

  protected onDrop(e: DragEvent): void {
    e.preventDefault();
    this._dragCounter = 0;
    this._isDragging.set(false);
    if (this.isDisabled()) return;
    const files = e.dataTransfer?.files;
    if (files?.length) void this._processFiles(files);
  }

  protected fileProgress(file: UploadFile): number {
    return file.progress ?? this.nProgress();
  }

  protected onFileInput(e: Event): void {
    const files = (e.target as HTMLInputElement).files;
    if (files?.length) void this._processFiles(files);
    (e.target as HTMLInputElement).value = '';
  }

  protected removeFile(index: number): void {
    const files = [...this.nValue()];
    const removed = files.splice(index, 1)[0];
    if (removed?.preview) URL.revokeObjectURL(removed.preview);
    this._updateValue(files);
    this._form.notifyTouched();
  }

  protected openCrop(file: UploadFile): void {
    this._cropTarget.set(file);
  }

  protected onCropConfirm(blob: Blob): void {
    const target = this._cropTarget();
    if (!target) return;

    const croppedFile = new File([blob], target.name, { type: blob.type });
    const preview     = URL.createObjectURL(blob);
    const updated: UploadFile = { id: target.id, file: croppedFile, preview, name: target.name, size: blob.size, type: blob.type, progress: target.progress };

    URL.revokeObjectURL(target.preview);
    const files = this.nValue().map(f => f === target ? updated : f);
    this._updateValue(files);
    this.nFileCrop.emit(blob);
    this._cropTarget.set(null);
  }

  protected onCropCancel(): void {
    this._cropTarget.set(null);
  }

  protected formatSize(bytes: number): string {
    if (bytes < 1024)           return `${bytes} B`;
    if (bytes < 1024 * 1024)    return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private _updateValue(files: UploadFile[]): void {
    this.nValue.set(files);
    this._form.notifyChange(files);
  }

  private async _processFiles(rawFiles: FileList | File[]): Promise<void> {
    const list    = Array.from(rawFiles);
    const current = this.nValue();
    const slots   = this.nMultiple() ? this.nMaxFiles() - current.length : 1;

    const candidates = list.slice(0, slots);
    const rejected: UploadError[] = list.slice(slots).map(file => ({
      file, reason: 'count', message: `Limite de ${this.nMaxFiles()} arquivo(s) atingido.`,
    }));

    const checks = await Promise.all(
      candidates.map(async (file): Promise<UploadFile | UploadError> => {
        if (!this._matchesAccept(file)) {
          return { file, reason: 'type', message: `Tipo "${file.type}" não é aceito.` };
        }
        if (this.nMaxSize() > 0 && file.size > this.nMaxSize()) {
          return { file, reason: 'size', message: `Arquivo excede ${this.formatSize(this.nMaxSize())}.` };
        }
        if (file.type.startsWith('image/') && (this.nMinWidth() || this.nMinHeight() || this.nMaxWidth() || this.nMaxHeight())) {
          const dimErr = await this._checkDimensions(file);
          if (dimErr) return { file, reason: 'dimensions', message: dimErr };
        }
        const preview = URL.createObjectURL(file);
        return { id: crypto.randomUUID(), file, preview, name: file.name, size: file.size, type: file.type };
      }),
    );

    const accepted: UploadFile[] = [];
    for (const result of checks) {
      if ('reason' in result) rejected.push(result);
      else accepted.push(result);
    }

    if (rejected.length) this.nFileReject.emit(rejected);

    if (accepted.length) {
      // Single-file mode replaces the current selection — revoke the previous
      // preview URLs first so re-selecting a file doesn't leak object URLs.
      if (!this.nMultiple()) {
        for (const f of current) URL.revokeObjectURL(f.preview);
      }
      const newFiles = this.nMultiple() ? [...current, ...accepted] : accepted;
      this._updateValue(newFiles);
      this.nFileSelect.emit(accepted.map(f => f.file));
    }
  }

  private _matchesAccept(file: File): boolean {
    const accept = this._resolvedAccept().trim();
    if (!accept || accept === '*' || accept === '*/*') return true;
    return accept.split(',').some(token => {
      const t = token.trim();
      if (t.endsWith('/*'))   return file.type.startsWith(t.slice(0, -1));
      if (t.startsWith('.'))  return file.name.toLowerCase().endsWith(t.toLowerCase());
      return file.type === t;
    });
  }

  private _checkDimensions(file: File): Promise<string | null> {
    return new Promise(resolve => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        const { naturalWidth: w, naturalHeight: h } = img;
        if (this.nMinWidth()  && w < this.nMinWidth())  return resolve(`Largura mínima: ${this.nMinWidth()}px.`);
        if (this.nMinHeight() && h < this.nMinHeight()) return resolve(`Altura mínima: ${this.nMinHeight()}px.`);
        if (this.nMaxWidth()  && w > this.nMaxWidth())  return resolve(`Largura máxima: ${this.nMaxWidth()}px.`);
        if (this.nMaxHeight() && h > this.nMaxHeight()) return resolve(`Altura máxima: ${this.nMaxHeight()}px.`);
        resolve(null);
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }

  writeValue(value: UploadFile[] | null | undefined): void {
    for (const f of this.nValue()) URL.revokeObjectURL(f.preview);
    this.nValue.set(value ?? []);
  }

  registerOnChange(fn: (v: UploadFile[]) => void): void { this._form.setOnChange(fn); }
  registerOnTouched(fn: () => void): void               { this._form.setOnTouched(fn); }
  setDisabledState(isDisabled: boolean): void           { this._form.setDisabledByForm(isDisabled); }
}
