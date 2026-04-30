# Dropdown Menu

Menu de ações que aparece quando o usuário interage com um botão (trigger). Usa `@angular/cdk/overlay` para portal/posicionamento, foco gerenciado por `FocusKeyManager`, suporte a submenu aninhado, separadores, labels de grupo e atalhos de teclado visíveis.

## Quando usar

- Menus de ações em headers (perfil, sair, configurações).
- Menus contextuais em linhas de tabela.
- Agrupar ações secundárias que não cabem como botões na superfície.

Não usar para selecionar valor único de formulário — use `n-select` (em breve).

## Instalação

```bash
nexus-ui-cli add dropdown-menu
```

CLI baixa também `utils` e instala `@angular/cdk` + `class-variance-authority`.

## Uso básico

```ts
import {
  DropdownMenuComponent,
  DropdownMenuTriggerDirective,
  DropdownMenuContentComponent,
  DropdownMenuItemComponent,
} from '~/components/dropdown-menu';
import { ButtonComponent } from '~/components/button';

@Component({
  imports: [
    ButtonComponent,
    DropdownMenuComponent,
    DropdownMenuTriggerDirective,
    DropdownMenuContentComponent,
    DropdownMenuItemComponent,
  ],
  template: `
    <n-dropdown-menu>
      <button n-button n-dropdown-menu-trigger>Abrir</button>
      <n-dropdown-menu-content>
        <n-dropdown-menu-item (nSelect)="edit()">Editar</n-dropdown-menu-item>
        <n-dropdown-menu-item (nSelect)="duplicate()">Duplicar</n-dropdown-menu-item>
        <n-dropdown-menu-item nVariant="destructive" (nSelect)="remove()">
          Excluir
        </n-dropdown-menu-item>
      </n-dropdown-menu-content>
    </n-dropdown-menu>
  `,
})
```

## Submenu, label, separador, atalho

```html
<n-dropdown-menu>
  <button n-button n-dropdown-menu-trigger>Conta</button>
  <n-dropdown-menu-content>
    <n-dropdown-menu-label>Minha conta</n-dropdown-menu-label>

    <n-dropdown-menu-group>
      <n-dropdown-menu-item>
        Perfil
        <n-dropdown-menu-shortcut>⇧⌘P</n-dropdown-menu-shortcut>
      </n-dropdown-menu-item>
      <n-dropdown-menu-item>Cobrança</n-dropdown-menu-item>
    </n-dropdown-menu-group>

    <n-dropdown-menu-separator />

    <n-dropdown-menu-sub>
      <n-dropdown-menu-sub-trigger>Convidar</n-dropdown-menu-sub-trigger>
      <n-dropdown-menu-sub-content>
        <n-dropdown-menu-item>Por e-mail</n-dropdown-menu-item>
        <n-dropdown-menu-item>Por link</n-dropdown-menu-item>
      </n-dropdown-menu-sub-content>
    </n-dropdown-menu-sub>
  </n-dropdown-menu-content>
</n-dropdown-menu>
```

## Posicionamento

`n-dropdown-menu-content` aceita `nSide` (`top|bottom|left|right`) e `nAlign` (`start|center|end`). Reposicionamento automático em scroll/resize. Fallback automático para o lado oposto se não couber.

## Teclado

| Tecla | Ação |
|---|---|
| `↓` / `↑` | Navega entre items |
| `Home` / `End` | Primeiro / último |
| `Enter` / `Space` | Aciona item |
| `Esc` | Fecha + foco volta ao trigger |
| `Tab` | Fecha (perde foco) |
| `→` em sub-trigger | Abre submenu |
| `←` em sub-content | Fecha submenu |
| `a-z` | Typeahead |
