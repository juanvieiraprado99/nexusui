# Breadcrumb

A navigation breadcrumb component for displaying the current page hierarchy.

## Usage

```typescript
import {
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbSeparatorComponent,
  BreadcrumbPageComponent,
} from '@/shared/components/breadcrumb';

@Component({
  imports: [
    BreadcrumbComponent,
    BreadcrumbListComponent,
    BreadcrumbItemComponent,
    BreadcrumbLinkComponent,
    BreadcrumbSeparatorComponent,
    BreadcrumbPageComponent,
  ],
  template: `
    <n-breadcrumb>
      <n-breadcrumb-list>
        <n-breadcrumb-item>
          <a n-breadcrumb-link href="/">Home</a>
        </n-breadcrumb-item>
        <n-breadcrumb-separator />
        <n-breadcrumb-item>
          <a n-breadcrumb-link href="/components">Components</a>
        </n-breadcrumb-item>
        <n-breadcrumb-separator />
        <n-breadcrumb-item>
          <n-breadcrumb-page>Breadcrumb</n-breadcrumb-page>
        </n-breadcrumb-item>
      </n-breadcrumb-list>
    </n-breadcrumb>
  `
})
export class MyComponent {}
```

> Place `<n-breadcrumb-separator>` as a direct child of `<n-breadcrumb-list>`, **not** inside an
> `<n-breadcrumb-item>` — the separator is decorative (`role="presentation"`, `aria-hidden`) and
> should not be announced as a list item. Leave it empty for the default chevron, or project text
> (e.g. `›`) / an icon to override it.
