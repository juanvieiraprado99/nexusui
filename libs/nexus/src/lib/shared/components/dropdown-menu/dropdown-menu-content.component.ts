import { FocusKeyManager } from '@angular/cdk/a11y';
import {
  ConnectedPosition,
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
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeClasses } from '../../utils/merge-classes';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';
import { DROPDOWN_MENU_CONTEXT } from './dropdown-menu.tokens';
import {
  dropdownMenuContentVariants,
  type DropdownMenuContentVariants,
} from './dropdown-menu.variants';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

@Component({
  selector: 'n-dropdown-menu-content',
  standalone: true,
  template: `
    <ng-template #panel>
      <div
        #panelEl
        [id]="ctx.contentId"
        role="menu"
        tabindex="-1"
        data-slot="content"
        [attr.aria-labelledby]="ctx.triggerId"
        [attr.data-side]="nSide()"
        [attr.data-align]="nAlign()"
        [attr.data-state]="ctx.open() ? 'open' : 'closed'"
        [class]="classes()"
        (keydown)="handleKeydown($event)"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class DropdownMenuContentComponent implements AfterViewInit, OnDestroy {
  readonly nSide = input<Side>('bottom');
  readonly nAlign = input<Align>('start');
  readonly nSideOffset = input<number>(4);
  readonly nAlignOffset = input<number>(0);
  readonly nSize = input<DropdownMenuContentVariants['nSize']>('default');
  readonly nClass = input<string>('');

  protected readonly ctx = inject(DROPDOWN_MENU_CONTEXT);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);

  protected readonly items = contentChildren(DropdownMenuItemComponent, { descendants: true });

  @ViewChild('panel', { static: true }) private _panelTpl!: TemplateRef<unknown>;
  @ViewChild('panelEl') private _panelEl?: ElementRef<HTMLElement>;

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _keyManager: FocusKeyManager<DropdownMenuItemComponent> | null = null;
  private _backdropSub?: Subscription;

  protected readonly classes = computed(() =>
    mergeClasses(dropdownMenuContentVariants({ nSize: this.nSize() }), this.nClass()),
  );

  constructor() {
    effect(() => {
      if (this.ctx.open()) this.attach();
      else this.detach();
    });
  }

  ngAfterViewInit(): void {
    this._portal = new TemplatePortal(this._panelTpl, this._vcr);
  }

  ngOnDestroy(): void {
    this.detach();
  }

  private attach(): void {
    const trigger = this.ctx.triggerEl();
    if (!trigger || !this._portal) return;
    if (this._overlayRef?.hasAttached()) return;

    const positions = this.buildPositions();
    const config = new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(trigger)
        .withPositions(positions)
        .withFlexibleDimensions(false)
        .withPush(true),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);
    this._backdropSub = this._overlayRef.backdropClick().subscribe(() => this.ctx.close(false));

    queueMicrotask(() => {
      const items = this.items();
      this._keyManager = new FocusKeyManager<DropdownMenuItemComponent>(items)
        .withWrap()
        .withTypeAhead(200)
        .withVerticalOrientation();
      this._panelEl?.nativeElement.focus();
      if (items.length) this._keyManager.setFirstItemActive();
    });
  }

  private detach(): void {
    this._backdropSub?.unsubscribe();
    this._backdropSub = undefined;
    this._keyManager = null;
    if (this._overlayRef?.hasAttached()) this._overlayRef.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.ctx.close(true);
      return;
    }
    if (event.key === 'Tab') {
      this.ctx.close(false);
      return;
    }
    this._keyManager?.onKeydown(event);
  }

  private buildPositions(): ConnectedPosition[] {
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
