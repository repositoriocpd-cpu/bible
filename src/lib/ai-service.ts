import OpenAI from "openai";

export interface AnalysisResult {
    phrase: string;
    verse: string;
    book?: string;
    chapter?: number;
    fidelityGrade: "ALTA" | "MÉDIA" | "BAIXA";
    literaryContext: string;
    historicalContext: string;
    linguisticAnalysis: string;
    interpretation: string;
    errorDescription?: string;
    properVerses: string[]; // List of references
    application: string;
}

const MOCK_DELAY = 2000;

export async function analyzePhrase(phrase: string): Promise<AnalysisResult> {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.warn("GROQ_API_KEY missing. Returning mock data.");
        return getMockAnalysis(phrase);
    }

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://api.groq.com/openai/v1",
        });

        const prompt = `
      Atue como um especialista em exegese bíblica histórico-gramatical e teologia sistemática.
      Analise a seguinte frase popular atribuída à Bíblia ou de contexto religioso: "${phrase}".

      Seu objetivo é verificar se ela é bíblica, explicar seu contexto real (se houver), identificar erros interpretativos e fornecer o entendimento correto.

      Retorne APENAS um objeto JSON válido com a seguinte estrutura, sem markdown (ex: \`\`\`json):
      {
        "phrase": "${phrase}",
        "verse": "Se for bíblica, o versículo exato (ex: 'João 3:16'). Se não, 'Não existe na Bíblia' ou 'Texto distorcido'.",
        "fidelityGrade": "ALTA" | "MÉDIA" | "BAIXA",
        "literaryContext": "Explicação do contexto imediato do versículo real, se houver.",
        "historicalContext": "Contexto histórico/cultural da passagem ou origem do dito popular.",
        "linguisticAnalysis": "Análise de palavras-chave no original (hebraico/grego) se aplicável.",
        "interpretation": "A interpretação correta segundo a exegese histórico-gramatical.",
        "errorDescription": "Explicação clara do erro teológico ou de citação popular, se houver.",
        "properVerses": ["Lista de 1 a 3 versículos que realmente ensinam o princípio correto (ex: 'Salmos 23:1')"],
        "application": "Uma aplicação prática e equilibrada para a vida cristã hoje."
      }
    `;

        const completion = await openai.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Using Llama 3.3 via Groq (Fast & High Quality)
            messages: [
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" } // Groq supports JSON mode for Llama 3
        });

        const text = completion.choices[0]?.message?.content || "";

        // Clean potential markdown formatting
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const analysis: AnalysisResult = JSON.parse(cleanedText);

        // Ensure structure fallback if AI hallucinates slightly different keys
        return {
            ...analysis,
            fidelityGrade: ["ALTA", "MÉDIA", "BAIXA"].includes(analysis.fidelityGrade) ? analysis.fidelityGrade : "BAIXA",
            properVerses: Array.isArray(analysis.properVerses) ? analysis.properVerses : []
        };

    } catch (error) {
        console.error("Groq API Error details:", JSON.stringify(error, null, 2));
        console.error("Full Error Object:", error);
        return getMockAnalysis(phrase);
    }
}

async function getMockAnalysis(phrase: string): Promise<AnalysisResult> {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    const isGodHelps = phrase.toLowerCase().includes("ajuda quem cedo");

    if (isGodHelps) {
        return {
            phrase: phrase,
            verse: "Não existe na Bíblia",
            fidelityGrade: "BAIXA",
            literaryContext: "Esta é uma frase de sabedoria popular, não um texto bíblico.",
            historicalContext: "Provérbio popular encontrado em diversas culturas. Frequentemente confundido com textos de Provérbios ou Eclesiásticos devido ao tom sapiencial.",
            linguisticAnalysis: "A frase sugere meritocracia humana (esforço traz recompensa divina), o que difere da graça bíblica.",
            interpretation: "O trabalho diligente é valorizado na Bíblia, mas a ajuda de Deus não é condicionada apenas ao acordar cedo ou ao esforço humano isolado.",
            errorDescription: "Atribuição incorreta de autoria divina a um ditado popular. Reduz a soberania de Deus a uma reação ao esforço humano.",
            properVerses: ["Salmos 127:1-2", "Provérbios 10:22"],
            application: "Devemos ser diligentes, sim, mas reconhecer que toda benção vem do Senhor, e não apenas do nosso suor. O descanso também é um presente de Deus."
        };
    }

    return {
        phrase: phrase,
        verse: "Mock (Erro na API ou Sem Chave)",
        fidelityGrade: "MÉDIA",
        literaryContext: "Contexto genérico para testes (mock fallback).",
        historicalContext: "Contexto histórico simulado.",
        linguisticAnalysis: "Análise de termos chave simulada.",
        interpretation: "Interpretação teológica simulada.",
        errorDescription: "Possível mal-entendido comum.",
        properVerses: ["João 3:16", "Gênesis 1:1"],
        application: "Aplicação prática para a vida diária."
    };
}
