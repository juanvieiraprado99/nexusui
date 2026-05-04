# Avatar API

## `n-avatar`

### Inputs

| Input        | Tipo                                              | Default     | Descrição                                                   |
|--------------|---------------------------------------------------|-------------|-------------------------------------------------------------|
| `nSrc`       | `string`                                          | `''`        | URL da imagem. Usa `NgOptimizedImage`; aceita URLs absolutas |
| `nName`      | `string`                                          | `''`        | Nome completo — gera iniciais e cor de fundo determinística  |
| `nSize`      | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl'`      | `'default'` | Tamanho (24 / 32 / 40 / 48 / 64 px)                         |
| `nShape`     | `'circle' \| 'square'`                            | `'circle'`  | Forma do avatar                                             |
| `nStatus`    | `'online' \| 'offline' \| 'away' \| 'busy' \| null` | `null`   | Indicador de status no canto inferior-direito               |
| `nClass`     | `string`                                          | `''`        | Classes extras (merged via tailwind-merge)                  |
| `nAriaLabel` | `string`                                          | `''`        | Substitui o aria-label gerado automaticamente               |

### Comportamento de fallback

Prioridade: **imagem** → **iniciais** → **`?`**

- Imagem: renderiza `<img [ngSrc]>` com `(error)` — falha silenciosa, avança pro próximo fallback.
- Iniciais: extraídas de `nName` (ex.: `"João Prado"` → `"JP"`, `"Ana"` → `"AN"`).
- Cor de fundo: gerada por hash do nome → HSL determinístico (mesma entrada = mesma cor).

### `data-slot`

| Slot       | Elemento                            |
|------------|-------------------------------------|
| `fallback` | `<span>` com iniciais/ícone padrão  |

---

## `n-avatar-group`

### Inputs

| Input        | Tipo                                         | Default                  | Descrição                              |
|--------------|----------------------------------------------|--------------------------|----------------------------------------|
| `nItems`     | `AvatarGroupItem[]`                          | `[]`                     | Lista de avatares                      |
| `nMax`       | `number`                                     | `5`                      | Máximo de avatares visíveis            |
| `nSize`      | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'`              | Tamanho repassado a todos os avatares  |
| `nShape`     | `'circle' \| 'square'`                       | `'circle'`               | Forma repassada a todos os avatares    |
| `nClass`     | `string`                                     | `''`                     | Classes extras no host                 |
| `nAriaLabel` | `string`                                     | `'Grupo de avatares'`    | Label ARIA do grupo                    |

### `AvatarGroupItem`

```ts
type AvatarGroupItem = {
  src?:    string;
  name?:   string;
  status?: 'online' | 'offline' | 'away' | 'busy';
};
```

Quando `nItems.length > nMax`, renderiza badge `+N` com a mesma forma e tamanho dos avatares.
