import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { AvatarComponent, AvatarGroupComponent, type AvatarGroupItem } from '../../../shared/components/avatar';
import { DocsLayoutComponent } from '../../../shared/layout/docs-layout.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { ExampleComponent } from '../../../shared/components/example/example.component';

interface ApiRow {
  prop: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'app-avatar-doc-page',
  imports: [AvatarComponent, AvatarGroupComponent, DocsLayoutComponent, CodeBlockComponent, ExampleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <header>
          <p class="text-xs uppercase tracking-wide text-muted-foreground">Components</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Avatar</h1>
          <p class="mt-2 text-muted-foreground">An image element with a fallback for representing the user.</p>
        </header>

        <div class="mt-8">
          <app-example title="Default" [code]="defaultCode">
            <div class="flex items-center gap-4">
              <n-avatar nName="João Prado" />
              <n-avatar nName="Maria Silva" />
              <n-avatar nName="Pedro Santos" />
              <n-avatar />
            </div>
          </app-example>
        </div>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Installation</h2>
          <div class="mt-3 rounded-lg border border-border/60 bg-card overflow-hidden">
            <div role="tablist" aria-label="Installation method" class="flex items-center gap-1 border-b border-border/60 px-2 py-1.5">
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'cli'"
                (click)="installTab.set('cli')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'cli'"
                [class.text-foreground]="installTab() === 'cli'"
                [class.text-muted-foreground]="installTab() !== 'cli'"
              >CLI</button>
              <button
                role="tab"
                type="button"
                [attr.aria-selected]="installTab() === 'manual'"
                (click)="installTab.set('manual')"
                class="rounded-md px-3 py-1 text-xs font-medium transition-colors"
                [class.bg-muted]="installTab() === 'manual'"
                [class.text-foreground]="installTab() === 'manual'"
                [class.text-muted-foreground]="installTab() !== 'manual'"
              >Manual</button>
            </div>
            <div class="p-4">
              @if (installTab() === 'cli') {
                <app-code-block code="npx @nexuslabs/cli add avatar" language="bash" />
              } @else {
                <ol class="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Install runtime dependencies:
                    <div class="mt-2 ml-5">
                      <app-code-block code="npm install class-variance-authority clsx tailwind-merge" language="bash" />
                    </div>
                  </li>
                  <li class="pt-3">Copy <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">avatar.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">avatar-group.component.ts</code>, <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">avatar.variants.ts</code>, and <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">index.ts</code> into <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/components/avatar/</code>.</li>
                  <li class="pt-3">Ensure <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">mergeClasses</code> util exists at <code class="rounded bg-muted px-1 py-0.5 text-xs text-foreground font-mono">src/app/shared/utils/merge-classes.ts</code>.</li>
                </ol>
              }
            </div>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Usage</h2>
          <div class="mt-3 space-y-3">
            <app-code-block [code]="importCode" language="ts" filename="my-page.component.ts" />
            <app-code-block [code]="usageCode" language="html" />
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">Examples</h2>

          <h3 class="mt-6 text-sm font-medium text-muted-foreground">Sizes</h3>
          <div class="mt-3">
            <app-example title="nSize: xs | sm | default | lg | xl" [code]="sizesCode">
              <div class="flex items-end gap-4">
                <n-avatar nName="João Prado" nSize="xs" />
                <n-avatar nName="João Prado" nSize="sm" />
                <n-avatar nName="João Prado" />
                <n-avatar nName="João Prado" nSize="lg" />
                <n-avatar nName="João Prado" nSize="xl" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Shapes</h3>
          <div class="mt-3">
            <app-example title="nShape: circle | square" [code]="shapesCode">
              <div class="flex items-center gap-4">
                <n-avatar nName="João Prado" nShape="circle" />
                <n-avatar nName="Maria Silva" nShape="square" />
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Status</h3>
          <div class="mt-3">
            <app-example title="Status indicator" [code]="statusCode">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <n-avatar nName="João Prado" />
                  <span class="absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-background" role="img" aria-label="Online"></span>
                </div>
                <div class="relative">
                  <n-avatar nName="Maria Silva" />
                  <span class="absolute right-0 bottom-0 size-3 rounded-full bg-amber-400 ring-2 ring-background" role="img" aria-label="Ausente"></span>
                </div>
                <div class="relative">
                  <n-avatar nName="Pedro Santos" />
                  <span class="absolute right-0 bottom-0 size-3 rounded-full bg-red-500 ring-2 ring-background" role="img" aria-label="Ocupado"></span>
                </div>
                <div class="relative">
                  <n-avatar nName="Ana Lima" />
                  <span class="absolute right-0 bottom-0 size-3 rounded-full bg-zinc-400 ring-2 ring-background" role="img" aria-label="Offline"></span>
                </div>
              </div>
            </app-example>
          </div>

          <h3 class="mt-8 text-sm font-medium text-muted-foreground">Group</h3>
          <div class="mt-3 space-y-4">
            <app-example title="Default group" [code]="groupCode">
              <n-avatar-group [nItems]="members" nAriaLabel="Membros da equipe" />
            </app-example>

            <app-example title="Max 3 visible" [code]="groupMaxCode">
              <n-avatar-group [nItems]="members" [nMax]="3" nAriaLabel="Membros (máximo 3)" />
            </app-example>

            <app-example title="Small size" [code]="groupSmCode">
              <n-avatar-group [nItems]="members" nSize="sm" nAriaLabel="Membros pequenos" />
            </app-example>

            <app-example title="Square shape" [code]="groupSquareCode">
              <n-avatar-group [nItems]="members" nShape="square" nAriaLabel="Membros quadrados" />
            </app-example>
          </div>
        </section>

        <section class="mt-12">
          <h2 class="text-xl font-semibold tracking-tight">API Reference</h2>

          <h3 class="mt-4 text-sm font-medium">n-avatar</h3>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Prop</th>
                  <th class="px-4 py-2 text-left font-medium">Type</th>
                  <th class="px-4 py-2 text-left font-medium">Default</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of avatarApiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <h3 class="mt-8 text-sm font-medium">n-avatar-group</h3>
          <div class="mt-3 overflow-x-auto rounded-lg border border-border/60">
            <table class="w-full text-sm">
              <thead class="bg-muted/40 text-muted-foreground">
                <tr>
                  <th class="px-4 py-2 text-left font-medium">Prop</th>
                  <th class="px-4 py-2 text-left font-medium">Type</th>
                  <th class="px-4 py-2 text-left font-medium">Default</th>
                  <th class="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                @for (row of groupApiRows; track row.prop) {
                  <tr class="border-t border-border/60">
                    <td class="px-4 py-2 font-mono text-xs text-foreground">{{ row.prop }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.type }}</td>
                    <td class="px-4 py-2 font-mono text-xs text-muted-foreground">{{ row.default }}</td>
                    <td class="px-4 py-2 text-muted-foreground">{{ row.description }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </app-docs-layout>
  `,
})
export class AvatarDocPage {
  protected readonly installTab = signal<'cli' | 'manual'>('cli');

  readonly members: AvatarGroupItem[] = [
    { name: 'João Prado',   status: 'online' },
    { name: 'Maria Silva',  status: 'away' },
    { name: 'Pedro Santos', status: 'busy' },
    { name: 'Ana Lima',     status: 'offline' },
    { name: 'Carlos Melo',  status: 'online' },
    { name: 'Laura Costa' },
  ];

  protected readonly defaultCode = `<n-avatar nName="João Prado" />
<n-avatar nName="Maria Silva" />
<n-avatar />`;

  protected readonly sizesCode = `<n-avatar nName="João Prado" nSize="xs" />
<n-avatar nName="João Prado" nSize="sm" />
<n-avatar nName="João Prado" />
<n-avatar nName="João Prado" nSize="lg" />
<n-avatar nName="João Prado" nSize="xl" />`;

  protected readonly shapesCode = `<n-avatar nName="João Prado" nShape="circle" />
<n-avatar nName="Maria Silva" nShape="square" />`;

  protected readonly statusCode = `<div class="relative">
  <n-avatar nName="João Prado" />
  <span class="absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-background"
        role="img" aria-label="Online"></span>
</div>`;

  protected readonly groupCode = `members: AvatarGroupItem[] = [
  { name: 'João Prado',   status: 'online' },
  { name: 'Maria Silva',  status: 'away' },
  { name: 'Pedro Santos', status: 'busy' },
  { name: 'Ana Lima',     status: 'offline' },
  { name: 'Carlos Melo',  status: 'online' },
  { name: 'Laura Costa' },
];
// template
<n-avatar-group [nItems]="members" />`;

  protected readonly groupMaxCode = `<n-avatar-group [nItems]="members" [nMax]="3" />`;
  protected readonly groupSmCode  = `<n-avatar-group [nItems]="members" nSize="sm" />`;
  protected readonly groupSquareCode = `<n-avatar-group [nItems]="members" nShape="square" />`;

  protected readonly importCode = `import { Component } from '@angular/core';
import { AvatarComponent, AvatarGroupComponent } from './shared/components/avatar';

@Component({
  selector: 'app-my-page',
  imports: [AvatarComponent, AvatarGroupComponent],
  template: \`<n-avatar nName="João Prado" />\`,
})
export class MyPage {}`;

  protected readonly usageCode = `<n-avatar nName="João Prado" nSize="default" nShape="circle" />`;

  protected readonly avatarApiRows: ApiRow[] = [
    { prop: 'nSrc',       type: 'string',                                      default: "''",        description: 'Image URL. Falls back to initials if empty or on error.' },
    { prop: 'nName',      type: 'string',                                      default: "''",        description: 'Full name used to generate initials and a deterministic background color.' },
    { prop: 'nSize',      type: "'xs' | 'sm' | 'default' | 'lg' | 'xl'",      default: "'default'", description: 'Size of the avatar.' },
    { prop: 'nShape',     type: "'circle' | 'square'",                         default: "'circle'",  description: 'Shape of the avatar.' },
    { prop: 'nClass',     type: 'string',                                      default: "''",        description: 'Extra Tailwind classes appended to the host.' },
    { prop: 'nAriaLabel', type: 'string',                                      default: "''",        description: 'Accessible label. Defaults to "Avatar de {name}" when nName is set.' },
  ];

  protected readonly groupApiRows: ApiRow[] = [
    { prop: 'nItems',     type: 'AvatarGroupItem[]',                           default: '[]',        description: 'Array of avatar items. Each may have src, name, and status.' },
    { prop: 'nMax',       type: 'number',                                      default: '5',         description: 'Maximum visible avatars before overflow counter appears.' },
    { prop: 'nSize',      type: "'xs' | 'sm' | 'default' | 'lg' | 'xl'",      default: "'default'", description: 'Size applied to all avatars in the group.' },
    { prop: 'nShape',     type: "'circle' | 'square'",                         default: "'circle'",  description: 'Shape applied to all avatars in the group.' },
    { prop: 'nClass',     type: 'string',                                      default: "''",        description: 'Extra Tailwind classes appended to the host.' },
    { prop: 'nAriaLabel', type: 'string',                                      default: "'Grupo de avatares'", description: 'Accessible label for the group.' },
  ];
}
