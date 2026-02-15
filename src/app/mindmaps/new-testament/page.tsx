"use client";

import styles from "./NewTestament.module.css";
import dynamic from 'next/dynamic';

const MarkmapViewer = dynamic(() => import('@/components/MarkmapViewer'), {
    ssr: false,
    loading: () => <div className={styles.loading}>Carregando mapa mental...</div>
});

const MARKDOWN_CONTENT = `# Novo Testamento

## Evangelhos (Biografia de Cristo)
- **Mateus**: Jesus, o Rei dos Judeus (Cumprimento das Profecias)
- **Marcos**: Jesus, o Servo Sofredor (Ação Imediata)
- **Lucas**: Jesus, o Filho do Homem (Salvador Universal)
- **João**: Jesus, o Filho de Deus (Verbo Divino)

## História
- **Atos dos Apóstolos**: O Nascimento e Expansão da Igreja

## Epístolas Paulinas
- **Romanos**: A Justiça de Deus pela Fé
- **1 e 2 Coríntios**: Problemas na Igreja e Defesa do Ministério
- **Gálatas**: Liberdade em Cristo vs. Legalismo
- **Efésios**: A Unidade da Igreja em Cristo
- **Filipenses**: Alegria no Sofrimento
- **Colossenses**: A Supremacia de Cristo
- **1 e 2 Tessalonicenses**: A Segunda Vinda de Cristo
- **1 e 2 Timóteo**: Instruções Pastorais
- **Tito**: A Vida Cristã e a Liderança
- **Filemom**: Perdão e Reconciliação

## Epístolas Gerais
- **Hebreus**: A Superioridade de Cristo sobre a Antiga Aliança
- **Tiago**: A Fé em Ação
- **1 e 2 Pedro**: Esperança no Sofrimento e Falsos Mestres
- **1, 2 e 3 João**: Amor, Verdade e Comunhão
- **Judas**: Contenda pela Fé

## Profecia
- **Apocalipse**: A Vitória Final de Cristo e o Fim dos Tempos
`;

export default function NewTestamentMindMap() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mapa Mental: Novo Testamento</h1>
                <p className={styles.subtitle}>A consumação das promessas e a fundação da Igreja através de Jesus Cristo.</p>
            </header>

            <div className={styles.mindMapContainer}>
                <MarkmapViewer markdown={MARKDOWN_CONTENT} />
            </div>

            <div className={styles.infoBox}>
                <h3>Dica de Estudo</h3>
                <p>Explore como os Evangelhos fundamentam a fé, Atos narra a expansão e as Epístolas ensinam a doutrina.</p>
            </div>
        </div>
    );
}
