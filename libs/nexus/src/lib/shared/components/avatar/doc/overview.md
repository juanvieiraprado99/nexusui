# Avatar

Exibe foto de perfil com fallback automático para iniciais (geração de cor determinística por nome) ou ícone padrão. Suporta indicador de status e agrupamento com overflow.

## Usage

```ts
import { AvatarComponent, AvatarGroupComponent } from '@/shared/components/avatar';
```

```html
<n-avatar nSrc="https://..." nName="João Prado" />
```

> **Nota:** O componente usa `NgOptimizedImage` internamente. Para imagens de domínios externos, configure um loader de imagem no seu `app.config.ts` (ex.: `provideImgixLoader`, `provideCloudflareLoader`) ou garanta que as URLs sejam absolutas.

## Examples

### Com imagem e fallback

```html
<!-- imagem carregada -->
<n-avatar nSrc="https://github.com/shadcn.png" nName="shadcn" />

<!-- fallback com iniciais (cor gerada pelo nome) -->
<n-avatar nName="João Prado" />

<!-- fallback padrão (sem nome) -->
<n-avatar />
```

### Tamanhos

```html
<n-avatar nSize="xs"      nName="JP" />
<n-avatar nSize="sm"      nName="JP" />
<n-avatar nSize="default" nName="JP" />
<n-avatar nSize="lg"      nName="JP" />
<n-avatar nSize="xl"      nName="JP" />
```

### Formas

```html
<n-avatar nShape="circle" nName="Maria Silva" />
<n-avatar nShape="square" nName="Maria Silva" />
```

### Indicador de status

```html
<n-avatar nName="João Prado" nStatus="online" />
<n-avatar nName="Maria Silva" nStatus="away" />
<n-avatar nName="Pedro Santos" nStatus="busy" />
<n-avatar nName="Ana Lima" nStatus="offline" />
```

### Grupo com overflow

```html
<n-avatar-group [nItems]="members" [nMax]="4" nAriaLabel="Membros da equipe" />
```

```ts
members = [
  { name: 'João Prado',  status: 'online' },
  { name: 'Maria Silva', status: 'away' },
  { name: 'Pedro A.',    status: 'busy' },
  { name: 'Ana Lima' },
  { name: 'Carlos Melo' },
];
```
