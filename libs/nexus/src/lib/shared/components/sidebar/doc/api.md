# API — Sidebar

## n-sidebar-provider

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nDefaultOpen` | `boolean` | `true` | Estado inicial (aberto/fechado) |
| `nDefaultCollapsed` | `boolean` | `false` | Estado inicial do rail mode |
| `nStorageKey` | `string` | `''` | Chave localStorage para persistência |
| `nKeyboardShortcut` | `string` | `'b'` | Tecla para Ctrl/Cmd + toggle |

## n-sidebar

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nVariant` | `'sidebar' \| 'inset' \| 'floating'` | `'sidebar'` | Estilo visual |
| `nSide` | `'left' \| 'right'` | `'left'` | Posição |
| `nCollapsible` | `'offcanvas' \| 'icon' \| 'none'` | `'offcanvas'` | Modo de colapso |
| `nClass` | `string` | `''` | Classes extras |

## n-sidebar-trigger

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nClass` | `string` | `''` | Classes extras |

## n-sidebar-menu-button

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nActive` | `boolean` | `false` | Estado ativo (destaque) |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho |
| `nTooltip` | `string` | `''` | Texto exibido como `title` quando collapsed |
| `nDisabled` | `boolean` | `false` | Desabilitado |
| `nClass` | `string` | `''` | Classes extras |

## n-sidebar-menu-action

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nAriaLabel` | `string` | `''` | Label acessível |
| `nShowOnHover` | `boolean` | `false` | Visível apenas no hover do menu item |
| `nClass` | `string` | `''` | Classes extras |

## n-sidebar-group-action

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nAriaLabel` | `string` | `''` | Label acessível |
| `nClass` | `string` | `''` | Classes extras |

## data-slots

| Slot | Componente | Descrição |
|------|-----------|-----------|
| `sidebar` | `n-sidebar` | Painel lateral |
| `header` | `n-sidebar-header` | Cabeçalho |
| `content` | `n-sidebar-content` | Área scrollável |
| `footer` | `n-sidebar-footer` | Rodapé |
| `group` | `n-sidebar-group` | Grupo de itens |
| `group-label` | `n-sidebar-group-label` | Título do grupo |
| `group-action` | `n-sidebar-group-action` | Ação do grupo |
| `menu` | `n-sidebar-menu` | Lista de itens |
| `menu-item` | `n-sidebar-menu-item` | Item da lista |
| `menu-button` | `n-sidebar-menu-button` | Botão do item |
| `label` | (interno) | Texto do botão |
| `badge` | `n-sidebar-menu-badge` | Badge/contador |
| `menu-action` | `n-sidebar-menu-action` | Ação do item |
| `separator` | `n-sidebar-separator` | Separador |
| `trigger` | `n-sidebar-trigger` | Botão toggle |
| `rail` | `n-sidebar-rail` | Tira lateral clicável |

## Injeção de contexto

```ts
import { inject } from '@angular/core';
import { SIDEBAR_CONTEXT } from '@/components/sidebar';

const sidebar = inject(SIDEBAR_CONTEXT);
sidebar.toggle();           // alterna open/collapsed conforme nCollapsible
sidebar.setOpen(true);      // define aberto
sidebar.setCollapsed(true); // define rail mode
sidebar.open();             // Signal<boolean>
sidebar.collapsed();        // Signal<boolean>
sidebar.isMobile();         // Signal<boolean>
```
