import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { mergeClasses } from '../../utils/merge-classes';

@Component({
  selector: 'n-context-menu-shortcut',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'shortcut',
    '[class]': 'classes()',
  },
})
export class ContextMenuShortcutComponent {
  readonly nClass = input<string>('');

  protected readonly classes = computed(() =>
    mergeClasses('ml-auto text-xs tracking-widest text-muted-foreground', this.nClass()),
  );
}
