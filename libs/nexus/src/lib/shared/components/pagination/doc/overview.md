# Pagination

Navigation component for paginated data. Supports smart page truncation with ellipsis, first/last buttons, compact mode, and an integrated page size selector.

## Usage

```typescript
import { PaginationComponent } from '@/components/pagination';
```

```html
<n-pagination [nTotalPages]="20" [(nPage)]="page" />
```

### Using total items instead of total pages

```html
<n-pagination [nTotalItems]="243" [nPageSize]="10" [(nPage)]="page" />
```

### With page size selector

```html
<n-pagination
  [nTotalItems]="500"
  [(nPage)]="page"
  [(nPageSize)]="pageSize"
  [nShowPageSizeSelector]="true"
  [nPageSizeOptions]="[10, 25, 50, 100]" />
```

### Compact mode

```html
<n-pagination [nTotalPages]="50" [(nPage)]="page" [nCompact]="true" />
```

## Page truncation algorithm

Given `nSiblingCount=1` and `nBoundaryCount=1`, page 7 of 20 renders as:

```
1  …  6  7  8  …  20
```

Increase `nSiblingCount` to show more pages around the current page. Increase `nBoundaryCount` to show more pages at the start and end.
