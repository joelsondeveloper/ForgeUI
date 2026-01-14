export async function generateForgeUI(prompt: string, apiKey: string) {
  const systemPrompt = `Você é o ForgeUI Engine. Gere apenas o JSON baseado no prompt do usuário... [Inserir o texto acima]`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview", // Ou gpt-3.5-turbo
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  const data = await response.json();
  // Retorna o JSON parseado
  return JSON.parse(data.choices[0].message.content);
}