# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This App Is

`apps/lp` is the showcase/landing page for the **nexus-ui** component library. Each component in `libs/nexus` gets a dedicated showcase page here. This app is separate from `apps/web` (the SSR docs site).

## Commands

Run from `apps/lp/` or use the Nx target from the monorepo root.

```bash
# From apps/lp/
npm start          # dev server on :4200
npm run build      # production build
npm run watch      # build --watch dev

# From monorepo root
npx nx serve lp
```

## Architecture

- Angular 21 standalone components, `OnPush` everywhere, no modules
- Routes: `/` (home), `/components` (index grid), `/components/{name}` (showcase pages) — all lazy-loaded
- Responsive 3-column layout: sidebar nav | content | right aside

## Adding a New Component Showcase

This is the primary task in this app. Four touch points every time:

1. **Create page** — `apps/lp/src/app/pages/components/{name}/{name}-doc.page.ts`
2. **Add route** — lazy import in `apps/lp/src/app/app.routes.ts`
3. **Add nav entry** — push to `sections[1].items` in `apps/lp/src/app/shared/layout/sidebar-nav.component.ts`
4. **Add index card** — add component card to `apps/lp/src/app/pages/components/components-index.page.ts`

## Showcase Page Structure

Every showcase page follows this pattern:

```typescript
@Component({
  selector: 'app-{name}-doc-page',
  imports: [
    {ComponentClass},      // the nexus component being showcased
    DocsLayoutComponent,   // wraps the whole page
    ExampleComponent,      // preview + code tabs for each demo
    CodeBlockComponent,    // standalone code display (usage/install sections)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-docs-layout>
      <article class="max-w-3xl">
        <!-- 1. Header: title + description -->
        <!-- 2. Default example -->
        <!-- 3. Variant examples -->
        <!-- 4. Installation: CLI tab / Manual tab -->
        <!-- 5. Usage code block -->
        <!-- 6. API reference table -->
      </article>
    </app-docs-layout>
  `
})
export class {Name}DocPageComponent {
  // Code strings for each example
  protected readonly defaultCode = `...`;
  protected readonly variantsCode = `...`;

  // State (if needed for interactive demos)
  protected readonly count = signal(0);
}
```

**Each demo variant** uses `<app-example>`:
```html
<app-example title="Sizes" [code]="sizesCode">
  <!-- actual rendered component goes here -->
  <button n-button nSize="sm">Small</button>
  <button n-button>Default</button>
</app-example>
```

**Installation section** — always two tabs: CLI (`npx @nexuslabs/cli@alpha add {name}`) and Manual (paste component source).

**API table** — `@for` loop over a typed array:
```typescript
protected readonly apiRows = [
  { prop: 'nVariant', type: '"default" | "destructive"', default: '"default"', description: '...' },
];
```

## Key Shared Components

| Component | Path | Purpose |
|-----------|------|---------|
| `DocsLayoutComponent` | `shared/layout/docs-layout.component.ts` | 3-col grid wrapper for every doc page |
| `ExampleComponent` | `shared/components/example/example.component.ts` | Preview/Code tab toggle. Inputs: `code` (required), `title`, `language` |
| `CodeBlockComponent` | `shared/components/code-block/code-block.component.ts` | Code display with copy button. Inputs: `code`, `language`, `filename` |
| `SidebarNavComponent` | `shared/layout/sidebar-nav.component.ts` | Hardcoded `sections` array — edit directly to add nav links |

## Conventions

- Selector prefix: `n-` (e.g., `n-button`, `button[n-button]`)
- Input prefix: `n` (e.g., `nVariant`, `nSize`, `nClass`)
- Code example strings are `protected readonly` class properties, not separate files
- Use `@for` and `@if` (Angular 17+ control flow), not `*ngFor` / `*ngIf`
- Sidebar nav items support `badge: 'new' | 'soon'` and `disabled: true`
