export interface UploadFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

export interface UploadError {
  file: File;
  reason: 'size' | 'type' | 'dimensions' | 'count';
  message: string;
}

export const ACCEPT_PRESETS = {
  all:              '*/*',
  images:           'image/*',
  'images-raster':  '.jpg,.jpeg,.png,.webp,.gif,.avif',
  documents:        '.pdf,.doc,.docx,.txt,.rtf,.odt',
  spreadsheets:     '.csv,.xls,.xlsx,.ods',
  videos:           'video/*',
  audio:            'audio/*',
  archives:         '.zip,.rar,.tar,.gz,.7z',
} as const;

export type AcceptPreset = keyof typeof ACCEPT_PRESETS;

export const ACCEPT_LABELS: Record<AcceptPreset, string> = {
  all:             'Todos os arquivos',
  images:          'PNG, JPG, GIF, WebP, SVG...',
  'images-raster': 'JPG, PNG, WebP, GIF, AVIF',
  documents:       'PDF, DOC, DOCX, TXT',
  spreadsheets:    'CSV, XLS, XLSX, ODS',
  videos:          'MP4, MOV, AVI...',
  audio:           'MP3, WAV, AAC...',
  archives:        'ZIP, RAR, TAR, 7Z',
};
