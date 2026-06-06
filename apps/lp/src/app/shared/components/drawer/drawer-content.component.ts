import { A11yModule, FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
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
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { DRAWER_CONTEXT } from './drawer.context';
import { drawerContentVariants, type DrawerContentVariants } from './drawer.variants';

/** Sincronizado com `duration-300` no CVA — controla o atraso de desmontagem do overlay. */
const DRAWER_ANIM_MS = 300;

const OFF_SCREEN: Record<string, string> = {
  left:   '-translate-x-full',
  right:  'translate-x-full',
  top:    '-translate-y-full',
  bottom: 'translate-y-full',
};

@Component({
  selector: 'n-drawer-content',
  standalone: true,
  imports: [A11yModule],
  template: `
    <ng-template #panel>
      @if (nBackdrop()) {
        <div
          class="fixed inset-0 bg-black/80 transition-opacity duration-300"
          [class.opacity-0]="!isVisible() || isClosing()"
          data-drawer-backdrop
          aria-hidden="true"
          (click)="handleBackdropClick()"
        ></div>
      }

      <div
        #panelEl
        [id]="ctx.drawerId()"
        [attr.role]="ctx.role()"
        aria-modal="true"
        [attr.aria-labelledby]="ctx.hasTitle() ? ctx.titleId() : null"
        [attr.aria-describedby]="ctx.hasDescription() ? ctx.descriptionId() : null"
        [attr.data-position]="nPosition()"
        [attr.data-shaking]="shaking() ? '' : null"
        data-slot="content"
        data-drawer
        tabindex="-1"
        [class]="classes()"
        (keydown)="handleKeydown($event)"
      >
        @if (nHandle() && (nPosition() === 'top' || nPosition() === 'bottom')) {
          <div class="flex justify-center pt-3 pb-1 shrink-0" aria-hidden="true">
            <div class="w-10 h-1.5 rounded-full bg-muted-foreground/30"></div>
          </div>
        }

        @if (!nHideClose()) {
          <button
            type="button"
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background
                   transition-opacity hover:opacity-100 focus:outline-none focus:ring-2
                   focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Fechar"
            (click)="ctx.close()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        }

        <ng-content />
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class DrawerContentComponent implements AfterViewInit, OnDestroy {
  readonly nPosition  = input<DrawerContentVariants['nPosition']>('right');
  readonly nSize      = input<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  readonly nScrollable = input<boolean>(false);
  readonly nHideClose  = input<boolean>(false);
  readonly nHandle     = input<boolean>(true);
  readonly nBackdrop   = input<boolean>(true);
  readonly nClass      = input<string>('');

  protected readonly ctx             = inject(DRAWER_CONTEXT);
  private readonly _overlay          = inject(Overlay);
  private readonly _vcr              = inject(ViewContainerRef);
  private readonly _focusTrapFactory = inject(FocusTrapFactory);

  @ViewChild('panel', { static: true }) private _panelTpl!: TemplateRef<unknown>;
  @ViewChild('panelEl') private _panelEl?: ElementRef<HTMLElement>;

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _focusTrap: FocusTrap | null = null;
  private _detachTimer?: ReturnType<typeof setTimeout>;
  private _shakeTimer?: ReturnType<typeof setTimeout>;

  protected readonly isVisible  = signal(false);
  protected readonly isClosing  = signal(false);
  protected readonly shaking    = signal(false);

  protected readonly classes = computed(() => {
    const pos = this.nPosition() ?? 'right';
    const visible = this.isVisible() && !this.isClosing();

    return mergeClasses(
      drawerContentVariants({ nPosition: pos, nSize: this.nSize() }),
      visible ? 'translate-x-0 translate-y-0 ease-out' : `${OFF_SCREEN[pos]} ease-in`,
      this.nScrollable() && 'overflow-hidden',
      this.nClass(),
    );
  });

  constructor() {
    effect(() => {
      if (this.ctx.open()) {
        clearTimeout(this._detachTimer);
        this._attach();
      } else if (this._overlayRef) {
        this._beginDetach();
      }
    });
  }

  ngAfterViewInit(): void {
    this._portal = new TemplatePortal(this._panelTpl, this._vcr);
  }

  ngOnDestroy(): void {
    clearTimeout(this._detachTimer);
    clearTimeout(this._shakeTimer);
    this._forceDetach();
  }

  private _attach(): void {
    if (!this._portal || this._overlayRef?.hasAttached()) return;

    const config = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      hasBackdrop: false,
      width: '100%',
      height: '100%',
    });

    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);

    queueMicrotask(() => {
      this.isVisible.set(true);
      const el = this._panelEl?.nativeElement;
      if (!el) return;
      this._focusTrap = this._focusTrapFactory.create(el);
      this._focusTrap.focusInitialElementWhenReady();
    });
  }

  private _beginDetach(): void {
    clearTimeout(this._detachTimer);
    this.isClosing.set(true);
    this.isVisible.set(false);

    const triggerEl = untracked(() => this.ctx.triggerEl());
    if (triggerEl) triggerEl.focus({ preventScroll: true });

    this._focusTrap?.destroy();
    this._focusTrap = null;

    this._detachTimer = setTimeout(() => {
      this.isClosing.set(false);
      this._forceDetach();
    }, DRAWER_ANIM_MS + 10);
  }

  private _forceDetach(): void {
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  protected handleBackdropClick(): void {
    if (this.ctx.persistent()) { this._shake(); return; }
    this.ctx.close();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (this.ctx.persistent()) { this._shake(); return; }
    this.ctx.close();
  }

  private _shake(): void {
    clearTimeout(this._shakeTimer);
    this.shaking.set(true);
    this._shakeTimer = setTimeout(() => this.shaking.set(false), 450);
  }
}
