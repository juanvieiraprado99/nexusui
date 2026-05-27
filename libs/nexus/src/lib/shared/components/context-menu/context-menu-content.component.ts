import { FocusKeyManager } from '@angular/cdk/a11y';
import {
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { mergeClasses } from '../../utils/merge-classes';
import { ContextMenuItemComponent } from './context-menu-item.component';
import { CONTEXT_MENU_CONTEXT } from './context-menu.tokens';
import {
  contextMenuContentVariants,
  type ContextMenuContentVariants,
} from './context-menu.variants';

@Component({
  selector: 'n-context-menu-content',
  standalone: true,
  template: `
    <ng-template #panel>
      <div
        #panelEl
        [id]="ctx.contentId"
        role="menu"
        tabindex="-1"
        data-slot="content"
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
export class ContextMenuContentComponent implements AfterViewInit, OnDestroy {
  readonly nSize = input<ContextMenuContentVariants['nSize']>('default');
  readonly nClass = input<string>('');

  protected readonly ctx = inject(CONTEXT_MENU_CONTEXT);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);
  private readonly _document = inject(DOCUMENT);
  private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly items = contentChildren(ContextMenuItemComponent, { descendants: true });

  private readonly _panelTpl = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly _panelEl = viewChild<ElementRef<HTMLElement>>('panelEl');

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _keyManager: FocusKeyManager<ContextMenuItemComponent> | null = null;
  private _backdropSub?: Subscription;
  private _contextMenuSub?: Subscription;

  protected readonly classes = computed(() =>
    mergeClasses(contextMenuContentVariants({ nSize: this.nSize() }), this.nClass()),
  );

  constructor() {
    effect(() => {
      const isOpen = this.ctx.open();
      const x = this.ctx.cursorX();
      const y = this.ctx.cursorY();
      this.detach();
      if (isOpen) this.attach(x, y);
    });
  }

  ngAfterViewInit(): void {
    this._portal = new TemplatePortal(this._panelTpl(), this._vcr);
  }

  ngOnDestroy(): void {
    this.detach();
  }

  private attach(x: number, y: number): void {
    if (!this._portal) return;

    const config = new OverlayConfig({
      positionStrategy: this._overlay.position().global().left(`${x}px`).top(`${y}px`),
      scrollStrategy: this._overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);
    this._backdropSub = this._overlayRef.backdropClick().subscribe(() => this.ctx.close(false));

    if (this._isBrowser) {
      this._contextMenuSub = fromEvent<MouseEvent>(this._document, 'contextmenu').subscribe((e) => {
        e.preventDefault();
        this.ctx.openAt(e.clientX, e.clientY);
      });
    }

    queueMicrotask(() => {
      this.clampToViewport(x, y);
      const items = this.items();
      this._keyManager = new FocusKeyManager<ContextMenuItemComponent>(items)
        .withWrap()
        .withTypeAhead(200)
        .withVerticalOrientation();
      this._panelEl()?.nativeElement.focus();
      if (items.length) this._keyManager.setFirstItemActive();
    });
  }

  private clampToViewport(x: number, y: number): void {
    if (!this._overlayRef) return;
    const panel = this._overlayRef.overlayElement;
    const { width, height } = panel.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;

    const clampedX = Math.max(margin, Math.min(x, vw - width - margin));
    const clampedY = Math.max(margin, Math.min(y, vh - height - margin));

    (this._overlayRef.getConfig().positionStrategy as GlobalPositionStrategy)
      .left(`${clampedX}px`)
      .top(`${clampedY}px`);

    this._overlayRef.updatePosition();
  }

  private detach(): void {
    this._backdropSub?.unsubscribe();
    this._backdropSub = undefined;
    this._contextMenuSub?.unsubscribe();
    this._contextMenuSub = undefined;
    this._keyManager = null;
    if (this._overlayRef?.hasAttached()) this._overlayRef.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.ctx.close(false);
      return;
    }
    if (event.key === 'Tab') {
      this.ctx.close(false);
      return;
    }
    this._keyManager?.onKeydown(event);
  }
}
