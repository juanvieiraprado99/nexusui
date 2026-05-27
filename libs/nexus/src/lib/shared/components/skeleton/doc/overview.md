# Skeleton

Placeholder animado que indica conteúdo carregando. Dimensione via `nClass`.

## Usage

```ts
import { SkeletonComponent } from '@/shared/components/skeleton';
```

```html
<n-skeleton nClass="h-4 w-full" />
```

## Examples

### Linhas de texto

```html
<div class="flex flex-col gap-2 w-64">
  <n-skeleton nClass="h-4 w-full" />
  <n-skeleton nClass="h-4 w-full" />
  <n-skeleton nClass="h-4 w-3/4" />
</div>
```

### Formas

```html
<n-skeleton nShape="circle" nClass="h-16 w-16" />
<n-skeleton nClass="h-10 w-24" />
```

### Card

```html
<div class="flex items-center gap-4">
  <n-skeleton nShape="circle" nClass="h-12 w-12" />
  <div class="flex flex-col gap-2">
    <n-skeleton nClass="h-4 w-40" />
    <n-skeleton nClass="h-4 w-24" />
  </div>
</div>
```
