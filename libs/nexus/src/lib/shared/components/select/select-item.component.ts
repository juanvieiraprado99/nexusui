import { FocusableOption } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SELECT_CONTEXT } from './select.tokens';
import { selectItemVariants, type SelectItemVariants } from './select.variants';

@Component({
  selector: 'n-select-item',
  standalone: true,
  template: `
    <ng-content select="[data-slot=icon-leading]" />

    <span class="flex flex-1 flex-col leading-tight min-w-0">
      <span class="truncate">
        @if (nLabel()) { {{ nLabel() }} } @else { <ng-content /> }
      </span>
      @if (nDescription()) {
        <span class="truncate text-xs text-muted-foreground" data-slot="description">
          {{ nDescription() }}
        </span>
      }
    </span>

    <span class="flex w-4 shrink-0 items-center justify-center" aria-hidden="true">
      @if (isSelected()) {
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      }
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'option',
    tabindex: '-1',
    'data-slot': 'item',
    '[class]': 'classes()',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'isDisabled() ? true : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-highlighted]': 'highlighted() ? "" : null',
    '[attr.data-value]': 'nValue()',
    '(click)': 'handleSelect()',
    '(keydown)': 'handleKeydown($event)',
    '(mouseenter)': 'setHighlighted(true)',
    '(mouseleave)': 'setHighlighted(false)',
  },
})
export class SelectItemComponent implements FocusableOption, OnInit, OnDestroy {
  readonly nValue = input.required<string>();
  readonly nLabel = input<string>('');
  readonly nDescription = input<string>('');
  readonly nDisabled = input<boolean>(false);
  readonly nVariant = input<SelectItemVariants['nVariant']>('default');
  readonly nClass = input<string>('');

  readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly ctx = inject(SELECT_CONTEXT);
  private readonly _highlighted = signal(false);
  private _unregister: (() => void) | null = null;

  readonly highlighted = this._highlighted.asReadonly();

  readonly isSelected = computed(() => this.ctx.isSelected(this.nValue()));

  readonly isDisabled = computed(() => {
    if (this.nDisabled()) return true;
    if (!this.ctx.canSelectMore(this.nValue())) return true;
    return false;
  });

  get disabled(): boolean {
    return this.isDisabled();
  }

  focus(): void {
    this.host.nativeElement.focus({ preventScroll: false });
    this.host.nativeElement.scrollIntoView({ block: 'nearest' });
  }

  getLabel(): string {
    return this.nLabel() || (this.host.nativeElement.textContent?.trim() ?? '');
  }

  protected readonly classes = computed(() =>
    mergeClasses(selectItemVariants({ nVariant: this.nVariant() }), this.nClass()),
  );

  ngOnInit(): void {
    this._unregister = this.ctx.registerItem(this.nValue(), this.getLabel());
  }

  ngOnDestroy(): void {
    this._unregister?.();
  }

  setHighlighted(value: boolean): void {
    if (this.isDisabled()) return;
    this._highlighted.set(value);
    if (value) this.host.nativeElement.focus({ preventScroll: true });
  }

  protected handleSelect(): void {
    if (this.isDisabled()) return;
    this.ctx.selectItem(this.nValue(), this.getLabel());
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleSelect();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.ctx.closePanel(true);
    }
  }

  @HostListener('focus') onFocus(): void {
    if (!this.isDisabled()) this._highlighted.set(true);
  }

  @HostListener('blur') onBlur(): void {
    this._highlighted.set(false);
  }
}
