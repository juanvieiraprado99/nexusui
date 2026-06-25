import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { TooltipContentComponent, type Align, type Side } from './tooltip-content.component';

let _idCounter = 0;

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
  'top-left': 'bottom-right',
  'bottom-right': 'top-left',
  'top-right': 'bottom-left',
  'bottom-left': 'top-right',
};

const OFFSET = 8;

interface TaggedPosition {
  side: Side;
  position: ConnectedPosition;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[nTooltip]',
  standalone: true,
  host: {
    '[attr.aria-describedby]': '_ariaDescribedBy()',
    '(mouseenter)': '_scheduleShow()',
    '(mouseleave)': '_hide()',
    '(focus)': '_show()',
    '(blur)': '_hide()',
    '(keydown.escape)': '_onEscape($event)',
  },
})
export class TooltipDirective implements OnDestroy {
  readonly nTooltip = input.required<string | TemplateRef<unknown>>();
  readonly nTooltipSide = input<Side>('top');
  readonly nTooltipAlign = input<Align>('center');
  readonly nTooltipDelay = input<number>(300);
  readonly nTooltipDisabled = input<boolean>(false);

  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _destroyRef = inject(DestroyRef);

  private _overlayRef: OverlayRef | null = null;
  private _compRef: ComponentRef<TooltipContentComponent> | null = null;
  private _showTimer?: ReturnType<typeof setTimeout>;
  private readonly _isOpen = signal(false);
  private readonly _id = `n-tooltip-${++_idCounter}`;

  protected readonly _ariaDescribedBy = computed(() => (this._isOpen() ? this._id : null));

  _scheduleShow(): void {
    clearTimeout(this._showTimer);
    this._showTimer = setTimeout(() => this._show(), this.nTooltipDelay());
  }

  _show(): void {
    if (this.nTooltipDisabled() || this._overlayRef?.hasAttached()) return;

    const positions = this._buildPositions();

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._host.nativeElement)
      .withPositions(positions.map((p) => p.position))
      .withFlexibleDimensions(false)
      .withPush(true);

    this._overlayRef = this._overlay.create(
      new OverlayConfig({
        positionStrategy,
        scrollStrategy: this._overlay.scrollStrategies.reposition(),
      })
    );

    const portal = new ComponentPortal(TooltipContentComponent, this._vcr);
    this._compRef = this._overlayRef.attach(portal);

    this._compRef.instance.setActualSide(this.nTooltipSide());
    this._compRef.setInput('nContent', this.nTooltip());
    this._compRef.setInput('nSide', this.nTooltipSide());
    this._compRef.setInput('nAlign', this.nTooltipAlign());
    this._compRef.setInput('nId', this._id);

    (positionStrategy as FlexibleConnectedPositionStrategy).positionChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((change) => {
        const match = positions.find((p) => this._matches(p.position, change.connectionPair));
        this._compRef?.instance.setActualSide(match?.side ?? this.nTooltipSide());
        this._compRef?.changeDetectorRef.markForCheck();
      });

    this._isOpen.set(true);
  }

  _hide(): void {
    clearTimeout(this._showTimer);
    this._overlayRef?.dispose();
    this._overlayRef = null;
    this._compRef = null;
    this._isOpen.set(false);
  }

  _onEscape(event: Event): void {
    if (!this._isOpen()) return;
    event.stopPropagation();
    this._hide();
  }

  ngOnDestroy(): void {
    this._hide();
  }

  private _buildPositions(): TaggedPosition[] {
    const side = this.nTooltipSide();
    const opposite = OPPOSITE_SIDE[side];
    return [
      { side, position: this._positionFor(side) },
      { side: opposite, position: this._positionFor(opposite) },
    ];
  }

  private _positionFor(side: Side): ConnectedPosition {
    const align = this.nTooltipAlign();

    switch (side) {
      case 'top':
      case 'bottom': {
        const x = align === 'center' ? 'center' : align;
        return {
          originX: x,
          originY: side,
          overlayX: x,
          overlayY: side === 'top' ? 'bottom' : 'top',
          offsetX: 0,
          offsetY: side === 'top' ? -OFFSET : OFFSET,
        };
      }
      case 'left':
      case 'right': {
        const y = align === 'center' ? 'center' : align === 'start' ? 'top' : 'bottom';
        return {
          originX: side === 'right' ? 'end' : 'start',
          originY: y,
          overlayX: side === 'right' ? 'start' : 'end',
          overlayY: y,
          offsetX: side === 'right' ? OFFSET : -OFFSET,
          offsetY: 0,
        };
      }
      // Diagonals anchor to a corner of the host; `align` does not apply.
      case 'top-left':
        return { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetX: -OFFSET, offsetY: -OFFSET };
      case 'top-right':
        return { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetX: OFFSET, offsetY: -OFFSET };
      case 'bottom-left':
        return { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetX: -OFFSET, offsetY: OFFSET };
      case 'bottom-right':
        return { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetX: OFFSET, offsetY: OFFSET };
    }
  }

  private _matches(a: ConnectedPosition, b: ConnectedPosition): boolean {
    return a.originX === b.originX && a.originY === b.originY && a.overlayX === b.overlayX && a.overlayY === b.overlayY;
  }
}
