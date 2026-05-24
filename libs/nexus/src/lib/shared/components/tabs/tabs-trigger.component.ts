import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { TABS_CONTEXT } from './tabs.context';
import { tabsTriggerVariants, type TabsTriggerVariants } from './tabs.variants';

@Component({
  selector: 'n-tabs-trigger, button[n-tabs-trigger]',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'role': 'tab',
    '[attr.id]': 'triggerId()',
    '[attr.tabindex]': 'isActive() ? "0" : "-1"',
    '[attr.aria-selected]': 'isActive()',
    '[attr.aria-controls]': 'panelId()',
    '[attr.disabled]': 'nDisabled() ? true : null',
    '[attr.aria-disabled]': 'nDisabled() ? true : null',
    '[attr.data-state]': 'isActive() ? "active" : "inactive"',
    '[attr.data-disabled]': 'nDisabled() ? "" : null',
    'data-slot': 'trigger',
    '(click)': 'handleClick()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class TabsTriggerComponent {
  private readonly _ctx = inject(TABS_CONTEXT);
  private readonly _el  = inject(ElementRef<HTMLElement>);

  readonly nValue    = input.required<string>();
  readonly nDisabled = input<boolean>(false);
  readonly nSize     = input<TabsTriggerVariants['nSize']>('default');
  readonly nClass    = input<string>('');

  protected readonly isActive   = computed(() => this._ctx.activeValue() === this.nValue());
  protected readonly triggerId  = computed(() => this._ctx.getTriggerId(this.nValue()));
  protected readonly panelId    = computed(() => this._ctx.getPanelId(this.nValue()));

  protected readonly classes = computed(() =>
    mergeClasses(
      tabsTriggerVariants({
        nVariant:     this._ctx.variant(),
        nSize:        this.nSize(),
        nOrientation: this._ctx.orientation(),
      }),
      this._ctx.stretch() ? 'flex-1' : '',
      this.nClass(),
    ),
  );

  protected handleClick(): void {
    if (this.nDisabled()) return;
    this._ctx.setActive(this.nValue());
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (this.nDisabled()) return;

    const isHorizontal = this._ctx.orientation() === 'horizontal';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    if (![prevKey, nextKey, 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();

    const tablist = this._el.nativeElement.closest('[role="tablist"]');
    if (!tablist) return;

    const triggers = Array.from(tablist.querySelectorAll('[role="tab"]:not([disabled])')) as HTMLElement[];
    const currentIndex = triggers.indexOf(this._el.nativeElement);
    if (currentIndex === -1) return;

    let targetIndex: number;
    if (event.key === prevKey) {
      targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    } else if (event.key === nextKey) {
      targetIndex = (currentIndex + 1) % triggers.length;
    } else if (event.key === 'Home') {
      targetIndex = 0;
    } else {
      targetIndex = triggers.length - 1;
    }

    const target = triggers[targetIndex];
    target?.focus();
    target?.click();
  }
}
