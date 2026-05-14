import { FocusableOption } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { CONTEXT_MENU_CONTEXT } from './context-menu.tokens';
import { contextMenuItemVariants } from './context-menu.variants';

@Component({
  selector: 'n-context-menu-checkbox-item',
  standalone: true,
  template: `
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      @if (nChecked()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      }
    </span>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitemcheckbox',
    tabindex: '-1',
    'data-slot': 'checkbox-item',
    '[class]': 'classes()',
    '[attr.aria-checked]': 'nChecked()',
    '[attr.data-highlighted]': 'highlighted() ? "" : null',
    '[attr.data-disabled]': 'nDisabled() ? "" : null',
    '[attr.aria-disabled]': 'nDisabled() ? true : null',
    '(click)': 'handleSelect($event)',
    '(keydown)': 'handleKeydown($event)',
    '(mouseenter)': 'setHighlighted(true)',
    '(mouseleave)': 'setHighlighted(false)',
  },
})
export class ContextMenuCheckboxItemComponent implements FocusableOption {
  readonly nChecked = model<boolean>(false);
  readonly nDisabled = input<boolean>(false);
  readonly nInset = input<boolean>(false);
  readonly nCloseOnSelect = input<boolean>(false);
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
      contextMenuItemVariants({ nVariant: 'default', nInset: true }),
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
    this.nChecked.set(!this.nChecked());
    this.nSelect.emit(event);
    if (this.nCloseOnSelect()) this._ctx.close(false);
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
