"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, BookOpen, AlertTriangle, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
// import { Analysis } from "@prisma/client"; // Can't import from prisma client on client component directly usually, better to define type
import clsx from "clsx";

interface Study {
    id: string;
    phrase: string;
    verse: string | null;
    fidelityGrade: string;
    literaryContext: string;
    interpretiveError: string | null;
    createdAt: string;
}

const FALLACIES = [
    {
        id: "proof-texting",
        title: "Texto-Prova",
        keywords: ["texto-prova", "prova", "isolado", "contexto"],
        description: "Isolar um versículo de seu contexto para 'provar' uma ideia pré-concebida.",
        result: "Distorção da intenção original do autor.",
        icon: <Filter size={24} />
    },
    {
        id: "anachronism",
        title: "Anacronismo",
        keywords: ["anacronismo", "moderno", "lentes", "antigo"],
        description: "Ler o texto antigo com lentes e conceitos da cultura moderna.",
        result: "Ignora o contexto histórico-cultural original.",
        icon: <AlertTriangle size={24} />
    },
    {
        id: "narcigesis",
        title: "Narcigese",
        keywords: ["narcigese", "narcisismo", "eu", "sobre mim"],
        description: "Fazer do texto algo sobre você (narcisismo + exegese) em vez de Deus.",
        result: "Perda da centralidade de Cristo na Escritura.",
        icon: <BookOpen size={24} />
    },
    {
        id: "allegory",
        title: "Alegorização",
        keywords: ["alegoria", "simbólico", "espiritual", "imaginação"],
        description: "Transformar fatos históricos em símbolos espirituais sem base no texto.",
        result: "Substitui a verdade bíblica por imaginação humana.",
        icon: <Search size={24} />
    }
];

export default function LibraryPage() {
    const router = useRouter();
    const [studies, setStudies] = useState<Study[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<"recent" | "fallacies">("recent");

    useEffect(() => {
        fetch("/api/studies")
            .then(res => res.json())
            .then(data => {
                setStudies(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleViewCases = (fallacyId: string) => {
        router.push(`/library/fallacies/${fallacyId}`);
    };

    const filteredStudies = studies.filter(study => {
        const titleMatch = study.phrase.toLowerCase().includes(searchTerm.toLowerCase());
        const verseMatch = study.verse?.toLowerCase().includes(searchTerm.toLowerCase());
        const errorMatch = study.interpretiveError?.toLowerCase().includes(searchTerm.toLowerCase());

        // Advanced keyword match for fallacies
        const fallacy = FALLACIES.find(f => f.title === searchTerm);
        const keywordMatch = fallacy?.keywords.some(k =>
            study.interpretiveError?.toLowerCase().includes(k) ||
            study.phrase.toLowerCase().includes(k)
        );

        return titleMatch || verseMatch || errorMatch || keywordMatch;
    });

    const getFidelityColor = (grade: string) => {
        switch (grade) {
            case "ALTA": return styles.high;
            case "MÉDIA": return styles.medium;
            case "BAIXA": return styles.low;
            default: return styles.neutral;
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Biblioteca de Estudos</h1>
                    <p className={styles.subtitle}>Explore análises teológicas e aprenda a evitar erros comuns.</p>
                </header>

                <div className={styles.tabs}>
                    <button
                        className={clsx(styles.tab, activeTab === "recent" && styles.activeTab)}
                        onClick={() => setActiveTab("recent")}
                    >
                        Estudos Recentes
                    </button>
                    <button
                        className={clsx(styles.tab, activeTab === "fallacies" && styles.activeTab)}
                        onClick={() => setActiveTab("fallacies")}
                    >
                        Anatomia de Falácias
                    </button>
                </div>

                {activeTab === "recent" ? (
                    <>
                        <div className={styles.controls}>
                            <div className={styles.searchWrapper}>
                                <Search className={styles.searchIcon} size={20} />
                                <input
                                    type="text"
                                    placeholder="Pesquisar por frase ou versículo..."
                                    className={styles.searchInput}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className={styles.loading}>Carregando estudos...</div>
                        ) : (
                            <div className={styles.grid}>
                                {filteredStudies.map(study => (
                                    <Link href={`/analyze?phrase=${encodeURIComponent(study.phrase)}`} key={study.id} className={styles.cardLink}>
                                        <article className={clsx(styles.card, getFidelityColor(study.fidelityGrade))}>
                                            <div className={styles.cardHeader}>
                                                <span className={clsx(styles.badge, getFidelityColor(study.fidelityGrade))}>
                                                    {study.fidelityGrade}
                                                </span>
                                                <span className={styles.date}>
                                                    {new Date(study.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className={styles.cardPhrase}>"{study.phrase}"</h3>
                                            <div className={styles.cardFooter}>
                                                {study.verse ? (
                                                    <span className={styles.verse}><BookOpen size={14} /> {study.verse}</span>
                                                ) : (
                                                    <span className={styles.verse}><AlertTriangle size={14} /> Não bíblico</span>
                                                )}
                                            </div>
                                        </article>
                                    </Link>
                                ))}

                                {!loading && filteredStudies.length === 0 && (
                                    <div className={styles.empty}>
                                        Nenhum estudo encontrado.
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.fallaciesGrid}>
                        {FALLACIES.map(f => (
                            <div key={f.id} className={styles.fallacyCard}>
                                <div className={styles.fallacyIcon}>{f.icon}</div>
                                <h2 className={styles.fallacyTitle}>{f.title}</h2>
                                <p className={styles.fallacyDesc}>{f.description}</p>
                                <div className={styles.fallacyResult}>
                                    <strong>Consequência:</strong> {f.result}
                                </div>
                                <button
                                    className={styles.viewCasesBtn}
                                    onClick={() => handleViewCases(f.id)}
                                >
                                    Ver Casos Reais
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
