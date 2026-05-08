import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsLayoutComponent } from '../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { ButtonComponent } from '../../shared/components/button';

type InstallTab = 'cli' | 'manual';
type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

@Component({
  selector: 'app-installation-page',
  imports: [DocsLayoutComponent, CodeBlockComponent, ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight">Angular</h1>
          <p class="mt-1 text-muted-foreground">Install and configure nexus-ui for Angular.</p>
        </header>

        <!-- CLI / Manual tabs -->
        <div class="flex gap-0 border-b border-border mb-10">
          @for (tab of installTabs; track tab.id) {
            <button
              type="button"
              [class]="
                installTab() === tab.id
                  ? 'px-4 py-2 text-sm font-medium border-b-2 border-foreground text-foreground -mb-px transition-colors'
                  : 'px-4 py-2 text-sm text-muted-foreground hover:text-foreground -mb-px transition-colors'
              "
              (click)="installTab.set(tab.id)"
            >{{ tab.label }}</button>
          }
        </div>

        @if (installTab() === 'cli') {
          <div>
            <!-- Step 1 -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 z-10">1</div>
                <div class="w-px flex-1 bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-12 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">Create project</h2>
                <p class="text-sm text-muted-foreground mb-1">Start the CLI and create an application that uses Tailwind as default styling.</p>
                <p class="text-sm font-semibold mb-4">Since Tailwind is the core of the project, we do not recommend using other pre-processors.</p>
                <app-code-block [code]="createProjectCmd" language="bash" filename="Terminal" />
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 z-10">2</div>
                <div class="w-px flex-1 bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-12 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">Add nexus-ui</h2>
                <p class="text-sm text-muted-foreground mb-4">Prepare your entire project using the nexus-ui CLI:</p>

                <!-- Package manager tabs -->
                <div class="rounded-md border border-border/60 bg-zinc-950 text-zinc-100 overflow-hidden">
                  <div class="flex items-center justify-between border-b border-white/10 px-4 py-2">
                    <div class="flex gap-3">
                      @for (pm of packageManagers; track pm) {
                        <button
                          type="button"
                          [class]="
                            pkgManager() === pm
                              ? 'text-xs font-medium text-foreground bg-muted px-2 py-0.5 rounded transition-colors'
                              : 'text-xs text-zinc-400 hover:text-zinc-200 px-2 py-0.5 rounded transition-colors'
                          "
                          (click)="pkgManager.set(pm)"
                        >{{ pm }}</button>
                      }
                    </div>
                    <button
                      type="button"
                      n-button
                      nVariant="ghost"
                      nSize="icon"
                      (nClick)="copyInitCmd()"
                      aria-label="Copy code"
                      class="h-7 w-7 text-zinc-400 hover:text-white hover:bg-white/10"
                    >
                      @if (initCopied()) {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      } @else {
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      }
                    </button>
                  </div>
                  <pre class="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono"><code>{{ initCmd() }}</code></pre>
                </div>
              </div>
            </div>

            <!-- Step 3 (last — no line) -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0">3</div>
              </div>
              <div class="flex-1 pb-4 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">That's it</h2>
                <p class="text-sm text-muted-foreground mb-1">You can now start adding components to your project.</p>
                <p class="text-sm font-semibold mb-5">Open the components page and select what component you want to install!</p>
                <a n-button nVariant="default" [routerLink]="'/components'">Browse components</a>
              </div>
            </div>
          </div>
        }

        @if (installTab() === 'manual') {
          <div>
            <!-- Step 1 -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 z-10">1</div>
                <div class="w-px flex-1 bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-12 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">Create project</h2>
                <p class="text-sm text-muted-foreground mb-1">Start the CLI and create an application that uses Tailwind as default styling.</p>
                <p class="text-sm font-semibold mb-4">Since Tailwind is the core of the project, we do not recommend using other pre-processors.</p>
                <app-code-block [code]="createProjectCmd" language="bash" filename="Terminal" />
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 z-10">2</div>
                <div class="w-px flex-1 bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-12 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">Install dependencies</h2>
                <p class="text-sm text-muted-foreground mb-4">Install the packages required by nexus-ui components:</p>
                <app-code-block [code]="installDepsCmd" language="bash" filename="Terminal" />
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 z-10">3</div>
                <div class="w-px flex-1 bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-12 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">Add path aliases</h2>
                <p class="text-sm text-muted-foreground mb-4">Add component path aliases to your <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">tsconfig.json</code>:</p>
                <app-code-block [code]="tsconfigCode" language="json" filename="tsconfig.json" />
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0 z-10">4</div>
                <div class="w-px flex-1 bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-12 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">Add the utility</h2>
                <p class="text-sm text-muted-foreground mb-4">Create the <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">merge-classes</code> utility used by all components:</p>
                <app-code-block [code]="mergeClassesCode" language="ts" filename="src/lib/utils/merge-classes.ts" />
              </div>
            </div>

            <!-- Step 5 (last) -->
            <div class="flex gap-5">
              <div class="flex flex-col items-center shrink-0">
                <div class="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0">5</div>
              </div>
              <div class="flex-1 pb-4 min-w-0">
                <h2 class="font-semibold text-base mb-2 mt-1">Add components</h2>
                <p class="text-sm text-muted-foreground mb-4">Copy individual components from the registry into your project. Each component is your own code — no runtime dependency on nexus-ui.</p>
                <a n-button nVariant="default" [routerLink]="'/components'">Browse components</a>
              </div>
            </div>
          </div>
        }
      </article>
    </app-docs-layout>
  `,
})
export class InstallationPage {
  protected readonly installTab = signal<InstallTab>('cli');
  protected readonly pkgManager = signal<PackageManager>('npm');
  protected readonly initCopied = signal(false);

  protected readonly installTabs: { id: InstallTab; label: string }[] = [
    { id: 'cli', label: 'CLI' },
    { id: 'manual', label: 'Manual' },
  ];

  protected readonly packageManagers: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

  protected readonly createProjectCmd = `ng new my-app --style=tailwind`;

  protected readonly initCmd = computed(() => {
    const pm = this.pkgManager();
    const map: Record<PackageManager, string> = {
      npm: 'npx @nexuslabs/cli@alpha init',
      pnpm: 'pnpm dlx @nexuslabs/cli@alpha init',
      yarn: 'yarn dlx @nexuslabs/cli@alpha init',
      bun: 'bunx @nexuslabs/cli@alpha init',
    };
    return map[pm];
  });

  protected readonly installDepsCmd = `npm install clsx tailwind-merge class-variance-authority`;

  protected readonly tsconfigCode = `{
  "compilerOptions": {
    "paths": {
      "@/lib/*": ["src/lib/*"]
    }
  }
}`;

  protected readonly mergeClassesCode = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  protected async copyInitCmd(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.initCmd());
      this.initCopied.set(true);
      setTimeout(() => this.initCopied.set(false), 1500);
    } catch { /* ignore */ }
  }
}
