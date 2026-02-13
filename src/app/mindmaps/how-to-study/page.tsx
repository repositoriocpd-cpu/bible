"use client";

import styles from "./HowToStudy.module.css";
import { BookMarked, Search, PenTool, Lightbulb, CheckCircle } from "lucide-react";

export default function HowToStudyMindMap() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Como Estudar a Bíblia</h1>
                <p className={styles.subtitle}>Um guia visual para o método de Estudo Bíblico Indutivo.</p>
            </header>

            <div className={styles.steps}>
                {/* Passo 1: Observação */}
                <div className={styles.stepCard} style={{ "--color": "#E89946" } as any}>
                    <div className={styles.stepIcon}>
                        <Search size={32} />
                    </div>
                    <div className={styles.stepContent}>
                        <h2>1. Observação</h2>
                        <p className={styles.question}>"O que o texto diz?"</p>
                        <ul className={styles.checkList}>
                            <li>Quem são os personagens?</li>
                            <li>Onde ocorre a ação?</li>
                            <li>Quais são as palavras-chave?</li>
                            <li>Existem contrastes ou repetições?</li>
                        </ul>
                    </div>
                </div>

                {/* Passo 2: Interpretação */}
                <div className={styles.stepCard} style={{ "--color": "#3B82F6" } as any}>
                    <div className={styles.stepIcon}>
                        <Lightbulb size={32} />
                    </div>
                    <div className={styles.stepContent}>
                        <h2>2. Interpretação</h2>
                        <p className={styles.question}>"O que o texto significa?"</p>
                        <ul className={styles.checkList}>
                            <li>Qual o contexto histórico?</li>
                            <li>Qual a intenção original do autor?</li>
                            <li>Como o texto harmoniza com a Bíblia?</li>
                            <li>Evite anacronismos e alegorias livres.</li>
                        </ul>
                    </div>
                </div>

                {/* Passo 3: Correlação */}
                <div className={styles.stepCard} style={{ "--color": "#10B981" } as any}>
                    <div className={styles.stepIcon}>
                        <BookMarked size={32} />
                    </div>
                    <div className={styles.stepContent}>
                        <h2>3. Correlação</h2>
                        <p className={styles.question}>"Como isso se encaixa no todo?"</p>
                        <ul className={styles.checkList}>
                            <li>Compare com outros versículos.</li>
                            <li>Como aponta para Cristo?</li>
                            <li>Quais doutrinas estão envolvidas?</li>
                        </ul>
                    </div>
                </div>

                {/* Passo 4: Aplicação */}
                <div className={styles.stepCard} style={{ "--color": "#8B5CF6" } as any}>
                    <div className={styles.stepIcon}>
                        <PenTool size={32} />
                    </div>
                    <div className={styles.stepContent}>
                        <h2>4. Aplicação</h2>
                        <p className={styles.question}>"Como isso muda minha vida?"</p>
                        <ul className={styles.checkList}>
                            <li>Existe um exemplo a seguir?</li>
                            <li>Existe um erro a evitar?</li>
                            <li>Há uma promessa a crer?</li>
                            <li>Como posso agir hoje?</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryIcon}>
                    <CheckCircle size={40} />
                </div>
                <h3>O Alvo Final</h3>
                <p>O objetivo do estudo bíblico não é apenas informação, mas <strong>transformação</strong>.</p>
            </div>
        </div>
    );
}
