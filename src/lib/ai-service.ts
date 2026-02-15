import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type AnalysisMode = "ACADEMICO_AVANCADO" | "PASTORAL_SIMPLIFICADO" | "COMPARATIVO_INTERPRETACOES" | "PADRAO";

export interface BaseAnalysis {
  mode: AnalysisMode;
  phrase: string;
}

export interface AcademicAnalysis extends BaseAnalysis {
  mode: "ACADEMICO_AVANCADO";
  existsInBible: boolean | "uncertain";
  primaryReference: string;
  secondaryReferences: string[];
  literaryGenre: string;
  textualStatus: {
    isDirectQuote: boolean;
    isParaphrase: boolean;
    isDistortion: boolean;
    notes: string;
  };
  immediateContext: {
    pericopeSummary: string;
    argumentFlow: string;
    keyVersesAround: string[];
  };
  historicalCulturalContext: {
    authorAudience: string;
    setting: string;
    backgroundNotes: string;
  };
  originalLanguage: {
    keyTerms: Array<{
      term: string;
      language: string;
      transliteration: string;
      semanticRange: string[];
      translationImpact: string;
    }>;
    syntaxNotes: string;
  };
  hermeneuticalDiagnosis: {
    commonPopularReading: string;
    whatGoesWrong: string[];
    whyItMatters: string;
  };
  correctExegesis: {
    senseOriginal: string;
    theologicalImplications: string[];
    limitsAndCautions: string[];
  };
  canonicalSynthesis: {
    analogyOfFaith: string;
    relatedDoctrines: string[];
  };
  recommendedVerses: Array<{
    reference: string;
    whyThisFits: string;
  }>;
  application: {
    timelessPrinciple: string;
    contemporaryApplication: string;
    misuseWarnings: string[];
  };
  confidence: {
    level: "alta" | "media" | "baixa";
    reason: string;
  };
}

export interface PastoralAnalysis extends BaseAnalysis {
  mode: "PASTORAL_SIMPLIFICADO";
  isBiblical: boolean | "uncertain";
  reference: string;
  simpleContext: string;
  whatPeopleUsuallyMean: string;
  whatTheBibleActuallyTeaches: string;
  commonMistake: string;
  safeApplicationToday: string;
  supportingVerses: string[];
}

export interface ComparativeAnalysis extends BaseAnalysis {
  mode: "COMPARATIVO_INTERPRETACOES";
  referenceStatus: {
    existsInBible: boolean | "uncertain";
    bestReference: string;
    alternatives: string[];
  };
  contextSummary: string;
  interpretations: Array<{
    label: string;
    coreClaim: string;
    method: string;
    strengths: string[];
    weaknesses: string[];
    textConstraints: string[];
    pastoralImpact: string;
  }>;
  mostProbableReading: {
    label: string;
    why: string[];
    whatToAvoid: string[];
  };
  relatedVerses: string[];
}

export interface StandardAnalysis extends BaseAnalysis {
  mode: "PADRAO";
  existsInBible: boolean;
  exactReference: string;
  literaryGenre: string;
  fidelityGrade: "ALTA" | "MÉDIA" | "BAIXA";
  immediateContext: string;
  historicalContext: string;
  linguisticAnalysis: string;
  commonInterpretation: string;
  interpretiveError: string;
  correctExegesis: string;
  canonicalTheology: string;
  properRelatedVerses: string[];
  balancedApplication: string;
  hermeneuticalPrinciplesUsed?: string[];
}

export interface FallacyAnalysisResult {
  diagnostic: string;
  exegesis: string;
  userError: string;
  correctInterpretation: string;
  pedagogicalExplanation: string;
  comparison: {
    user: string;
    correct: string;
  };
  progressImpact: {
    identification: number;
    contextualization: number;
    application: number;
    total: number;
  };
}

export type AnalysisResult = AcademicAnalysis | PastoralAnalysis | ComparativeAnalysis | StandardAnalysis;

const MOCK_DELAY = 2000;

export const PROMPT_ACADEMICO_AVANCADO = (phrase: string) => `
Você é um especialista em hermenêutica bíblica, exegese histórico-gramatical, crítica textual (nível introdutório), teologia bíblica e sistemática. Seu estilo é acadêmico, técnico e preciso, mas claro. Trabalhe com rigor metodológico semelhante ao proposto em "Você Interpretou Errado": priorize gênero literário, contexto imediato, contexto histórico-cultural, sentido original (autor/público), e só então aplicação.

Analise a frase popular atribuída à Bíblia ou de contexto religioso: "${phrase}"

Regras:
- Não invente referências. Se for incerto, declare incerteza e explique por quê.
- Se houver múltiplos textos possíveis, liste as hipóteses e justifique.
- Se for paráfrase popular, identifique o texto-base provável e as distorções.
- Diferencie: (a) sentido original (b) implicações teológicas (c) aplicação.
- Aponte falácias hermenêuticas comuns: texto-prova, anacronismo, alegorização indevida, colagem de versículos, generalização de poesia, promessas condicionais tratadas como absolutas, confusão Israel/Igreja, etc.
- Linguística: inclua transliteração quando útil e traduções possíveis; evite afirmar “significa X” sem nuance.
- Crítica textual: apenas quando relevante (variações notórias), em nível introdutório e sem jargão excessivo.

Retorne APENAS um objeto JSON válido, sem markdown, nesta estrutura EXATA:

{
  "mode": "ACADEMICO_AVANCADO",
  "phrase": "${phrase}",
  "existsInBible": true | false | "uncertain",
  "primaryReference": "Livro Cap:Verso" | "Não existe na Bíblia" | "Incerto",
  "secondaryReferences": ["Até 5 referências alternativas ou relacionadas"],
  "literaryGenre": "Lei | Narrativa | Poesia | Sabedoria | Profecia | Evangelho | Epístola | Apocalíptico | Não aplicável",
  "textualStatus": {
    "isDirectQuote": true | false,
    "isParaphrase": true | false,
    "isDistortion": true | false,
    "notes": "Notas sobre literalidade/paráfrase e possíveis fontes"
  },
  "immediateContext": {
    "pericopeSummary": "Resumo do parágrafo/perícope",
    "argumentFlow": "Fluxo do argumento do autor",
    "keyVersesAround": ["Até 3 versos ao redor, apenas referência (sem citar texto longo)"]
  },
  "historicalCulturalContext": {
    "authorAudience": "Autor humano e público original (se aplicável/possível)",
    "setting": "Cenário histórico e cultural",
    "backgroundNotes": "Observações relevantes (alianças, práticas, geografia, etc.)"
  },
  "originalLanguage": {
    "keyTerms": [
      {
        "term": "termo",
        "language": "Hebraico | Aramaico | Grego",
        "transliteration": "transliteração",
        "semanticRange": ["2 a 4 possibilidades de sentido"],
        "translationImpact": "Como isso afeta a leitura do texto"
      }
    ],
    "syntaxNotes": "Observações sintáticas/gramaticais se realmente relevantes"
  },
  "hermeneuticalDiagnosis": {
    "commonPopularReading": "Como a frase costuma ser usada/entendida",
    "whatGoesWrong": ["Lista objetiva de 1 a 5 erros interpretativos"],
    "whyItMatters": "Consequência teológica/pastoral do erro"
  },
  "correctExegesis": {
    "senseOriginal": "O que o texto significou no contexto original",
    "theologicalImplications": ["2 a 4 implicações teológicas coerentes"],
    "limitsAndCautions": ["1 a 3 limites (o que o texto NÃO está dizendo)"]
  },
  "canonicalSynthesis": {
    "analogyOfFaith": "Como harmoniza com o restante das Escrituras",
    "relatedDoctrines": ["Doutrinas envolvidas (ex: providência, sofrimento, santificação)"]
  },
  "recommendedVerses": [
    {
      "reference": "Livro Cap:Verso",
      "whyThisFits": "Justificativa curta e precisa"
    }
  ],
  "application": {
    "timelessPrinciple": "Princípio atemporal extraído com fidelidade",
    "contemporaryApplication": "Aplicação hoje, sem promessas indevidas",
    "misuseWarnings": ["1 a 3 alertas de mau uso"]
  },
  "confidence": {
    "level": "alta | media | baixa",
    "reason": "Por que o nível de confiança é esse"
  }
}
`;

export const PROMPT_PASTORAL_SIMPLIFICADO = (phrase: string) => `
Você é um pastor/educador bíblico com base sólida em hermenêutica. Explique de forma simples, acolhedora e direta, sem jargões, mas com fidelidade ao contexto bíblico. Use princípios semelhantes ao livro "Você Interpretou Errado": texto no contexto, gênero literário, e cuidado com frases populares.

Frase para analisar: "${phrase}"

Regras:
- Seja breve e claro.
- Se não existir na Bíblia, diga isso explicitamente.
- Se existir, mostre a referência correta e o “sentido principal”.
- Diga por que a frase é usada assim e qual o cuidado ao aplicá-la hoje.
- Evite polêmicas desnecessárias, mas não suavize erros claros.
- Não cite longos trechos bíblicos: apenas referências.

Retorne APENAS um JSON válido, sem markdown:

{
  "mode": "PASTORAL_SIMPLIFICADO",
  "phrase": "${phrase}",
  "isBiblical": true | false | "uncertain",
  "reference": "Livro Cap:Verso" | "Não existe na Bíblia" | "Incerto",
  "simpleContext": "Contexto em 2 a 4 frases",
  "whatPeopleUsuallyMean": "Em 1 a 2 frases",
  "whatTheBibleActuallyTeaches": "Em 2 a 5 frases",
  "commonMistake": "Em 1 a 2 frases",
  "safeApplicationToday": "Em 2 a 4 frases",
  "supportingVerses": ["1 a 3 referências úteis"]
}
`;

export const PROMPT_COMPARATIVO_INTERPRETACOES = (phrase: string) => `
Você é um analista bíblico que compara interpretações com honestidade e precisão. Seu trabalho é mapear leituras possíveis e avaliar qual é mais provável à luz do método histórico-gramatical e do contexto. Quando houver divergência entre tradições (por exemplo: reformada, arminiana/wesleyana, católica, pentecostal), descreva de modo respeitoso e fiel.

Analise: "${phrase}"

Regras:
- Se a frase não for bíblica, compare: (a) origem popular provável (b) textos usados para justificá-la (c) leitura correta desses textos.
- Apresente no mínimo 2 e no máximo 4 “leituras” (interpretações) relevantes.
- Para cada leitura: método, pontos fortes, pontos fracos, e onde o texto limita.
- Conclua com uma síntese: interpretação mais provável e por quê, sem ataques.

Retorne APENAS um JSON válido, sem markdown:

{
  "mode": "COMPARATIVO_INTERPRETACOES",
  "phrase": "${phrase}",
  "referenceStatus": {
    "existsInBible": true | false | "uncertain",
    "bestReference": "Livro Cap:Verso" | "Não existe na Bíblia" | "Incerto",
    "alternatives": ["até 5 referências alternativas"]
  },
  "contextSummary": "Resumo do contexto do texto-base (se houver)",
  "interpretations": [
    {
      "label": "Leitura A (ex: Popular/Devocional | Reformada | Wesleyana | Católica | Pentecostal | Acadêmica histórico-gramatical)",
      "coreClaim": "Tese central em 1 a 2 frases",
      "method": "Como chega nessa leitura (ex: leitura canônica, tipológica, literal, devocional)",
      "strengths": ["1 a 3 pontos fortes"],
      "weaknesses": ["1 a 3 pontos fracos/alertas"],
      "textConstraints": ["O que o texto permite e o que não permite"],
      "pastoralImpact": "Efeito prático (bom e ruim) de ensinar assim"
    }
  ],
  "mostProbableReading": {
    "label": "qual leitura venceu",
    "why": ["2 a 5 razões baseadas em contexto, gênero e linguagem"],
    "whatToAvoid": ["1 a 3 abusos comuns"]
  },
  "relatedVerses": ["1 a 3 referências coerentes com a síntese"]
}
`;

const PROMPT_PADRAO = (phrase: string) => `
Atue como um teólogo especializado em hermenêutica bíblica, exegese histórico-gramatical, teologia bíblica e sistemática, seguindo princípios semelhantes aos defendidos por obras como "Você Interpretou Errado".

Analise criticamente a seguinte frase popular atribuída à Bíblia ou de uso religioso: "${phrase}"

O meu objetivo é:

1. Verificar se a frase existe na Bíblia ou se é uma adaptação/distorção.
2. Identificar o gênero literário do texto bíblico relacionado (Lei, Narrativa, Poesia, Profecia, Evangelho, Epístola, Apocalíptico).
3. Reconstruir o contexto imediato (parágrafo/capítulo).
4. Explicar o contexto histórico-cultural original.
5. Analisar termos-chave no hebraico, aramaico ou grego (quando aplicável).
6. Diferenciar o significado original da aplicação contemporânea.
7. Identificar erros comuns de interpretação (isolamento de versículo, anacronismo, alegorização indevida, teologia popular, etc.).
8. Apresentar a interpretação correta com fidelidade ao autor bíblico e ao público original.
9. Demonstrar coerência com o todo das Escrituras (analogia da fé).
10. Oferecer uma aplicação equilibrada e responsável.

Retorne APENAS um objeto JSON válido, sem markdown, seguindo exatamente esta estrutura:

{
  "mode": "PADRAO",
  "phrase": "${phrase}",
  "existsInBible": true | false,
  "exactReference": "Referência bíblica exata ou 'Não existe na Bíblia'",
  "literaryGenre": "Lei | Narrativa | Poesia | Profecia | Evangelho | Epístola | Apocalíptico | Não aplicável",
  "fidelityGrade": "ALTA | MÉDIA | BAIXA",
  "immediateContext": "Resumo do contexto literário imediato (capítulo/parágrafo).",
  "historicalContext": "Contexto histórico-cultural original da passagem.",
  "linguisticAnalysis": "Análise técnica de termos relevantes no idioma original.",
  "commonInterpretation": "Como a frase é normalmente entendida popularmente.",
  "interpretiveError": "Descrição do erro hermenêutico (se houver).",
  "correctExegesis": "Interpretação correta segundo a metodologia histórico-gramatical.",
  "canonicalTheology": "Como o ensino se harmoniza com o restante das Escrituras.",
  "properRelatedVerses": ["1 a 3 versículos realmente coerentes com o ensino bíblico correto"],
  "balancedApplication": "Aplicação prática fiel ao contexto original, evitando distorções.",
  "hermeneuticalPrinciplesUsed": [
    "Contexto histórico-gramatical",
    "Análise sintática",
    "Analogia da fé",
    "Progressão da revelação"
  ]
}
`;

const PROMPT_FALLACY_LAB = (fallacy: string, verse: string, userResponse: string, mode: string) => `
Você é um avaliador hermenêutico especializado em exegese bíblica histórico-gramatical (CÉREBRO DO SISTEMA).

Sua função NÃO é devocional, nem apologética denominacional. 
Sua função é ANALISAR a interpretação do usuário e determinar se ela respeita a intenção original do texto bíblico.
Você funciona como um professor de seminário corrigindo uma prova discursiva.

PRINCÍPIOS DE CONDUTA:
- Nunca elogie sem avaliar.
- Nunca concorde sem verificar.
- Nunca espiritualize sem contexto.
- Seu papel é ensinar o usuário a interpretar o texto, não apenas explicar o texto.
- A Bíblia possui significado antes de possuir aplicação.
- Primeiro determine o que o autor quis comunicar ao público original; só depois avalie se a interpretação do usuário é válida.

METODOLOGIA OBRIGATÓRIA (Siga nesta ordem):
1. Contexto literário imediato.
2. Contexto histórico-cultural.
3. Gênero literário.
4. Gramática e semântica.
5. Teologia canônica (Escritura interpreta Escritura).
6. Aplicação legítima.

DETECÇÃO DE FALÁCIAS:
Identifique explicitamente: Texto-prova, Anacronismo, Narcigese, Alegorização indevida, Aplicação sem significado, Moralização do texto, ou Promessa universal indevida. Sempre nomeie a falácia pelo nome.

DADOS DA TAREFA:
Falácia Alvo: ${fallacy}
Texto Bíblico: ${verse}
Resposta do Aluno: "${userResponse}"
Modo de Resposta: ${mode}

NÍVAL DE PROFUNDIDADE (Baseado no modo):
- SE modo = "ACADEMICO_AVANCADO": Use linguagem técnica, termos originais e análise histórica profunda.
- SE modo = "PASTORAL_SIMPLIFICADO": Explique de forma clara e acessível sem perder precisão.
- SE modo = "COMPARATIVO_INTERPRETACOES": Mostre como diferentes tradições interpretaram o texto antes da conclusão.

REGRAS DE OURO:
- Nunca diga “esse versículo significa algo diferente para cada pessoa”.
- Nunca valide experiência pessoal como interpretação.
- Nunca transforme narrativa em mandamento sem base textual.
- Nunca aplique diretamente ao leitor moderno sem passar pelo público original.

Retorne APENAS um JSON válido nesta estrutura EXATA:
{
  "diagnostic": "DIAGNÓSTICO: (Classifique como Correta/Parcial/Incorreta e identifique a falácia)",
  "exegesis": "ANÁLISE EXEGÉTICA: (Significado original no contexto do autor/público)",
  "userError": "ONDE O USUÁRIO ERROU: (Aponte o erro interpretativo objetivamente)",
  "correctInterpretation": "COMO INTERPRETAR CORRETAMENTE: (Passo a passo da reconstrução)",
  "pedagogicalExplanation": "APLICAÇÃO LEGÍTIMA: (Aplicação possível sem distorção)",
  "comparison": {
    "user": "${userResponse}",
    "correct": "Resumo da exegese correta em 1 frase"
  },
  "progressImpact": {
    "identification": 20,
    "contextualization": 40,
    "application": 40,
    "total": 100
  }
}
`;

function getPromptForMode(mode: AnalysisMode, phrase: string): string {
  switch (mode) {
    case "ACADEMICO_AVANCADO": return PROMPT_ACADEMICO_AVANCADO(phrase);
    case "PASTORAL_SIMPLIFICADO": return PROMPT_PASTORAL_SIMPLIFICADO(phrase);
    case "COMPARATIVO_INTERPRETACOES": return PROMPT_COMPARATIVO_INTERPRETACOES(phrase);
    default: return PROMPT_PADRAO(phrase);
  }
}

function cleanAndParse(text: string, mode: AnalysisMode): AnalysisResult {
  const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
  const data: any = JSON.parse(cleanedText);

  // Ensure mode is set
  data.mode = data.mode || mode;
  data.phrase = data.phrase || "";

  return data as AnalysisResult;
}

async function analyzeWithGroq(phrase: string, mode: AnalysisMode): Promise<AnalysisResult | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: getPromptForMode(mode, phrase) }],
      response_format: { type: "json_object" }
    });

    const text = completion.choices[0]?.message?.content || "";
    return cleanAndParse(text, mode);
  } catch (error) {
    console.error("Groq API Error:", error);
    return null;
  }
}

async function analyzeWithOpenRouter(phrase: string, mode: AnalysisMode): Promise<AnalysisResult | null> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [{ role: "user", content: getPromptForMode(mode, phrase) }]
    });

    const text = completion.choices[0]?.message?.content || "";
    return cleanAndParse(text, mode);
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    return null;
  }
}

async function analyzeWithGemini(phrase: string, mode: AnalysisMode): Promise<AnalysisResult | null> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(getPromptForMode(mode, phrase));
    const text = result.response.text();
    return cleanAndParse(text, mode);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

export async function analyzePhrase(phrase: string, mode: AnalysisMode = "PADRAO"): Promise<AnalysisResult> {
  console.log(`Analyzing phrase: "${phrase}" in mode: ${mode}`);

  // Try providers in order
  const groqResult = await analyzeWithGroq(phrase, mode);
  if (groqResult) return groqResult;

  const openRouterResult = await analyzeWithOpenRouter(phrase, mode);
  if (openRouterResult) return openRouterResult;

  const geminiResult = await analyzeWithGemini(phrase, mode);
  if (geminiResult) return geminiResult;

  console.warn("All AI providers failed. Returning mock data.");
  return getMockAnalysis(phrase, mode);
}

export async function analyzeFallacy(fallacy: string, verse: string, userResponse: string, mode: AnalysisMode = "PADRAO"): Promise<FallacyAnalysisResult> {
  const prompt = PROMPT_FALLACY_LAB(fallacy, verse, userResponse, mode);

  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey) {
    const openai = new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1" });
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0]?.message?.content || "{}") as FallacyAnalysisResult;
  }

  throw new Error("AI analysis failed: No providers available for lab");
}

async function getMockAnalysis(phrase: string, mode: AnalysisMode): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

  // Return a basic mock structure based on mode
  if (mode === "PASTORAL_SIMPLIFICADO") {
    return {
      mode: "PASTORAL_SIMPLIFICADO",
      phrase,
      isBiblical: false,
      reference: "Não existe na Bíblia",
      simpleContext: "Este é um ditado popular comumente usado em contextos religiosos.",
      whatPeopleUsuallyMean: "Que Deus ajuda apenas quem se esforça.",
      whatTheBibleActuallyTeaches: "A Bíblia ensina sobre o trabalho árduo, mas foca na Graça e Providência.",
      commonMistake: "Tornar a benção de Deus puramente meritocrática.",
      safeApplicationToday: "Trabalhe com dedicação, mas confie na soberania de Deus.",
      supportingVerses: ["Salmos 127:1"]
    };
  }

  // Default fallback to PADRAO for simplicity in mock
  return {
    mode: "PADRAO",
    phrase: phrase,
    existsInBible: false,
    exactReference: "Não existe na Bíblia",
    literaryGenre: "Não aplicável",
    fidelityGrade: "BAIXA",
    immediateContext: "Mock fallback Context",
    historicalContext: "Mock fallback Context",
    linguisticAnalysis: "Mock fallback Analysis",
    commonInterpretation: "Mock Interpretation",
    interpretiveError: "Mock Error",
    correctExegesis: "Mock Correct Exegesis",
    canonicalTheology: "Mock Theology",
    properRelatedVerses: ["João 3:16"],
    balancedApplication: "Mock Application",
    hermeneuticalPrinciplesUsed: ["Contexto"]
  };
  // ... existing code ...
  return {
    mode: "PADRAO",
    phrase: phrase,
    existsInBible: false,
    exactReference: "Não existe na Bíblia",
    literaryGenre: "Não aplicável",
    fidelityGrade: "BAIXA",
    immediateContext: "Mock fallback Context",
    historicalContext: "Mock fallback Context",
    linguisticAnalysis: "Mock fallback Analysis",
    commonInterpretation: "Mock Interpretation",
    interpretiveError: "Mock Error",
    correctExegesis: "Mock Correct Exegesis",
    canonicalTheology: "Mock Theology",
    properRelatedVerses: ["João 3:16"],
    balancedApplication: "Mock Application",
    hermeneuticalPrinciplesUsed: ["Contexto"]
  };
}

// --- OUTLINE GENERATION (ESBOÇO) ---

export interface OutlineRequest {
  title: string;
  theme: string;
  studyType: "Expositivo (Verso por Verso)" | "Textual (Análise de Palavras)" | "Temático (Por Tópicos)" | "Narrativo (Histórico)" | "Verso a Verso (Estudo Intensivo)";
  bibleVersion: string;
  extraInstructions?: string;
}

export const PROMPT_OUTLINE = (req: OutlineRequest) => `
Você é um assistente teológico especializado em criar esboços de pregação e estudos bíblicos profundos e estruturados.

Gere um esboço detalhado com base nos seguintes dados:
- Título: ${req.title}
- Tema: ${req.theme}
- Tipo de Estudo: ${req.studyType}
- Versão da Bíblia: ${req.bibleVersion}
- Instruções Extras: ${req.extraInstructions || "Nenhuma"}

O sistema DEVE retornar o conteúdo formatado em MARKDOWN, seguindo rigorosamente a estrutura abaixo:

# ${req.title}

## Introdução ao Contexto
(Contexto do Livro, Situação Histórica e Cultural, Estrutura Literária)

## Estrutura e Análise
(Divida o texto base em seções lógicas de acordo com o Tipo de Estudo escolhido. Para cada seção, faça uma exposição detalhada).

### Análise Textual
- Contexto do Livro (autor, época, propósito)
- Contexto do Capítulo e do Livro
- Contexto Histórico e Cultural
- Geografia e Locais mencionados
- Estrutura gramatical e sintaxe
- Estilo Literário (poesia, prosa, parábola)
- Abordagem Devocional e Espiritual

### Análise Linguística
- Palavras do Original (Hebraico/Grego)
- Significado etimológico
- Palavras-chave e seus significados
- Análise Teológica Profunda

### Conexões Bíblicas
- Referências Cruzadas
- Ligação com a Lei (Pentateuco)
- Ligação com os Profetas
- Ligação com os Evangelhos
- Ligação com as Epístolas
- Contexto Histórico Profético
- Conexão Escatológica
- Paralelos no Antigo/Novo Testamento
- Conexões com a tradição da época

### Análise Contextual Profunda
- Perspectiva Judaica (Talmud, Midrash, Mishná)
- Contexto Escatológico (últimos dias, apocalíptico)
- Provas Arqueológicas e Achados
- Período Histórico do Acontecimento

### Aplicação Prática
- Aplicação ao contexto moderno
- Verdades eternas do texto
- Desafios práticos e comportamentais

---
IMPORTANTE:
- Use formatação Markdown (negrito, itálico, listas, citações).
- Seja profundo teologicamente, acadêmico mas com aplicação pastoral.
- Cite versículos chave.
- Se o usuário pediu uma versão específica da Bíblia, use a fraseologia dela quando possível.
`;

export async function generateOutline(req: OutlineRequest): Promise<string> {
  const prompt = PROMPT_OUTLINE(req);
  const apiKey = process.env.GROQ_API_KEY;

  // Tenta usar Groq primeiro (Llama 3 é ótimo para textos longos estruturados em português)
  if (apiKey) {
    try {
      const openai = new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1" });
      const completion = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
      });
      return completion.choices[0]?.message?.content || "Erro ao gerar esboço.";
    } catch (e) {
      console.error("Groq failed, trying fallback...", e);
    }
  }

  // Fallback para Google Gemini
  const googleKey = process.env.GOOGLE_API_KEY;
  if (googleKey) {
    try {
      const genAI = new GoogleGenerativeAI(googleKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (e) {
      console.error("Gemini failed", e);
      return "Erro ao gerar esboço. Verifique suas chaves de API.";
    }
  }

  return "Nenhuma chave de API configurada para gerar o esboço.";
}
