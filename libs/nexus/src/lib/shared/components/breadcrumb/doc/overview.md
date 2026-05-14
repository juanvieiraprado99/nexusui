# Breadcrumb

A navigation breadcrumb component for displaying the current page hierarchy.

## Usage

```typescript
import {
  NBreadcrumbComponent,
  NBreadcrumbListComponent,
  NBreadcrumbItemComponent,
  NBreadcrumbLinkComponent,
  NBreadcrumbSeparatorComponent,
  NBreadcrumbPageComponent,
} from '@/shared/components/breadcrumb';

@Component({
  imports: [
    NBreadcrumbComponent,
    NBreadcrumbListComponent,
    NBreadcrumbItemComponent,
    NBreadcrumbLinkComponent,
    NBreadcrumbSeparatorComponent,
    NBreadcrumbPageComponent,
  ],
  template: `
    <n-breadcrumb>
      <n-breadcrumb-list>
        <n-breadcrumb-item>
          <n-breadcrumb-link href="/">Home</n-breadcrumb-link>
        </n-breadcrumb-item>
        <n-breadcrumb-separator />
        <n-breadcrumb-item>
          <n-breadcrumb-link href="/components">Components</n-breadcrumb-link>
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
