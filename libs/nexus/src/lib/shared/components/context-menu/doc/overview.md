# Context Menu

Menu contextual acionado por clique com o botão direito do mouse (ou Shift+F10 no teclado). Posiciona o overlay nas coordenadas do cursor e fecha ao clicar fora ou rolar a página.

## Uso básico

```html
<n-context-menu>
  <div n-context-menu-trigger class="...">
    Clique com botão direito
  </div>
  <n-context-menu-content>
    <n-context-menu-item>Abrir</n-context-menu-item>
    <n-context-menu-item>Renomear</n-context-menu-item>
    <n-context-menu-separator />
    <n-context-menu-item nVariant="destructive">Excluir</n-context-menu-item>
  </n-context-menu-content>
</n-context-menu>
```

## Com checkbox items

```html
<n-context-menu>
  <div n-context-menu-trigger class="...">Área</div>
  <n-context-menu-content>
    <n-context-menu-checkbox-item [(nChecked)]="showMinimap">
      Mostrar Minimapa
    </n-context-menu-checkbox-item>
    <n-context-menu-checkbox-item [(nChecked)]="wordWrap">
      Quebra de Linha
    </n-context-menu-checkbox-item>
  </n-context-menu-content>
</n-context-menu>
```

## Com radio group

```html
<n-context-menu>
  <div n-context-menu-trigger class="...">Área</div>
  <n-context-menu-content>
    <n-context-menu-radio-group [(nValue)]="theme">
      <n-context-menu-radio-item nValue="light">Claro</n-context-menu-radio-item>
      <n-context-menu-radio-item nValue="dark">Escuro</n-context-menu-radio-item>
      <n-context-menu-radio-item nValue="system">Sistema</n-context-menu-radio-item>
    </n-context-menu-radio-group>
  </n-context-menu-content>
</n-context-menu>
```

## Com submenu

```html
<n-context-menu>
  <div n-context-menu-trigger class="...">Área</div>
  <n-context-menu-content>
    <n-context-menu-item>Copiar</n-context-menu-item>
    <n-context-menu-sub>
      <n-context-menu-sub-trigger>Compartilhar</n-context-menu-sub-trigger>
      <n-context-menu-sub-content>
        <n-context-menu-item>E-mail</n-context-menu-item>
        <n-context-menu-item>Slack</n-context-menu-item>
      </n-context-menu-sub-content>
    </n-context-menu-sub>
  </n-context-menu-content>
</n-context-menu>
```

## Múltiplos triggers

Um único `<n-context-menu>` pode ter vários elementos com `n-context-menu-trigger`. O menu abre nas coordenadas do cursor independentemente de qual trigger foi acionado.

```html
<n-context-menu>
  <div n-context-menu-trigger>Área 1</div>
  <div n-context-menu-trigger>Área 2</div>
  <n-context-menu-content>
    <!-- mesmo menu para ambas as áreas -->
  </n-context-menu-content>
</n-context-menu>
```
