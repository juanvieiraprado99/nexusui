# Breadcrumb API

## Components

| Component | Selector | Description |
|-----------|----------|-------------|
| `NBreadcrumbComponent` | `n-breadcrumb` | Root wrapper (`<nav aria-label="breadcrumb">`) |
| `NBreadcrumbListComponent` | `n-breadcrumb-list` | Ordered list of items (`<ol>`) |
| `NBreadcrumbItemComponent` | `n-breadcrumb-item` | Single item wrapper (`<li>`) |
| `NBreadcrumbLinkComponent` | `n-breadcrumb-link` | Navigable link (`<a>`) |
| `NBreadcrumbPageComponent` | `n-breadcrumb-page` | Current page (non-navigable, `aria-current="page"`) |
| `NBreadcrumbSeparatorComponent` | `n-breadcrumb-separator` | Separator between items (default: `/`) |
| `NBreadcrumbEllipsisComponent` | `n-breadcrumb-ellipsis` | Collapsed items indicator (`…`) |

## NBreadcrumbLinkComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `href` | `string` | `''` | Navigation target URL |
| `nClass` | `string` | `''` | Additional CSS classes |

## NBreadcrumbComponent Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `nClass` | `string` | `''` | Additional CSS classes |
