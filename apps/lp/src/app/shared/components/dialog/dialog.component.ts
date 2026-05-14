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
import { DIALOG_CONTEXT, type DialogContext } from './dialog.context';

let _dialogIdCounter = 0;

@Component({
  selector: 'n-dialog',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents', 'data-slot': 'root' },
  providers: [
    {
      provide: DIALOG_CONTEXT,
      useFactory: (c: DialogComponent) => c.context,
      deps: [forwardRef(() => DialogComponent)],
    },
  ],
})
export class DialogComponent {
  readonly nOpen       = model<boolean>(false);
  readonly nId         = input<string>('');
  readonly nPersistent = input<boolean>(false);
  readonly nRole       = input<'dialog' | 'alertdialog'>('dialog');

  readonly nOpenChange = output<boolean>();

  private readonly _staticId  = `n-dialog-${++_dialogIdCounter}`;
  private readonly _triggerEl = signal<HTMLElement | null>(null);

  readonly dialogId      = computed(() => this.nId() || this._staticId);
  readonly titleId       = computed(() => `${this.dialogId()}-title`);
  readonly descriptionId = computed(() => `${this.dialogId()}-description`);

  readonly context: DialogContext = {
    open:          this.nOpen,
    persistent:    this.nPersistent,
    role:          this.nRole,
    dialogId:      this.dialogId,
    titleId:       this.titleId,
    descriptionId: this.descriptionId,
    triggerEl:     this._triggerEl.asReadonly(),
    setTriggerEl:  (el) => this._triggerEl.set(el),
    setOpen:       (v) => this._setOpen(v),
    close:         () => this._setOpen(false),
  };

  private _setOpen(value: boolean): void {
    if (this.nOpen() === value) return;
    this.nOpen.set(value);
    this.nOpenChange.emit(value);
  }
}
