import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-label',
  standalone: true,
  template: `
    <label
      [attr.for]="nFor() || null"
      [attr.id]="nId() || null"
      [class]="classes()"
      data-slot="label"
    >
      <ng-content />
      @if (nRequired()) {
        <span class="ml-0.5 text-destructive" aria-hidden="true">*</span>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
})
export class LabelComponent {
  readonly nFor      = input<string>('');
  readonly nId       = input<string>('');
  readonly nRequired = input<boolean>(false);
  readonly nDisabled = input<boolean>(false);
  readonly nClass    = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses(
      'block text-sm font-medium leading-none mb-1.5',
      this.nDisabled() && 'cursor-not-allowed opacity-50',
      this.nClass(),
    ),
  );
}
