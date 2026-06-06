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
import { DRAWER_CONTEXT, type DrawerContext } from './drawer.context';

let _drawerIdCounter = 0;

@Component({
  selector: 'n-drawer',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'root' },
  providers: [
    {
      provide: DRAWER_CONTEXT,
      useFactory: (c: DrawerComponent) => c.context,
      deps: [forwardRef(() => DrawerComponent)],
    },
  ],
})
export class DrawerComponent {
  readonly nOpen       = model<boolean>(false);
  readonly nId         = input<string>('');
  readonly nPersistent = input<boolean>(false);
  readonly nRole       = input<'dialog' | 'navigation'>('dialog');

  readonly nOpenChange = output<boolean>();

  private readonly _staticId       = `n-drawer-${++_drawerIdCounter}`;
  private readonly _triggerEl       = signal<HTMLElement | null>(null);
  private readonly _hasTitle        = signal(false);
  private readonly _hasDescription  = signal(false);

  readonly drawerId      = computed(() => this.nId() || this._staticId);
  readonly titleId       = computed(() => `${this.drawerId()}-title`);
  readonly descriptionId = computed(() => `${this.drawerId()}-description`);

  readonly context: DrawerContext = {
    open:          this.nOpen,
    persistent:    this.nPersistent,
    role:          this.nRole,
    drawerId:      this.drawerId,
    titleId:       this.titleId,
    descriptionId: this.descriptionId,
    triggerEl:     this._triggerEl.asReadonly(),
    hasTitle:       this._hasTitle.asReadonly(),
    hasDescription: this._hasDescription.asReadonly(),
    setTriggerEl:  (el) => this._triggerEl.set(el),
    setOpen:       (v) => this._setOpen(v),
    close:         () => this._setOpen(false),
    setHasTitle:       (v) => this._hasTitle.set(v),
    setHasDescription: (v) => this._hasDescription.set(v),
  };

  private _setOpen(value: boolean): void {
    if (this.nOpen() === value) return;
    this.nOpen.set(value);
    this.nOpenChange.emit(value);
  }
}
