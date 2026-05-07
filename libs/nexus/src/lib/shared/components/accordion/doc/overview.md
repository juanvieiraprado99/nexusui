# Accordion

Seções de conteúdo expansíveis/recolhíveis. Baseado no padrão WAI-ARIA Accordion.

## Uso básico

```html
<n-accordion>
  <n-accordion-item nValue="item-1">
    <button n-accordion-trigger>Título</button>
    <n-accordion-content>Conteúdo da seção.</n-accordion-content>
  </n-accordion-item>

  <n-accordion-item nValue="item-2">
    <button n-accordion-trigger>Outro título</button>
    <n-accordion-content>Outro conteúdo.</n-accordion-content>
  </n-accordion-item>
</n-accordion>
```

## Modo múltiplo

```html
<n-accordion nType="multiple" [(nValues)]="openItems">
  ...
</n-accordion>
```

## Não recolhível (single)

```html
<!-- Sempre mantém um item aberto -->
<n-accordion [nCollapsible]="false" nValue="item-1">
  ...
</n-accordion>
```

## Item desabilitado

```html
<n-accordion-item nValue="item-2" [nDisabled]="true">
  <button n-accordion-trigger>Bloqueado</button>
  <n-accordion-content>...</n-accordion-content>
</n-accordion-item>
```

## Ícone plus/minus

```html
<button n-accordion-trigger nIcon="plus-minus">Título</button>
```

## Variantes

```html
<n-accordion nVariant="ghost">...</n-accordion>
<n-accordion nVariant="flush">...</n-accordion>
```
