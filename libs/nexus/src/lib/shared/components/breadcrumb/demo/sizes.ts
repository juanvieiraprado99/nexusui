import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb.component';
import { BreadcrumbListComponent } from '../breadcrumb.component';
import { BreadcrumbItemComponent } from '../breadcrumb.component';
import { BreadcrumbLinkComponent } from '../breadcrumb.component';
import { BreadcrumbPageComponent } from '../breadcrumb.component';
import { BreadcrumbSeparatorComponent } from '../breadcrumb.component';

@Component({
  selector: 'demo-breadcrumb-sizes',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    BreadcrumbListComponent,
    BreadcrumbItemComponent,
    BreadcrumbLinkComponent,
    BreadcrumbPageComponent,
    BreadcrumbSeparatorComponent,
  ],
  template: `
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted-foreground">Small</span>
        <n-breadcrumb nSize="sm">
          <n-breadcrumb-list>
            <n-breadcrumb-item>
              <a n-breadcrumb-link href="#">Home</a>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <n-breadcrumb-separator>/</n-breadcrumb-separator>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <n-breadcrumb-page>Page</n-breadcrumb-page>
            </n-breadcrumb-item>
          </n-breadcrumb-list>
        </n-breadcrumb>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted-foreground">Default</span>
        <n-breadcrumb>
          <n-breadcrumb-list>
            <n-breadcrumb-item>
              <a n-breadcrumb-link href="#">Home</a>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <n-breadcrumb-separator>/</n-breadcrumb-separator>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <n-breadcrumb-page>Page</n-breadcrumb-page>
            </n-breadcrumb-item>
          </n-breadcrumb-list>
        </n-breadcrumb>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs text-muted-foreground">Large</span>
        <n-breadcrumb nSize="lg">
          <n-breadcrumb-list>
            <n-breadcrumb-item>
              <a n-breadcrumb-link href="#">Home</a>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <n-breadcrumb-separator>/</n-breadcrumb-separator>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <n-breadcrumb-page>Page</n-breadcrumb-page>
            </n-breadcrumb-item>
          </n-breadcrumb-list>
        </n-breadcrumb>
      </div>
    </div>
  `,
})
export class BreadcrumbSizesDemo {}
