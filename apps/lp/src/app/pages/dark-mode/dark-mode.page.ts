import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { DarkModeService } from 'nexus';
import { DocsLayoutComponent } from '../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';
import { ButtonComponent } from '../../shared/components/button';
import { AlertComponent } from '../../shared/components/alert';
import { BadgeComponent } from '../../shared/components/badge';

@Component({
  selector: 'app-dark-mode-page',
  imports: [DocsLayoutComponent, CodeBlockComponent, ButtonComponent, AlertComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">

        <header class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight">Dark Mode</h1>
          <p class="mt-1 text-muted-foreground">
            Adding dark mode support to your nexus-ui components.
          </p>
        </header>

        <!-- How it works -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">How it works</h2>
          <p class="text-sm text-muted-foreground leading-relaxed mb-3">
            nexus-ui uses a <strong class="text-foreground">class-based</strong> dark mode strategy.
            When the <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">dark</code> class
            is present on <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">document.documentElement</code>,
            all components automatically switch to their dark variant.
          </p>
          <p class="text-sm text-muted-foreground leading-relaxed mb-3">
            Tailwind's custom variant in <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">styles.css</code>
            scopes the <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">dark:</code> prefix
            to any element that is a descendant of a <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">.dark</code> ancestor,
            which means dark mode can also be scoped to a subtree — not just the entire page.
          </p>
          <p class="text-sm text-muted-foreground leading-relaxed">
            The included <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">DarkModeService</code>
            manages the toggle, persists the preference to
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">localStorage</code>
            under the key <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">nexus-theme</code>,
            and supports <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">light</code>,
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">dark</code>, and
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">system</code> (follows OS preference).
          </p>
        </section>

        <!-- Interactive Demo -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-1">Interactive demo</h2>
          <p class="text-sm text-muted-foreground mb-4">
            This preview is scoped — toggling it does not affect the rest of the page.
          </p>

          <div class="rounded-xl border border-border/60 overflow-hidden">
            <!-- toolbar -->
            <div class="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2.5">
              <span class="text-xs text-muted-foreground font-mono">preview</span>
              <button
                n-button
                nVariant="outline"
                nSize="sm"
                [attr.aria-pressed]="demoIsDark()"
                aria-label="Toggle dark mode preview"
                (nClick)="demoIsDark.update(v => !v)"
              >
                @if (demoIsDark()) {
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                  Light
                } @else {
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  Dark
                }
              </button>
            </div>

            <!-- scoped preview -->
            <div [class]="demoIsDark() ? 'dark' : 'force-light'">
              <div class="bg-background text-foreground p-8 flex items-center justify-center min-h-72">
                <div class="w-full max-w-sm space-y-3">
                  <!-- header -->
                  <div class="flex items-center justify-between mb-1">
                    <h3 class="text-sm font-semibold text-foreground">Notifications</h3>
                    <n-badge nVariant="secondary">3 new</n-badge>
                  </div>

                  <!-- alerts as notifications -->
                  <n-alert
                    nType="success"
                    nTitle="Deployment successful"
                    nDescription="v2.4.1 is now live in production."
                    [nDismissible]="true"
                  />
                  <n-alert
                    nType="warning"
                    nTitle="Storage at 85%"
                    nDescription="Consider upgrading your plan soon."
                    [nDismissible]="true"
                  />
                  <n-alert
                    nType="destructive"
                    nTitle="Payment failed"
                    nDescription="Your card ending in 4242 was declined."
                    [nDismissible]="true"
                  />

                  <!-- actions -->
                  <div class="flex gap-2 pt-1">
                    <button n-button nVariant="default" nSize="sm" class="flex-1">Mark all read</button>
                    <button n-button nVariant="outline" nSize="sm" class="flex-1">Dismiss all</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">Usage in components</h2>
          <p class="text-sm text-muted-foreground mb-4">
            Inject <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">DarkModeService</code>
            wherever you need to read or toggle the theme.
          </p>
          <app-code-block [code]="usageCode" language="ts" filename="header.component.ts" />
        </section>

        <!-- Tailwind config -->
        <section class="mb-10">
          <h2 class="text-xl font-semibold mb-3">Tailwind custom variant</h2>
          <p class="text-sm text-muted-foreground mb-4">
            The <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">dark:</code> prefix works
            because of this single line in <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">styles.css</code>.
            It means: apply the style when the element has a
            <code class="font-mono text-xs bg-muted px-1 py-0.5 rounded">.dark</code> ancestor —
            enabling scoped dark mode in isolated subtrees.
          </p>
          <app-code-block [code]="tailwindVariantCode" language="css" filename="styles.css" />
        </section>

      </article>
    </app-docs-layout>
  `,
})
export class DarkModePage {
  private readonly darkMode = inject(DarkModeService);

  protected readonly demoIsDark = signal(this.darkMode.isDark());

  protected readonly usageCode = `import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DarkModeService } from '@/lib/services/dark-mode.service';
import { ButtonComponent } from '@/lib/components/button';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button
      n-button
      nVariant="ghost"
      nSize="icon"
      [attr.aria-label]="darkMode.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      (nClick)="darkMode.toggle()"
    >
      @if (darkMode.isDark()) {
        <!-- sun icon -->
      } @else {
        <!-- moon icon -->
      }
    </button>
  \`,
})
export class HeaderComponent {
  protected readonly darkMode = inject(DarkModeService);
}`;

  protected readonly tailwindVariantCode = `/* styles.css */
@custom-variant dark (&:is(.dark *));`;
}
