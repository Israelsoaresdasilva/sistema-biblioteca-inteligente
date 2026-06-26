// Configuração da API de IA integrada com variáveis de ambiente
const ANTHROPIC_API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || "";

export const gerarResumoLivro = async (titulo: string, autor: string) => {
  if (!ANTHROPIC_API_KEY) {
    console.warn("Chave da Anthropic não configurada no arquivo .env");
    return `Este é um resumo simulado para "${titulo}" de ${autor}. (Configure a EXPO_PUBLIC_ANTHROPIC_API_KEY para usar a IA real).`;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `Faça um resumo curto, envolvente e focado nos principais pontos do livro "${titulo}" do autor "${autor}". Escreva em português brasileiro.`
          }
        ],
      }),
    });

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error("Erro ao chamar a API da Anthropic:", error);
    return "Não foi possível gerar o resumo com Inteligência Artificial no momento.";
  }
};
