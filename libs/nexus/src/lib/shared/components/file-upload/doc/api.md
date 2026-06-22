# API — Image Upload

## Inputs

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `nVariant` | `'dropzone' \| 'avatar'` | `'dropzone'` | Estilo visual |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho |
| `nAccept` | `AcceptPreset \| string` | `'image/*'` | Preset nomeado ou string manual de tipos aceitos |
| `nMaxSize` | `number` | `0` | Tamanho máximo em bytes (0 = sem limite) |
| `nMultiple` | `boolean` | `false` | Permite múltiplos arquivos |
| `nMaxFiles` | `number` | `10` | Limite de arquivos (quando `nMultiple`) |
| `nMinWidth` | `number` | `0` | Largura mínima em px (0 = sem limite) |
| `nMinHeight` | `number` | `0` | Altura mínima em px (0 = sem limite) |
| `nMaxWidth` | `number` | `0` | Largura máxima em px (0 = sem limite) |
| `nMaxHeight` | `number` | `0` | Altura máxima em px (0 = sem limite) |
| `nPreview` | `'image' \| 'icon'` | `'image'` | Exibe thumbnail ou ícone genérico |
| `nProgress` | `number` | `-1` | Progresso de upload 0–100 (-1 oculta a barra) |
| `nCrop` | `boolean` | `false` | Habilita botão de recorte |
| `nCropAspectRatio` | `number \| null` | `null` | Proporção do recorte (ex.: `16/9`, `1`, `null` = livre) |
| `nDisabled` | `boolean` | `false` | Desabilita o componente |
| `nRequired` | `boolean` | `false` | Marca como obrigatório |
| `nLabel` | `string` | `''` | Rótulo visível |
| `nError` | `string \| null` | `null` | Mensagem de erro manual |
| `nHint` | `string \| null` | `null` | Texto auxiliar |
| `nClass` | `string` | `''` | Classes extras no wrapper |
| `nAriaLabel` | `string` | `''` | Label acessível (avatar sem `nLabel` visível) |
| `nId` | `string` | `''` | ID do elemento (gerado automaticamente se omitido) |

## Presets de `nAccept`

| Preset | Accept resolvido | Label visível |
|--------|-----------------|---------------|
| `'all'` | `*/*` | Todos os arquivos |
| `'images'` | `image/*` | PNG, JPG, GIF, WebP, SVG... |
| `'images-raster'` | `.jpg,.jpeg,.png,.webp,.gif,.avif` | JPG, PNG, WebP, GIF, AVIF |
| `'documents'` | `.pdf,.doc,.docx,.txt,.rtf,.odt` | PDF, DOC, DOCX, TXT |
| `'spreadsheets'` | `.csv,.xls,.xlsx,.ods` | CSV, XLS, XLSX, ODS |
| `'videos'` | `video/*` | MP4, MOV, AVI... |
| `'audio'` | `audio/*` | MP3, WAV, AAC... |
| `'archives'` | `.zip,.rar,.tar,.gz,.7z` | ZIP, RAR, TAR, 7Z |

Qualquer string fora desta lista é passada diretamente ao atributo `accept` do `<input>`.

## Model

| Model | Tipo | Descrição |
|-------|------|-----------|
| `nValue` | `UploadFile[]` | Lista de arquivos selecionados (two-way) |

## Outputs

| Output | Tipo | Descrição |
|--------|------|-----------|
| `nFileSelect` | `File[]` | Arquivos que passaram todas as validações |
| `nFileCrop` | `Blob` | Blob resultante do recorte confirmado |
| `nFileReject` | `UploadError[]` | Arquivos rejeitados com motivo |

## Tipos

### `UploadFile`

```ts
interface UploadFile {
  file: File;
  preview: string;  // Object URL — revogado automaticamente ao remover / destruir
  name: string;
  size: number;
  type: string;
}
```

### `UploadError`

```ts
interface UploadError {
  file: File;
  reason: 'size' | 'type' | 'dimensions' | 'count';
  message: string;
}
```

## data-slot

| Slot | Elemento | Descrição |
|------|----------|-----------|
| `root` | `div` externo | Container principal |
| `control` | `div` dropzone ou avatar | Área interativa |
| `item` | `div` por arquivo | Linha de arquivo na lista |
| `progress` | `div` | Barra de progresso |
| `error` | `p` | Mensagem de erro |
| `hint` | `p` | Texto auxiliar |
