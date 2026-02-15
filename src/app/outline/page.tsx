"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Send, Loader2, FileText, ChevronRight } from "lucide-react";
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

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.iconWrapper}>
                    <FileText size={32} />
                </div>
                <div>
                    <h1 className={styles.title}>Gerador de Esboços</h1>
                    <p className={styles.subtitle}>Crie estudos bíblicos profundos com inteligência artificial</p>
                </div>
            </header>

            <div className={styles.grid}>
                {/* Form Section */}
                <div className={styles.card}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Título do Esboço *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: A Justificação pela Fé em Romanos 3"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Tema do Esboço</label>
                            <input
                                type="text"
                                value={formData.theme}
                                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                                placeholder="Ex: Graça, Fé, Justiça Divina"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label>Tipo de Estudo *</label>
                                <select
                                    value={formData.studyType}
                                    onChange={(e) => setFormData({ ...formData, studyType: e.target.value })}
                                >
                                    {STUDY_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Versão da Bíblia</label>
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

                        <div className={styles.formGroup}>
                            <label>Instruções Extras para a IA</label>
                            <textarea
                                rows={4}
                                value={formData.extraInstructions}
                                onChange={(e) => setFormData({ ...formData, extraInstructions: e.target.value })}
                                placeholder="Ex: Focar na perspectiva histórica, incluir ilustrações sobre o templo..."
                            />
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

                {/* Result Section */}
                {result && (
                    <div className={styles.resultCard}>
                        <div className={styles.resultHeader}>
                            <h2>Conteúdo Gerado</h2>
                            <div className={styles.badge}>IA</div>
                        </div>
                        <div className={styles.markdownContent}>
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
