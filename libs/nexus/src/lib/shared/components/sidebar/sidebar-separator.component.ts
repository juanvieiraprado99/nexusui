import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';
import { SeparatorComponent } from '../separator';

@Component({
  selector: 'n-sidebar-separator',
  standalone: true,
  imports: [SeparatorComponent],
  template: `<n-separator nClass="bg-sidebar-border" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    'data-slot': 'separator',
  },
})
export class SidebarSeparatorComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('mx-2 my-1 block', this.nClass()),
  );
}
