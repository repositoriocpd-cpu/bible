"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, BookOpen, AlertTriangle, Filter } from "lucide-react";
import styles from "./page.module.css";
// import { Analysis } from "@prisma/client"; // Can't import from prisma client on client component directly usually, better to define type
import clsx from "clsx";

interface Study {
    id: string;
    phrase: string;
    verse: string | null;
    fidelityGrade: string;
    literaryContext: string;
    // ... other fields
    createdAt: string;
}

export default function LibraryPage() {
    const [studies, setStudies] = useState<Study[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredStudies = studies.filter(study =>
        study.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (study.verse && study.verse.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                    <p className={styles.subtitle}>Explore análises teológicas já realizadas.</p>
                </header>

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
                    {/* Future: Add filters */}
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
            </div>
        </main>
    );
}
