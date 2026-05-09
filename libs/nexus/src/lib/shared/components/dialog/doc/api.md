# API Reference

## `n-dialog`

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `nOpen` | `boolean` | `false` | Two-way binding do estado aberto/fechado |
| `nId` | `string` | auto | ID base para o dialog (derivado: titleId, descriptionId) |
| `nPersistent` | `boolean` | `false` | Impede fechamento por backdrop/Escape, exibe shake |
| `nRole` | `'dialog' \| 'alertdialog'` | `'dialog'` | Role ARIA. `alertdialog` desabilita Escape e backdrop |

| Output | Tipo | Descrição |
|--------|------|-----------|
| `nOpenChange` | `boolean` | Emitido ao abrir/fechar |

## `n-dialog-content`

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `nSize` | `'sm' \| 'default' \| 'lg' \| 'xl' \| 'full'` | `'default'` | Largura máxima do dialog |
| `nScrollable` | `boolean` | `false` | Adiciona `overflow-hidden` para scroll interno |
| `nHideClose` | `boolean` | `false` | Oculta o botão X embutido |
| `nClass` | `string` | `''` | Classes extras no painel |

## `[n-dialog-trigger]`

Directive. Aplicada a qualquer elemento clicável. Abre o dialog ao clicar.

```html
<button n-button n-dialog-trigger>Abrir</button>
```

## `[n-dialog-close]`

Directive. Fecha o dialog ao clicar.

```html
<button n-button n-dialog-close>Cancelar</button>
```

## `n-dialog-header`

Wrapper semântico para título e descrição. Centralizado em mobile, alinhado à esquerda em sm+.

| Input | Tipo | Descrição |
|-------|------|-----------|
| `nClass` | `string` | Classes extras |

## `n-dialog-footer`

Wrapper para botões de ação. Coluna reversa em mobile, linha à direita em sm+.

| Input | Tipo | Descrição |
|-------|------|-----------|
| `nClass` | `string` | Classes extras |

## `n-dialog-title`

Título do dialog. Renderiza como `role="heading" aria-level="2"`. O `id` é automaticamente vinculado ao `aria-labelledby` do painel.

| Input | Tipo | Descrição |
|-------|------|-----------|
| `nClass` | `string` | Classes extras |

## `n-dialog-description`

Descrição do dialog. O `id` é automaticamente vinculado ao `aria-describedby` do painel.

| Input | Tipo | Descrição |
|-------|------|-----------|
| `nClass` | `string` | Classes extras |

## Acessibilidade

- Foco fica preso dentro do dialog enquanto aberto (CDK `FocusTrap`)
- Scroll da página bloqueado enquanto aberto
- Foco retorna ao trigger ao fechar
- `role="dialog"` com `aria-modal="true"`, `aria-labelledby` e `aria-describedby`
- `role="alertdialog"` para ações destrutivas (leitor de tela anuncia urgência)
- Escape fecha (exceto `alertdialog` e `nPersistent`)
