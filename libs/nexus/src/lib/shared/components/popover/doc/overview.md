# Popover

Painel flutuante ancorado a um elemento trigger. Usa CDK Overlay para posicionamento automático com flip. Suporta conteúdo rico (formulários, configurações, informações).

## Uso básico

```html
<n-popover>
  <button n-button n-popover-trigger nVariant="outline">Abrir</button>
  <n-popover-content>
    <p>Conteúdo do popover</p>
  </n-popover-content>
</n-popover>
```

## Com formulário (modal + persistent)

```html
<n-popover nModal nPersistent>
  <button n-button n-popover-trigger>Editar</button>
  <n-popover-content nSize="lg">
    <n-input nLabel="Nome" [(nValue)]="name" />
    <button n-button n-popover-close class="mt-4">Salvar</button>
  </n-popover-content>
</n-popover>
```

## Trigger hover

```html
<n-popover nTrigger="hover">
  <span n-popover-trigger>Passe o mouse</span>
  <n-popover-content nSize="sm">Tooltip rico</n-popover-content>
</n-popover>
```

## Posicionamento

```html
<n-popover-content nSide="top" nAlign="start" [nSideOffset]="12">
  ...
</n-popover-content>
```

## Modo controlado

```ts
open = signal(false);
```

```html
<n-popover [(nOpen)]="open">
  ...
</n-popover>
```
