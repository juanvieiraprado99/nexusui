import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  Type,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { COMPONENTS_REGISTRY } from '../../../shared/constants/components.constant';
import { MarkdownPipe } from '../../../shared/pipes/markdown.pipe';

@Component({
  selector: 'component-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgComponentOutlet, MarkdownPipe],
  template: `
    <div class="max-w-3xl mx-auto px-6 py-10">
      @if (entry()) {
        <h1 class="text-3xl font-bold mb-2 capitalize">{{ entry()!.name }}</h1>
        <p class="text-muted-foreground mb-8">{{ entry()!.description }}</p>

        <section class="mb-10">
          <h2 class="text-lg font-semibold mb-4">Preview</h2>
          <div class="rounded-lg border border-border p-8 flex items-center justify-center bg-background">
            @if (demoComponent()) {
              <ng-container [ngComponentOutlet]="demoComponent()!" />
            }
          </div>
        </section>

        @if (overviewMd()) {
          <section class="prose dark:prose-invert max-w-none mb-8">
            <div [innerHTML]="overviewMd() | markdown"></div>
          </section>
        }
      } @else {
        <p class="text-muted-foreground">Component not found.</p>
      }
    </div>
  `,
})
export class ComponentPage implements OnInit {
  private readonly route = inject(ActivatedRoute);

  protected readonly entry = signal<(typeof COMPONENTS_REGISTRY)[0] | undefined>(undefined);
  protected readonly demoComponent = signal<Type<unknown> | null>(null);
  protected readonly overviewMd = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const name = this.route.snapshot.paramMap.get('name');
    const found = COMPONENTS_REGISTRY.find((c) => c.name === name);
    this.entry.set(found);
    if (!found) return;

    const demo = (await found.loadDemo()) as Type<unknown>;
    this.demoComponent.set(demo);
  }
}
