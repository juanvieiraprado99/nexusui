import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { POPOVER_CONTEXT, type PopoverContext } from './popover.context';

let _popoverIdCounter = 0;

@Component({
  selector: 'n-popover',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'root' },
  providers: [
    {
      provide: POPOVER_CONTEXT,
      useFactory: (cmp: PopoverComponent) => cmp.context,
      deps: [forwardRef(() => PopoverComponent)],
    },
  ],
})
export class PopoverComponent {
  readonly nOpen = model<boolean>(false);
  readonly nId = input<string>('');
  readonly nPersistent = input<boolean>(false);
  readonly nModal = input<boolean>(false);
  readonly nTrigger = input<'click' | 'hover' | 'focus'>('click');

  readonly nOpenChange = output<boolean>();

  private readonly _staticId = `n-popover-${++_popoverIdCounter}`;
  private readonly _triggerEl = signal<HTMLElement | null>(null);
  private readonly _panelEl = signal<HTMLElement | null>(null);
  private _closeTimer?: ReturnType<typeof setTimeout>;

  readonly rootId = computed(() => this.nId() || this._staticId);

  readonly context: PopoverContext = {
    open: this.nOpen,
    persistent: this.nPersistent,
    modal: this.nModal,
    triggerMode: this.nTrigger,
    triggerEl: this._triggerEl.asReadonly(),
    panelEl: this._panelEl.asReadonly(),
    get contentId() {
      return '';
    },
    get triggerId() {
      return '';
    },
    setTriggerEl: (el) => this._triggerEl.set(el),
    setPanelEl: (el) => this._panelEl.set(el),
    toggle: () => this._setOpen(!this.nOpen()),
    openPopover: () => {
      clearTimeout(this._closeTimer);
      this._setOpen(true);
    },
    close: (focusTrigger = true) => {
      clearTimeout(this._closeTimer);
      this._setOpen(false);
      if (focusTrigger) this._triggerEl()?.focus();
    },
    scheduleClose: (focusTrigger = false, delay = 150) => {
      clearTimeout(this._closeTimer);
      this._closeTimer = setTimeout(() => {
        this._setOpen(false);
        if (focusTrigger) this._triggerEl()?.focus();
      }, delay);
    },
    cancelScheduledClose: () => {
      clearTimeout(this._closeTimer);
    },
  };

  constructor() {
    Object.defineProperty(this.context, 'contentId', {
      get: () => `${this.rootId()}-content`,
    });
    Object.defineProperty(this.context, 'triggerId', {
      get: () => `${this.rootId()}-trigger`,
    });
  }

  private _setOpen(value: boolean): void {
    if (this.nOpen() === value) return;
    this.nOpen.set(value);
    this.nOpenChange.emit(value);
  }
}
