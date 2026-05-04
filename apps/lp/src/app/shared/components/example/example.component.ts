import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CodeBlockComponent } from '../code-block/code-block.component';

@Component({
  selector: 'app-example',
  imports: [CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="rounded-lg border border-border/60 bg-card overflow-hidden">
      <div role="tablist" aria-label="Preview/code" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
        <button
          role="tab"
          type="button"
          [attr.aria-selected]="tab() === 'preview'"
          (click)="tab.set('preview')"
          class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
          [class.bg-muted]="tab() === 'preview'"
          [class.text-foreground]="tab() === 'preview'"
          [class.text-muted-foreground]="tab() !== 'preview'"
        >Preview</button>
        <button
          role="tab"
          type="button"
          [attr.aria-selected]="tab() === 'code'"
          (click)="tab.set('code')"
          class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
          [class.bg-muted]="tab() === 'code'"
          [class.text-foreground]="tab() === 'code'"
          [class.text-muted-foreground]="tab() !== 'code'"
        >Code</button>
        @if (title()) {
          <figcaption class="ml-3 text-xs text-muted-foreground">{{ title() }}</figcaption>
        }
      </div>
      @if (tab() === 'preview') {
        <div
          class="flex min-h-44 items-center justify-center p-10"
          [style.background-image]="'radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 0)'"
          style="background-size: 18px 18px"
        >
          <ng-content />
        </div>
      } @else {
        <div class="p-3">
          <app-code-block [code]="code()" [language]="language()" />
        </div>
      }
    </figure>
  `,
})
export class ExampleComponent {
  readonly code = input.required<string>();
  readonly language = input<string>('html');
  readonly title = input<string>('');

  protected readonly tab = signal<'preview' | 'code'>('preview');
}
