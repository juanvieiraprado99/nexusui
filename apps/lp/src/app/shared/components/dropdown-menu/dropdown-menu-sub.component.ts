import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import {
  DROPDOWN_MENU_CONTEXT,
  DROPDOWN_MENU_SUB_CONTEXT,
  type DropdownMenuSubContext,
} from './dropdown-menu.tokens';

let _subIdCounter = 0;

@Component({
  selector: 'n-dropdown-menu-sub',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'sub' },
  providers: [
    {
      provide: DROPDOWN_MENU_SUB_CONTEXT,
      useFactory: (cmp: DropdownMenuSubComponent) => cmp.context,
      deps: [forwardRef(() => DropdownMenuSubComponent)],
    },
    {
      provide: DROPDOWN_MENU_CONTEXT,
      useFactory: (cmp: DropdownMenuSubComponent) => cmp.context,
      deps: [forwardRef(() => DropdownMenuSubComponent)],
    },
  ],
})
export class DropdownMenuSubComponent {
  readonly nOpen = model<boolean>(false);
  readonly nId = input<string>('');

  private readonly _parent = inject(DROPDOWN_MENU_CONTEXT, { skipSelf: true });
  private readonly _staticId = `n-dropdown-menu-sub-${++_subIdCounter}`;
  private readonly _triggerEl = signal<HTMLElement | null>(null);

  readonly rootId = computed(() => this.nId() || this._staticId);

  readonly context: DropdownMenuSubContext = Object.create(null);

  constructor() {
    Object.assign(this.context, {
      isSub: true,
      parent: this._parent,
      open: this.nOpen,
      triggerEl: this._triggerEl.asReadonly(),
      setTriggerEl: (el: HTMLElement | null) => this._triggerEl.set(el),
      toggle: () => this.nOpen.set(!this.nOpen()),
      openMenu: () => this.nOpen.set(true),
      close: (focusTrigger = true) => {
        this.nOpen.set(false);
        if (focusTrigger) this._triggerEl()?.focus();
      },
    });
    Object.defineProperty(this.context, 'contentId', {
      get: () => `${this.rootId()}-content`,
    });
    Object.defineProperty(this.context, 'triggerId', {
      get: () => `${this.rootId()}-trigger`,
    });
  }
}
