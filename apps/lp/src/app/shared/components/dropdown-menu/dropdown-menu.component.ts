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
import { DROPDOWN_MENU_CONTEXT, type DropdownMenuContext } from './dropdown-menu.tokens';

let _dropdownMenuIdCounter = 0;

@Component({
  selector: 'n-dropdown-menu',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'root' },
  providers: [
    {
      provide: DROPDOWN_MENU_CONTEXT,
      useFactory: (cmp: DropdownMenuComponent) => cmp.context,
      deps: [forwardRef(() => DropdownMenuComponent)],
    },
  ],
})
export class DropdownMenuComponent {
  readonly nOpen = model<boolean>(false);
  readonly nId = input<string>('');

  readonly nOpenChange = output<boolean>();

  private readonly _staticId = `n-dropdown-menu-${++_dropdownMenuIdCounter}`;
  private readonly _triggerEl = signal<HTMLElement | null>(null);

  readonly rootId = computed(() => this.nId() || this._staticId);

  readonly context: DropdownMenuContext = {
    open: this.nOpen,
    triggerEl: this._triggerEl.asReadonly(),
    get contentId() {
      return '';
    },
    get triggerId() {
      return '';
    },
    setTriggerEl: (el) => this._triggerEl.set(el),
    toggle: () => this.setOpen(!this.nOpen()),
    openMenu: () => this.setOpen(true),
    close: (focusTrigger = true) => {
      this.setOpen(false);
      if (focusTrigger) this._triggerEl()?.focus();
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

  private setOpen(value: boolean): void {
    if (this.nOpen() === value) return;
    this.nOpen.set(value);
    this.nOpenChange.emit(value);
  }
}
