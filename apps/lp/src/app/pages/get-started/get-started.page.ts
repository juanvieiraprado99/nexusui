import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '../../shared/components/badge';
import { ButtonComponent } from '../../shared/components/button';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { DocsLayoutComponent } from '../../shared/layout/docs-layout.component';

@Component({
  selector: 'app-get-started-page',
  imports: [DocsLayoutComponent, RouterLink, ButtonComponent, BadgeComponent, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl space-y-16 pb-16">

        <!-- Header -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold tracking-tight">Get Started</h1>
            <n-badge nVariant="secondary">Angular 21</n-badge>
          </div>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Built for Angular developers who value code ownership and design quality.
            nexus-ui delivers beautiful, accessible components — and makes them <em>yours</em>.
          </p>
          <div class="flex items-center gap-3 pt-1">
            <a n-button routerLink="/components">
              View Components
              <svg class="ml-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a n-button nVariant="outline" routerLink="/installation">Installation</a>
          </div>
        </div>

        <!-- Quick Start -->
        <div id="quick-start" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
            <p class="mt-2 text-muted-foreground">
              Three commands to go from zero to your first component.
            </p>
          </div>

          <div class="space-y-5">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
                <h3 class="font-semibold">Initialize your project</h3>
              </div>
              <p class="ml-8 text-sm text-muted-foreground">Scaffolds <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">components.json</code>, patches Tailwind, tsconfig paths, and installs base deps.</p>
              <div class="ml-8">
                <app-code-block [code]="initCode" language="bash" />
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
                <h3 class="font-semibold">Add a component</h3>
              </div>
              <p class="ml-8 text-sm text-muted-foreground">Resolves dependencies automatically and copies files into your project.</p>
              <div class="ml-8">
                <app-code-block [code]="addCode" language="bash" />
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
                <h3 class="font-semibold">Use it</h3>
              </div>
              <p class="ml-8 text-sm text-muted-foreground">Import and drop into any standalone component — no modules needed.</p>
              <div class="ml-8 space-y-2">
                <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
                <app-code-block [code]="usageCode" language="html" filename="my-page.component.html" />
              </div>
            </div>
          </div>
        </div>

        <!-- Why nexus-ui? -->
        <div id="why" class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">Why nexus-ui?</h2>
            <p class="mt-2 text-muted-foreground">
              A component library that doesn't force you to choose between flexibility and quality.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm space-y-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-muted text-base" aria-hidden="true">⚡</div>
              <h3 class="font-semibold">You Own the Code</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                No black-box npm package. Components copy directly into your project via CLI.
                Customize anything — zero limitations, no version conflicts.
              </p>
            </div>

            <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm space-y-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-muted text-base" aria-hidden="true">🎨</div>
              <h3 class="font-semibold">Beautiful by Default</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                CVA-powered variants, Tailwind CSS, OKLch theming with 70 color combinations.
                Dark mode baked in from day one.
              </p>
            </div>

            <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm space-y-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-muted text-base" aria-hidden="true">♿</div>
              <h3 class="font-semibold">Accessibility First</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                ARIA attributes, focus management, and keyboard navigation are on by default —
                not optional extras. Ships WCAG AA compliant out of the box.
              </p>
            </div>

            <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm space-y-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-muted text-base" aria-hidden="true">📋</div>
              <h3 class="font-semibold">Form-Ready</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Every input implements <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">ControlValueAccessor</code>.
                Drop any component into Angular Reactive Forms with zero boilerplate.
              </p>
            </div>
          </div>
        </div>

        <!-- Powerful CLI -->
        <div id="cli" class="space-y-5">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">Powerful CLI</h2>
            <p class="mt-2 text-muted-foreground">
              One command resolves dependencies, rewrites imports, and drops files into your project.
              No copy-pasting. No manual wiring.
            </p>
          </div>

          <app-code-block [code]="cliDemoCode" language="bash" />

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="space-y-1.5">
              <h4 class="text-sm font-semibold">Smart Dependencies</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Recursive graph resolves transitive deps. Add <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">combobox</code>,
                get <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">input + label + utils</code> automatically.
              </p>
            </div>
            <div class="space-y-1.5">
              <h4 class="text-sm font-semibold">Import Rewriting</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Paths auto-transform to your project's configured aliases from <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">components.json</code>.
                Works with any monorepo structure.
              </p>
            </div>
            <div class="space-y-1.5">
              <h4 class="text-sm font-semibold">Safe Installs</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Rollback on failure. Existing files protected unless you pass <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">--overwrite</code>.
                Detects pnpm / yarn / bun / npm automatically.
              </p>
            </div>
          </div>
        </div>

        <!-- Modern Angular -->
        <div id="angular" class="space-y-5">
          <h2 class="text-2xl font-bold tracking-tight">Modern Angular</h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm space-y-2">
              <h3 class="font-semibold">Angular 21 Standalone</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                No NgModules. <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">OnPush</code> everywhere.
                Tree-shakeable by design. Built for the Angular you use today.
              </p>
            </div>
            <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm space-y-2">
              <h3 class="font-semibold">Signal-Powered</h3>
              <p class="text-sm text-muted-foreground leading-relaxed">
                Computed class bindings, reactive state — fully compatible with Angular's signals API
                and ready for future Angular primitives.
              </p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="rounded-lg border border-border/60 bg-card p-6">
          <dl class="grid grid-cols-2 gap-6 sm:grid-cols-4" role="list">
            <div class="text-center">
              <dt class="text-3xl font-bold">32</dt>
              <dd class="mt-1 text-sm text-muted-foreground">Components</dd>
            </div>
            <div class="text-center">
              <dt class="text-3xl font-bold">70</dt>
              <dd class="mt-1 text-sm text-muted-foreground">Theme combos</dd>
            </div>
            <div class="text-center">
              <dt class="text-3xl font-bold">100%</dt>
              <dd class="mt-1 text-sm text-muted-foreground">Free forever</dd>
            </div>
            <div class="text-center">
              <dt class="text-3xl font-bold">0</dt>
              <dd class="mt-1 text-sm text-muted-foreground">Vendor lock-in</dd>
            </div>
          </dl>
          <p class="mt-5 text-center text-sm text-muted-foreground">
            Button, Input, Select, Combobox, Accordion, Datepicker, and more — all accessible, all yours.
          </p>
        </div>

        <!-- Open Source -->
        <div id="open-source" class="rounded-lg border border-border/60 bg-zinc-950 p-8 text-center dark:border-white/10">
          <svg class="mx-auto mb-4 text-white" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          <h2 class="text-xl font-bold text-white">Open Source</h2>
          <p class="mt-2 text-sm text-zinc-400">
            100% free. No paywalls, no "pro" tier. Built in public, for the community.
          </p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <a
              href="https://github.com/JuanPrado/nexus-ui"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              Star on GitHub
            </a>
            <a
              routerLink="/components"
              class="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              View Components
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

      </article>

      <!-- TOC aside -->
      <nav slot="aside" class="sticky top-8">
        <p class="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">On this page</p>
        <ul class="space-y-1 text-sm">
          <li><a class="text-muted-foreground transition-colors hover:text-foreground" href="#quick-start">Quick Start</a></li>
          <li><a class="text-muted-foreground transition-colors hover:text-foreground" href="#why">Why nexus-ui?</a></li>
          <li><a class="text-muted-foreground transition-colors hover:text-foreground" href="#cli">Powerful CLI</a></li>
          <li><a class="text-muted-foreground transition-colors hover:text-foreground" href="#angular">Modern Angular</a></li>
          <li><a class="text-muted-foreground transition-colors hover:text-foreground" href="#open-source">Open Source</a></li>
        </ul>
      </nav>

    </app-docs-layout>
  `,
})
export class GetStartedPage {
  protected readonly initCode = `npx @nexuslabs/cli@alpha init`;
  protected readonly addCode = `npx @nexuslabs/cli@alpha add button`;
  protected readonly importCode = `import { ButtonComponent } from '@/components/button';`;
  protected readonly usageCode = `<button n-button>Click me</button>`;
  protected readonly cliDemoCode = `$ npx @nexuslabs/cli@alpha add combobox

  ✓ Resolving dependencies...
  ✓ Installing: combobox → input, label, utils
  ✓ Transforming imports to your aliases...
  ✓ Done! 12 files added to src/components/`;
}
