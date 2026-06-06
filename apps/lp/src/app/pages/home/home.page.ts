import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button';
import { InputComponent } from '../../shared/components/input';
import { CheckboxComponent } from '../../shared/components/checkbox';
import { SelectComponent, SelectItemComponent } from '../../shared/components/select';
import { SkeletonComponent } from '../../shared/components/skeleton';

@Component({
  selector: 'app-home-page',
  imports: [ButtonComponent, RouterLink, InputComponent, CheckboxComponent, SelectComponent, SelectItemComponent, SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style="background-image: radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 60%)"
        aria-hidden="true"
      ></div>

      <div class="mx-auto flex max-w-3xl flex-col items-center px-6 pt-24 pb-20 text-center">
        <a routerLink="/components" class="group mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur transition-colors hover:bg-card">
          New preset commands
          <svg class="transition-transform group-hover:translate-x-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
        <h1 class="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          The Foundation for your <span class="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">Design System</span>
        </h1>
        <p class="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          A set of beautifully designed Angular components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.
        </p>
        <div class="mt-7 flex items-center gap-3">
          <a n-button routerLink="/get-started">Get Started</a>
          <a n-button nVariant="ghost" routerLink="/components">View Components</a>
        </div>
      </div>

      <div class="mx-auto max-w-screen-2xl px-6 pb-20">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <!-- card 1: payment -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border">
            <h3 class="text-sm font-semibold">Payment Method</h3>
            <p class="mt-1 text-xs text-muted-foreground">All transactions are secure and encrypted.</p>
            <div class="mt-4 space-y-3 text-xs">
              <div>
                <label class="mb-1 block text-muted-foreground">Name on Card</label>
                <n-input nPlaceholder="John Doe" nSize="sm" />
              </div>
              <div class="grid grid-cols-[1fr_5rem] gap-2">
                <div>
                  <label class="mb-1 block text-muted-foreground">Card Number</label>
                  <n-input nPlaceholder="1234 5678 9012 3456" nSize="sm" />
                </div>
                <div>
                  <label class="mb-1 block text-muted-foreground">CVV</label>
                  <n-input nPlaceholder="123" nSize="sm" />
                </div>
              </div>
              <div class="flex gap-2 pt-2">
                <button n-button nSize="sm" type="button">Submit</button>
                <button n-button nSize="sm" nVariant="outline" type="button">Cancel</button>
              </div>
            </div>
          </div>

          <!-- card 2: team -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border flex flex-col">
            <div class="flex flex-col items-center text-center my-auto">
              <div class="flex -space-x-2 mb-3">
                <span class="h-8 w-8 rounded-full bg-muted border-2 border-card"></span>
                <span class="h-8 w-8 rounded-full bg-muted-foreground/40 border-2 border-card"></span>
                <span class="h-8 w-8 rounded-full bg-foreground/30 border-2 border-card"></span>
              </div>
              <h3 class="text-sm font-semibold">No Team Members</h3>
              <p class="mt-1 text-xs text-muted-foreground">Invite your team to collaborate on this project.</p>
              <button n-button nSize="sm" nVariant="outline" type="button" class="mt-4">+ Invite Members</button>
            </div>
          </div>

          <!-- card 3: settings -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border space-y-3">
            <div class="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-xs">
              <span class="text-muted-foreground">https://</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 9 22 9 17 14 18 22 12 18 6 22 7 14 2 9 9 9 12 2"/></svg>
            </div>
            <div class="flex items-center justify-between rounded-md border border-border/60 p-3">
              <div>
                <div class="text-xs font-medium">Two-factor authentication</div>
                <div class="text-[11px] text-muted-foreground">Verify via email or phone number.</div>
              </div>
              <button n-button nSize="sm" nVariant="outline" type="button">Enable</button>
            </div>
            <div class="flex items-center justify-between rounded-md border border-border/60 p-3">
              <div class="flex items-center gap-2">
                <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span class="text-xs">Your profile has been verified.</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>

          <!-- card 4: ask -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border flex flex-col">
            <button class="self-start text-xs text-muted-foreground rounded-md border border-border/60 px-2 py-1">+ Add context</button>
            <p class="mt-3 text-xs text-foreground/80">Ask, search, or make anything…</p>
            <div class="mt-auto flex items-center justify-between pt-6">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span class="rounded border border-border/60 px-2 py-0.5">Auto</span>
                <span>All Sources</span>
              </div>
              <button n-button nVariant="outline" nSize="icon" type="button" aria-label="Send" class="h-7 w-7">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              </button>
            </div>
          </div>

          <!-- card 5: input / search members -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border space-y-3">
            <h3 class="text-sm font-semibold">Search Members</h3>
            <n-input nPlaceholder="Search by name or email…" nSize="sm">
              <svg slot="prefix" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </n-input>
            <div class="space-y-2">
              <div class="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-xs">
                <div class="flex items-center gap-2">
                  <span class="h-6 w-6 rounded-full bg-muted" aria-hidden="true"></span>
                  <span>Alice Martin</span>
                </div>
                <span class="text-muted-foreground">Admin</span>
              </div>
              <div class="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-xs">
                <div class="flex items-center gap-2">
                  <span class="h-6 w-6 rounded-full bg-muted-foreground/40" aria-hidden="true"></span>
                  <span>Bob Chen</span>
                </div>
                <span class="text-muted-foreground">Member</span>
              </div>
            </div>
          </div>

          <!-- card 6: checkbox / notifications -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border space-y-3">
            <h3 class="text-sm font-semibold">Notifications</h3>
            <p class="text-xs text-muted-foreground">Choose what updates you receive.</p>
            <div class="space-y-2 pt-1">
              <n-checkbox [nChecked]="true" nLabel="Product updates" nHint="New features and improvements." />
              <n-checkbox [nChecked]="true" nLabel="Security alerts" nHint="Unusual activity on your account." />
              <n-checkbox nLabel="Marketing emails" nHint="Tips, offers, and announcements." />
            </div>
          </div>

          <!-- card 7: select / assign role -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border space-y-3">
            <h3 class="text-sm font-semibold">Assign Role</h3>
            <p class="text-xs text-muted-foreground">Set access level for this workspace member.</p>
            <n-select nPlaceholder="Select a role" nLabel="Role">
              <n-select-item nValue="owner">Owner</n-select-item>
              <n-select-item nValue="admin">Admin</n-select-item>
              <n-select-item nValue="member">Member</n-select-item>
              <n-select-item nValue="viewer">Viewer</n-select-item>
            </n-select>
            <div class="flex gap-2 pt-1">
              <button n-button nSize="sm" type="button">Save</button>
              <button n-button nSize="sm" nVariant="outline" type="button">Cancel</button>
            </div>
          </div>

          <!-- card 8: skeleton / recent activity -->
          <div class="rounded-lg border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-border space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-semibold">Recent Activity</h3>
              <n-skeleton class="h-4 w-16" />
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <n-skeleton class="h-8 w-8 shrink-0 rounded-full" />
                <div class="flex-1 space-y-1.5">
                  <n-skeleton class="h-3 w-3/4" />
                  <n-skeleton class="h-3 w-1/2" />
                </div>
              </div>
              <div class="flex items-center gap-3">
                <n-skeleton class="h-8 w-8 shrink-0 rounded-full" />
                <div class="flex-1 space-y-1.5">
                  <n-skeleton class="h-3 w-2/3" />
                  <n-skeleton class="h-3 w-2/5" />
                </div>
              </div>
              <div class="flex items-center gap-3">
                <n-skeleton class="h-8 w-8 shrink-0 rounded-full" />
                <div class="flex-1 space-y-1.5">
                  <n-skeleton class="h-3 w-1/2" />
                  <n-skeleton class="h-3 w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomePage {}
