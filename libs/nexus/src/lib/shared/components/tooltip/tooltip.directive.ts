import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
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
import { Subscription } from 'rxjs';
import { TooltipContentComponent, type Align, type Side } from './tooltip-content.component';

let _idCounter = 0;

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
    '(keydown.escape)': '_hide()',
  },
})
export class TooltipDirective implements OnDestroy {
  readonly nTooltip = input.required<string | TemplateRef<unknown>>();
  readonly nTooltipSide = input<Side>('top');
  readonly nTooltipAlign = input<Align>('center');
  readonly nTooltipDelay = input<number>(150);
  readonly nTooltipDisabled = input<boolean>(false);

  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  private _overlayRef: OverlayRef | null = null;
  private _compRef: ComponentRef<TooltipContentComponent> | null = null;
  private _positionSub?: Subscription;
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

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._host.nativeElement)
      .withPositions(this._buildPositions())
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

    this._positionSub = (positionStrategy as FlexibleConnectedPositionStrategy).positionChanges.subscribe((change) => {
      const p = change.connectionPair;
      let side: Side = this.nTooltipSide();
      if (p.originY === 'bottom' && p.overlayY === 'top') side = 'bottom';
      else if (p.originY === 'top' && p.overlayY === 'bottom') side = 'top';
      else if (p.originX === 'end' && p.overlayX === 'start') side = 'right';
      else if (p.originX === 'start' && p.overlayX === 'end') side = 'left';
      this._compRef?.instance.setActualSide(side);
      this._compRef?.changeDetectorRef.markForCheck();
    });

    this._isOpen.set(true);
  }

  _hide(): void {
    clearTimeout(this._showTimer);
    this._positionSub?.unsubscribe();
    this._positionSub = undefined;
    this._overlayRef?.dispose();
    this._overlayRef = null;
    this._compRef = null;
    this._isOpen.set(false);
  }

  ngOnDestroy(): void {
    this._hide();
  }

  private _buildPositions(): ConnectedPosition[] {
    const side = this.nTooltipSide();
    const align = this.nTooltipAlign();
    const offset = 8;

    const buildOne = (s: Side, a: Align): ConnectedPosition => {
      const isV = s === 'top' || s === 'bottom';
      const originY = s === 'bottom' ? 'bottom' : s === 'top' ? 'top' : 'center';
      const overlayY = s === 'bottom' ? 'top' : s === 'top' ? 'bottom' : 'center';
      const originX = s === 'right' ? 'end' : s === 'left' ? 'start' : a === 'center' ? 'center' : a;
      const overlayX = s === 'right' ? 'start' : s === 'left' ? 'end' : a === 'center' ? 'center' : a;
      return {
        originX: originX as ConnectedPosition['originX'],
        originY: originY as ConnectedPosition['originY'],
        overlayX: overlayX as ConnectedPosition['overlayX'],
        overlayY: overlayY as ConnectedPosition['overlayY'],
        offsetX: isV ? 0 : s === 'right' ? offset : -offset,
        offsetY: isV ? (s === 'bottom' ? offset : -offset) : 0,
      };
    };

    const opp: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    return [buildOne(side, align), buildOne(opp[side], align)];
  }
}
