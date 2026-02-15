"use client";

import styles from "./OldTestament.module.css";
import dynamic from 'next/dynamic';

const MarkmapViewer = dynamic(() => import('@/components/MarkmapViewer'), {
    ssr: false,
    loading: () => <div className={styles.loading}>Carregando mapa mental...</div>
});

const MARKDOWN_CONTENT = `# Antigo Testamento

## Pentateuco (Lei)
- **Gênesis**: Criação, Queda, Dilúvio, Patriarcas
- **Êxodo**: Escravidão, Libertação, Lei, Tabernáculo
- **Levítico**: Santidade, Sacrifícios, Festas
- **Números**: Censo, Peregrinação no Deserto
- **Deuteronômio**: Renovação da Aliança, Bênçãos e Maldições

## Livros Históricos
- **Josué**: Conquista da Terra
- **Juízes**: Ciclos de Apostasia e Libertação
- **Rute**: O Parente Redentor
- **1 e 2 Samuel**: Estabelecimento da Monarquia (Saul e Davi)
- **1 e 2 Reis**: Divisão do Reino, Exílio
- **1 e 2 Crônicas**: História sob a Perspectiva Sacerdotal
- **Esdras**: Reconstrução do Templo
- **Neemias**: Reconstrução dos Muros
- **Ester**: Providência Divina na Pérsia

## Livros Poéticos
- **Jó**: Sofrimento e Soberania de Deus
- **Salmos**: Louvor e Adoração
- **Provérbios**: Sabedoria Prática
- **Eclesiastes**: O Sentido da Vida
- **Cantares**: O Amor Conjugal

## Profetas Maiores
- **Isaías**: O Messias Sofredor e Rei
- **Jeremias**: O Profeta Chorão, Nova Aliança
- **Lamentações**: Lamento pela Destruição de Jerusalém
- **Ezequiel**: A Glória do Senhor, Restauração
- **Daniel**: Soberania de Deus sobre os Impérios

## Profetas Menores
- **Oseias**: O Amor de Deus pelo Povo Infiel
- **Joel**: O Dia do Senhor
- **Amós**: Justiça Social
- **Obadias**: Julgamento de Edom
- **Jonas**: A Misericórdia de Deus para com os Gentios
- **Miqueias**: O Rei Nascido em Belém
- **Naum**: Julgamento de Nínive
- **Habacuque**: O Justo Viverá pela Fé
- **Sofonias**: O Dia da Ira do Senhor
- **Ageu**: Prioridade na Reconstrução do Templo
- **Zacarias**: O Rei Humilde e Sacerdote
- **Malaquias**: O Mensageiro da Aliança
`;

export default function OldTestamentMindMap() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mapa Mental: Antigo Testamento</h1>
                <p className={styles.subtitle}>Uma visão panorâmica da aliança e da história da redenção antes de Cristo.</p>
            </header>

            <div className={styles.mindMapContainer}>
                <MarkmapViewer markdown={MARKDOWN_CONTENT} />
            </div>

            <div className={styles.infoBox}>
                <h3>Dica de Estudo</h3>
                <p>Use o zoom e arraste para explorar os detalhes de cada seção do Antigo Testamento.</p>
            </div>
        </div>
    );
}
