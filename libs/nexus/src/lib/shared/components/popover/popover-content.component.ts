import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { mergeClasses } from '../../utils/merge-classes';
import { POPOVER_CONTEXT } from './popover.context';
import { popoverContentVariants, type PopoverContentVariants } from './popover.variants';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

@Component({
  selector: 'n-popover-content',
  standalone: true,
  template: `
    <ng-template #panel>
      <div
        #panelEl
        [id]="ctx.contentId"
        [attr.role]="ctx.modal() ? 'dialog' : 'region'"
        [attr.aria-modal]="ctx.modal() ? true : null"
        [attr.aria-labelledby]="ctx.triggerId"
        data-slot="content"
        tabindex="-1"
        [attr.data-side]="actualSide()"
        [attr.data-align]="nAlign()"
        [attr.data-state]="isClosing() ? 'closed' : 'open'"
        [class]="classes()"
        (keydown)="handleKeydown($event)"
      >
        @if (nArrow()) {
          <span [class]="arrowClass()" aria-hidden="true"></span>
        }
        <ng-content />
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class PopoverContentComponent implements AfterViewInit, OnDestroy {
  readonly nSide = input<Side>('bottom');
  readonly nAlign = input<Align>('center');
  readonly nSideOffset = input<number>(8);
  readonly nAlignOffset = input<number>(0);
  readonly nArrow = input<boolean>(true);
  readonly nSize = input<PopoverContentVariants['nSize']>('default');
  readonly nClass = input<string>('');

  protected readonly ctx = inject(POPOVER_CONTEXT);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);
  private readonly _focusTrapFactory = inject(FocusTrapFactory);
  private readonly _zone = inject(NgZone);
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly _panelTpl = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly _panelEl = viewChild<ElementRef<HTMLElement>>('panelEl');

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _focusTrap: FocusTrap | null = null;
  private _backdropSub?: Subscription;
  private _positionSub?: Subscription;
  private _detachTimer?: ReturnType<typeof setTimeout>;
  private _hoverDocHandler?: (e: MouseEvent) => void;
  private _focusDocHandler?: () => void;

  protected readonly isClosing = signal(false);
  protected readonly actualSide = signal<Side>('bottom');

  protected readonly classes = computed(() =>
    mergeClasses(
      popoverContentVariants({ nSize: this.nSize() }),
      this.isClosing() && 'animate-out fade-out-0 zoom-out-95',
      this.nClass(),
    ),
  );

  protected readonly arrowClass = computed(() => {
    const side = this.actualSide();
    const base = 'absolute size-2.5 rotate-45 border bg-popover';
    switch (side) {
      case 'bottom':
        return `${base} -top-[5px] left-1/2 -translate-x-1/2 border-r-transparent border-b-transparent`;
      case 'top':
        return `${base} -bottom-[5px] left-1/2 -translate-x-1/2 border-t-transparent border-l-transparent`;
      case 'right':
        return `${base} -left-[5px] top-1/2 -translate-y-1/2 border-t-transparent border-r-transparent`;
      case 'left':
        return `${base} -right-[5px] top-1/2 -translate-y-1/2 border-b-transparent border-l-transparent`;
    }
  });

  constructor() {
    effect(() => {
      if (this.ctx.open()) {
        clearTimeout(this._detachTimer);
        this.isClosing.set(false);
        this._attach();
      } else if (this._overlayRef) {
        this._beginDetach();
      }
    });
  }

  ngAfterViewInit(): void {
    this._portal = new TemplatePortal(this._panelTpl(), this._vcr);
  }

  ngOnDestroy(): void {
    clearTimeout(this._detachTimer);
    this._forceDetach();
  }

  private _attach(): void {
    if (!this._isBrowser) return;
    const trigger = this.ctx.triggerEl();
    if (!trigger || !this._portal) return;
    if (this._overlayRef?.hasAttached()) return;

    const isHover = this.ctx.triggerMode() === 'hover';

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(trigger)
      .withPositions(this._buildPositions())
      .withFlexibleDimensions(false)
      .withPush(true);

    const config = new OverlayConfig({
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: !isHover,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);

    this._positionSub = (positionStrategy as FlexibleConnectedPositionStrategy).positionChanges.subscribe(
      (change) => {
        const pos = change.connectionPair;
        let side: Side = this.nSide();
        if (pos.originY === 'bottom' && pos.overlayY === 'top') side = 'bottom';
        else if (pos.originY === 'top' && pos.overlayY === 'bottom') side = 'top';
        else if (pos.originX === 'end' && pos.overlayX === 'start') side = 'right';
        else if (pos.originX === 'start' && pos.overlayX === 'end') side = 'left';
        this.actualSide.set(side);
      },
    );

    if (!isHover) {
      this._backdropSub = this._overlayRef.backdropClick().subscribe(() => {
        if (this.ctx.persistent()) return;
        this.ctx.close(false);
      });
    }

    const isFocus = this.ctx.triggerMode() === 'focus';

    queueMicrotask(() => {
      const el = this._panelEl()?.nativeElement;
      if (!el) return;
      this.ctx.setPanelEl(el);

      if (isHover) {
        // Track mouse globally: keep popover open while over trigger or panel.
        // Runs outside Angular so per-mouseover work doesn't trigger change detection;
        // re-enter the zone only when we actually mutate the open state.
        const hoverHandler = (e: MouseEvent) => {
          const target = e.target as Node;
          const triggerEl = this.ctx.triggerEl();
          if (el.contains(target) || triggerEl?.contains(target)) {
            this.ctx.cancelScheduledClose();
          } else {
            this._zone.run(() => this.ctx.scheduleClose(false, 150));
          }
        };
        this._hoverDocHandler = hoverHandler;
        this._zone.runOutsideAngular(() =>
          document.addEventListener('mouseover', hoverHandler, { passive: true }),
        );
      } else if (isFocus) {
        // Focus trigger: do NOT move focus into the panel — that would blur the trigger
        // and fire its (blur) scheduleClose, closing the popover immediately. Instead
        // keep it open while focus stays within trigger or panel.
        const focusHandler = () => {
          const active = document.activeElement;
          const triggerEl = this.ctx.triggerEl();
          if (el.contains(active) || triggerEl?.contains(active)) {
            this.ctx.cancelScheduledClose();
          } else {
            this._zone.run(() => this.ctx.scheduleClose(false, 150));
          }
        };
        this._focusDocHandler = focusHandler;
        this._zone.runOutsideAngular(() => document.addEventListener('focusin', focusHandler));
      } else if (this.ctx.modal()) {
        this._focusTrap = this._focusTrapFactory.create(el);
        this._focusTrap.focusInitialElementWhenReady();
      } else {
        el.focus();
      }
    });
  }

  private _beginDetach(): void {
    clearTimeout(this._detachTimer);
    this.isClosing.set(true);
    this.ctx.setPanelEl(null);
    this._removeDocHandlers();

    const triggerEl = untracked(() => this.ctx.triggerEl());
    if (triggerEl && this.ctx.modal()) triggerEl.focus({ preventScroll: true });

    this._focusTrap?.destroy();
    this._focusTrap = null;

    this._detachTimer = setTimeout(() => {
      this.isClosing.set(false);
      this._forceDetach();
    }, 150);
  }

  private _forceDetach(): void {
    this._removeDocHandlers();
    this._backdropSub?.unsubscribe();
    this._backdropSub = undefined;
    this._positionSub?.unsubscribe();
    this._positionSub = undefined;
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  private _removeDocHandlers(): void {
    if (this._hoverDocHandler) {
      document.removeEventListener('mouseover', this._hoverDocHandler);
      this._hoverDocHandler = undefined;
    }
    if (this._focusDocHandler) {
      document.removeEventListener('focusin', this._focusDocHandler);
      this._focusDocHandler = undefined;
    }
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (this.ctx.persistent()) return;
    this.ctx.close(true);
  }

  private _buildPositions(): ConnectedPosition[] {
    const side = this.nSide();
    const align = this.nAlign();
    const sideOffset = this.nSideOffset();
    const alignOffset = this.nAlignOffset();

    const buildOne = (s: Side, a: Align): ConnectedPosition => {
      const isVertical = s === 'top' || s === 'bottom';
      const originY = s === 'bottom' ? 'bottom' : s === 'top' ? 'top' : 'center';
      const overlayY = s === 'bottom' ? 'top' : s === 'top' ? 'bottom' : 'center';
      const originX = s === 'right' ? 'end' : s === 'left' ? 'start' : a === 'center' ? 'center' : a;
      const overlayX = s === 'right' ? 'start' : s === 'left' ? 'end' : a === 'center' ? 'center' : a;
      return {
        originX: originX as ConnectedPosition['originX'],
        originY: originY as ConnectedPosition['originY'],
        overlayX: overlayX as ConnectedPosition['overlayX'],
        overlayY: overlayY as ConnectedPosition['overlayY'],
        offsetX: isVertical ? alignOffset : s === 'right' ? sideOffset : -sideOffset,
        offsetY: isVertical ? (s === 'bottom' ? sideOffset : -sideOffset) : alignOffset,
      };
    };

    const opposite: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    return [buildOne(side, align), buildOne(opposite[side], align)];
  }
}
