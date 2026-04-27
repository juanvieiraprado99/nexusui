import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPONENTS_REGISTRY } from '../../../shared/constants/components.constant';

@Component({
  selector: 'home-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="max-w-4xl mx-auto px-6 py-16">
      <div class="mb-16 text-center">
        <h1 class="text-5xl font-bold tracking-tight mb-4">nexus-ui</h1>
        <p class="text-xl text-muted-foreground mb-8">
          Beautiful Angular components. Copy and own.
        </p>
        <a
          routerLink="/docs/button"
          class="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Get Started
        </a>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        @for (comp of components; track comp.name) {
          <a
            [routerLink]="['/docs', comp.name]"
            class="rounded-md border border-border px-4 py-3 text-sm hover:bg-accent transition-colors"
          >
            {{ comp.name }}
          </a>
        }
      </div>
    </div>
  `,
})
export class HomePage {
  protected readonly components = COMPONENTS_REGISTRY;
}
