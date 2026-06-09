import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
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
  ViewContainerRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { mergeClasses } from '../../utils/merge-classes';
import { ComboboxItemComponent } from './combobox-item.component';
import { COMBOBOX_CONTEXT } from './combobox.tokens';
import { comboboxContentVariants } from './combobox.variants';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

// Keep in sync with the data-[state=closed] exit animation duration in
// combobox.variants.ts so the overlay stays mounted while it animates out.
const EXIT_ANIMATION_MS = 150;

@Component({
  selector: 'n-combobox-content',
  standalone: true,
  template: `
    <ng-template #panel>
      <div
        #panelEl
        [id]="ctx.contentId"
        role="listbox"
        tabindex="-1"
        data-slot="content"
        [attr.aria-labelledby]="ctx.labelId() || ctx.triggerId"
        [attr.aria-multiselectable]="ctx.multiple() ? true : null"
        [attr.aria-activedescendant]="nSearch() ? null : (ctx.activeId() || null)"
        [attr.data-side]="nSide()"
        [attr.data-state]="ctx.open() ? 'open' : 'closed'"
        [class]="classes()"
        (keydown)="nSearch() ? null : handleKeydown($event)"
      >
        @if (nSearch()) {
          <div class="flex items-center gap-2 border-b px-3" data-slot="search">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              #searchInput
              type="text"
              role="searchbox"
              aria-autocomplete="list"
              autocomplete="off"
              [attr.aria-controls]="ctx.contentId"
              [attr.aria-activedescendant]="ctx.activeId() || null"
              [value]="ctx.query()"
              [placeholder]="nSearchPlaceholder()"
              class="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              (input)="handleSearchInput($event)"
              (keydown)="handleKeydown($event)"
            />
          </div>
        }
        <div class="max-h-60 overflow-y-auto p-1" data-slot="list">
          <ng-content />
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class ComboboxContentComponent implements AfterViewInit, OnDestroy {
  readonly nSide = input<Side>('bottom');
  readonly nAlign = input<Align>('start');
  readonly nSideOffset = input<number>(4);
  readonly nAlignOffset = input<number>(0);
  readonly nSearch = input<boolean>(false);
  readonly nSearchPlaceholder = input<string>('Search...');
  readonly nClass = input<string>('');

  protected readonly ctx = inject(COMBOBOX_CONTEXT);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);

  protected readonly items = contentChildren(ComboboxItemComponent, { descendants: true });

  private readonly _panelTpl = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly _panelElRef = viewChild<ElementRef<HTMLElement>>('panelEl');
  private readonly _searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _keyManager: ActiveDescendantKeyManager<ComboboxItemComponent> | null = null;
  private _backdropSub?: Subscription;
  private _closeTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly classes = computed(() =>
    mergeClasses(comboboxContentVariants(), this.nClass()),
  );

  constructor() {
    effect(() => {
      if (this.ctx.open()) this.open();
      else this.scheduleClose();
    });
  }

  ngAfterViewInit(): void {
    this._portal = new TemplatePortal(this._panelTpl(), this._vcr);
  }

  ngOnDestroy(): void {
    if (this._closeTimer) clearTimeout(this._closeTimer);
    this.detach();
  }

  private open(): void {
    if (this._closeTimer) {
      clearTimeout(this._closeTimer);
      this._closeTimer = null;
    }
    if (!this._overlayRef?.hasAttached()) this.attach();
    queueMicrotask(() => {
      // Clear any stale hover highlight (the overlay can be reused if reopened
      // during the exit animation) and start with no active item.
      this.items().forEach(item => item.setInactiveStyles());
      this.initKeyManager();
      this.ctx.setActiveId(null);
      // Focus the search box when present, otherwise the listbox panel so
      // keyboard navigation works without a search input.
      const target = this.nSearch() ? this._searchInputRef() : this._panelElRef();
      target?.nativeElement.focus();
    });
  }

  private attach(): void {
    const trigger = this.ctx.triggerEl();
    if (!trigger || !this._portal) return;

    const width = trigger.getBoundingClientRect().width;
    const positions = this.buildPositions();
    const config = new OverlayConfig({
      width: width,
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(trigger)
        .withPositions(positions)
        .withFlexibleDimensions(false)
        .withPush(true),
      // Close the panel once the trigger scrolls out of view instead of
      // letting the options float over the page.
      scrollStrategy: this._overlay.scrollStrategies.reposition({ autoClose: true }),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);
    this._backdropSub = this._overlayRef.backdropClick().subscribe(() => this.ctx.closePanel(false));
    // autoClose detaches the overlay directly; keep our open state in sync.
    this._overlayRef.detachments().subscribe(() => {
      if (this.ctx.open()) {
        this.ctx.closePanel(false);
        this.detach();
      }
    });
  }

  // Fresh key manager each open so no item is pre-activated (no item shows the
  // highlight on open — it appears only on real hover or arrow navigation).
  private initKeyManager(): void {
    this._keyManager?.destroy();
    this._keyManager = new ActiveDescendantKeyManager<ComboboxItemComponent>(this.items())
      .withWrap()
      .skipPredicate((item: ComboboxItemComponent) => item.hidden() || item.nDisabled());
    this._keyManager.change.subscribe(() => this.syncActiveId());
    this.ctx.setNavigateHandler(direction => {
      if (direction === 1) this._keyManager!.setNextItemActive();
      else this._keyManager!.setPreviousItemActive();
    });
    this.ctx.setActiveHandler(value => {
      if (value == null) return;
      const index = this.items().findIndex(i => i.nValue() === value);
      if (index >= 0) this._keyManager?.updateActiveItem(index);
    });
  }

  /** Keep the panel mounted with data-state=closed so it can animate out. */
  private scheduleClose(): void {
    if (!this._overlayRef?.hasAttached() || this._closeTimer) return;
    this.ctx.setNavigateHandler(null);
    this.ctx.setActiveHandler(null);
    this.items().forEach(item => item.setInactiveStyles());
    this.ctx.setActiveId(null);
    this._closeTimer = setTimeout(() => {
      this._closeTimer = null;
      this.detach();
    }, EXIT_ANIMATION_MS);
  }

  private detach(): void {
    this._backdropSub?.unsubscribe();
    this._backdropSub = undefined;
    this.ctx.setNavigateHandler(null);
    this.ctx.setActiveHandler(null);
    this._keyManager?.destroy();
    this._keyManager = null;
    if (this._overlayRef?.hasAttached()) this._overlayRef.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  private syncActiveId(): void {
    const active = this._keyManager?.activeItem;
    this.ctx.setActiveId(active ? active.itemId() : null);
  }

  protected handleSearchInput(event: Event): void {
    this.ctx.setQuery((event.target as HTMLInputElement).value);
    // Re-evaluate the active item after the list re-filters.
    queueMicrotask(() => {
      this._keyManager?.setFirstItemActive();
      this.syncActiveId();
    });
  }

  protected handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._keyManager?.setNextItemActive();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._keyManager?.setPreviousItemActive();
        break;
      case 'Home':
        event.preventDefault();
        this._keyManager?.setFirstItemActive();
        break;
      case 'End':
        event.preventDefault();
        this._keyManager?.setLastItemActive();
        break;
      case 'Enter': {
        event.preventDefault();
        const active = this._keyManager?.activeItem;
        if (active && !active.nDisabled() && !active.hidden()) {
          this.ctx.selectItem(active.nValue(), active.getLabel());
        }
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.ctx.closePanel(true);
        break;
      case 'Tab':
        this.ctx.closePanel(false);
        break;
    }
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
      const originX =
        s === 'right' ? 'end' : s === 'left' ? 'start' : a === 'center' ? 'center' : a;
      const overlayX =
        s === 'right' ? 'start' : s === 'left' ? 'end' : a === 'center' ? 'center' : a;
      return {
        originX: originX as ConnectedPosition['originX'],
        originY: originY as ConnectedPosition['originY'],
        overlayX: overlayX as ConnectedPosition['overlayX'],
        overlayY: overlayY as ConnectedPosition['overlayY'],
        offsetX: isVertical ? alignOffset : s === 'right' ? sideOffset : -sideOffset,
        offsetY: isVertical ? (s === 'bottom' ? sideOffset : -sideOffset) : alignOffset,
      };
    };

    const opposite: Record<Side, Side> = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    };
    return [buildOne(side, align), buildOne(opposite[side], align)];
  }
}
