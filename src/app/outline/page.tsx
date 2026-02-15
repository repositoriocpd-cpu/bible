"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Send, Loader2, FileText, Target, Sparkles, Book, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import styles from "./Outline.module.css";

// Definindo os tipos de input conforme solicitado
const STUDY_TYPES = [
    "Expositivo (Verso por Verso)",
    "Textual (Análise de Palavras)",
    "Temático (Por Tópicos)",
    "Narrativo (Histórico)",
    "Verso a Verso (Estudo Intensivo)"
];

const BIBLE_VERSIONS = [
    "Almeida Revisada e Atualizada (ARA)",
    "Almeida Revisada e Corrigida (ARC)",
    "Almeida Revisada e Corrigida (ACF)",
    "Nova Almeida Atualizada (NAA)",
    "Nova Tradução na Linguagem de Hoje (NTLH)",
    "Nova Versão Internacional (NVI)",
    "Nova Versão Transformadora (NVT)",
    "Almeida Antiga (AA)",
    "Almeida Recebida (AR)",
    "King James Atualizada (BKJ)",
    "Basic English Bible (BEB)",
    "New International Version (NIV)",
    "American Standard Version (ASV)"
];

export default function OutlinePage() {
    const [loading, setLoading] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        theme: "",
        studyType: STUDY_TYPES[0],
        bibleVersion: BIBLE_VERSIONS[0],
        extraInstructions: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("/api/outline/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.error) {
                alert("Erro: " + data.error);
            } else {
                setResult(data.markdown);
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao gerar esboço. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!result) return;
        
        setIsGeneratingPDF(true);
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
                lightGray: [200, 200, 200]
            };

            const addText = (text: string, size: number, style: "normal" | "bold" | "italic" = "normal", color: number[] = colors.black) => {
                doc.setFont("helvetica", style);
                doc.setFontSize(size);
                doc.setTextColor(color[0], color[1], color[2]);
                const lines = doc.splitTextToSize(text, contentWidth);
                
                // Check if we need a new page
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
                cursorY += 6;
            };

            // Header
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text("RAIZ DO TEXTO | GERADOR DE ESBOÇOS", margin, cursorY);
            doc.text(new Date().toLocaleDateString("pt-BR"), pageWidth - margin - 25, cursorY);
            cursorY += 8;
            addSeparator();

            // Title
            addText(formData.title || "Esboço Bíblico", 16, "bold", colors.primary);
            cursorY += 3;

            // Metadata
            if (formData.theme) {
                addText(`Tema: ${formData.theme}`, 10, "italic", colors.gray);
            }
            addText(`Tipo de Estudo: ${formData.studyType}`, 9, "normal", colors.gray);
            addText(`Versão da Bíblia: ${formData.bibleVersion}`, 9, "normal", colors.gray);
            cursorY += 5;
            addSeparator();

            // Parse markdown content
            const lines = result.split('\n');
            
            for (const line of lines) {
                if (!line.trim()) {
                    cursorY += 3;
                    continue;
                }

                // Headers
                if (line.startsWith('# ')) {
                    cursorY += 4;
                    addText(line.replace('# ', ''), 14, "bold", colors.primary);
                } else if (line.startsWith('## ')) {
                    cursorY += 3;
                    addText(line.replace('## ', ''), 12, "bold", colors.black);
                } else if (line.startsWith('### ')) {
                    cursorY += 2;
                    addText(line.replace('### ', ''), 11, "bold", colors.gray);
                } else if (line.startsWith('#### ')) {
                    addText(line.replace('#### ', ''), 10, "bold", colors.gray);
                }
                // Lists
                else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                    const indent = line.search(/\S/);
                    const listItem = line.trim().replace(/^[-*]\s/, '');
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(10);
                    doc.setTextColor(60, 60, 60);
                    const bullet = "•";
                    const textLines = doc.splitTextToSize(listItem, contentWidth - 10);
                    
                    if (cursorY + (textLines.length * 4) > 280) {
                        doc.addPage();
                        cursorY = 20;
                    }
                    
                    doc.text(bullet, margin + (indent * 2), cursorY);
                    doc.text(textLines, margin + (indent * 2) + 5, cursorY);
                    cursorY += (textLines.length * 4) + 2;
                }
                // Numbered lists
                else if (/^\d+\.\s/.test(line.trim())) {
                    const match = line.match(/^(\d+)\.\s(.+)/);
                    if (match) {
                        const number = match[1];
                        const text = match[2];
                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(10);
                        doc.setTextColor(60, 60, 60);
                        const textLines = doc.splitTextToSize(text, contentWidth - 10);
                        
                        if (cursorY + (textLines.length * 4) > 280) {
                            doc.addPage();
                            cursorY = 20;
                        }
                        
                        doc.text(`${number}.`, margin, cursorY);
                        doc.text(textLines, margin + 8, cursorY);
                        cursorY += (textLines.length * 4) + 2;
                    }
                }
                // Blockquotes
                else if (line.startsWith('> ')) {
                    const quoteText = line.replace('> ', '');
                    doc.setFont("helvetica", "italic");
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    const lines = doc.splitTextToSize(quoteText, contentWidth - 10);
                    
                    if (cursorY + (lines.length * 4) > 280) {
                        doc.addPage();
                        cursorY = 20;
                    }
                    
                    doc.setDrawColor(232, 153, 70);
                    doc.line(margin, cursorY - 2, margin, cursorY + (lines.length * 4));
                    doc.text(lines, margin + 5, cursorY);
                    cursorY += (lines.length * 4) + 4;
                }
                // Bold text (** or __)
                else if (line.includes('**') || line.includes('__')) {
                    const cleanLine = line.replace(/\*\*/g, '').replace(/__/g, '');
                    addText(cleanLine, 10, "bold", [60, 60, 60]);
                }
                // Regular text
                else {
                    addText(line, 10, "normal", [60, 60, 60]);
                }
            }

            // Footer on all pages
            const pageCount = (doc as any).internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(180, 180, 180);
                doc.text("Gerado por Raiz do Texto - Estudos Bíblicos com IA", pageWidth / 2, 290, { align: "center" });
                doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin, 290, { align: "right" });
            }

            // Generate filename
            const filename = `Esboco_${formData.title.substring(0, 30).replace(/\s+/g, "_") || "Biblico"}.pdf`;
            doc.save(filename);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Erro ao gerar PDF. Tente novamente.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <FileText size={36} />
                </div>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Gerador de Esboços</h1>
                    <p className={styles.subtitle}>Crie estudos bíblicos profundos com inteligência artificial</p>
                </div>
            </header>

            <div className={styles.grid}>
                {/* Form Section */}
                <div className={styles.formContainer}>
                    <div className={styles.card}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Título do Esboço *</label>
                                <div className={styles.inputWrapper}>
                                    <FileText size={18} className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Ex: A Justificação pela Fé em Romanos 3"
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Tema do Esboço</label>
                                <div className={styles.inputWrapper}>
                                    <Target size={18} className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        type="text"
                                        value={formData.theme}
                                        onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                                        placeholder="Ex: Graça, Fé, Justiça Divina"
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.formGroup}>
                                    <label>Tipo de Estudo *</label>
                                    <div className={styles.inputWrapper}>
                                        <BookOpen size={18} className={styles.inputIcon} aria-hidden="true" />
                                        <select
                                            value={formData.studyType}
                                            onChange={(e) => setFormData({ ...formData, studyType: e.target.value })}
                                        >
                                            {STUDY_TYPES.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Versão da Bíblia</label>
                                    <div className={styles.inputWrapper}>
                                        <Book size={18} className={styles.inputIcon} aria-hidden="true" />
                                        <select
                                            value={formData.bibleVersion}
                                            onChange={(e) => setFormData({ ...formData, bibleVersion: e.target.value })}
                                        >
                                            {BIBLE_VERSIONS.map(version => (
                                                <option key={version} value={version}>{version}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Instruções Extras para a IA</label>
                                <div className={styles.inputWrapper}>
                                    <Sparkles size={18} className={styles.inputIcon} aria-hidden="true" />
                                    <textarea
                                        rows={4}
                                        value={formData.extraInstructions}
                                        onChange={(e) => setFormData({ ...formData, extraInstructions: e.target.value })}
                                        placeholder="Ex: Focar na perspectiva histórica, incluir ilustrações sobre o templo..."
                                    />
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className={styles.spin} size={20} />
                                        Gerando Esboço...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Gerar Esboço
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Result Section */}
                <div className={styles.resultContainer}>
                {result ? (
                        <div className={styles.resultCard}>
                            <div className={styles.resultHeader}>
                                <h2>Conteúdo Gerado</h2>
                                <div className={styles.headerActions}>
                                    <div className={styles.badge}>IA</div>
                                    <button 
                                        className={styles.pdfButton} 
                                        onClick={handleDownloadPDF}
                                        disabled={isGeneratingPDF}
                                        title="Baixar PDF"
                                    >
                                        {isGeneratingPDF ? (
                                            <>
                                                <Loader2 className={styles.spin} size={18} />
                                                Gerando...
                                            </>
                                        ) : (
                                            <>
                                                <Download size={18} />
                                                Baixar PDF
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className={styles.markdownContent}>
                                <ReactMarkdown>{result}</ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.resultCard}>
                            <div className={styles.emptyState}>
                                <FileText size={80} className={styles.emptyIcon} />
                                <h3>Seu esboço aparecerá aqui</h3>
                                <p>Preencha o formulário ao lado e clique em "Gerar Esboço" para criar um estudo bíblico personalizado com inteligência artificial.</p>
                                <div className={styles.emptySteps}>
                                    <div className={styles.emptyStep}>
                                        <FileText size={16} />
                                        <span>1. Defina o título do seu esboço</span>
                                    </div>
                                    <div className={styles.emptyStep}>
                                        <BookOpen size={16} />
                                        <span>2. Escolha o tipo de estudo</span>
                                    </div>
                                    <div className={styles.emptyStep}>
                                        <Send size={16} />
                                        <span>3. Gere seu conteúdo personalizado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
