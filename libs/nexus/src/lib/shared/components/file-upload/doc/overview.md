# File Upload

Componente para seleção e upload de arquivos (imagens, vídeos, áudio, documentos, arquivos compactados) com suporte a drag & drop, preview, recorte de imagem (crop) e integração com ReactiveForms.

## Uso básico

```html
<n-file-upload
  nLabel="Foto de capa"
  nHint="PNG, JPG ou WebP · máximo 5 MB"
  [nMaxSize]="5 * 1024 * 1024"
  (nFileSelect)="onSelect($event)"
/>
```

## Avatar circular

```html
<n-file-upload
  nVariant="avatar"
  nLabel="Foto de perfil"
  [nCrop]="true"
  [nCropAspectRatio]="1"
/>
```

## Múltiplos arquivos

```html
<n-file-upload
  [nMultiple]="true"
  [nMaxFiles]="5"
  nLabel="Galeria"
/>
```

## Com recorte forçado

```html
<n-file-upload
  [nCrop]="true"
  [nCropAspectRatio]="16 / 9"
  nLabel="Banner"
  (nFileCrop)="onCrop($event)"
/>
```

## Com ícone em vez de preview

```html
<n-file-upload nPreview="icon" nLabel="Documento" nAccept=".jpg,.png,.pdf" />
```

## ReactiveForm

```ts
form = new FormGroup({
  photo: new FormControl<UploadFile[]>([], Validators.required),
});
```

```html
<n-file-upload nLabel="Foto" [formControl]="form.controls.photo" />
```

## Progresso de upload

```html
<n-file-upload
  [nProgress]="uploadProgress()"
  (nFileSelect)="startUpload($event)"
/>
```

`nProgress` aceita `-1` (sem barra) ou `0–100`. O componente não realiza o upload — apenas exibe o progresso informado pelo consumidor.
