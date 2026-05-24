# Tabs API

## `n-tabs`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nVariant` | `'pills' \| 'line' \| 'boxed'` | `'pills'` | Estilo visual |
| `nOrientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direção das abas |
| `nDefaultValue` | `string` | `''` | Aba ativa inicial (não controlado) |
| `nStretch` | `boolean` | `false` | Abas preenchem toda a largura |
| `nClass` | `string` | `''` | Classes adicionais |

| Model | Tipo | Descrição |
|-------|------|-----------|
| `nValue` | `string` | Aba ativa (controlado via `[(nValue)]`) |

| Output | Tipo | Descrição |
|--------|------|-----------|
| `nValueChange` | `string` | Emite ao trocar de aba |

## `n-tabs-list`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nClass` | `string` | `''` | Classes adicionais |

## `button[n-tabs-trigger]`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nValue` | `string` | **required** | Identificador da aba |
| `nDisabled` | `boolean` | `false` | Desabilita a aba |
| `nSize` | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamanho do trigger |
| `nClass` | `string` | `''` | Classes adicionais |

| Atributo | Valor | Descrição |
|----------|-------|-----------|
| `data-state` | `"active"` / `"inactive"` | Estado da aba |
| `data-disabled` | `""` / ausente | Aba desabilitada |

## `n-tabs-content`

| Input | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `nValue` | `string` | **required** | Identificador do painel (deve corresponder ao trigger) |
| `nClass` | `string` | `''` | Classes adicionais no wrapper interno |

| Atributo | Valor | Descrição |
|----------|-------|-----------|
| `data-state` | `"active"` / `"inactive"` | Estado do painel |

## `data-slot`

| Slot | Elemento | Descrição |
|------|----------|-----------|
| `root` | `n-tabs` | Container raiz |
| `list` | `n-tabs-list` | Barra de abas (`role="tablist"`) |
| `trigger` | `button[n-tabs-trigger]` | Botão de aba (`role="tab"`) |
| `content` | inner div de `n-tabs-content` | Área de conteúdo (`role="tabpanel"`) |

## Navegação por teclado

| Tecla | Ação |
|-------|------|
| `ArrowLeft` / `ArrowRight` | Navega entre abas (horizontal) |
| `ArrowUp` / `ArrowDown` | Navega entre abas (vertical) |
| `Home` | Vai para a primeira aba |
| `End` | Vai para a última aba |
| `Tab` | Move o foco para o painel ativo |
