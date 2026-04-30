import { FocusKeyManager } from '@angular/cdk/a11y';
import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
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
import { Subscription, fromEvent } from 'rxjs';
import { mergeClasses } from '../../utils/merge-classes';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';
import { DROPDOWN_MENU_SUB_CONTEXT } from './dropdown-menu.tokens';
import { dropdownMenuContentVariants } from './dropdown-menu.variants';

@Component({
  selector: 'n-dropdown-menu-sub-content',
  standalone: true,
  template: `
    <ng-template #panel>
      <div
        #panelEl
        [id]="ctx.contentId"
        role="menu"
        tabindex="-1"
        data-slot="sub-content"
        [attr.aria-labelledby]="ctx.triggerId"
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
export class DropdownMenuSubContentComponent implements AfterViewInit, OnDestroy {
  readonly nClass = input<string>('');

  protected readonly ctx = inject(DROPDOWN_MENU_SUB_CONTEXT);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);

  protected readonly items = contentChildren(DropdownMenuItemComponent, { descendants: true });

  @ViewChild('panel', { static: true }) private _panelTpl!: TemplateRef<unknown>;
  @ViewChild('panelEl') private _panelEl?: ElementRef<HTMLElement>;

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _keyManager: FocusKeyManager<DropdownMenuItemComponent> | null = null;
  private _outsideSub?: Subscription;

  protected readonly classes = computed(() =>
    mergeClasses(dropdownMenuContentVariants({ nSize: 'default' }), this.nClass()),
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

    const positions: ConnectedPosition[] = [
      { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 4 },
      { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -4 },
    ];

    const config = new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(trigger)
        .withPositions(positions)
        .withFlexibleDimensions(false)
        .withPush(true),
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);

    this._outsideSub = fromEvent<MouseEvent>(document, 'mousedown').subscribe((e) => {
      const tgt = e.target as Node;
      if (this._panelEl?.nativeElement.contains(tgt)) return;
      if (trigger.contains(tgt)) return;
      this.ctx.close(false);
    });

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
    this._outsideSub?.unsubscribe();
    this._outsideSub = undefined;
    this._keyManager = null;
    if (this._overlayRef?.hasAttached()) this._overlayRef.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      this.ctx.close(true);
      return;
    }
    this._keyManager?.onKeydown(event);
  }
}
