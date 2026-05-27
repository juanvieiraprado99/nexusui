import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button';
import type { UploadFile } from './image-upload.types';

const HANDLE_SIZE = 8;
const MAX_W = 640;
const MAX_H = 480;

type ResizeHandle = 'tl' | 'tr' | 'bl' | 'br' | 'move' | null;

interface CropRect { x: number; y: number; w: number; h: number }

@Component({
  selector: 'n-image-upload-crop',
  standalone: true,
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm',
    tabindex: '-1',
    '(keydown.escape)': 'cancel.emit()',
    '(keydown.enter)': '$event.preventDefault(); confirmCrop()',
  },
  template: `
    <div class="bg-background rounded-xl shadow-2xl p-4 flex flex-col gap-4 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">

      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-foreground">Recortar imagem</p>
        @if (aspectRatioLabel()) {
          <span class="text-xs text-muted-foreground bg-muted rounded-md px-2 py-0.5">{{ aspectRatioLabel() }}</span>
        }
      </div>

      <div class="flex items-center justify-center rounded-md bg-black overflow-hidden">
        <canvas
          #cropCanvas
          class="max-w-full max-h-[60vh] cursor-crosshair touch-none block"
          (pointerdown)="onPointerDown($event)"
          (pointermove)="onPointerMove($event)"
          (pointerup)="onPointerUp()"
          (lostpointercapture)="onPointerUp()"
        ></canvas>
      </div>

      <p class="text-xs text-center text-muted-foreground">
        Arraste para mover · Cantos para redimensionar · Enter para confirmar
      </p>

      <div class="flex justify-end gap-2">
        <button n-button nVariant="outline" nSize="sm" type="button" (click)="cancel.emit()">Cancelar</button>
        <button n-button nSize="sm" type="button" (click)="confirmCrop()">Confirmar recorte</button>
      </div>

    </div>
  `,
})
export class ImageUploadCropComponent {
  readonly nFile        = input.required<UploadFile>();
  readonly nAspectRatio = input<number | null>(null);

  readonly confirm = output<Blob>();
  readonly cancel  = output<void>();

  private readonly _canvasRef  = viewChild.required<ElementRef<HTMLCanvasElement>>('cropCanvas');
  private readonly _platformId = inject(PLATFORM_ID);

  private _img: HTMLImageElement | null = null;
  private _ctx: CanvasRenderingContext2D | null = null;
  private _crop: CropRect = { x: 0, y: 0, w: 0, h: 0 };
  private _dragHandle: ResizeHandle = null;
  private _dragStartX = 0;
  private _dragStartY = 0;
  private _dragStartCrop: CropRect = { x: 0, y: 0, w: 0, h: 0 };

  protected readonly aspectRatioLabel = computed(() => {
    const r = this.nAspectRatio();
    if (!r) return '';
    const presets: [number, string][] = [
      [1, '1:1'], [4 / 3, '4:3'], [3 / 2, '3:2'],
      [16 / 9, '16:9'], [9 / 16, '9:16'], [2 / 3, '2:3'],
    ];
    for (const [val, label] of presets) {
      if (Math.abs(val - r) < 0.01) return label;
    }
    return r.toFixed(2);
  });

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this._platformId)) return;
      this._loadImage();
    });
  }

  private _loadImage(): void {
    const img = new Image();
    img.onload = () => {
      this._img = img;
      const canvas = this._canvasRef().nativeElement;
      const scale = Math.min(1, MAX_W / img.naturalWidth, MAX_H / img.naturalHeight);
      canvas.width  = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      this._ctx = canvas.getContext('2d');
      this._initCrop(canvas.width, canvas.height);
      this._draw();
      // Ensure host is focused for keyboard events
      (canvas.closest('[tabindex]') as HTMLElement | null)?.focus();
    };
    img.onerror = () => this.cancel.emit();
    img.src = this.nFile().preview;
  }

  private _initCrop(cw: number, ch: number): void {
    const ratio = this.nAspectRatio();
    const pad = 0.1;
    if (ratio) {
      const maxW = cw * (1 - pad * 2);
      const maxH = ch * (1 - pad * 2);
      let w = maxW;
      let h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      this._crop = { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
    } else {
      this._crop = { x: cw * pad, y: ch * pad, w: cw * (1 - pad * 2), h: ch * (1 - pad * 2) };
    }
  }

  private _handles(): Record<string, { x: number; y: number }> {
    const { x, y, w, h } = this._crop;
    return { tl: { x, y }, tr: { x: x + w, y }, bl: { x, y: y + h }, br: { x: x + w, y: y + h } };
  }

  private _hitTest(px: number, py: number): ResizeHandle {
    const hit = HANDLE_SIZE + 6;
    for (const [key, { x, y }] of Object.entries(this._handles())) {
      if (Math.abs(px - x) <= hit && Math.abs(py - y) <= hit) return key as ResizeHandle;
    }
    const { x, y, w, h } = this._crop;
    if (px >= x && px <= x + w && py >= y && py <= y + h) return 'move';
    return null;
  }

  private _canvasPoint(e: PointerEvent): { x: number; y: number } {
    const canvas = this._canvasRef().nativeElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  protected onPointerDown(e: PointerEvent): void {
    e.preventDefault();
    const canvas = this._canvasRef().nativeElement;
    canvas.setPointerCapture(e.pointerId);
    const { x, y } = this._canvasPoint(e);
    this._dragHandle     = this._hitTest(x, y);
    this._dragStartX     = x;
    this._dragStartY     = y;
    this._dragStartCrop  = { ...this._crop };
  }

  protected onPointerMove(e: PointerEvent): void {
    if (!this._dragHandle) return;
    e.preventDefault();
    const canvas = this._canvasRef().nativeElement;
    const cw = canvas.width;
    const ch = canvas.height;
    const { x, y } = this._canvasPoint(e);
    const dx = x - this._dragStartX;
    const dy = y - this._dragStartY;
    const sr = this._dragStartCrop;
    const ratio = this.nAspectRatio();
    const MIN = 20;

    let nx = sr.x, ny = sr.y, nw = sr.w, nh = sr.h;

    switch (this._dragHandle) {
      case 'move':
        nx = Math.max(0, Math.min(cw - sr.w, sr.x + dx));
        ny = Math.max(0, Math.min(ch - sr.h, sr.y + dy));
        break;
      case 'tl':
        nw = Math.max(MIN, sr.w - dx);
        nh = ratio ? nw / ratio : Math.max(MIN, sr.h - dy);
        nx = sr.x + sr.w - nw;
        ny = sr.y + sr.h - nh;
        break;
      case 'tr':
        nw = Math.max(MIN, sr.w + dx);
        nh = ratio ? nw / ratio : Math.max(MIN, sr.h - dy);
        ny = sr.y + sr.h - nh;
        break;
      case 'bl':
        nw = Math.max(MIN, sr.w - dx);
        nh = ratio ? nw / ratio : Math.max(MIN, sr.h + dy);
        nx = sr.x + sr.w - nw;
        break;
      case 'br':
        nw = Math.max(MIN, sr.w + dx);
        nh = ratio ? nw / ratio : Math.max(MIN, sr.h + dy);
        break;
    }

    // Clamp to canvas bounds
    if (nx < 0)         { nw += nx; if (ratio) nh = nw / ratio; nx = 0; }
    if (ny < 0)         { nh += ny; if (ratio) nw = nh * ratio; ny = 0; }
    if (nx + nw > cw)   nw = cw - nx;
    if (ny + nh > ch)   nh = ch - ny;

    this._crop = { x: nx, y: ny, w: Math.max(MIN, nw), h: Math.max(MIN, nh) };
    this._draw();
  }

  protected onPointerUp(): void {
    this._dragHandle = null;
  }

  private _draw(): void {
    const ctx = this._ctx;
    const img = this._img;
    if (!ctx || !img) return;
    const canvas = this._canvasRef().nativeElement;
    const cw = canvas.width;
    const ch = canvas.height;
    const { x, y, w, h } = this._crop;

    ctx.clearRect(0, 0, cw, ch);

    // Draw dimmed background
    ctx.drawImage(img, 0, 0, cw, ch);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, cw, ch);

    // Reveal original image inside crop rect
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.drawImage(img, 0, 0, cw, ch);
    ctx.restore();

    // Crop border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

    // Rule-of-thirds grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(x + w * (i / 3), y); ctx.lineTo(x + w * (i / 3), y + h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + h * (i / 3)); ctx.lineTo(x + w, y + h * (i / 3)); ctx.stroke();
    }

    // Corner handles
    ctx.fillStyle = 'white';
    for (const { x: hx, y: hy } of Object.values(this._handles())) {
      ctx.fillRect(hx - HANDLE_SIZE / 2, hy - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
    }
  }

  confirmCrop(): void {
    const img = this._img;
    if (!img) return;
    const canvas = this._canvasRef().nativeElement;
    const scaleX = img.naturalWidth  / canvas.width;
    const scaleY = img.naturalHeight / canvas.height;
    const sx = Math.round(this._crop.x * scaleX);
    const sy = Math.round(this._crop.y * scaleY);
    const sw = Math.round(this._crop.w * scaleX);
    const sh = Math.round(this._crop.h * scaleY);

    const offscreen = document.createElement('canvas');
    offscreen.width  = sw;
    offscreen.height = sh;
    const ctx = offscreen.getContext('2d')!;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    offscreen.toBlob(blob => { if (blob) this.confirm.emit(blob); }, 'image/jpeg', 0.92);
  }
}
