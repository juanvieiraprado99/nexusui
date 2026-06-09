import { Component } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
} from '../card.component';

@Component({
  selector: 'demo-card-sizes',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
  ],
  template: `
    <div class="flex flex-col gap-3 w-80">
      @for (s of sizes; track s) {
        <n-card [nSize]="s">
          <n-card-header nClass="pb-0">
            <n-card-title nClass="text-sm">nSize="{{ s }}"</n-card-title>
            <n-card-description>Padding {{ s }}</n-card-description>
          </n-card-header>
        </n-card>
      }
    </div>
  `,
})
export class CardDemoSizes {
  readonly sizes = ['sm', 'default', 'lg'] as const;
}
