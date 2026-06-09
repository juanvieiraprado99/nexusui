import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { COMBOBOX_CONTEXT } from './combobox.tokens';
import { comboboxItemVariants, type ComboboxItemVariants } from './combobox.variants';

@Component({
  selector: 'n-combobox-item',
  standalone: true,
  template: `
    <span class="flex w-4 shrink-0 items-center justify-center" aria-hidden="true">
      @if (isSelected()) {
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      }
    </span>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'option',
    tabindex: '-1',
    'data-slot': 'item',
    '[id]': 'itemId()',
    '[class]': 'classes()',
    '[hidden]': 'hidden()',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'nDisabled() ? true : null',
    '[attr.data-disabled]': 'nDisabled() ? "" : null',
    '[attr.data-highlighted]': 'highlighted() ? "" : null',
    '(click)': 'handleSelect()',
    '(mouseenter)': 'handleMouseEnter()',
    '(mouseleave)': 'setHighlighted(false)',
  },
})
export class ComboboxItemComponent implements Highlightable, OnDestroy {
  readonly nValue = input.required<string>();
  readonly nLabel = input<string>('');
  readonly nDisabled = input<boolean>(false);
  readonly nVariant = input<ComboboxItemVariants['nVariant']>('default');
  readonly nClass = input<string>('');

  readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly ctx = inject(COMBOBOX_CONTEXT);
  private readonly _highlighted = signal(false);
  private readonly _unregister: () => void;

  readonly highlighted = this._highlighted.asReadonly();

  readonly itemId = computed(() => `${this.ctx.contentId}-opt-${this.nValue()}`);
  readonly isSelected = computed(() => this.ctx.isSelected(this.nValue()));
  readonly hidden = computed(() => {
    const q = this.ctx.query().toLowerCase();
    if (!q) return false;
    const label = (this.nLabel() || (this.host.nativeElement.textContent?.trim() ?? '')).toLowerCase();
    return !label.includes(q);
  });

  get disabled(): boolean {
    return this.nDisabled();
  }

  getLabel(): string {
    return this.nLabel() || (this.host.nativeElement.textContent?.trim() ?? '');
  }

  protected readonly classes = computed(() =>
    mergeClasses(comboboxItemVariants({ nVariant: this.nVariant() }), this.nClass()),
  );

  constructor() {
    this._unregister = this.ctx.registerItemVisibility(() => !this.hidden());
    // Register the value -> label mapping once the projected content has
    // rendered (the textContent fallback needs the DOM to exist).
    afterNextRender(() => this.ctx.registerItemLabel(this.nValue(), this.getLabel()));
  }

  ngOnDestroy(): void {
    this._unregister();
  }

  // --- Highlightable (ActiveDescendantKeyManager) -------------------------
  // Virtual focus: DOM focus stays on the search input; the active option is
  // highlighted via [data-highlighted] + aria-activedescendant.
  setActiveStyles(): void {
    this._highlighted.set(true);
    this.host.nativeElement.scrollIntoView({ block: 'nearest' });
  }

  setInactiveStyles(): void {
    this._highlighted.set(false);
  }

  setHighlighted(value: boolean): void {
    if (this.nDisabled()) return;
    this._highlighted.set(value);
  }

  protected handleMouseEnter(): void {
    if (this.nDisabled()) return;
    this._highlighted.set(true);
    this.ctx.setActiveItem(this.nValue());
  }

  protected handleSelect(): void {
    if (this.nDisabled()) return;
    this.ctx.selectItem(this.nValue(), this.getLabel());
  }
}
