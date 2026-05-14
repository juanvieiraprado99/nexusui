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
  CONTEXT_MENU_CONTEXT,
  CONTEXT_MENU_SUB_CONTEXT,
  type ContextMenuSubContext,
} from './context-menu.tokens';

let _subIdCounter = 0;

@Component({
  selector: 'n-context-menu-sub',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'sub' },
  providers: [
    {
      provide: CONTEXT_MENU_SUB_CONTEXT,
      useFactory: (cmp: ContextMenuSubComponent) => cmp.context,
      deps: [forwardRef(() => ContextMenuSubComponent)],
    },
    {
      provide: CONTEXT_MENU_CONTEXT,
      useFactory: (cmp: ContextMenuSubComponent) => cmp.context,
      deps: [forwardRef(() => ContextMenuSubComponent)],
    },
  ],
})
export class ContextMenuSubComponent {
  readonly nOpen = model<boolean>(false);
  readonly nId = input<string>('');

  private readonly _parent = inject(CONTEXT_MENU_CONTEXT, { skipSelf: true });
  private readonly _staticId = `n-context-menu-sub-${++_subIdCounter}`;
  private readonly _triggerEl = signal<HTMLElement | null>(null);

  readonly rootId = computed(() => this.nId() || this._staticId);

  readonly context: ContextMenuSubContext = Object.create(null);

  constructor() {
    Object.assign(this.context, {
      isSub: true,
      parent: this._parent,
      open: this.nOpen,
      cursorX: this._parent.cursorX,
      cursorY: this._parent.cursorY,
      triggerEl: this._triggerEl.asReadonly(),
      setTriggerEl: (el: HTMLElement | null) => this._triggerEl.set(el),
      toggle: () => this.nOpen.set(!this.nOpen()),
      openMenu: () => this.nOpen.set(true),
      openAt: (x: number, y: number) => this._parent.openAt(x, y),
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
