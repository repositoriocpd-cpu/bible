"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen } from "lucide-react";
import styles from "./HeroSection.module.css";

const EXAMPLES = [
    "Deus ajuda quem cedo madruga",
    "O dinheiro é a raiz de todos os males",
    "Na presença de Deus até a tristeza salta de alegria",
    "Fazer o bem sem olhar a quem",
];

export default function HeroSection() {
    const [phrase, setPhrase] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAnalyze = async (text: string) => {
        if (!text.trim()) return;
        setIsLoading(true);

        // In a real app, we might create the analysis ID here or pass the phrase.
        // For simplicity, we'll pass it as a query param or use a context.
        // Using query param for MVP.
        router.push(`/analyze?phrase=${encodeURIComponent(text)}`);
    };

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <BookOpen size={48} className={styles.icon} />
                </div>
                <h1 className={styles.title}>RAIZ DO TEXTO</h1>
                <p className={styles.subtitle}>
                    Diferencie a tradição religiosa do sentido original do texto bíblico.
                    <br />
                    Análise histórico-gramatical com inteligência artificial.
                </p>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Digite uma frase atribuída à Bíblia..."
                        value={phrase}
                        onChange={(e) => setPhrase(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAnalyze(phrase)}
                    />
                    <button
                        className={styles.button}
                        onClick={() => handleAnalyze(phrase)}
                        disabled={isLoading || !phrase.trim()}
                    >
                        {isLoading ? "ANALISANDO..." : "ANALISAR TEXTO"}
                    </button>
                </div>

                <div className={styles.examples}>
                    <p className={styles.examplesLabel}>Exemplos populares:</p>
                    <div className={styles.tags}>
                        {EXAMPLES.map((ex, i) => (
                            <button
                                key={i}
                                className={styles.tag}
                                onClick={() => {
                                    setPhrase(ex);
                                    handleAnalyze(ex);
                                }}
                            >
                                "{ex}"
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
