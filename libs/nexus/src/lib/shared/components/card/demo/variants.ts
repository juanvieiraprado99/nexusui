import { Component } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
} from '../card.component';

@Component({
  selector: 'demo-card-variants',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
  ],
  template: `
    <div class="grid grid-cols-2 gap-4 w-full max-w-2xl">
      @for (variant of variants; track variant.value) {
        <n-card [nVariant]="variant.value" nClass="w-full">
          <n-card-header>
            <n-card-title>{{ variant.name }}</n-card-title>
            <n-card-description>nVariant="{{ variant.value }}"</n-card-description>
          </n-card-header>
          <n-card-content>
            <p class="text-sm text-muted-foreground">
              Exemplo do estilo {{ variant.name.toLowerCase() }}.
            </p>
          </n-card-content>
        </n-card>
      }
    </div>
  `,
})
export class CardDemoVariants {
  readonly variants = [
    { name: 'Default',  value: 'default'  as const },
    { name: 'Elevated', value: 'elevated' as const },
    { name: 'Filled',   value: 'filled'   as const },
    { name: 'Ghost',    value: 'ghost'    as const },
  ];
}
