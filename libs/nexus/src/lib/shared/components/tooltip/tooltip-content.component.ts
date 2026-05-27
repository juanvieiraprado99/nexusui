import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  input,
  signal,
} from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Align = 'start' | 'center' | 'end';

@Component({
  selector: 'n-tooltip-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: 'contents' },
  template: `
    <div
      [id]="nId()"
      role="tooltip"
      data-slot="content"
      [attr.data-side]="actualSide()"
      [attr.data-align]="nAlign()"
      [class]="classes()"
    >
      <span [class]="arrowClass()" aria-hidden="true"></span>
      @if (isString()) {
        <span>{{ asString() }}</span>
      } @else {
        <ng-container [ngTemplateOutlet]="asTemplate()" />
      }
    </div>
  `,
})
export class TooltipContentComponent {
  readonly nContent = input<string | TemplateRef<unknown>>('');
  readonly nSide    = input<Side>('top');
  readonly nAlign   = input<Align>('center');
  readonly nId      = input<string>('');

  readonly actualSide = signal<Side>('top');

  protected readonly isString   = computed(() => typeof this.nContent() === 'string');
  protected readonly asString   = computed(() => this.nContent() as string);
  protected readonly asTemplate = computed(() => this.nContent() as TemplateRef<unknown>);

  protected readonly classes = computed(() =>
    mergeClasses(
      'z-50 max-w-xs rounded-md bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-md',
      'animate-in fade-in-0 zoom-in-95',
    ),
  );

  protected readonly arrowClass = computed(() => {
    const base = 'absolute size-2 rotate-45 border bg-popover';
    switch (this.actualSide()) {
      case 'bottom':
        return `${base} -top-[4px] left-1/2 -translate-x-1/2 border-r-transparent border-b-transparent`;
      case 'top':
        return `${base} -bottom-[4px] left-1/2 -translate-x-1/2 border-t-transparent border-l-transparent`;
      case 'right':
        return `${base} -left-[4px] top-1/2 -translate-y-1/2 border-t-transparent border-r-transparent`;
      case 'left':
        return `${base} -right-[4px] top-1/2 -translate-y-1/2 border-b-transparent border-l-transparent`;
    }
  });

  setActualSide(side: Side): void {
    this.actualSide.set(side);
  }
}
