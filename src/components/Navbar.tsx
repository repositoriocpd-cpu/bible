"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <BookOpen className={styles.logoIcon} size={24} />
                    <span className={styles.logoText}>RAIZ DO TEXTO</span>
                </Link>

                <div className={styles.links}>
                    <Link href="/" className={clsx(styles.link, pathname === "/" && styles.active)}>
                        Início
                    </Link>
                    <Link href="/library" className={clsx(styles.link, pathname === "/library" && styles.active)}>
                        Biblioteca
                    </Link>
                </div>
            </div>
        </nav>
    );
}
