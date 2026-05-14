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
import { CONTEXT_MENU_CONTEXT, type ContextMenuContext } from './context-menu.tokens';

let _contextMenuIdCounter = 0;

@Component({
  selector: 'n-context-menu',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'root' },
  providers: [
    {
      provide: CONTEXT_MENU_CONTEXT,
      useFactory: (cmp: ContextMenuComponent) => cmp.context,
      deps: [forwardRef(() => ContextMenuComponent)],
    },
  ],
})
export class ContextMenuComponent {
  readonly nOpen = model<boolean>(false);
  readonly nId = input<string>('');

  readonly nOpenChange = output<boolean>();

  private readonly _staticId = `n-context-menu-${++_contextMenuIdCounter}`;
  private readonly _cursorX = signal(0);
  private readonly _cursorY = signal(0);

  readonly rootId = computed(() => this.nId() || this._staticId);

  readonly context: ContextMenuContext = Object.create(null);

  constructor() {
    Object.assign(this.context, {
      open: this.nOpen,
      cursorX: this._cursorX,
      cursorY: this._cursorY,
      openAt: (x: number, y: number) => {
        this._cursorX.set(x);
        this._cursorY.set(y);
        this._setOpen(true);
      },
      close: () => {
        this._setOpen(false);
      },
    });
    Object.defineProperty(this.context, 'contentId', {
      get: () => `${this.rootId()}-content`,
    });
  }

  private _setOpen(value: boolean): void {
    if (this.nOpen() === value) return;
    this.nOpen.set(value);
    this.nOpenChange.emit(value);
  }
}
