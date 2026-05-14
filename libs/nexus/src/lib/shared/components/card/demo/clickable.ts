import { Component, signal } from '@angular/core';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
} from '../card.component';

@Component({
  selector: 'demo-card-clickable',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
  ],
  template: `
    <div class="flex flex-col gap-3 w-80">
      <p class="text-sm text-muted-foreground">
        Selecionado: <strong>{{ selected() ?? 'nenhum' }}</strong>
      </p>
      @for (plan of plans; track plan.id) {
        <n-card
          [nClickable]="true"
          [nSelected]="selected() === plan.id"
          (nClick)="selected.set(plan.id)"
          nClass="w-full"
        >
          <n-card-header nClass="pb-0">
            <n-card-title>{{ plan.name }}</n-card-title>
            <n-card-description>{{ plan.description }}</n-card-description>
          </n-card-header>
        </n-card>
      }
    </div>
  `,
})
export class CardDemoClickable {
  readonly selected = signal<string | null>(null);

  readonly plans = [
    { id: 'free',       name: 'Gratuito',   description: 'Para uso pessoal e projetos pequenos' },
    { id: 'pro',        name: 'Pro',        description: 'Para times e projetos em crescimento' },
    { id: 'enterprise', name: 'Enterprise', description: 'Para grandes organizações' },
  ];
}
