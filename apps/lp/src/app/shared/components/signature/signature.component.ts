import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';
import { injectFormControl } from '@/shared/utils/form-control';
import { mergeClasses } from '@/shared/utils/merge-classes';
import { LabelComponent } from '@/shared/components/label';
import type { SignatureOutputFormat, SignaturePoint, SignatureStroke } from './signature.types';

let _signatureIdCounter = 0;

@Component({
  selector: 'n-signature',
  standalone: true,
  imports: [LabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <div [class]="wrapperClasses()" data-slot="root">

      @if (nLabel()) {
        <n-label [nFor]="elementId()" [nRequired]="nRequired()" [nDisabled]="isDisabled()">
          {{ nLabel() }}
        </n-label>
      }

      <div class="flex flex-col gap-1" data-slot="control-wrapper">
        <canvas
          #canvas
          [id]="elementId()"
          [width]="nWidth()"
          [height]="nHeight()"
          [attr.aria-label]="nLabel() ? null : (nAriaLabel() || 'Pad de assinatura')"
          [attr.aria-invalid]="hasError() ? true : null"
          [attr.aria-required]="nRequired() ? true : null"
          [attr.aria-describedby]="describedBy()"
          [attr.tabindex]="isDisabled() ? -1 : 0"
          role="img"
          data-slot="control"
          [class]="canvasClasses()"
          (keydown)="handleKeydown($event)"
          (blur)="handleBlur()"
        ></canvas>

        @if (!isDisabled()) {
          <div class="flex justify-end gap-1.5">
            @if (!isEmpty()) {
              <button
                type="button"
                (click)="undo()"
                class="inline-flex h-7 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Desfazer último traço"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
                Desfazer
              </button>
            }
            <button
              type="button"
              (click)="clear()"
              class="inline-flex h-7 items-center rounded-md border border-input bg-background px-2 text-xs text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Limpar assinatura"
            >
              {{ nClearLabel() }}
            </button>
          </div>
        }
      </div>

      @if (hasError()) {
        <p [id]="errorId()" class="text-xs text-destructive" role="alert" data-slot="error">
          {{ nError() }}
        </p>
      }

      @if (nHint() && !hasError()) {
        <p [id]="hintId()" class="text-xs text-muted-foreground" data-slot="hint">
          {{ nHint() }}
        </p>
      }

    </div>
  `,
})
export class SignatureComponent implements ControlValueAccessor {
  readonly nWidth           = input<number>(400);
  readonly nHeight          = input<number>(200);
  readonly nStrokeColor     = input<string>('#000000');
  readonly nStrokeWidth     = input<number>(2);
  readonly nBackgroundColor = input<string>('transparent');
  readonly nOutputFormat    = input<SignatureOutputFormat>('base64-png');
  readonly nPlaceholder     = input<string>('Assine aqui');
  readonly nClearLabel      = input<string>('Limpar');
  readonly nLabel           = input<string>('');
  readonly nDisabled        = input<boolean>(false);
  readonly nRequired        = input<boolean>(false);
  readonly nError           = input<string | null>(null);
  readonly nHint            = input<string | null>(null);
  readonly nClass           = input<string>('');
  readonly nId              = input<string>('');
  readonly nAriaLabel       = input<string>('');

  readonly nValue  = model<string>('');
  readonly nChange = output<string>();
  readonly nBegin  = output<void>();
  readonly nEnd    = output<void>();
  readonly nClear  = output<void>();

  private readonly _canvasRef  = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly _form       = injectFormControl<string>(this);
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _staticId   = `n-signature-${++_signatureIdCounter}`;

  private _allStrokes: SignatureStroke[]   = [];
  private _currentStroke: SignaturePoint[] = [];
  private _isDrawing = false;
  private _ctx: CanvasRenderingContext2D | null = null;
  private _pendingWriteValue: string | null = null;

  private readonly _emptySignal = signal(true);
  protected readonly isEmpty    = this._emptySignal.asReadonly();

  protected readonly isDisabled  = computed(() => this.nDisabled() || this._form.disabledByForm());
  protected readonly hasError    = computed(() => !!this.nError() || (this._form.controlInvalid() && this._form.controlTouched()));
  protected readonly elementId   = computed(() => this.nId() || this._staticId);
  protected readonly errorId     = computed(() => `${this.elementId()}-error`);
  protected readonly hintId      = computed(() => `${this.elementId()}-hint`);

  protected readonly describedBy = computed(() => {
    if (this.hasError()) return this.errorId();
    if (this.nHint()) return this.hintId();
    return null;
  });

  protected readonly wrapperClasses = computed(() =>
    mergeClasses('flex flex-col gap-1.5', this.nClass()),
  );

  protected readonly canvasClasses = computed(() =>
    mergeClasses(
      'block touch-none rounded-md border border-input bg-background cursor-crosshair focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 max-w-full',
      this.hasError() && 'border-destructive',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
    ),
  );

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this._platformId)) return;
      this._initCanvas();
    });
  }

  private _initCanvas(): void {
    const canvas = this._canvasRef().nativeElement;
    this._ctx = canvas.getContext('2d');
    if (!this._ctx) return;

    if (this._pendingWriteValue !== null) {
      this._applyWriteValue(this._pendingWriteValue);
      this._pendingWriteValue = null;
    } else {
      this._drawPlaceholder();
    }

    canvas.addEventListener('pointerdown', this._onPointerDown);
    canvas.addEventListener('pointermove', this._onPointerMove);
    canvas.addEventListener('pointerup', this._onPointerUp);
    canvas.addEventListener('lostpointercapture', this._onPointerUp);
  }

  private _getPoint = (e: PointerEvent): SignaturePoint => {
    const canvas = this._canvasRef().nativeElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  private _onPointerDown = (e: PointerEvent): void => {
    if (this.isDisabled()) return;
    e.preventDefault();
    const canvas = this._canvasRef().nativeElement;
    canvas.setPointerCapture(e.pointerId);
    this._isDrawing = true;
    this._currentStroke = [this._getPoint(e)];
    this.nBegin.emit();
  };

  private _onPointerMove = (e: PointerEvent): void => {
    if (!this._isDrawing || !this._ctx) return;
    e.preventDefault();
    this._currentStroke.push(this._getPoint(e));
    this._redraw();
    this._drawStroke(this._ctx, this._currentStroke, this.nStrokeColor(), this.nStrokeWidth());
  };

  private _onPointerUp = (): void => {
    if (!this._isDrawing) return;
    this._isDrawing = false;

    if (this._currentStroke.length > 0) {
      this._allStrokes.push([...this._currentStroke]);
      this._currentStroke = [];
      this._emptySignal.set(false);
      this._redraw();
      this._emitValue();
      this.nEnd.emit();
    } else {
      this._currentStroke = [];
    }
  };

  private _drawStroke(ctx: CanvasRenderingContext2D, points: SignaturePoint[], color: string, width: number): void {
    if (points.length === 0) return;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (points.length === 1) {
      ctx.arc(points[0].x, points[0].y, width / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
  }

  private _redraw(): void {
    const ctx = this._ctx;
    if (!ctx) return;
    const canvas = this._canvasRef().nativeElement;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bg = this.nBackgroundColor();
    if (bg !== 'transparent') {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (this._allStrokes.length === 0 && this._currentStroke.length === 0) {
      this._drawPlaceholder();
      return;
    }

    for (const stroke of this._allStrokes) {
      this._drawStroke(ctx, stroke, this.nStrokeColor(), this.nStrokeWidth());
    }
  }

  private _drawPlaceholder(): void {
    const ctx = this._ctx;
    if (!ctx) return;
    const placeholder = this.nPlaceholder();
    if (!placeholder) return;
    const canvas = this._canvasRef().nativeElement;

    ctx.save();
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(placeholder, canvas.width / 2, canvas.height / 2);
    ctx.restore();
  }

  private _buildSvg(): string {
    const w = this.nWidth();
    const h = this.nHeight();
    const color = this.nStrokeColor();
    const sw = this.nStrokeWidth();
    const bg = this.nBackgroundColor();

    const bgEl = bg !== 'transparent' ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : '';

    const paths = this._allStrokes.map(pts => {
      if (pts.length === 0) return '';
      if (pts.length === 1) {
        return `<circle cx="${pts[0].x.toFixed(1)}" cy="${pts[0].y.toFixed(1)}" r="${(sw / 2).toFixed(1)}" fill="${color}"/>`;
      }
      let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = ((pts[i].x + pts[i + 1].x) / 2).toFixed(1);
        const my = ((pts[i].y + pts[i + 1].y) / 2).toFixed(1);
        d += ` Q ${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)} ${mx},${my}`;
      }
      const last = pts[pts.length - 1];
      d += ` L ${last.x.toFixed(1)},${last.y.toFixed(1)}`;
      return `<path d="${d}" stroke="${color}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    }).filter(Boolean).join('\n  ');

    const inner = [bgEl, paths].filter(Boolean).join('\n  ');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n  ${inner}\n</svg>`;
  }

  private _emitValue(): void {
    let value: string;
    const format = this.nOutputFormat();

    if (format === 'base64-png') {
      value = this._canvasRef().nativeElement.toDataURL('image/png');
    } else if (format === 'base64-svg') {
      const svg = this._buildSvg();
      value = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
    } else {
      value = this._buildSvg();
    }

    this.nValue.set(value);
    this._form.notifyChange(value);
    this.nChange.emit(value);
  }

  private _applyWriteValue(value: string): void {
    if (!value) {
      this._allStrokes = [];
      this._emptySignal.set(true);
      this._redraw();
      return;
    }

    if (value.startsWith('data:image/png')) {
      const img = new Image();
      img.onload = () => {
        if (!this._ctx) return;
        const canvas = this._canvasRef().nativeElement;
        this._ctx.clearRect(0, 0, canvas.width, canvas.height);
        this._ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        this._emptySignal.set(false);
      };
      img.src = value;
    }
  }

  undo(): void {
    if (this._allStrokes.length === 0) return;
    this._allStrokes.pop();
    this._emptySignal.set(this._allStrokes.length === 0);
    this._redraw();

    if (this._allStrokes.length > 0) {
      this._emitValue();
    } else {
      const empty = '';
      this.nValue.set(empty);
      this._form.notifyChange(empty);
      this.nChange.emit(empty);
    }
  }

  clear(): void {
    this._allStrokes = [];
    this._currentStroke = [];
    this._isDrawing = false;
    this._emptySignal.set(true);
    if (this._ctx) this._redraw();
    const empty = '';
    this.nValue.set(empty);
    this._form.notifyChange(empty);
    this.nChange.emit(empty);
    this._form.notifyTouched();
    this.nClear.emit();
  }

  protected handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      this.clear();
    } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      this.undo();
    }
  }

  protected handleBlur(): void {
    this._form.notifyTouched();
  }

  writeValue(value: string | null | undefined): void {
    const v = value ?? '';
    this.nValue.set(v);

    if (!this._ctx) {
      this._pendingWriteValue = v;
      return;
    }

    this._applyWriteValue(v);
  }

  registerOnChange(fn: (v: string) => void): void {
    this._form.setOnChange(fn);
  }

  registerOnTouched(fn: () => void): void {
    this._form.setOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this._form.setDisabledByForm(isDisabled);
  }
}
