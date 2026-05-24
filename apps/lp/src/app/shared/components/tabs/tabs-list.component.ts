import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterEveryRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { TABS_CONTEXT } from './tabs.context';
import { tabsListVariants } from './tabs.variants';

@Component({
  selector: 'n-tabs-list',
  standalone: true,
  template: `
    @if (showIndicator()) {
      <span
        aria-hidden="true"
        [class]="indicatorClass()"
        [style.left]="isHorizontal() ? indLeft() : null"
        [style.width]="isHorizontal() ? indWidth() : null"
        [style.top]="!isHorizontal() ? indTop() : null"
        [style.height]="!isHorizontal() ? indHeight() : null"
        [style.opacity]="indReady() ? '1' : '0'"
      ></span>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'role': 'tablist',
    '[attr.aria-orientation]': 'ctx.orientation()',
    'data-slot': 'list',
  },
})
export class TabsListComponent {
  private readonly _el  = inject(ElementRef<HTMLElement>);
  protected readonly ctx = inject(TABS_CONTEXT);

  readonly nClass = input<string>('');

  protected readonly indLeft   = signal('0px');
  protected readonly indTop    = signal('0px');
  protected readonly indWidth  = signal('0px');
  protected readonly indHeight = signal('0px');
  protected readonly indReady  = signal(false);
  private   readonly _animated = signal(false);

  protected readonly isHorizontal  = computed(() => this.ctx.orientation() === 'horizontal');
  protected readonly showIndicator = computed(() =>
    this.ctx.variant() === 'pills' || this.ctx.variant() === 'line',
  );

  protected readonly classes = computed(() =>
    mergeClasses(
      tabsListVariants({
        nVariant:     this.ctx.variant(),
        nOrientation: this.ctx.orientation(),
      }),
      this.ctx.stretch() ? 'w-full' : '',
      this.nClass(),
    ),
  );

  protected readonly indicatorClass = computed(() => {
    const variant  = this.ctx.variant();
    const vertical = !this.isHorizontal();
    const animate  = this._animated()
      ? 'transition-[left,top,width,height] duration-200 ease-out'
      : '';

    if (variant === 'pills') {
      return mergeClasses(
        'absolute z-0 rounded-md bg-background shadow-sm pointer-events-none',
        vertical ? 'inset-x-1' : 'inset-y-1',
        animate,
      );
    }

    // line
    return mergeClasses(
      'absolute z-0 bg-primary pointer-events-none',
      vertical ? 'right-0 w-0.5' : 'bottom-0 h-0.5',
      animate,
    );
  });

  constructor() {
    afterEveryRender(() => {
      if (!this.showIndicator()) return;
      this._measure();
    });
  }

  private _measure(): void {
    const host   = this._el.nativeElement as HTMLElement;
    const active = host.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    if (!active) return;

    const listRect   = host.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    if (this.isHorizontal()) {
      this.indLeft.set(`${activeRect.left - listRect.left}px`);
      this.indWidth.set(`${activeRect.width}px`);
    } else {
      this.indTop.set(`${activeRect.top - listRect.top}px`);
      this.indHeight.set(`${activeRect.height}px`);
    }

    if (!this.indReady()) this.indReady.set(true);

    // enable transition only after first paint so indicator doesn't animate from (0,0)
    if (!this._animated()) setTimeout(() => this._animated.set(true));
  }
}
