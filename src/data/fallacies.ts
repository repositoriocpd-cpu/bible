export interface FallacyDetail {
    id: string;
    title: string;
    formalDefinition: string;
    pastoralDefinition: string;
    doctrineDanger: string;
    historicalExamples: Array<{
        period: string;
        description: string;
    }>;
    initialCases: Array<{
        verse: string;
        popularInterpretation: string;
        originalContext: string;
        theologicalExplanation: string;
        pastoralExplanation: string;
    }>;
    sampleExercise: {
        verse: string;
        instruction: string;
    };
}

export const FALLACY_DETAILS: Record<string, FallacyDetail> = {
    "proof-texting": {
        id: "proof-texting",
        title: "Texto-Prova",
        formalDefinition: "A falácia de isolar um fragmento textual de seu contexto literário e histórico para sustentar uma tese dogmática prévia.",
        pastoralDefinition: "É quando usamos um 'pedacinho' da Bíblia para forçar uma ideia que nós já temos, ignorando o que o autor realmente queria dizer.",
        doctrineDanger: "Pode levar à criação de heresias baseadas em versículos soltos, distorcendo o caráter de Deus e a ética cristã.",
        historicalExamples: [
            { period: "Era Moderna", description: "Uso de Filipenses 4:13 ('Tudo posso naquele que me fortalece') para justificar sucesso financeiro ou conquistas atléticas, ignorando que o contexto trata de contentamento no sofrimento." }
        ],
        initialCases: [
            {
                verse: "Filipenses 4:13",
                popularInterpretation: "Posso conquistar qualquer coisa (dinheiro, bens, vitórias) porque Deus me dá força.",
                originalContext: "Paulo está na prisão e fala sobre ter aprendido a viver contente tanto na fartura quanto na necessidade extrema.",
                theologicalExplanation: "A 'força' aqui é a capacitação divina para suportar tribulações, não força para autoglorificação ou prosperidade material.",
                pastoralExplanation: "Deus nos fortalece para sermos fiéis nos dias difíceis, nos ensinando que Ele é o nosso maior tesouro."
            }
        ],
        sampleExercise: {
            verse: "Habacuque 1:13a - 'Tu és tão puro de olhos, que não podes ver o mal...'",
            instruction: "Muitos usam esse texto para dizer que Deus 'vira o rosto' quando pecamos. Analise se isso condiz com o restante do livro de Habacuque."
        }
    },
    "anachronism": {
        id: "anachronism",
        title: "Anacronismo",
        formalDefinition: "O erro de projetar conceitos, valores ou realidades contemporâneas sobre o texto bíblico, desconsiderando a distância cultural e temporal.",
        pastoralDefinition: "É ler a Bíblia como se tivesse sido escrita hoje de manhã, esquecendo que ela foi escrita em uma cultura e tempo totalmente diferentes do nosso.",
        doctrineDanger: "Resulta em uma interpretação moralista ou política que o autor original nunca pretendeu, esvaziando o texto de sua autoridade original.",
        historicalExamples: [
            { period: "Medieval", description: "Interpretação das leis de pureza de Levítico como se fossem apenas regras de higiene sanitária moderna, ignorando o conceito bíblico de santidade ritual." }
        ],
        initialCases: [
            {
                verse: "Jeremias 29:11",
                popularInterpretation: "Deus tem um plano de prosperidade individual para a minha carreira e vida pessoal.",
                originalContext: "Deus fala através de Jeremias para exilados na Babilônia que ficariam lá por 70 anos. O 'bem' era a preservação do povo como nação.",
                theologicalExplanation: "A promessa é coletiva e escatológica, focada na restauração da aliança, não em sucesso pessoal imediato.",
                pastoralExplanation: "Mesmo em tempos de crise e 'exílio', os planos de Deus para o Seu povo são de redenção e esperança final."
            }
        ],
        sampleExercise: {
            verse: "Mateus 5:41 - 'E, se qualquer te obrigar a caminhar uma milha, vai com ele duas.'",
            instruction: "Hoje entendemos isso como 'gentileza'. Mas no contexto romano, o que significava um soldado obrigar um judeu a carregar sua carga?"
        }
    },
    "narcigesis": {
        id: "narcigesis",
        title: "Narcigese",
        formalDefinition: "Uma subcategoria da eisegese onde o intérprete lê o texto bíblico como se o assunto principal fosse ele mesmo, distorcendo a narrativa cristocêntrica em antropocêntrica.",
        pastoralDefinition: "É quando a gente lê a Bíblia procurando 'onde eu estou nesse texto', transformando Deus em um coadjuvante da nossa própria história.",
        doctrineDanger: "Esvazia o Evangelho de seu poder redentor, pois o foco sai da obra de Cristo e passa para o esforço ou sentimentos do homem.",
        historicalExamples: [
            { period: "Contemporâneo", description: "Interpretação da luta entre Davi e Golias como uma metáfora para 'vencer os seus próprios gigantes' (medo, dívidas, etc.), ignorando que Davi representa o Ungido de Deus protegendo a aliança." }
        ],
        initialCases: [
            {
                verse: "1 Samuel 17 (Davi e Golias)",
                popularInterpretation: "Você é Davi e seus problemas são Golias. Use as pedras da fé para vencer seus desafios pessoais.",
                originalContext: "Davi, o ungido de Deus, defende a honra de Javé contra um inimigo que desafiava o exército do Deus vivo.",
                theologicalExplanation: "A história aponta para a vitória do Messias (o verdadeiro Davi) sobre os inimigos de Deus. Nós somos mais parecidos com o exército de Israel com medo, precisando de um salvador.",
                pastoralExplanation: "Nossa esperança não está em ser 'grandes' como Davi, mas em saber que o nosso Rei venceu a batalha que nós nunca poderíamos vencer."
            }
        ],
        sampleExercise: {
            verse: "João 11:43 - 'Lázaro, vem para fora!'",
            instruction: "Alguns pregadores dizem: 'Saia do túmulo da sua depressão/desemprego'. Como o contexto de ressurreição física de Lázaro limita essa aplicação?"
        }
    },
    "allegory": {
        id: "allegory",
        title: "Alegorização",
        formalDefinition: "O método de interpretação que busca um sentido espiritual 'escondido' por trás do sentido literal e histórico, muitas vezes sem qualquer conexão gramatical com o texto.",
        pastoralDefinition: "É quando a gente 'viaja na maionese' e começa a inventar significados mágicos para cada detalhe do texto (ex: o número de janelas, a cor de um tapete) sem que o autor tenha dito isso.",
        doctrineDanger: "Torna a interpretação subjetiva e incontrolável. Se o texto pode significar qualquer coisa espiritual, ele acaba não significando nada com autoridade.",
        historicalExamples: [
            { period: "Patrística (Escola de Alexandria)", description: "Interpretação da parábola do Bom Samaritano onde o jumento é a Igreja, a estalagem é o batismo, e o hospedeiro é o apóstolo Paulo." }
        ],
        initialCases: [
            {
                verse: "Cântico dos Cânticos",
                popularInterpretation: "Cada detalhe erótico é puramente uma representação da relação mística de Cristo com a alma individual.",
                originalContext: "Uma coleção de poemas de amor celebrando a beleza do relacionamento conjugal e físico entre um homem e uma mulher.",
                theologicalExplanation: "Embora aponte para o amor na criação e possa tipificar o amor de Deus, alegorizar cada termo anatômico distorce a intenção de celebrar o casamento divino.",
                pastoralExplanation: "A Bíblia valoriza o amor e o casamento humano. Não precisamos espiritualizar tudo para que o texto tenha valor para nós."
            }
        ],
        sampleExercise: {
            verse: "Gênesis 6:14 - 'Faze para ti uma arca de madeira de gofer; farás compartimentos na arca e a betumarás por dentro e por fora com betume.'",
            instruction: "Se alguém disser que o 'betume por fora' representa a proteção de Deus contra o mundo e o 'por dentro' contra o pecado, isso é exegese ou alegoria?"
        }
    }
};
