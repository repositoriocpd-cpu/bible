"use client";

import { useEffect, useState } from "react";
import { Check, X, ShieldAlert } from "lucide-react";
import styles from "./page.module.css";
// import { Analysis } from "@prisma/client";

interface AdminStudy {
    id: string;
    phrase: string;
    fidelityGrade: string;
    isApproved: boolean;
    createdAt: string;
}

export default function AdminPage() {
    const [reviews, setReviews] = useState<AdminStudy[]>([]);
    const [loading, setLoading] = useState(true);

    // Mock fetching all analyses (including unapproved)
    // In reality, we'd need a secured API endpoint.
    // Using the studies endpoint but assuming it returns everything for now or making a new one.
    // The current /api/studies returns everything.

    useEffect(() => {
        fetch("/api/studies")
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            });
    }, []);

    const handleApprove = async (id: string) => {
        // Call API to approve
        // await fetch('/api/admin/approve', { method: 'POST', body: JSON.stringify({ id }) })
        // For MVP, just updating local state to simulate
        setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: true } : r));
        alert("Estudo aprovado! (Simulação - API pendente)");
    };

    const handleDelete = async (id: string) => {
        // await fetch('/api/admin/delete', { method: 'POST', body: JSON.stringify({ id }) })
        setReviews(prev => prev.filter(r => r.id !== id));
        alert("Estudo removido! (Simulação - API pendente)");
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}><ShieldAlert className={styles.icon} /> Painel Administrativo</h1>

                <div className={styles.list}>
                    {reviews.map(review => (
                        <div key={review.id} className={styles.item}>
                            <div className={styles.info}>
                                <div className={styles.phrase}>"{review.phrase}"</div>
                                <div className={styles.meta}>
                                    <span className={styles.grade}>{review.fidelityGrade}</span>
                                    <span className={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</span>
                                    {review.isApproved ? <span className={styles.approvedBadge}>Aprovado</span> : <span className={styles.pendingBadge}>Pendente</span>}
                                </div>
                            </div>
                            <div className={styles.actions}>
                                {!review.isApproved && (
                                    <button onClick={() => handleApprove(review.id)} className={styles.approveBtn} title="Aprovar">
                                        <Check size={18} />
                                    </button>
                                )}
                                <button onClick={() => handleDelete(review.id)} className={styles.deleteBtn} title="Remover">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
