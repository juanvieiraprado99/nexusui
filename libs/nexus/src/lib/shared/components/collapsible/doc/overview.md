# Collapsible

Primitivo standalone de expand/collapse. Diferente do Accordion (grupo de itens), Collapsible é uma única seção expansível independente.

## Uso básico

```html
<n-collapsible>
  <button n-collapsible-trigger>Título</button>
  <n-collapsible-content>
    Conteúdo expansível aqui.
  </n-collapsible-content>
</n-collapsible>
```

## Modo controlado

```html
<n-collapsible [(nOpen)]="isOpen">
  <button n-collapsible-trigger>Título</button>
  <n-collapsible-content>Conteúdo</n-collapsible-content>
</n-collapsible>
```

## Variantes

```html
<n-collapsible nVariant="bordered">...</n-collapsible>
<n-collapsible nVariant="card">...</n-collapsible>
```

## Lazy mount

```html
<n-collapsible [nLazy]="true">
  <!-- conteúdo desmontado do DOM ao fechar -->
</n-collapsible>
```
