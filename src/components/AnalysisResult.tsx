"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Share2, BookOpen, AlertTriangle, CheckCircle, Info, FileText, Download, ExternalLink } from "lucide-react";
import styles from "./AnalysisResult.module.css";
import { AnalysisResult as AnalysisType } from "@/lib/ai-service";
import clsx from "clsx";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface Props {
    analysis: AnalysisType;
}

const STUDY_SLUGS: Record<string, string> = {
    "Isaías 41:6": "isaias-41-6",
    "Isaías 41:7": "isaias-41-6",
};

export default function AnalysisResult({ analysis }: Props) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        literary: true,
        historical: false,
        linguistic: false,
        interpretation: true,
        error: true,
        verses: true,
        application: false,
        theology: false,
        common: false,
        academic: true,
        pastoral: true,
        comparative: true
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const toggle = (section: string) => {
        setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleDownloadPDF = async () => {
        setIsGenerating(true);
        try {
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const margin = 20;
            const pageWidth = doc.internal.pageSize.getWidth();
            const contentWidth = pageWidth - (margin * 2);
            let cursorY = 20;

            const colors = {
                primary: [232, 153, 70],
                black: [20, 20, 20],
                gray: [100, 100, 100],
                lightGray: [240, 240, 240],
                ALTA: [16, 185, 129],
                MÉDIA: [245, 158, 11],
                BAIXA: [239, 68, 68],
                academic: [37, 99, 235],
                pastoral: [16, 185, 129],
                comparative: [139, 92, 246]
            };

            const addText = (text: string, size: number, style: "normal" | "bold" | "italic" = "normal", color: number[] = colors.black) => {
                doc.setFont("helvetica", style);
                doc.setFontSize(size);
                doc.setTextColor(color[0], color[1], color[2]);
                const lines = doc.splitTextToSize(text, contentWidth);
                if (cursorY + (lines.length * (size * 0.4)) > 280) {
                    doc.addPage();
                    cursorY = 20;
                }
                doc.text(lines, margin, cursorY);
                cursorY += (lines.length * (size * 0.4)) + 4;
            };

            const addSeparator = () => {
                doc.setDrawColor(220, 220, 220);
                doc.line(margin, cursorY, margin + contentWidth, cursorY);
                cursorY += 8;
            };

            const renderSection = (title: string, content: string | string[]) => {
                if (!content || (Array.isArray(content) && content.length === 0)) return;
                addText(title.toUpperCase(), 10, "bold", colors.primary);
                cursorY += 2;
                if (Array.isArray(content)) {
                    content.forEach(item => addText(`• ${item}`, 11, "normal", [60, 60, 60]));
                } else {
                    addText(content, 11, "normal", [60, 60, 60]);
                }
                cursorY += 5;
            };

            // Header
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text(`RAIZ DO TEXTO | MODO: ${analysis.mode?.replace("_", " ")}`, margin, cursorY);
            doc.text(new Date().toLocaleDateString("pt-BR"), pageWidth - margin - 25, cursorY);
            cursorY += 5;
            addSeparator();

            addText(`"${analysis.phrase}"`, 18, "bold", colors.black);
            cursorY += 5;

            // Polymorphic PDF Export
            if (analysis.mode === "ACADEMICO_AVANCADO") {
                addText(`Referência: ${analysis.primaryReference}`, 12, "bold", colors.academic);
                cursorY += 5;
                renderSection("Contexto Literário", analysis.immediateContext.pericopeSummary);
                renderSection("Contexto Histórico", analysis.historicalCulturalContext.setting);
                renderSection("Exegese Técnica", analysis.correctExegesis.senseOriginal);
                renderSection("Diagnóstico Hermenêutico", analysis.hermeneuticalDiagnosis.whatGoesWrong);
                renderSection("Princípio Atemporal", analysis.application.timelessPrinciple);
            } else if (analysis.mode === "PASTORAL_SIMPLIFICADO") {
                addText(`Referência: ${analysis.reference}`, 12, "bold", colors.pastoral);
                cursorY += 5;
                renderSection("O que o texto ensina", analysis.whatTheBibleActuallyTeaches);
                renderSection("Cuidado Comum", analysis.commonMistake);
                renderSection("Aplicação Prática", analysis.safeApplicationToday);
            } else if (analysis.mode === "COMPARATIVO_INTERPRETACOES") {
                addText(`Referência Principal: ${analysis.referenceStatus.bestReference}`, 12, "bold", colors.comparative);
                cursorY += 5;
                analysis.interpretations.forEach(i => {
                    renderSection(i.label, i.coreClaim);
                });
                renderSection("Leitura Recomendada", analysis.mostProbableReading.label);
                renderSection("Por que?", analysis.mostProbableReading.why);
            } else {
                // PADRAO
                const grade = (analysis as any).fidelityGrade || "MÉDIA";
                const fidelityColor = (colors as any)[grade] || colors.gray;
                doc.setFillColor(fidelityColor[0], fidelityColor[1], fidelityColor[2]);
                doc.roundedRect(margin, cursorY, 40, 7, 1, 1, "F");
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(8);
                doc.text(`FIDELIDADE: ${grade}`, margin + 3, cursorY + 5);
                cursorY += 10;
                renderSection("Exegese Correta", (analysis as any).correctExegesis);
                renderSection("Aplicação", (analysis as any).balancedApplication);
            }

            const pageCount = (doc as any).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(180, 180, 180);
                doc.text("Gerado por Raiz do Texto - Anatomia Teológica Inteligente.", pageWidth / 2, 290, { align: "center" });
            }

            doc.save(`Analise_${analysis.mode}_${analysis.phrase.substring(0, 15).replace(/\s+/g, "_")}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Erro ao gerar PDF profissional.");
        } finally {
            setIsGenerating(false);
        }
    };

    const renderAcademic = (ana: any) => (
        <div className={styles.grid}>
            <div className={styles.mainColumn}>
                <Section title="Exegese Original" icon={<BookOpen size={20} />} isOpen={expanded.academic} onToggle={() => toggle('academic')} className={styles.prioSection}>
                    <p><strong>Sentido Original:</strong> {ana.correctExegesis.senseOriginal}</p>
                    <div className={styles.spacer} />
                    <p><strong>Argumento do Autor:</strong> {ana.immediateContext.argumentFlow}</p>
                </Section>
                <Section title="Diagnóstico Hermenêutico" icon={<AlertTriangle size={20} />} isOpen={expanded.error} onToggle={() => toggle('error')}>
                    <ul className={styles.list}>
                        {ana.hermeneuticalDiagnosis.whatGoesWrong.map((e: string, i: number) => <li key={i}>{e}</li>)}
                    </ul>
                    <p className={styles.note}><em>Por que importa:</em> {ana.hermeneuticalDiagnosis.whyItMatters}</p>
                </Section>
                <Section title="Aplicação Acadêmica" icon={<CheckCircle size={20} />} isOpen={expanded.application} onToggle={() => toggle('application')}>
                    <p><strong>Princípio Atemporal:</strong> {ana.application.timelessPrinciple}</p>
                    <p><strong>Aplicação Contemporânea:</strong> {ana.application.contemporaryApplication}</p>
                </Section>
            </div>
            <div className={styles.sideColumn}>
                <Section title="Análise Linguística" icon={<Info size={20} />} isOpen={true}>
                    {ana.originalLanguage.keyTerms.map((t: any, i: number) => (
                        <div key={i} className={styles.termBox}>
                            <span className={styles.term}>{t.term}</span> ({t.language}) - <em>{t.transliteration}</em>
                            <div className={styles.range}>{t.semanticRange.join(", ")}</div>
                        </div>
                    ))}
                </Section>
                <Section title="Versículos do Contexto" icon={<BookOpen size={20} />} isOpen={true}>
                    {ana.immediateContext.keyVersesAround.map((v: string, i: number) => <span key={i} className={styles.principleBadge}>{v}</span>)}
                </Section>
            </div>
        </div>
    );

    const renderPastoral = (ana: any) => (
        <div className={styles.grid}>
            <div className={styles.mainColumn}>
                <Section title="O que a Bíblia ensina" icon={<CheckCircle size={20} />} isOpen={expanded.pastoral} onToggle={() => toggle('pastoral')} className={styles.prioSection}>
                    <p>{ana.whatTheBibleActuallyTeaches}</p>
                </Section>
                <Section title="Aplicação Segura" icon={<Info size={20} />} isOpen={true}>
                    <p>{ana.safeApplicationToday}</p>
                </Section>
            </div>
            <div className={styles.sideColumn}>
                <Section title="Cuidado Comum" icon={<AlertTriangle size={20} />} isOpen={true}>
                    <p>{ana.commonMistake}</p>
                </Section>
                <Section title="Versículos de Apoio" icon={<BookOpen size={20} />} isOpen={true}>
                    {ana.supportingVerses.map((v: string, i: number) => <li key={i} className={styles.verseItem}>{v}</li>)}
                </Section>
            </div>
        </div>
    );

    const renderComparative = (ana: any) => (
        <div className={styles.grid}>
            <div className={styles.mainColumn}>
                {ana.interpretations.map((interp: any, i: number) => (
                    <Section key={i} title={interp.label} icon={<Info size={20} />} isOpen={true}>
                        <p><strong>Tese:</strong> {interp.coreClaim}</p>
                        <p><strong>Método:</strong> {interp.method}</p>
                        <div className={styles.prosCons}>
                            <div><strong>Pontos Fortes:</strong> {interp.strengths.join(", ")}</div>
                            <div><strong>Limites:</strong> {interp.textConstraints.join(", ")}</div>
                        </div>
                    </Section>
                ))}
            </div>
            <div className={styles.sideColumn}>
                <Section title="Leitura Recomendada" icon={<CheckCircle size={20} />} isOpen={true} className={styles.prioSection}>
                    <p className={styles.recommendationLabel}>{ana.mostProbableReading.label}</p>
                    <ul className={styles.list}>
                        {ana.mostProbableReading.why.map((r: string, i: number) => <li key={i}>{r}</li>)}
                    </ul>
                </Section>
            </div>
        </div>
    );

    const renderStandard = (ana: any) => (
        <div className={styles.grid}>
            <div className={styles.mainColumn}>
                <Section title="Exegese Bíblica Correta" icon={<Info size={20} />} isOpen={expanded.interpretation} onToggle={() => toggle('interpretation')} className={styles.prioSection}>
                    <p>{ana.correctExegesis}</p>
                </Section>
                {ana.interpretiveError && (
                    <Section title="Onde Está o Erro?" icon={<AlertTriangle size={20} />} isOpen={expanded.error} onToggle={() => toggle('error')} className={styles.errorSection}>
                        <p>{ana.interpretiveError}</p>
                    </Section>
                )}
                <Section title="Aplicação Fiel" icon={<CheckCircle size={20} />} isOpen={expanded.application} onToggle={() => toggle('application')}>
                    <p>{ana.balancedApplication}</p>
                </Section>
            </div>
            <div className={styles.sideColumn}>
                <Section title="Contexto Literário" icon={<BookOpen size={20} />} isOpen={expanded.literary} onToggle={() => toggle('literary')}>
                    <p>{ana.immediateContext}</p>
                </Section>
                <Section title="Versículos Coerentes" icon={<BookOpen size={20} />} isOpen={expanded.verses} onToggle={() => toggle('verses')}>
                    {Array.isArray(ana.properRelatedVerses) && ana.properRelatedVerses.map((v: string, i: number) => <li key={i} className={styles.verseItem}>{v}</li>)}
                </Section>
            </div>
        </div>
    );

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={clsx(styles.headerCard, styles.modeHeader)}>
                <div className={styles.headerActions}>
                    <button className={styles.pdfButton} onClick={handleDownloadPDF} disabled={isGenerating}>
                        {isGenerating ? "..." : <><FileText size={18} /> <span>PDF</span></>}
                    </button>
                </div>
                <div className={styles.modeBadge}>{analysis.mode?.replace("_", " ")}</div>
                <h1 className={styles.phrase}>"{analysis.phrase}"</h1>
                <div className={styles.referenceHeader}>
                    {analysis.mode === "ACADEMICO_AVANCADO" && <span><BookOpen size={16} /> {analysis.primaryReference}</span>}
                    {analysis.mode === "PASTORAL_SIMPLIFICADO" && <span><BookOpen size={16} /> {analysis.reference}</span>}
                    {analysis.mode === "COMPARATIVO_INTERPRETACOES" && <span><BookOpen size={16} /> {analysis.referenceStatus.bestReference}</span>}
                </div>
            </div>

            {analysis.mode === "ACADEMICO_AVANCADO" && renderAcademic(analysis)}
            {analysis.mode === "PASTORAL_SIMPLIFICADO" && renderPastoral(analysis)}
            {analysis.mode === "COMPARATIVO_INTERPRETACOES" && renderComparative(analysis)}
            {(!analysis.mode || analysis.mode === "PADRAO") && renderStandard(analysis)}
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
