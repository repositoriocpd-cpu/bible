"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Share2, BookOpen, AlertTriangle, CheckCircle, Info } from "lucide-react";
import styles from "./AnalysisResult.module.css";
import { AnalysisResult as AnalysisType } from "@/lib/ai-service";
import clsx from "clsx";

interface Props {
    analysis: AnalysisType;
}

export default function AnalysisResult({ analysis }: Props) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        literary: true,
        historical: false,
        linguistic: false,
        interpretation: true,
        error: true,
        verses: true,
        application: false
    });

    const toggle = (section: string) => {
        setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const getFidelityColor = (grade: string) => {
        switch (grade) {
            case "ALTA": return styles.highFidelity;
            case "MÉDIA": return styles.mediumFidelity;
            case "BAIXA": return styles.lowFidelity;
            default: return styles.neutralFidelity;
        }
    };

    return (
        <div className={styles.container}>
            {/* Header Card */}
            <div className={clsx(styles.headerCard, getFidelityColor(analysis.fidelityGrade))}>
                <div className={styles.fidelityLabel}>FIDELIDADE AO TEXTO ORIGINAL</div>
                <div className={styles.fidelityValue}>{analysis.fidelityGrade}</div>
                <h1 className={styles.phrase}>"{analysis.phrase}"</h1>
                <div className={styles.verseRef}>
                    {analysis.verse === "Não existe na Bíblia" ? (
                        <span className={styles.notFound}><AlertTriangle size={16} /> Não encontrado na Bíblia</span>
                    ) : (
                        <span className={styles.found}><BookOpen size={16} /> {analysis.verse}</span>
                    )}
                </div>
            </div>

            <div className={styles.grid}>

                {/* Main Interpretation Column */}
                <div className={styles.mainColumn}>

                    <Section
                        title="Interpretação Correta"
                        icon={<Info size={20} />}
                        isOpen={expanded.interpretation}
                        onToggle={() => toggle('interpretation')}
                    >
                        <p>{analysis.interpretation}</p>
                    </Section>

                    {analysis.errorDescription && (
                        <Section
                            title="Onde Está o Erro?"
                            icon={<AlertTriangle size={20} className="text-red-500" />}
                            isOpen={expanded.error}
                            onToggle={() => toggle('error')}
                            className={styles.errorSection}
                        >
                            <p>{analysis.errorDescription}</p>
                        </Section>
                    )}

                    <Section
                        title="Contexto Literário"
                        icon={<BookOpen size={20} />}
                        isOpen={expanded.literary}
                        onToggle={() => toggle('literary')}
                    >
                        <p>{analysis.literaryContext}</p>
                    </Section>

                    <Section
                        title="Aplicação Equilibrada"
                        icon={<CheckCircle size={20} />}
                        isOpen={expanded.application}
                        onToggle={() => toggle('application')}
                    >
                        <p>{analysis.application}</p>
                    </Section>

                </div>

                {/* Sidebar Column */}
                <div className={styles.sideColumn}>
                    <Section
                        title="Versículos Relacionados"
                        icon={<BookOpen size={20} />}
                        isOpen={expanded.verses}
                        onToggle={() => toggle('verses')}
                    >
                        <ul className={styles.verseList}>
                            {analysis.properVerses.map((v, i) => (
                                <li key={i} className={styles.verseItem}>{v}</li>
                            ))}
                        </ul>
                    </Section>

                    <Section
                        title="Contexto Histórico"
                        icon={<Info size={20} />}
                        isOpen={expanded.historical}
                        onToggle={() => toggle('historical')}
                    >
                        <p>{analysis.historicalContext}</p>
                    </Section>

                    <Section
                        title="Análise Linguística"
                        icon={<Info size={20} />}
                        isOpen={expanded.linguistic}
                        onToggle={() => toggle('linguistic')}
                    >
                        <p>{analysis.linguisticAnalysis}</p>
                    </Section>
                </div>

            </div>
        </div>
    );
}

function Section({ title, icon, children, isOpen, onToggle, className }: any) {
    return (
        <div className={clsx(styles.section, className)}>
            <button className={styles.sectionHeader} onClick={onToggle}>
                <div className={styles.sectionTitleWrapper}>
                    {icon}
                    <span className={styles.sectionTitle}>{title}</span>
                </div>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen && <div className={styles.sectionContent}>{children}</div>}
        </div>
    );
}
