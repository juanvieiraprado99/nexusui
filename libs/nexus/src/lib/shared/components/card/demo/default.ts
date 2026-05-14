import { Component } from '@angular/core';
import { ButtonComponent } from '../../button';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
} from '../card.component';

@Component({
  selector: 'demo-card-default',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    ButtonComponent,
  ],
  template: `
    <n-card nClass="w-80">
      <n-card-header>
        <n-card-title>Notificações</n-card-title>
        <n-card-description>Você tem 3 mensagens não lidas.</n-card-description>
      </n-card-header>
      <n-card-content>
        <p class="text-sm text-muted-foreground">
          Configure como deseja receber suas notificações.
        </p>
      </n-card-content>
      <n-card-footer>
        <button n-button nVariant="default" nSize="sm">Configurar</button>
        <button n-button nVariant="outline" nSize="sm">Ignorar</button>
      </n-card-footer>
    </n-card>
  `,
})
export class CardDemoDefault {}
