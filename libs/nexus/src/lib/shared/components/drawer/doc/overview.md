# Drawer

Painel deslizante que entra pela borda da tela. Ideal para navegação lateral, filtros, formulários e conteúdo contextual.

## Uso básico

```html
<n-drawer>
  <button n-drawer-trigger>Abrir</button>

  <n-drawer-content>
    <n-drawer-header>
      <n-drawer-title>Título</n-drawer-title>
      <n-drawer-description>Descrição opcional.</n-drawer-description>
    </n-drawer-header>

    <div class="flex-1 overflow-y-auto px-6 py-2">
      <!-- conteúdo scrollável -->
    </div>

    <n-drawer-footer>
      <button n-drawer-close>Cancelar</button>
      <button>Confirmar</button>
    </n-drawer-footer>
  </n-drawer-content>
</n-drawer>
```

## Posições

```html
<n-drawer-content nPosition="right">...</n-drawer-content>   <!-- padrão -->
<n-drawer-content nPosition="left">...</n-drawer-content>
<n-drawer-content nPosition="bottom">...</n-drawer-content>  <!-- bottom sheet -->
<n-drawer-content nPosition="top">...</n-drawer-content>
```

## Tamanhos

```html
<n-drawer-content nSize="sm">...</n-drawer-content>   <!-- 16rem / 12rem -->
<n-drawer-content nSize="md">...</n-drawer-content>   <!-- 20rem / 18rem (padrão) -->
<n-drawer-content nSize="lg">...</n-drawer-content>   <!-- 24rem / 24rem -->
<n-drawer-content nSize="xl">...</n-drawer-content>   <!-- 28rem / 28rem -->
<n-drawer-content nSize="full">...</n-drawer-content> <!-- tela inteira -->
```

Em posições `left`/`right`, o tamanho controla a **largura**. Em `top`/`bottom`, controla a **altura**.

## Controle por two-way binding

```html
<n-drawer [(nOpen)]="isOpen">
  ...
</n-drawer>
```

```ts
isOpen = signal(false);
```

## Drawer persistente

Não fecha ao clicar no backdrop ou pressionar ESC — exibe animação de shake:

```html
<n-drawer nPersistent>...</n-drawer>
```

## Drawer de navegação

Use `nRole="navigation"` para drawers de menu lateral:

```html
<n-drawer nRole="navigation">
  <n-drawer-content nPosition="left" nSize="sm" [nHideClose]="true">
    <nav>...</nav>
  </n-drawer-content>
</n-drawer>
```

## Handle indicator

Em posições `top` e `bottom`, uma barra visual aparece por padrão. Para ocultar:

```html
<n-drawer-content nPosition="bottom" [nHandle]="false">...</n-drawer-content>
```

## Sem backdrop

```html
<n-drawer-content [nBackdrop]="false">...</n-drawer-content>
```

## Conteúdo scrollável

Adicione `overflow-hidden` ao painel e `overflow-y-auto flex-1` na área de conteúdo:

```html
<n-drawer-content nScrollable>
  <n-drawer-header>...</n-drawer-header>
  <div class="flex-1 overflow-y-auto px-6 py-2">...</div>
  <n-drawer-footer>...</n-drawer-footer>
</n-drawer-content>
```
