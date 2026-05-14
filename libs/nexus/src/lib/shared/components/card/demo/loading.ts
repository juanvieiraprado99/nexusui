import { Component, OnInit, signal } from '@angular/core';
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
  selector: 'demo-card-loading',
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
    <n-card [nLoading]="loading()" nClass="w-80">
      <n-card-header>
        <n-card-title>Relatório Mensal</n-card-title>
        <n-card-description>Dados de maio de 2026</n-card-description>
      </n-card-header>
      <n-card-content>
        <p class="text-sm text-muted-foreground">
          R$ 12.430,00 em receita total este mês.
        </p>
      </n-card-content>
      <n-card-footer>
        <button n-button nVariant="outline" nSize="sm" (click)="reload()">
          {{ loading() ? 'Carregando...' : 'Recarregar' }}
        </button>
      </n-card-footer>
    </n-card>
  `,
})
export class CardDemoLoading implements OnInit {
  readonly loading = signal(true);

  private _timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this._timer = setTimeout(() => this.loading.set(false), 2000);
  }

  reload(): void {
    if (this._timer) clearTimeout(this._timer);
    this.loading.set(true);
    this._timer = setTimeout(() => this.loading.set(false), 2000);
  }
}
