"use client";

import styles from "./OldTestament.module.css";
import { Book, Compass, Map, MessageSquare } from "lucide-react";

export default function OldTestamentMindMap() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mapa Mental: Antigo Testamento</h1>
                <p className={styles.subtitle}>Uma visão panorâmica da aliança e da história da redenção antes de Cristo.</p>
            </header>

            <div className={styles.mindMap}>
                {/* Pentateuco */}
                <div className={styles.node} style={{ "--color": "#E89946" } as any}>
                    <div className={styles.nodeHeader}>
                        <Book size={24} />
                        <h2>Pentateuco</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Gênesis:</strong> Origens e Promessa</li>
                        <li><strong>Êxodo:</strong> Redenção e Lei</li>
                        <li><strong>Levítico:</strong> Santidade e Sacrifício</li>
                        <li><strong>Números:</strong> Jornada no Deserto</li>
                        <li><strong>Deuteronômio:</strong> Renovação da Aliança</li>
                    </ul>
                </div>

                {/* Históricos */}
                <div className={styles.node} style={{ "--color": "#3B82F6" } as any}>
                    <div className={styles.nodeHeader}>
                        <Map size={24} />
                        <h2>Livros Históricos</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Conquista:</strong> Josué</li>
                        <li><strong>Juízes:</strong> Ciclo de Apostasia</li>
                        <li><strong>Monarquia:</strong> Samuel, Reis, Crônicas</li>
                        <li><strong>Exílio/Retorno:</strong> Esdras, Neemias, Ester</li>
                    </ul>
                </div>

                {/* Poéticos */}
                <div className={styles.node} style={{ "--color": "#10B981" } as any}>
                    <div className={styles.nodeHeader}>
                        <Compass size={24} />
                        <h2>Poéticos e Sabedoria</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Sofrimento:</strong> Jó</li>
                        <li><strong>Louvor:</strong> Salmos</li>
                        <li><strong>Sabedoria:</strong> Provérbios, Eclesiastes</li>
                        <li><strong>Amor:</strong> Cantares</li>
                    </ul>
                </div>

                {/* Profetas */}
                <div className={styles.node} style={{ "--color": "#8B5CF6" } as any}>
                    <div className={styles.nodeHeader}>
                        <MessageSquare size={24} />
                        <h2>Profetas (Maiores/Menores)</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Julgamento:</strong> Advertência contra o pecado</li>
                        <li><strong>Esperança:</strong> O Messias prometido</li>
                        <li><strong>Restauração:</strong> Futuro de Israel e Nações</li>
                    </ul>
                </div>
            </div>

            <div className={styles.infoBox}>
                <h3>Dica de Estudo</h3>
                <p>O Antigo Testamento aponta para o Novo. Procure por "Tipos de Cristo" em cada uma destas seções.</p>
            </div>
        </div>
    );
}
