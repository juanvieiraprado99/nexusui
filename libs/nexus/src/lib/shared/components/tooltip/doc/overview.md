# Tooltip

Displays a short text label when the user hovers or focuses an element. Built on Angular CDK Overlay with automatic flip to stay in the viewport.

## Usage

```ts
import { TooltipDirective } from '@/components/tooltip';
```

```html
<!-- String content -->
<button [nTooltip]="'Save changes'">Save</button>

<!-- Or shorthand for static strings -->
<button nTooltip="Save changes">Save</button>

<!-- TemplateRef for rich content -->
<ng-template #tip>
  <span class="flex items-center gap-1">
    <lucide-icon name="info" size="12" />
    Requires admin
  </span>
</ng-template>
<button [nTooltip]="tip">Admin action</button>
```

## Positioning

```html
<button nTooltip="Hello" nTooltipSide="right" nTooltipAlign="start">Hover me</button>
```

## Keyboard behavior

- **Hover** — shows after `nTooltipDelay` ms (default 700 ms)
- **Focus** — shows immediately (no delay)
- **Escape / blur** — dismisses immediately

The tooltip is not interactive — it has no focus trap and does not block pointer events.

## Accessibility

The directive sets `aria-describedby` on the host element pointing to the tooltip `id` while it is visible, satisfying WCAG 1.3.1.
