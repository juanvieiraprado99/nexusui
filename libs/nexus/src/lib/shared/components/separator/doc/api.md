# Separator API

| Input          | Tipo                                       | Default        | Descrição                                       |
|----------------|--------------------------------------------|----------------|-------------------------------------------------|
| `nOrientation` | `'horizontal' \| 'vertical'`               | `'horizontal'` | Eixo da linha                                   |
| `nVariant`     | `'solid' \| 'dashed' \| 'dotted'`          | `'solid'`      | Estilo de traço                                 |
| `nSize`        | `'sm' \| 'default' \| 'lg'`                | `'default'`    | Espessura                                       |
| `nIntensity`   | `'default' \| 'muted' \| 'strong'`         | `'default'`    | Contraste de cor                                |
| `nGradient`    | `boolean`                                  | `false`        | Fade nas bordas (solid horizontal)              |
| `nInset`       | `boolean`                                  | `false`        | Aplica margem (`my-4` ou `mx-4`)                |
| `nDecorative`  | `boolean`                                  | `false`        | Remove `role=separator` (apenas visual)         |
| `nLabel`       | `string`                                   | `''`           | Texto centralizado entre duas linhas            |
| `nClass`       | `string`                                   | `''`           | Classes extra no root                           |

Conteúdo projetado (`<ng-content/>`) renderiza no centro entre duas linhas — útil para ícones.

## Data slots

| Slot   | Onde                              |
|--------|-----------------------------------|
| `root` | container                         |
| `line` | linha (1 ou 2 quando há label)    |
| `label`| wrapper do texto/ícone central    |
