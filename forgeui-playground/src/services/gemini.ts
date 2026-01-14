import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// CERTIFIQUE-SE DE COPIAR A CHAVE DO BOTÃO "Get API Key" NO MENU LATERAL DO PRINT
const API_KEY = import.meta.env.VITE_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// IDs EXATOS DO SEU PRINT:
const MODELS_TO_TRY = [
  "gemini-3-flash-preview", // O modelo "New" do seu print
  "gemini-flash-latest", // O segundo modelo do seu print
  "gemini-2.0-flash-exp", // Fallback comum para desenvolvedores
];

export async function generateForgeUI(userPrompt: string) {
  let lastError = null;

  for (const modelName of MODELS_TO_TRY) {
    try {
      console.log(
        `[ForgeUI] Tentando modelo de última geração: ${modelName}...`
      );

      const model = genAI.getGenerativeModel({
        model: modelName,
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const systemPrompt = `
Você é o ForgeUI Architect v2.1. Sua tarefa é compor interfaces de alta fidelidade usando JSON. 
Siga este guia técnico para cada componente gerado:

### 1. O PADRÃO DE CONTAINER (ESSENCIAL)
Nunca coloque conteúdo solto no root. Use sempre a hierarquia de Seção e Container:
- SEÇÃO (Box): width: "100%", backgroundColor.
- CONTAINER (Stack/Box): maxWidth: "1200px", margin: "0 auto", padding: {mobile: "lg", desktop: "xl"}.
Exemplo:
{
  "type": "Box",
  "styles": { "layout": { "width": "100%" }, "visual": { "backgroundColor": "brand.p" } },
  "children": [{ "type": "Stack", "styles": { "layout": { "maxWidth": "1200px", "margin": "0 auto" } } }]
}

### 2. RESPONSIVIDADE E TOKENS
Sempre use objetos responsivos. Referencie o theme usando pontos.
Exemplo:
"fontSize": { "mobile": "24px", "desktop": "display" },
"direction": { "mobile": "column", "desktop": "row" }

### 3. TIPOGRAFIA SEMÂNTICA
Use a prop "as" para h1, h2, p. O estilo virá do theme.typography.variants.
Exemplo: { "type": "Text", "props": { "content": "Olá", "as": "h1" } }

### 4. ESTÉTICA MODERNA (GLASS & GRADIENTS)
- Gradientes: "linear-gradient(135deg, brand.p 0%, brand.s 100%)"
- Vidro: "backdropFilter": "blur(12px)", "backgroundColor": "rgba(255,255,255,0.05)"

### 5. LÓGICA E ESTADO
Use document.state para interatividade.
Exemplo Ação: "interactions": { "onClick": { "type": "state.set", "payload": { "key": "isModalOpen", "value": true } } }
Exemplo Condição: "condition": { "key": "isModalOpen", "value": true, "operator": "==" }

### Exemplo de Site "Padrão Ouro" (Referência de Qualidade):
{
  "version": "2.1.0",
  "state": { "activeTab": "movies" },
  "theme": {
    "colors": { "brand": { "p": "#E50914", "s": "#000000" }, "text": { "p": "#FFFFFF" } },
    "typography": { "variants": { "h1": { "fontSize": "80px", "fontWeight": "900" } } }
  },
  "root": {
    "id": "root",
    "type": "Box",
    "styles": { "visual": { "background": "radial-gradient(circle, #2b0000 0%, #000 100%)" }, "layout": { "minHeight": "100vh" } },
    "children": [
      {
        "id": "hero",
        "type": "Stack",
        "props": { "direction": "column", "align": "center", "justify": "center", "gap": "xl" },
        "styles": { "layout": { "maxWidth": "1200px", "margin": "0 auto", "padding": "hero 20px" } },
        "children": [
          { "type": "Text", "props": { "content": "FORGEFLIX", "as": "h1" }, "styles": { "typography": { "color": "brand.p" } } },
          { "type": "Button", "props": { "label": "ASSINAR AGORA" }, "styles": { "visual": { "backgroundColor": "brand.p", "borderRadius": "md" }, "layout": { "padding": "md xl" } } }
        ]
      }
    ]
  }
}

REGRAS FINAIS:
- Retorne APENAS o JSON puro.
- Gere IDs únicos para cada elemento.
`;

      const result = await model.generateContent(
        `${systemPrompt}\n\nUser Request: ${userPrompt}`
      );
      const response = await result.response;
      const text = response.text();

      console.log(`[ForgeUI] Sucesso total com ${modelName}!`);
      return JSON.parse(text);
    } catch (error: any) {
      console.warn(`[ForgeUI] Modelo ${modelName} falhou:`, error.message);
      lastError = error;
    }
  }

  throw new Error(
    "Não foi possível conectar aos novos modelos do Gemini. Verifique sua chave API."
  );
}
