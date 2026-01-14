Esta é a **Especificação Técnica Completa e Exaustiva do ForgeUI (v1.1)**. Este documento é a "Bíblia" do motor, mapeando desde a estrutura básica até as lógicas avançadas de reatividade e o extenso dicionário de propriedades de estilo processadas pelo `resolveStyles`.

---

# 📑 Especificação Técnica Completa: ForgeUI (v1.1)

## 1. Estrutura Global do Documento (`ForgeUIDocument`)
O objeto raiz que contém todo o estado e estrutura da interface.

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `version` | `string` | Versão do motor (atual: `1.1.0`). |
| `metadata` | `object` | Detalhes: `name`, `author`, `description`. |
| `theme` | `object` | Mapa global de Design Tokens (ver Seção 2). |
| `state` | `record` | Dicionário de estado global: `Record<string, any>`. |
| `assets` | `record` | Dicionário de `AssetDefinition` indexado por ID. |
| `definitions` | `record` | Biblioteca de Patterns (Nós reusáveis). |
| `root` | `Node` | O Nó principal que inicia a renderização. |

---

## 2. O Schema do Tema (`ForgeUITheme`)
Define os tokens que o motor resolve automaticamente.
- **Colors:** `brand`, `text`, `background`, `status`.
- **Spacing:** `none`, `xs`, `sm`, `md`, `lg`, `xl`, `section`.
- **Radius:** `none`, `sm`, `md`, `lg`, `xl`, `full`.
- **Typography:** `fonts` (heading, body), `size` (xs a display).

---

## 3. O Objeto Nó (`ForgeUINode`)
A unidade fundamental de composição. Todos os campos de estilo e propriedades aceitam valores responsivos: `{ mobile, tablet, desktop }`.

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `string` | Identificador único (UUID). |
| `type` | `enum` | Primitiva (`Stack`, `Grid`, `Text`, `Button`, `Box`, etc). |
| `condition` | `object` | Regra lógica para exibição baseada no `state`. |
| `props` | `object` | Atributos específicos da primitiva. |
| `styles` | `object` | Dicionário de design dividido em `visual`, `typography` e `layout`. |
| `children` | `Node[]` | Array de nós filhos. |
| `interactions`| `object` | Eventos (onClick) e Ações (state.set, navigation). |

---

## 4. Primitivas e Propriedades (`props`)
- **Stack:** `direction`, `align`, `justify`, `gap`, `wrap`.
- **Grid:** `columns`, `rows`, `gap`.
- **Text:** `content`, `as` (h1-h4, p, span, strong).
- **Image:** `assetId`, `objectFit`.
- **Button:** `label`, `variant`, `isDisabled`.

---

## 5. Referência de Estilos (`styles`)
O motor processa estas propriedades através do `resolveStyles`, suportando **Design Tokens** e **Valores Responsivos**.

### 5.1 Categoria: Visual (`visual`)
*   **`backgroundColor` / `background`**: Suporta Hex, RGB, Gradientes e Tokens.
*   **`borderRadius`**: Tokens de Raio (`sm`, `md`, `full`).
*   **`border` / `borderWidth` / `borderStyle` / `borderColor`**: Controle total de bordas.
*   **`boxShadow`**: Efeitos de sombra e elevação.
*   **`opacity`**: Transparência (0 a 1).
*   **`backdropFilter`**: Efeitos como `blur(10px)` (Glassmorphism).
*   **`filter`**: Filtros CSS (`grayscale`, `brightness`).
*   **`mixBlendMode`**: Modos de mesclagem (`multiply`, `screen`).
*   **`cursor`**: Tipo do ponteiro.
*   **`transition`**: Controle de animações de transição de estado.
*   **`transform` / `transformOrigin`**: Rotação, escala e translação.
*   **`overflow`**: Controle de conteúdo excedente (`hidden`, `auto`, `scroll`).
*   **`outline`**: Contorno externo.

### 5.2 Categoria: Tipografia (`typography`)
*   **`color`**: Suporta Tokens e Gradientes (via auto-clip).
*   **`fontSize`**: Tokens de Escala (`sm`, `lg`, `display`).
*   **`fontWeight`**: Peso da fonte (100 a 900).
*   **`lineHeight`**: Altura da linha.
*   **`letterSpacing`**: Espaçamento entre letras.
*   **`textAlign`**: Alinhamento (`left`, `center`, `right`, `justify`).
*   **`textTransform`**: Transformação (`uppercase`, `lowercase`, `capitalize`).
*   **`textDecoration`**: Decoração (`underline`, `line-through`).
*   **`textShadow`**: Sombra em textos.
*   **`whiteSpace` / `textOverflow` / `wordBreak`**: Controle de quebra e reticências.
*   **`userSelect`**: Permissão de seleção de texto.

### 5.3 Categoria: Layout & Posicionamento (`layout`)
*   **`position`**: `relative`, `absolute`, `fixed`, `sticky`.
*   **`top` / `right` / `bottom` / `left`**: Coordenadas de posicionamento.
*   **`zIndex`**: Ordem de empilhamento.
*   **`display`**: `flex`, `grid`, `block`, `none`.
*   **`flexDirection` / `alignItems` / `justifyContent` / `flexWrap`**: Controles de Flexbox.
*   **`gridTemplateColumns` / `gridTemplateRows` / `gap`**: Controles de Grid.
*   **`flexGrow` / `flexShrink` / `flexBasis` / `alignSelf`**: Comportamento de itens flex.
*   **`gridColumn` / `gridRow` / `gridArea`**: Posicionamento em grades.

### 5.4 Categoria: Modelo de Caixa (`layout`)
*   **`width` / `maxWidth` / `minWidth`**: Largura responsiva.
*   **`height` / `maxHeight` / `minHeight`**: Altura responsiva.
*   **`padding` / `margin`**: Suporta **Shorthands** (`"md lg"`) e Tokens.
*   **`aspectRatio`**: Proporção do elemento (ex: `16/9`, `1/1`).
*   **`boxSizing`**: `border-box` ou `content-box`.

---

## 6. Inteligência Automática (Regras do Motor)

1.  **Shorthand de Spacing**: Strings como `"md lg"` são expandidas consultando o tema.
2.  **Smart Absolute**: Elementos `absolute` sem `width` recebem `width: "fit-content"` automaticamente.
3.  **Smart Margin**: Elementos com `maxWidth` sem margens definidas são centralizados automaticamente com `margin: 0 auto`.
4.  **Semantic Reset**: Tags `h1-h4`, `p`, etc., têm suas margens padrão removidas (`margin: 0`).
5.  **Image Safety**: Toda imagem recebe `maxWidth: 100%` e `height: auto` por padrão.

---

## 7. Reatividade e Estado Global

### Gerenciamento de Estado (`document.state`)
O ForgeUI armazena variáveis dinâmicas na raiz do documento. Permite criar lógica de abas, contadores, modais e filtros.

### Renderização Condicional (`node.condition`)
Nós podem ser ocultados/exibidos via lógica:
- `key`: Chave no estado global.
- `value`: Valor de comparação.
- `operator`: `"=="` ou `"!="`.

### Interação de Estado (`state.set`)
Ação vinculada a eventos (como `onClick`) que altera o `document.state`, disparando o ciclo de re-renderização do motor.

---

## 8. JSON de Demonstração (Abas Reativas & Estilos Avançados)

```json
{
  "version": "1.1.0",
  "state": { "activeTab": "visual" },
  "theme": {
    "colors": { "brand": { "primary": "#6366f1" } },
    "spacing": { "md": "16px", "lg": "32px" },
    "radius": { "md": "12px" }
  },
  "root": {
    "id": "main-container",
    "type": "Stack",
    "props": { "direction": "column", "gap": "lg" },
    "styles": { 
      "layout": { "width": "600px", "margin": "0 auto", "padding": "lg" },
      "visual": { "backgroundColor": "#ffffff", "borderRadius": "md", "boxShadow": "0 10px 15px rgba(0,0,0,0.1)" }
    },
    "children": [
      {
        "id": "nav",
        "type": "Stack",
        "props": { "direction": "row", "gap": "md" },
        "children": [
          {
            "id": "tab-1",
            "type": "Button",
            "props": { "label": "Visual" },
            "interactions": { "onClick": { "type": "state.set", "payload": { "key": "activeTab", "value": "visual" } } }
          },
          {
            "id": "tab-2",
            "type": "Button",
            "props": { "label": "Layout" },
            "interactions": { "onClick": { "type": "state.set", "payload": { "key": "activeTab", "value": "layout" } } }
          }
        ]
      },
      {
        "id": "content-visual",
        "type": "Box",
        "condition": { "key": "activeTab", "value": "visual", "operator": "==" },
        "styles": {
          "visual": { "backgroundColor": "brand.primary", "padding": "md", "backdropFilter": "blur(5px)", "opacity": 0.9 }
        },
        "children": [
          { "id": "t1", "type": "Text", "props": { "content": "Demonstrando Backdrop Filter e Opacidade", "as": "p" }, "styles": { "typography": { "color": "#fff" } } }
        ]
      }
    ]
  }
}
```

---
**Fim da Especificação.** O motor ForgeUI (v1.1) agora suporta controle total de CSS, design responsivo e reatividade baseada em estado global.