import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  WritableSignal,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  SIDEBAR_CONTEXT,
  type SidebarCollapsible,
  type SidebarContext,
} from './sidebar.context';

let _sidebarIdCounter = 0;

@Component({
  selector: 'n-sidebar-provider',
  standalone: true,
  template: `
    @if (_isMobile() && _open()) {
      <div
        class="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        aria-hidden="true"
        (click)="_setOpen(false)"
      ></div>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex h-svh w-full overflow-hidden relative',
    '(document:keydown)': '_handleKeydown($event)',
  },
  providers: [
    {
      provide: SIDEBAR_CONTEXT,
      useFactory: (cmp: SidebarProviderComponent) => cmp.context,
      deps: [forwardRef(() => SidebarProviderComponent)],
    },
  ],
})
export class SidebarProviderComponent implements OnInit, OnDestroy {
  readonly nDefaultOpen = input<boolean>(true);
  readonly nDefaultCollapsed = input<boolean>(false);
  readonly nStorageKey = input<string>('');
  readonly nKeyboardShortcut = input<string>('b');

  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);
  private readonly _staticId = `n-sidebar-${++_sidebarIdCounter}`;

  protected readonly _open = signal<boolean>(true);
  private readonly _collapsed = signal<boolean>(false);
  protected readonly _isMobile = signal<boolean>(false);
  private readonly _collapsible: WritableSignal<SidebarCollapsible> = signal('offcanvas');

  private _mediaQuery?: MediaQueryList;
  private _mobileListener?: () => void;

  readonly context: SidebarContext = {
    open: this._open.asReadonly(),
    collapsed: this._collapsed.asReadonly(),
    isMobile: this._isMobile.asReadonly(),
    sidebarId: this._staticId,
    collapsible: this._collapsible,
    toggle: () => this._toggle(),
    setOpen: (v) => this._setOpen(v),
    toggleCollapsed: () => this._collapsed.update((v) => !v),
    setCollapsed: (v) => this._collapsed.set(v),
  };

  constructor() {
    if (this._isBrowser) {
      this._mediaQuery = window.matchMedia('(max-width: 767px)');
      this._isMobile.set(this._mediaQuery.matches);
      this._mobileListener = () => this._isMobile.set(this._mediaQuery!.matches);
      this._mediaQuery.addEventListener('change', this._mobileListener);
    }

    effect(() => {
      const key = this.nStorageKey();
      if (!key || !this._isBrowser) return;
      localStorage.setItem(`${key}-open`, String(this._open()));
      localStorage.setItem(`${key}-collapsed`, String(this._collapsed()));
    });
  }

  ngOnInit(): void {
    const key = this.nStorageKey();
    if (key && this._isBrowser) {
      const storedOpen = localStorage.getItem(`${key}-open`);
      const storedCollapsed = localStorage.getItem(`${key}-collapsed`);
      this._open.set(storedOpen !== null ? storedOpen === 'true' : this.nDefaultOpen());
      this._collapsed.set(storedCollapsed !== null ? storedCollapsed === 'true' : this.nDefaultCollapsed());
    } else {
      this._open.set(this.nDefaultOpen());
      this._collapsed.set(this.nDefaultCollapsed());
    }
  }

  ngOnDestroy(): void {
    if (this._mediaQuery && this._mobileListener) {
      this._mediaQuery.removeEventListener('change', this._mobileListener);
    }
  }

  protected _setOpen(value: boolean): void {
    this._open.set(value);
  }

  private _toggle(): void {
    const col = this._collapsible();
    if (col === 'icon') {
      this._collapsed.update((v) => !v);
    } else if (col === 'offcanvas') {
      this._open.update((v) => !v);
    }
  }

  protected _handleKeydown(event: KeyboardEvent): void {
    const shortcut = this.nKeyboardShortcut();
    if (!shortcut) return;
    if ((event.ctrlKey || event.metaKey) && event.key === shortcut) {
      event.preventDefault();
      this._toggle();
    }
  }
}
