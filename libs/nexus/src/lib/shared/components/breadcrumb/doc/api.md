# Breadcrumb API

## Components

| Component | Selector | Description |
|-----------|----------|-------------|
| `BreadcrumbComponent` | `n-breadcrumb` | Root wrapper (`role="navigation"`, `aria-label`) |
| `BreadcrumbListComponent` | `n-breadcrumb-list` | List of items (`role="list"`) |
| `BreadcrumbItemComponent` | `n-breadcrumb-item` | Single item wrapper (`role="listitem"`) |
| `BreadcrumbLinkComponent` | `n-breadcrumb-link`, `a[n-breadcrumb-link]` | Navigable link |
| `BreadcrumbPageComponent` | `n-breadcrumb-page` | Current page (non-navigable, `aria-current="page"`) |
| `BreadcrumbSeparatorComponent` | `n-breadcrumb-separator` | Separator between items — sibling of items, not inside one (default: chevron) |
| `BreadcrumbEllipsisComponent` | `n-breadcrumb-ellipsis` | Collapsed items indicator (`…`) |

## BreadcrumbComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Font size applied to the breadcrumb trail |
| `nAriaLabel` | `string` | `'breadcrumb'` | Accessible label for the nav element |
| `nClass` | `string` | `''` | Additional CSS classes on the root |

## BreadcrumbLinkComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nDisabled` | `boolean` | `false` | Marks the link non-interactive (`aria-disabled`, `tabindex="-1"`) |
| `nClass` | `string` | `''` | Additional CSS classes |

## BreadcrumbEllipsisComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nSrLabel` | `string` | `'More pages'` | Screen-reader text announced for the collapsed items |
| `nClass` | `string` | `''` | Additional CSS classes |

## BreadcrumbListComponent / BreadcrumbItemComponent / BreadcrumbPageComponent / BreadcrumbSeparatorComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nClass` | `string` | `''` | Additional CSS classes |
