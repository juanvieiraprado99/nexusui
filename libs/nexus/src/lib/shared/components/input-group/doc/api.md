# Input Group API

## `n-input-group` — Inputs

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `nAddonBefore` | `string \| TemplateRef<void>` | `''` | Conteúdo exibido antes do campo. String ou template. |
| `nAddonAfter` | `string \| TemplateRef<void>` | `''` | Conteúdo exibido depois do campo. String ou template. |
| `nAddonAlign` | `'inline' \| 'block'` | `'inline'` | `'block'` força layout em coluna (addons acima/abaixo). Detectado automaticamente para `textarea`. |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho do grupo. Propagado ao input interno. |
| `nDisabled` | `boolean` | `false` | Desabilita o grupo visualmente. |
| `nLoading` | `boolean` | `false` | Exibe spinner no lado direito do campo. |
| `nClearable` | `boolean` | `false` | Exibe botão X para limpar o campo quando há valor. |
| `nCopyable` | `boolean` | `false` | Exibe botão de copiar para área de transferência. |
| `nClass` | `string` | `''` | Classes extras aplicadas ao elemento raiz. |

## `InputGroupControlDirective` — Seletor `input[nInputGroup], textarea[nInputGroup]`

Diretiva aplicada ao input ou textarea projetado. Necessária para detecção de tipo (input vs textarea) e sincronização de tamanho/disabled.

```html
<input nInputGroup type="text" />
<textarea nInputGroup></textarea>
```

## `data-slot`

| Slot | Elemento | Quando presente |
|------|----------|-----------------|
| `input-group` | host `n-input-group` | sempre |
| `addon-before` | `<div>` antes do controle | quando `nAddonBefore` definido |
| `control-wrapper` | `<div>` em volta do controle | sempre |
| `control` | `<input>` ou `<textarea>` com `nInputGroup` | sempre |
| `addon-after` | `<div>` após o controle | quando `nAddonAfter` definido |

## Customização via `nClass` e `data-slot`

```html
<!-- Estilizar o addon-before -->
<n-input-group
  nAddonBefore="https://"
  nClass="[&_[data-slot=addon-before]]:bg-primary/10 [&_[data-slot=addon-before]]:text-primary"
>
  <input nInputGroup type="text" />
</n-input-group>
```
