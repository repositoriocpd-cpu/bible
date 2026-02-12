"use client";

import { useEffect, useState, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation";
import AnalysisResult from "@/components/AnalysisResult";
import { AnalysisResult as AnalysisType } from "@/lib/ai-service";
import styles from "./page.module.css";
import { Loader2 } from "lucide-react";

function AnalyzeContent() { // Inner component that uses useSearchParams
    const searchParams = useSearchParams();
    const phrase = searchParams.get("phrase");

    const [analysis, setAnalysis] = useState<AnalysisType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!phrase) return;

        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phrase }),
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

        fetchData();
    }, [phrase]);

    if (!phrase) {
        return <div className={styles.empty}>Por favor, infome uma frase na página inicial.</div>;
    }

    if (loading) {
        return (
            <div className={styles.loading}>
                <Loader2 className={styles.spinner} size={48} />
                <p>Analisando textos originais e contexto histórico...</p>
            </div>
        );
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <main className={styles.main}>
            {analysis && <AnalysisResult analysis={analysis} />}
        </main>
    );
}

export default function AnalyzePage() {
    return (
        <Suspense fallback={<div className={styles.loading}><Loader2 className={styles.spinner} size={48} /></div>}>
            <AnalyzeContent />
        </Suspense>
    );
}
