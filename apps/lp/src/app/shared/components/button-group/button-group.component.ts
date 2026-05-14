import { Component, ChangeDetectionStrategy, ElementRef, forwardRef, input, computed, inject } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { buttonGroupVariants, type ButtonGroupVariants } from './button-group.variants';
import { BUTTON_GROUP_CONTEXT, type ButtonGroupContext } from './button-group.tokens';
import type { ButtonVariants } from '../button/button.variants';

@Component({
  selector: 'n-button-group',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'role': 'group',
    '[attr.aria-label]': 'nAriaLabel() || null',
    '[attr.data-orientation]': 'nOrientation()',
    '[attr.data-slot]': '"button-group"',
    '(keydown)': 'onKeyDown($event)',
  },
  providers: [
    { provide: BUTTON_GROUP_CONTEXT, useExisting: forwardRef(() => ButtonGroupComponent) },
  ],
})
export class ButtonGroupComponent implements ButtonGroupContext {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly nOrientation = input<ButtonGroupVariants['nOrientation']>('horizontal');
  readonly nSize        = input<ButtonVariants['nSize']>(undefined);
  readonly nVariant     = input<ButtonVariants['nVariant']>(undefined);
  readonly nDisabled    = input<boolean>(false);
  readonly nAriaLabel   = input<string>('');
  readonly nClass       = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(buttonGroupVariants({ nOrientation: this.nOrientation() }), this.nClass()),
  );

  onKeyDown(e: KeyboardEvent): void {
    const buttons = Array.from(
      this.el.nativeElement.querySelectorAll('button:not([disabled])'),
    ) as HTMLElement[];
    if (!buttons.length) return;
    const idx = buttons.indexOf(document.activeElement as HTMLElement);
    const isVertical = this.nOrientation() === 'vertical';
    const next = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prev = isVertical ? 'ArrowUp' : 'ArrowLeft';
    if (e.key === next) { e.preventDefault(); buttons[(idx + 1) % buttons.length]?.focus(); }
    if (e.key === prev) { e.preventDefault(); buttons[(idx - 1 + buttons.length) % buttons.length]?.focus(); }
  }
}
