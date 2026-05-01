import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { COMBOBOX_CONTEXT } from './combobox.tokens';
import { comboboxTriggerVariants, type ComboboxTriggerVariants } from './combobox.variants';

@Component({
  selector: 'n-combobox-trigger',
  standalone: true,
  template: `
    <div
      #triggerDiv
      [id]="ctx.triggerId"
      role="combobox"
      aria-haspopup="listbox"
      [attr.aria-expanded]="ctx.open()"
      [attr.aria-controls]="ctx.contentId"
      [attr.aria-busy]="ctx.loading() ? true : null"
      [attr.aria-disabled]="ctx.disabled() ? true : null"
      [attr.data-disabled]="ctx.disabled() ? '' : null"
      [attr.aria-labelledby]="ctx.labelId() || null"
      [attr.aria-label]="ctx.labelId() ? null : (ctx.ariaLabel() || null)"
      [attr.aria-invalid]="ctx.hasError() ? true : null"
      [attr.aria-required]="ctx.required() ? true : null"
      [attr.aria-describedby]="ctx.describedBy()"
      [attr.data-state]="ctx.open() ? 'open' : 'closed'"
      [class]="classes()"
      tabindex="0"
      (click)="handleClick()"
      (keydown)="handleTriggerKeydown($event)"
    >
      @if (ctx.open()) {
        <input
          #searchInput
          type="text"
          [value]="ctx.query()"
          aria-autocomplete="list"
          autocomplete="off"
          class="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          [placeholder]="nPlaceholder()"
          (input)="handleSearchInput($event)"
          (keydown)="handleSearchKeydown($event)"
          (click)="$event.stopPropagation()"
        />
      } @else {
        <span class="flex-1 truncate" [class.text-muted-foreground]="!hasValue()">
          {{ displayText() }}
        </span>
      }

      <div class="ml-auto flex shrink-0 items-center gap-1">
        @if (ctx.clearable() && hasValue() && !ctx.loading()) {
          <button
            type="button"
            class="rounded-sm opacity-50 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Clear selection"
            tabindex="-1"
            (click)="handleClear($event)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        }
        @if (ctx.loading()) {
          <svg class="h-4 w-4 animate-spin text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class ComboboxTriggerComponent implements AfterViewInit, OnDestroy {
  readonly nSize = input<ComboboxTriggerVariants['nSize']>('default');
  readonly nPlaceholder = input<string>('Select an option...');
  readonly nClass = input<string>('');

  protected readonly ctx = inject(COMBOBOX_CONTEXT);

  @ViewChild('triggerDiv') private _triggerDivRef!: ElementRef<HTMLElement>;
  @ViewChild('searchInput') private _searchInputRef?: ElementRef<HTMLInputElement>;

  protected readonly classes = computed(() =>
    mergeClasses(comboboxTriggerVariants({ nSize: this.nSize() }), this.nClass()),
  );

  protected readonly hasValue = computed(() =>
    this.ctx.multiple() ? this.ctx.values().length > 0 : !!this.ctx.value(),
  );

  protected readonly displayText = computed(() => {
    if (this.ctx.multiple()) {
      const count = this.ctx.values().length;
      return count > 0 ? `${count} selected` : this.nPlaceholder();
    }
    return this.ctx.selectedLabel() || this.ctx.value() || this.nPlaceholder();
  });

  constructor() {
    effect(() => {
      if (this.ctx.open()) {
        queueMicrotask(() => this._searchInputRef?.nativeElement.focus());
      }
    });
  }

  ngAfterViewInit(): void {
    this.ctx.setTriggerEl(this._triggerDivRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx.setTriggerEl(null);
  }

  protected handleClick(): void {
    if (this.ctx.disabled()) return;
    this.ctx.togglePanel();
  }

  protected handleTriggerKeydown(event: KeyboardEvent): void {
    if (this.ctx.disabled()) return;
    if (!this.ctx.open()) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.ctx.openPanel();
      }
    }
  }

  protected handleSearchKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.ctx.navigateItems(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.ctx.navigateItems(-1);
        break;
      case 'Escape':
        event.preventDefault();
        this.ctx.closePanel(true);
        break;
      case 'Tab':
        this.ctx.closePanel(false);
        break;
    }
  }

  protected handleSearchInput(event: Event): void {
    this.ctx.setQuery((event.target as HTMLInputElement).value);
  }

  protected handleClear(event: Event): void {
    event.stopPropagation();
    this.ctx.clearSelection();
  }
}
