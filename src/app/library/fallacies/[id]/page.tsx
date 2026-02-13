"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ChevronLeft,
    BookOpen,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Brain,
    History,
    ShieldAlert,
    GraduationCap,
    Send
} from "lucide-react";
import styles from "./FallacyLab.module.css";
import { FALLACY_DETAILS, FallacyDetail } from "@/data/fallacies";
import clsx from "clsx";

type Step = "intro" | "case" | "exercise" | "analysis" | "review";

export default function FallacyLabPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const fallacy = FALLACY_DETAILS[id];

    const [currentStep, setCurrentStep] = useState<Step>("intro");
    const [userResponse, setUserResponse] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [progress, setProgress] = useState(0);

    if (!fallacy) {
        return (
            <div className={styles.errorContainer}>
                <h1>Falácia não encontrada</h1>
                <Link href="/library" className={styles.backBtn}>Voltar para a Biblioteca</Link>
            </div>
        );
    }

    const handleNext = () => {
        if (currentStep === "intro") setCurrentStep("case");
        else if (currentStep === "case") setCurrentStep("exercise");
        else if (currentStep === "exercise") setCurrentStep("analysis"); // This will trigger AI
        else if (currentStep === "analysis") setCurrentStep("review");
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const res = await fetch("/api/library/fallacies/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fallacy: fallacy.title,
                    verse: fallacy.sampleExercise.verse,
                    userResponse,
                    mode: "PADRAO" // Default for now
                })
            });
            const data = await res.json();
            setAnalysisResult(data);
            setCurrentStep("analysis");
        } catch (error) {
            console.error("Erro na análise:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const steps = [
        { id: "intro", label: "Introdução", icon: <BookOpen size={16} /> },
        { id: "case", label: "Caso Real", icon: <History size={16} /> },
        { id: "exercise", label: "Exercício", icon: <Brain size={16} /> },
        { id: "analysis", label: "Análise IA", icon: <GraduationCap size={16} /> },
        { id: "review", label: "Progresso", icon: <CheckCircle size={16} /> }
    ];

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <button onClick={() => router.back()} className={styles.backLink}>
                        <ChevronLeft size={20} /> Voltar
                    </button>
                    <h1 className={styles.title}>{fallacy.title}</h1>
                    <p className={styles.subtitle}>Laboratório de Interpretação Bíblica</p>
                </header>

                <nav className={styles.stepper}>
                    {steps.map((s, idx) => (
                        <div key={s.id} className={styles.stepItem}>
                            <div className={clsx(
                                styles.stepIcon,
                                currentStep === s.id && styles.activeStep,
                                steps.findIndex(x => x.id === currentStep) > idx && styles.completedStep
                            )}>
                                {s.icon}
                            </div>
                            <span className={styles.stepLabel}>{s.label}</span>
                            {idx < steps.length - 1 && <div className={styles.stepLine} />}
                        </div>
                    ))}
                </nav>

                <div className={styles.contentArea}>
                    {currentStep === "intro" && (
                        <section className={styles.stepContent}>
                            <h2 className={styles.stepTitle}>O que é {fallacy.title}?</h2>
                            <div className={styles.grid}>
                                <div className={styles.infoCard}>
                                    <ShieldAlert className={styles.cardIcon} />
                                    <h3>Definição Formal</h3>
                                    <p>{fallacy.formalDefinition}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <GraduationCap className={styles.cardIcon} />
                                    <h3>Explicação Pastoral</h3>
                                    <p>{fallacy.pastoralDefinition}</p>
                                </div>
                            </div>
                            <div className={styles.dangerZone}>
                                <AlertTriangle className={styles.dangerIcon} />
                                <div>
                                    <h3>Por que isso é perigoso?</h3>
                                    <p>{fallacy.doctrineDanger}</p>
                                </div>
                            </div>
                            <button onClick={handleNext} className={styles.nextBtn}>
                                Iniciar Análise de Casos <ArrowRight size={18} />
                            </button>
                        </section>
                    )}

                    {currentStep === "case" && (
                        <section className={styles.stepContent}>
                            <h2 className={styles.stepTitle}>Analisando Casos Reais</h2>
                            {fallacy.initialCases.map((c, i) => (
                                <div key={i} className={styles.caseComparison}>
                                    <div className={styles.caseVerse}>{c.verse}</div>
                                    <div className={styles.comparisonGrid}>
                                        <div className={styles.popularSide}>
                                            <h4>Interpretação Popular</h4>
                                            <p>{c.popularInterpretation}</p>
                                        </div>
                                        <div className={styles.originalSide}>
                                            <h4>Significado Original</h4>
                                            <p>{c.originalContext}</p>
                                        </div>
                                    </div>
                                    <div className={styles.theologicalEx}>
                                        <h4>Análise Teológica</h4>
                                        <p>{c.theologicalExplanation}</p>
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleNext} className={styles.nextBtn}>
                                Começar Exercício Prático <ArrowRight size={18} />
                            </button>
                        </section>
                    )}

                    {currentStep === "exercise" && (
                        <section className={styles.stepContent}>
                            <h2 className={styles.stepTitle}>Sua Vez: Laboratório de Análise</h2>
                            <div className={styles.exerciseBox}>
                                <div className={styles.exerciseVerse}>{fallacy.sampleExercise.verse}</div>
                                <p className={styles.instruction}>{fallacy.sampleExercise.instruction}</p>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Escreva sua análise hermenêutica aqui..."
                                    value={userResponse}
                                    onChange={(e) => setUserResponse(e.target.value)}
                                />
                                <button
                                    onClick={handleAnalyze}
                                    className={styles.analyzeBtn}
                                    disabled={!userResponse.trim() || isAnalyzing}
                                >
                                    {isAnalyzing ? "IA Analisando..." : "Enviar para Análise da IA"}
                                    {!isAnalyzing && <Send size={18} />}
                                </button>
                            </div>
                        </section>
                    )}

                    {currentStep === "analysis" && analysisResult && (
                        <section className={styles.stepContent}>
                            <h2 className={styles.stepTitle}>Diagnóstico do Mentor IA</h2>
                            <div className={styles.analysisGrid}>
                                <div className={styles.diagCard}>
                                    <h3>Diagnóstico</h3>
                                    <p>{analysisResult.diagnostic}</p>
                                </div>
                                <div className={styles.exegesisCard}>
                                    <h3>Exegese correta</h3>
                                    <p>{analysisResult.exegesis}</p>
                                </div>
                                <div className={styles.errorCard}>
                                    <h3>Onde você errou</h3>
                                    <p>{analysisResult.userError}</p>
                                </div>
                                <div className={styles.adviceCard}>
                                    <h3>Como interpretar</h3>
                                    <p>{analysisResult.correctInterpretation}</p>
                                </div>
                            </div>
                            <button onClick={handleNext} className={styles.nextBtn}>
                                Ver Meu Progresso <ArrowRight size={18} />
                            </button>
                        </section>
                    )}

                    {currentStep === "review" && (
                        <section className={styles.stepContent}>
                            <h2 className={styles.stepTitle}>Módulo Concluído!</h2>
                            <div className={styles.progressCard}>
                                <div className={styles.scoreCircle}>
                                    {analysisResult?.progressImpact.total}%
                                </div>
                                <div className={styles.scoreDetails}>
                                    <div className={styles.scoreRow}>
                                        <span>Identificação</span>
                                        <div className={styles.barContainer}>
                                            <div className={styles.bar} style={{ width: `${(analysisResult?.progressImpact.identification / 20) * 100}%` }} />
                                        </div>
                                    </div>
                                    <div className={styles.scoreRow}>
                                        <span>Contextualização</span>
                                        <div className={styles.barContainer}>
                                            <div className={styles.bar} style={{ width: `${(analysisResult?.progressImpact.contextualization / 40) * 100}%` }} />
                                        </div>
                                    </div>
                                    <div className={styles.scoreRow}>
                                        <span>Aplicação</span>
                                        <div className={styles.barContainer}>
                                            <div className={styles.bar} style={{ width: `${(analysisResult?.progressImpact.application / 40) * 100}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href="/library" className={styles.finishBtn}>
                                Voltar para Biblioteca
                            </Link>
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
