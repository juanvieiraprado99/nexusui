import { FocusableOption } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { CONTEXT_MENU_CONTEXT } from './context-menu.tokens';
import { contextMenuItemVariants, type ContextMenuItemVariants } from './context-menu.variants';

@Component({
  selector: 'n-context-menu-item',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
    tabindex: '-1',
    'data-slot': 'item',
    '[class]': 'classes()',
    '[attr.data-highlighted]': 'highlighted() ? "" : null',
    '[attr.data-disabled]': 'nDisabled() ? "" : null',
    '[attr.aria-disabled]': 'nDisabled() ? true : null',
    '(click)': 'handleSelect($event)',
    '(keydown)': 'handleKeydown($event)',
    '(mouseenter)': 'setHighlighted(true)',
    '(mouseleave)': 'setHighlighted(false)',
  },
})
export class ContextMenuItemComponent implements FocusableOption {
  readonly nVariant = input<ContextMenuItemVariants['nVariant']>('default');
  readonly nInset = input<boolean>(false);
  readonly nDisabled = input<boolean>(false);
  readonly nClass = input<string>('');

  readonly nSelect = output<Event>();

  readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _ctx = inject(CONTEXT_MENU_CONTEXT);
  private readonly _highlighted = signal(false);

  readonly highlighted = this._highlighted.asReadonly();

  get disabled(): boolean {
    return this.nDisabled();
  }

  focus(): void {
    this.host.nativeElement.focus({ preventScroll: true });
  }

  getLabel(): string {
    return this.host.nativeElement.textContent?.trim() ?? '';
  }

  protected readonly classes = computed(() =>
    mergeClasses(
      contextMenuItemVariants({ nVariant: this.nVariant(), nInset: this.nInset() }),
      this.nClass(),
    ),
  );

  setHighlighted(value: boolean): void {
    if (this.nDisabled()) return;
    this._highlighted.set(value);
    if (value) this.host.nativeElement.focus({ preventScroll: true });
  }

  protected handleSelect(event: Event): void {
    if (this.nDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.nSelect.emit(event);
    this._ctx.close(false);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleSelect(event);
    }
  }

  @HostListener('focus') onFocus(): void {
    if (!this.nDisabled()) this._highlighted.set(true);
  }

  @HostListener('blur') onBlur(): void {
    this._highlighted.set(false);
  }
}
