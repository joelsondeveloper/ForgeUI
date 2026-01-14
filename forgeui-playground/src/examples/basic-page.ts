export const document = {
  "version": "2.1.0",
  "state": { "menuTab": "cafes" },
  "theme": {
    "colors": {
      "brand": { "p": "#3e2723", "s": "#d84315", "accent": "#ffab91" },
      "text": { "p": "#ffffff", "s": "#bcaaa4" }
    },
    "typography": {
      "variants": {
        "h1": { "fontSize": { "mobile": "36px", "desktop": "64px" }, "fontWeight": "900" },
        "h2": { "fontSize": "28px", "fontWeight": "800", "color": "brand.accent" }
      }
    }
  },
  "definitions": {
    "MenuCard": {
      "type": "Stack",
      "props": { "direction": "row", "gap": "md", "align": "center" },
      "styles": { "visual": { "backgroundColor": "rgba(255,255,255,0.05)", "borderRadius": "md", "padding": "md" } },
      "children": [
        { "id": "name", "type": "Text", "styles": { "typography": { "fontWeight": "bold" } } },
        { "id": "price", "type": "Text", "styles": { "typography": { "color": "brand.accent" } } }
      ]
    }
  },
  "root": {
    "id": "root",
    "type": "Box",
    "styles": { "visual": { "background": "linear-gradient(180deg, #1b110f 0%, #3e2723 100%)" }, "layout": { "minHeight": "100vh" } },
    "children": [
      {
        "id": "hero",
        "type": "Stack",
        "props": { "direction": "column", "align": "center", "gap": "lg" },
        "styles": { "layout": { "padding": "xl md", "maxWidth": "800px" } },
        "children": [
          { "type": "Text", "props": { "content": "Black Bean Coffee", "as": "h1" } },
          { "type": "Button", "props": { "label": "Ver Menu" }, "styles": { "visual": { "backgroundColor": "brand.s", "borderRadius": "full" }, "layout": { "padding": "md xl" } } }
        ]
      }
    ]
  }
}