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
import { SelectItemComponent } from './select-item.component';
import { SELECT_CONTEXT } from './select.tokens';
import { selectContentVariants } from './select.variants';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

@Component({
  selector: 'n-select-content',
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
        [attr.data-side]="nSide()"
        [attr.data-state]="ctx.open() ? 'open' : 'closed'"
        [class]="classes()"
        (keydown)="handleKeydown($event)"
      >
        @if (ctx.loading()) {
          <div class="flex flex-col gap-1 p-1" data-slot="loading">
            <div class="h-7 animate-pulse rounded-sm bg-muted"></div>
            <div class="h-7 animate-pulse rounded-sm bg-muted"></div>
            <div class="h-7 animate-pulse rounded-sm bg-muted"></div>
          </div>
        } @else {
          @if (ctx.multiple() && ctx.selectAll()) {
            <button
              type="button"
              role="option"
              tabindex="-1"
              data-slot="select-all"
              class="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              [attr.aria-selected]="allSelected()"
              (click)="handleSelectAll()"
              (keydown)="handleSelectAllKey($event)"
            >
              <span class="flex w-4 shrink-0 items-center justify-center" aria-hidden="true">
                @if (allSelected()) {
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                } @else if (someSelected()) {
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                }
              </span>
              <span class="flex-1 text-left">{{ allSelected() ? 'Deselect all' : 'Select all' }}</span>
              <span class="text-xs text-muted-foreground">{{ ctx.values().length }}/{{ items().length }}</span>
            </button>
            <div class="my-1 h-px bg-border" role="separator" aria-hidden="true"></div>
          }

          <ng-content />
        }
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class SelectContentComponent implements AfterViewInit, OnDestroy {
  readonly nSide = input<Side>('bottom');
  readonly nAlign = input<Align>('start');
  readonly nSideOffset = input<number>(4);
  readonly nAlignOffset = input<number>(0);
  readonly nClass = input<string>('');

  protected readonly ctx = inject(SELECT_CONTEXT);
  private readonly _overlay = inject(Overlay);
  private readonly _vcr = inject(ViewContainerRef);

  protected readonly items = contentChildren(SelectItemComponent, { descendants: true });

  @ViewChild('panel', { static: true }) private _panelTpl!: TemplateRef<unknown>;
  @ViewChild('panelEl') private _panelEl?: ElementRef<HTMLElement>;

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _keyManager: FocusKeyManager<SelectItemComponent> | null = null;
  private _backdropSub?: Subscription;

  protected readonly classes = computed(() =>
    mergeClasses(selectContentVariants(), this.nClass()),
  );

  protected readonly allSelected = computed(() => {
    const its = this.items();
    if (its.length === 0) return false;
    const vals = this.ctx.values();
    return its.every(it => vals.includes(it.nValue()));
  });

  protected readonly someSelected = computed(() => {
    const vals = this.ctx.values();
    return vals.length > 0 && !this.allSelected();
  });

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

    const width = trigger.getBoundingClientRect().width;
    const positions = this.buildPositions();
    const config = new OverlayConfig({
      minWidth: this.ctx.matchTriggerWidth() ? width : undefined,
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
    this._backdropSub = this._overlayRef.backdropClick().subscribe(() => this.ctx.closePanel(false));

    queueMicrotask(() => {
      const items = this.items();
      this._keyManager = new FocusKeyManager<SelectItemComponent>(items)
        .withWrap()
        .withVerticalOrientation()
        .skipPredicate((item: SelectItemComponent) => item.isDisabled());
      this.ctx.setNavigateHandler(direction => {
        if (direction === 1) this._keyManager!.setNextItemActive();
        else this._keyManager!.setPreviousItemActive();
      });
      this.ctx.setTypeAheadHandler(value => {
        const idx = items.findIndex(it => it.nValue() === value);
        if (idx >= 0) this._keyManager!.setActiveItem(idx);
      });
      this._focusInitial();
    });
  }

  private _focusInitial(): void {
    const items = this.items();
    if (items.length === 0 || !this._keyManager) return;
    if (this.ctx.multiple()) {
      this._keyManager.setFirstItemActive();
      return;
    }
    const value = this.ctx.value();
    const idx = items.findIndex(it => it.nValue() === value);
    if (idx >= 0) this._keyManager.setActiveItem(idx);
    else this._keyManager.setFirstItemActive();
  }

  private detach(): void {
    this._backdropSub?.unsubscribe();
    this._backdropSub = undefined;
    this.ctx.setNavigateHandler(null);
    this.ctx.setTypeAheadHandler(null);
    this._keyManager = null;
    if (this._overlayRef?.hasAttached()) this._overlayRef.detach();
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.ctx.closePanel(true);
      return;
    }
    if (event.key === 'Tab') {
      this.ctx.closePanel(false);
      return;
    }
    if (this._isPrintable(event)) {
      this.ctx.typeAhead(event.key);
      return;
    }
    this._keyManager?.onKeydown(event);
  }

  protected handleSelectAll(): void {
    const visible = this.items().filter(it => !it.nDisabled()).map(it => it.nValue());
    this.ctx.selectAllVisible(visible);
  }

  protected handleSelectAllKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleSelectAll();
    }
  }

  private _isPrintable(event: KeyboardEvent): boolean {
    return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
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
