import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { DROPDOWN_MENU_SUB_CONTEXT } from './dropdown-menu.tokens';
import { dropdownMenuItemVariants } from './dropdown-menu.variants';

@Component({
  selector: 'n-dropdown-menu-sub-trigger',
  standalone: true,
  template: `
    <ng-content />
    <svg
      class="ml-auto size-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
    tabindex: '-1',
    'aria-haspopup': 'menu',
    'data-slot': 'sub-trigger',
    '[id]': 'ctx.triggerId',
    '[class]': 'classes()',
    '[attr.aria-expanded]': 'ctx.open()',
    '[attr.aria-controls]': 'ctx.open() ? ctx.contentId : null',
    '[attr.data-state]': 'ctx.open() ? "open" : "closed"',
    '[attr.data-disabled]': 'nDisabled() ? "" : null',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
    '(mouseenter)': 'handleEnter()',
  },
})
export class DropdownMenuSubTriggerComponent implements OnDestroy {
  readonly nInset = input<boolean>(false);
  readonly nDisabled = input<boolean>(false);
  readonly nClass = input<string>('');

  protected readonly ctx = inject(DROPDOWN_MENU_SUB_CONTEXT);
  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.ctx.setTriggerEl(this._host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx.setTriggerEl(null);
  }

  protected readonly classes = computed(() =>
    mergeClasses(
      dropdownMenuItemVariants({ nVariant: 'default', nInset: this.nInset() }),
      'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      this.nClass(),
    ),
  );

  protected handleClick(event: MouseEvent): void {
    if (this.nDisabled()) return;
    event.preventDefault();
    event.stopPropagation();
    this.ctx.toggle();
  }

  protected handleEnter(): void {
    if (this.nDisabled()) return;
    this.ctx.openMenu();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (this.nDisabled()) return;
    if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      this.ctx.openMenu();
    }
  }
}
