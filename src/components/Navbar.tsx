"use client";

import Link from "next/link";
import { BookOpen, ChevronDown, Scroll, Cross, GraduationCap, Map as MapIcon } from "lucide-react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

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
                    <Link href="/bible" className={clsx(styles.link, pathname === "/bible" && styles.active)}>
                        Bíblia
                    </Link>

                    <div
                        ref={dropdownRef}
                        className={styles.dropdown}
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <button
                            className={clsx(styles.link, pathname.includes("/mindmaps") && styles.active, styles.dropdownBtn)}
                            onClick={toggleMenu}
                            type="button"
                        >
                            Mapa Mental <ChevronDown size={14} style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                        </button>

                        {isMenuOpen && (
                            <div className={styles.dropdownContent}>
                                <Link
                                    href="/mindmaps/old-testament"
                                    className={styles.dropdownItem}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Scroll size={16} /> Antigo Testamento
                                </Link>
                                <Link
                                    href="/mindmaps/new-testament"
                                    className={styles.dropdownItem}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Cross size={16} /> Novo Testamento
                                </Link>
                                <Link
                                    href="/mindmaps/how-to-study"
                                    className={styles.dropdownItem}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <GraduationCap size={16} /> Como Estudar a Bíblia
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/outline" className={clsx(styles.link, pathname === "/outline" && styles.active)}>
                        Esboço
                    </Link>
                </div>
            </div>
        </nav >
    );
}
