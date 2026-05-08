# API Reference

## Inputs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nPage` | `model<number>` | `1` | Current page (two-way binding) |
| `nTotalPages` | `number` | `1` | Total number of pages |
| `nTotalItems` | `number \| null` | `null` | Total items — computes pages when set (requires `nPageSize`) |
| `nPageSize` | `model<number>` | `10` | Items per page (two-way binding) |
| `nPageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Options shown in the page size selector |
| `nSiblingCount` | `number` | `1` | Pages shown on each side of the current page |
| `nBoundaryCount` | `number` | `1` | Pages shown at start and end boundaries |
| `nShowFirstLast` | `boolean` | `true` | Show first/last page buttons |
| `nShowPageSizeSelector` | `boolean` | `false` | Show the page size dropdown |
| `nCompact` | `boolean` | `false` | Compact mode — hides page numbers, shows "X / Y" |
| `nDisabled` | `boolean` | `false` | Disables all interaction |
| `nVariant` | `'default' \| 'outline' \| 'ghost'` | `'default'` | Visual style of page buttons |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size of page buttons |
| `nClass` | `string` | `''` | Additional classes on the host element |
| `nAriaLabel` | `string` | `'Pagination'` | `aria-label` on the navigation host |

## Events (from models)

| Event | Type | Description |
|-------|------|-------------|
| `(nPageChange)` | `number` | Emitted when the page changes |
| `(nPageSizeChange)` | `number` | Emitted when the page size changes |

## Data slots

| Slot | Element | Description |
|------|---------|-------------|
| `root` | host | Navigation container |
| `nav` | `div` | Buttons wrapper |
| `page-size-selector` | `div` | Page size selector wrapper |
| `compact-info` | `span` | "X / Y" text in compact mode |
