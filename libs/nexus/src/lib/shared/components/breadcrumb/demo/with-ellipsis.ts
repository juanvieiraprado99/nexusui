import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb.component';
import { BreadcrumbListComponent } from '../breadcrumb.component';
import { BreadcrumbItemComponent } from '../breadcrumb.component';
import { BreadcrumbLinkComponent } from '../breadcrumb.component';
import { BreadcrumbPageComponent } from '../breadcrumb.component';
import { BreadcrumbSeparatorComponent } from '../breadcrumb.component';
import { BreadcrumbEllipsisComponent } from '../breadcrumb.component';

@Component({
  selector: 'demo-breadcrumb-with-ellipsis',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    BreadcrumbListComponent,
    BreadcrumbItemComponent,
    BreadcrumbLinkComponent,
    BreadcrumbPageComponent,
    BreadcrumbSeparatorComponent,
    BreadcrumbEllipsisComponent,
  ],
  template: `
    <n-breadcrumb>
      <n-breadcrumb-list>
        <n-breadcrumb-item>
          <a n-breadcrumb-link href="#">Home</a>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-breadcrumb-separator>/</n-breadcrumb-separator>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-breadcrumb-ellipsis />
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-breadcrumb-separator>/</n-breadcrumb-separator>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <a n-breadcrumb-link href="#">Category</a>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-breadcrumb-separator>/</n-breadcrumb-separator>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
          <n-breadcrumb-page>Item</n-breadcrumb-page>
        </n-breadcrumb-item>
      </n-breadcrumb-list>
    </n-breadcrumb>
  `,
})
export class BreadcrumbWithEllipsisDemo {}
