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

`nTooltipSide` accepts the four cardinal sides (`top`, `right`, `bottom`, `left`) plus four
diagonals (`top-left`, `top-right`, `bottom-left`, `bottom-right`). Diagonals anchor the tooltip
to a corner of the host element; `nTooltipAlign` is ignored for them.

```html
<button nTooltip="Hello" nTooltipSide="right" nTooltipAlign="start">Hover me</button>
<button nTooltip="Hello" nTooltipSide="top-right">Diagonal</button>
```

## Keyboard behavior

- **Hover** — shows after `nTooltipDelay` ms (default 300 ms)
- **Focus** — shows immediately (no delay)
- **Escape / blur** — dismisses immediately

The tooltip is not interactive — it has no focus trap and does not block pointer events.

## Accessibility

The directive sets `aria-describedby` on the host element pointing to the tooltip `id` while it is visible, satisfying WCAG 1.3.1.
