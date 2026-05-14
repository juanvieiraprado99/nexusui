# Card

Container visual para agrupar informações relacionadas. Composto por sub-componentes independentes que se encaixam livremente.

## Uso

```ts
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
  CardFooterComponent,
} from '@/shared/components/card';
```

```html
<n-card>
  <n-card-header>
    <n-card-title>Título</n-card-title>
    <n-card-description>Descrição opcional</n-card-description>
  </n-card-header>
  <n-card-content>
    <p>Conteúdo principal.</p>
  </n-card-content>
  <n-card-footer>
    <button n-button>Ação</button>
  </n-card-footer>
</n-card>
```

## Exemplos

### Variants

```html
<n-card nVariant="default">...</n-card>
<n-card nVariant="elevated">...</n-card>
<n-card nVariant="filled">...</n-card>
<n-card nVariant="ghost">...</n-card>
```

### Tamanhos

```html
<n-card nSize="sm">...</n-card>
<n-card nSize="default">...</n-card>
<n-card nSize="lg">...</n-card>
```

### Card clicável / selecionável

Ideal para seletores de plano, grade de opções ou qualquer card interativo.

```html
<n-card
  [nClickable]="true"
  [nSelected]="selectedId === item.id"
  (nClick)="select(item.id)"
>
  ...
</n-card>
```

### Estado de carregamento

Exibe um overlay animado sobre o conteúdo existente enquanto dados são buscados.

```html
<n-card [nLoading]="isLoading">
  ...
</n-card>
```

### Customização via data-slot

```html
<n-card nClass="[&_[data-slot=card-header]]:border-b [&_[data-slot=card-header]]:mb-4">
  ...
</n-card>
```
