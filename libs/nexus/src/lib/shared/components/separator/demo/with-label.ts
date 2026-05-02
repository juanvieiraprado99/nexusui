import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeparatorComponent } from '../index';

@Component({
  selector: 'demo-separator-with-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SeparatorComponent],
  template: `
    <div class="w-full max-w-sm space-y-2 text-sm">
      <button class="h-9 w-full rounded-md bg-primary text-primary-foreground">Continue with Google</button>
      <n-separator nLabel="OR" />
      <button class="h-9 w-full rounded-md border border-border">Sign in with email</button>
    </div>
  `,
})
export class SeparatorWithLabelDemo {}
