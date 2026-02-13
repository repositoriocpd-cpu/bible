"use client";

import { useEffect, useState, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation";
import AnalysisResult from "@/components/AnalysisResult";
import { AnalysisResult as AnalysisType } from "@/lib/ai-service";
import styles from "./page.module.css";
import { Loader2 } from "lucide-react";

import { AnalysisMode } from "@/lib/ai-service";
import { GraduationCap, Heart, Repeat, Search } from "lucide-react";

function AnalyzeContent() {
    const searchParams = useSearchParams();
    const initialPhrase = searchParams.get("phrase") || "";

    const [phrase, setPhrase] = useState(initialPhrase);
    const [mode, setMode] = useState<AnalysisMode>("PADRAO");
    const [analysis, setAnalysis] = useState<AnalysisType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = async (targetPhrase: string, targetMode: AnalysisMode) => {
        if (!targetPhrase) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phrase: targetPhrase, mode: targetMode }),
            });

            if (!res.ok) throw new Error("Falha na análise");

            const data = await res.json();
            setAnalysis(data);
        } catch (err) {
            setError("Ocorreu um erro ao processar a análise. Tente novamente.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialPhrase) {
            fetchData(initialPhrase, mode);
        }
    }, [initialPhrase]);

    if (!initialPhrase && !analysis) {
        return <div className={styles.empty}>Por favor, informe uma frase na página inicial.</div>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.controls}>
                <div className={styles.modeSelector}>
                    <button
                        className={clsx(styles.modeBtn, mode === "PADRAO" && styles.active)}
                        onClick={() => { setMode("PADRAO"); fetchData(phrase, "PADRAO"); }}
                    >
                        Padrao
                    </button>
                    <button
                        className={clsx(styles.modeBtn, mode === "ACADEMICO_AVANCADO" && styles.active)}
                        onClick={() => { setMode("ACADEMICO_AVANCADO"); fetchData(phrase, "ACADEMICO_AVANCADO"); }}
                    >
                        <GraduationCap size={16} /> Acadêmico
                    </button>
                    <button
                        className={clsx(styles.modeBtn, mode === "PASTORAL_SIMPLIFICADO" && styles.active)}
                        onClick={() => { setMode("PASTORAL_SIMPLIFICADO"); fetchData(phrase, "PASTORAL_SIMPLIFICADO"); }}
                    >
                        <Heart size={16} /> Pastoral
                    </button>
                    <button
                        className={clsx(styles.modeBtn, mode === "COMPARATIVO_INTERPRETACOES" && styles.active)}
                        onClick={() => { setMode("COMPARATIVO_INTERPRETACOES"); fetchData(phrase, "COMPARATIVO_INTERPRETACOES"); }}
                    >
                        <Repeat size={16} /> Comparativo
                    </button>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>
                    <Loader2 className={styles.spinner} size={48} />
                    <p>Processando análise no modo {mode.replace("_", " ")}...</p>
                </div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : (
                analysis && <AnalysisResult analysis={analysis} />
            )}
        </main>
    );
}

import clsx from "clsx";

export default function AnalyzePage() {
    return (
        <Suspense fallback={<div className={styles.loading}><Loader2 className={styles.spinner} size={48} /></div>}>
            <AnalyzeContent />
        </Suspense>
    );
}
