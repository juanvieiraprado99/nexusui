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
import { DIALOG_CONTEXT } from './dialog.context';
import { dialogContentVariants, type DialogContentVariants } from './dialog.variants';

@Component({
  selector: 'n-dialog-content',
  standalone: true,
  imports: [A11yModule],
  template: `
    <ng-template #panel>
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/80 transition-opacity duration-150 motion-reduce:transition-none"
        [class.opacity-0]="isClosing() || isOpening()"
        [class.ease-in]="isClosing()"
        data-dialog-backdrop
        aria-hidden="true"
        (click)="handleBackdropClick()"
      ></div>

      <!-- Centering shell -->
      <div class="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          #panelEl
          [id]="ctx.dialogId()"
          [attr.role]="ctx.role()"
          aria-modal="true"
          [attr.aria-labelledby]="ctx.titleId()"
          [attr.aria-describedby]="ctx.descriptionId()"
          [attr.data-size]="nSize()"
          [attr.data-shaking]="shaking() ? '' : null"
          data-slot="content"
          data-dialog
          tabindex="-1"
          [class]="classes()"
          (keydown)="handleKeydown($event)"
          style="pointer-events: auto;"
        >
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
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class DialogContentComponent implements AfterViewInit, OnDestroy {
  readonly nSize       = input<DialogContentVariants['nSize']>('default');
  readonly nScrollable = input<boolean>(false);
  readonly nHideClose  = input<boolean>(false);
  readonly nClass      = input<string>('');

  protected readonly ctx             = inject(DIALOG_CONTEXT);
  private readonly _overlay          = inject(Overlay);
  private readonly _vcr              = inject(ViewContainerRef);
  private readonly _focusTrapFactory = inject(FocusTrapFactory);

  @ViewChild('panel', { static: true }) private _panelTpl!: TemplateRef<unknown>;
  @ViewChild('panelEl') private _panelEl?: ElementRef<HTMLElement>;

  private _overlayRef: OverlayRef | null = null;
  private _portal: TemplatePortal | null = null;
  private _focusTrap: FocusTrap | null = null;
  private _detachTimer?: ReturnType<typeof setTimeout>;
  private _enterRaf?: ReturnType<typeof requestAnimationFrame>;
  protected readonly shaking   = signal(false);
  protected readonly isClosing = signal(false);
  protected readonly isOpening = signal(false);

  // Must stay >= the CSS transition duration (duration-150) so the leave
  // animation finishes before the overlay is disposed.
  private static readonly CLOSE_MS = 160;

  protected readonly classes = computed(() => {
    const entering = this.isOpening();
    const leaving = this.isClosing();
    return mergeClasses(
      dialogContentVariants({ nSize: this.nSize() }),
      this.nScrollable() && 'overflow-hidden',
      entering || leaving ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
      leaving && 'ease-in',
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
    this._cancelEnter();
    this._forceDetach();
  }

  private _attach(): void {
    // Reopened during the leave window: cancel the close-in-progress state.
    this.isClosing.set(false);
    if (!this._portal || this._overlayRef?.hasAttached()) return;

    const config = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      hasBackdrop: false,
      width: '100%',
      height: '100%',
    });

    // Render at the enter state first, then flip on the next frame so the CSS
    // transition runs (a freshly attached element has no "from" state otherwise).
    this.isOpening.set(true);
    this._overlayRef = this._overlay.create(config);
    this._overlayRef.attach(this._portal);

    this._enterRaf = requestAnimationFrame(() => {
      this._enterRaf = requestAnimationFrame(() => this.isOpening.set(false));
    });

    queueMicrotask(() => {
      const el = this._panelEl?.nativeElement;
      if (!el) return;
      this._focusTrap = this._focusTrapFactory.create(el);
      this._focusTrap.focusInitialElementWhenReady();
    });
  }

  private _cancelEnter(): void {
    if (this._enterRaf !== undefined) cancelAnimationFrame(this._enterRaf);
    this._enterRaf = undefined;
  }

  private _beginDetach(): void {
    clearTimeout(this._detachTimer);
    this._cancelEnter();
    this.isOpening.set(false);
    this.isClosing.set(true);

    const triggerEl = untracked(() => this.ctx.triggerEl());
    if (triggerEl) triggerEl.focus({ preventScroll: true });

    this._focusTrap?.destroy();
    this._focusTrap = null;

    this._detachTimer = setTimeout(() => {
      this.isClosing.set(false);
      this._forceDetach();
    }, DialogContentComponent.CLOSE_MS);
  }

  private _forceDetach(): void {
    this._overlayRef?.dispose();
    this._overlayRef = null;
  }

  protected handleBackdropClick(): void {
    if (this.ctx.role() === 'alertdialog') return;
    if (this.ctx.persistent()) { this._shake(); return; }
    this.ctx.close();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    if (this.ctx.role() === 'alertdialog') return;
    if (this.ctx.persistent()) { this._shake(); return; }
    this.ctx.close();
  }

  private _shake(): void {
    this.shaking.set(true);
    setTimeout(() => this.shaking.set(false), 450);
  }
}
