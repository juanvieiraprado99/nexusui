# Dialog

Modal que bloqueia interação com o resto da página. Usa CDK Overlay com focus trap, scroll block e ARIA completo.

## Uso básico

```html
<n-dialog [(nOpen)]="open">
  <button n-button n-dialog-trigger>Abrir</button>
  <n-dialog-content>
    <n-dialog-header>
      <n-dialog-title>Título</n-dialog-title>
      <n-dialog-description>Descrição opcional.</n-dialog-description>
    </n-dialog-header>
    <!-- conteúdo -->
    <n-dialog-footer>
      <button n-button nVariant="outline" n-dialog-close>Cancelar</button>
      <button n-button>Confirmar</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>
```

## Alert Dialog

Use `nRole="alertdialog"` para ações destrutivas. Desabilita Escape e clique no backdrop.

```html
<n-dialog nRole="alertdialog">
  <button n-button n-dialog-trigger nVariant="destructive">Deletar</button>
  <n-dialog-content nSize="sm" [nHideClose]="true">
    <n-dialog-header>
      <n-dialog-title>Tem certeza?</n-dialog-title>
      <n-dialog-description>Essa ação não pode ser desfeita.</n-dialog-description>
    </n-dialog-header>
    <n-dialog-footer>
      <button n-button nVariant="outline" n-dialog-close>Cancelar</button>
      <button n-button nVariant="destructive">Confirmar</button>
    </n-dialog-footer>
  </n-dialog-content>
</n-dialog>
```

## Dialog persistente

`nPersistent` exibe animação shake ao tentar fechar pelo backdrop ou Escape.

```html
<n-dialog [nPersistent]="true">
  ...
</n-dialog>
```

## Dialog com scroll

```html
<n-dialog-content [nScrollable]="true" nClass="max-h-[80vh]">
  <n-dialog-header>...</n-dialog-header>
  <div class="overflow-y-auto flex-1 py-4">
    <!-- conteúdo longo -->
  </div>
  <n-dialog-footer>...</n-dialog-footer>
</n-dialog-content>
```

## Requisito

O app deve ter `provideAnimations()` (ou `BrowserAnimationsModule`) para a animação shake funcionar.

```typescript
// main.ts
bootstrapApplication(AppComponent, {
  providers: [provideAnimations()],
});
```
