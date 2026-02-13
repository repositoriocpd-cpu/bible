"use client";

import styles from "./NewTestament.module.css";
import { Book, Compass, Globe, MessageSquare } from "lucide-react";

export default function NewTestamentMindMap() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mapa Mental: Novo Testamento</h1>
                <p className={styles.subtitle}>A consumação das promessas e a fundação da Igreja através de Jesus Cristo.</p>
            </header>

            <div className={styles.mindMap}>
                {/* Evangelhos */}
                <div className={styles.node} style={{ "--color": "#E89946" } as any}>
                    <div className={styles.nodeHeader}>
                        <Book size={24} />
                        <h2>Evangelhos</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Mateus:</strong> Jesus, o Rei Messias</li>
                        <li><strong>Marcos:</strong> Jesus, o Servo Sofredor</li>
                        <li><strong>Lucas:</strong> Jesus, o Filho do Homem</li>
                        <li><strong>João:</strong> Jesus, o Filho de Deus</li>
                    </ul>
                </div>

                {/* Igreja e Atos */}
                <div className={styles.node} style={{ "--color": "#3B82F6" } as any}>
                    <div className={styles.nodeHeader}>
                        <Globe size={24} />
                        <h2>História da Igreja</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Atos:</strong> Expansão do Evangelho</li>
                        <li><strong>Liderança:</strong> Pedro e Paulo</li>
                        <li><strong>Poder:</strong> Descida do Espírito Santo</li>
                    </ul>
                </div>

                {/* Epístolas */}
                <div className={styles.node} style={{ "--color": "#10B981" } as any}>
                    <div className={styles.nodeHeader}>
                        <Compass size={24} />
                        <h2>Epístolas (Cartas)</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Paulinas:</strong> Doutrina e Prática (13 cartas)</li>
                        <li><strong>Gerais:</strong> Hebreus a Judas</li>
                        <li><strong>Foco:</strong> Teologia aplicada à vida cristã</li>
                    </ul>
                </div>

                {/* Apocalíptico */}
                <div className={styles.node} style={{ "--color": "#8B5CF6" } as any}>
                    <div className={styles.nodeHeader}>
                        <MessageSquare size={24} />
                        <h2>Profecia / Apocalipse</h2>
                    </div>
                    <ul className={styles.nodeList}>
                        <li><strong>Vitória:</strong> O Triunfo do Cordeiro</li>
                        <li><strong>Juízo:</strong> O destino final das nações</li>
                        <li><strong>Eternidade:</strong> Novos Céus e Nova Terra</li>
                    </ul>
                </div>
            </div>

            <div className={styles.infoBox}>
                <h3>Dica de Estudo</h3>
                <p>O Novo Testamento explica como a Aliança de Deus se cumpre em Cristo para todas as nações.</p>
            </div>
        </div>
    );
}
