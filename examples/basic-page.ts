export const document = {
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