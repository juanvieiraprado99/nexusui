# Tabs

Navegação por abas com suporte a orientação horizontal/vertical, três variantes visuais e navegação por teclado (ARIA tablist).

## Uso básico

```html
<n-tabs nDefaultValue="conta">
  <n-tabs-list>
    <button n-tabs-trigger nValue="conta">Conta</button>
    <button n-tabs-trigger nValue="senha">Senha</button>
  </n-tabs-list>

  <n-tabs-content nValue="conta" nClass="pt-4">
    Configurações da conta.
  </n-tabs-content>
  <n-tabs-content nValue="senha" nClass="pt-4">
    Altere sua senha.
  </n-tabs-content>
</n-tabs>
```

## Variantes

```html
<n-tabs nVariant="pills">...</n-tabs>   <!-- padrão: fundo preenchido -->
<n-tabs nVariant="line">...</n-tabs>    <!-- sublinhado clássico -->
<n-tabs nVariant="boxed">...</n-tabs>   <!-- abas com borda estilo browser -->
```

## Orientação vertical

```html
<n-tabs nOrientation="vertical" nVariant="line">
  <n-tabs-list nClass="min-w-32">
    <button n-tabs-trigger nValue="a">Item 1</button>
    <button n-tabs-trigger nValue="b">Item 2</button>
  </n-tabs-list>
  <div class="flex-1 pl-6">
    <n-tabs-content nValue="a">...</n-tabs-content>
    <n-tabs-content nValue="b">...</n-tabs-content>
  </div>
</n-tabs>
```

## Modo controlado

```html
<n-tabs [(nValue)]="activeTab">
  ...
</n-tabs>
```

```ts
activeTab = signal('conta');
```

## Aba desabilitada

```html
<button n-tabs-trigger nValue="admin" [nDisabled]="true">Admin</button>
```

## Stretch (abas preenchem a largura)

```html
<n-tabs [nStretch]="true">
  <n-tabs-list>...</n-tabs-list>
</n-tabs>
```
