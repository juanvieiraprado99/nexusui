# Sidebar

Componente de navegação lateral com suporte a rail mode (ícones), persistência de estado, atalho de teclado e modo responsivo (drawer no mobile).

## Uso básico

```html
<n-sidebar-provider nStorageKey="minha-app-sidebar">
  <n-sidebar nCollapsible="icon">
    <n-sidebar-header>
      <n-sidebar-menu>
        <n-sidebar-menu-item>
          <n-sidebar-menu-button nSize="lg" nTooltip="Minha App">
            <svg data-icon>...</svg>
            Minha App
          </n-sidebar-menu-button>
        </n-sidebar-menu-item>
      </n-sidebar-menu>
    </n-sidebar-header>

    <n-sidebar-content>
      <n-sidebar-group>
        <n-sidebar-group-label>Navegação</n-sidebar-group-label>
        <n-sidebar-menu>
          <n-sidebar-menu-item>
            <n-sidebar-menu-button [nActive]="true" nTooltip="Dashboard">
              <svg data-icon>...</svg>
              Dashboard
            </n-sidebar-menu-button>
          </n-sidebar-menu-item>
        </n-sidebar-menu>
      </n-sidebar-group>
    </n-sidebar-content>

    <n-sidebar-footer>
      <!-- rodapé: avatar, logout -->
    </n-sidebar-footer>
  </n-sidebar>

  <main>
    <header>
      <n-sidebar-trigger />
      Conteúdo principal
    </header>
  </main>
</n-sidebar-provider>
```

## Modo offcanvas

```html
<n-sidebar-provider>
  <n-sidebar nCollapsible="offcanvas">
    <!-- sidebar some completamente ao fechar -->
  </n-sidebar>
  <main>
    <n-sidebar-trigger />
  </main>
</n-sidebar-provider>
```

## Variantes visuais

```html
<!-- Sidebar padrão com borda -->
<n-sidebar nVariant="sidebar">...</n-sidebar>

<!-- Fundo suavizado, sem borda -->
<n-sidebar nVariant="inset">...</n-sidebar>

<!-- Flutuante com sombra e bordas arredondadas -->
<n-sidebar nVariant="floating">...</n-sidebar>
```

## Sidebar na direita

```html
<n-sidebar nSide="right">...</n-sidebar>
```

## Ícone com tooltip em rail mode

Use o atributo `data-icon` no SVG e `nTooltip` no botão:

```html
<n-sidebar-menu-button nTooltip="Dashboard">
  <svg data-icon>...</svg>
  Dashboard
</n-sidebar-menu-button>
```

Quando a sidebar está em modo colapsado (rail), o texto some e o `title` nativo exibe o tooltip.

## Badge em item de menu

```html
<n-sidebar-menu-button nTooltip="Mensagens">
  <svg data-icon>...</svg>
  Mensagens
  <n-sidebar-menu-badge>5</n-sidebar-menu-badge>
</n-sidebar-menu-button>
```

## Ação em item de menu

```html
<n-sidebar-menu-item>
  <n-sidebar-menu-button>Projetos</n-sidebar-menu-button>
  <n-sidebar-menu-action nAriaLabel="Novo projeto" nShowOnHover>
    <svg><!-- ícone + --></svg>
  </n-sidebar-menu-action>
</n-sidebar-menu-item>
```

## Persistência automática

```html
<n-sidebar-provider nStorageKey="app">
  <!-- estado open/collapsed salvo em localStorage automaticamente -->
</n-sidebar-provider>
```

## Atalho de teclado

Por padrão `Ctrl+B` (ou `Cmd+B` no Mac) alterna a sidebar. Personalize:

```html
<n-sidebar-provider nKeyboardShortcut="k">
  <!-- Ctrl+K para alternar -->
</n-sidebar-provider>
```
