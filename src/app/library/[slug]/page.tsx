"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Book, Calendar, User, AlertTriangle, CheckCircle } from "lucide-react";
import styles from "./page.module.css";

export default function StudyDetailPage() {
    const { slug } = useParams();

    // In a real app, this would fetch from an API or DB.
    // For now, we hardcode the Isaiah 41:6 study as requested.
    if (slug !== "isaias-41-6") {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <Link href="/library" className={styles.backLink}>
                        <ArrowLeft size={16} /> Voltar para Biblioteca
                    </Link>
                    <h1>Estudo não encontrado</h1>
                    <p>Desculpe, ainda não temos um estudo detalhado para este tema.</p>
                </div>
            </div>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/library" className={styles.backLink}>
                    <ArrowLeft size={16} /> Voltar para Biblioteca
                </Link>

                <header className={styles.header}>
                    <div className={styles.breadcrumb}>Exegese Bíblica / Antigo Testamento</div>
                    <h1 className={styles.title}>Explicação de Isaías 41:6</h1>
                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <User size={16} /> <span>Equipe Raiz do Texto</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Calendar size={16} /> <span>13 de Fevereiro, 2026</span>
                        </div>
                        <div className={styles.metaItem}>
                            <Book size={16} /> <span>Isaías 41</span>
                        </div>
                    </div>
                </header>

                <article className={styles.content}>
                    <div className={styles.quoteCard}>
                        <span className={styles.quoteText}>"Um ao outro ajudou e ao seu companheiro disse: Esforça-te!"</span>
                        <span className={styles.quoteRef}>— Isaías 41:6</span>
                    </div>

                    <p>
                        A passagem imediata do versículo, Isaías 41:6-7 fala da atitude de povos idólatras, que se ajudam na confecção de seus deuses, totalmente inferiores ao Deus verdadeiro. O povo de Israel é chamado a confiar somente no Deus Criador e não temer esses povos nem seus falsos ídolos. Não há outro além do Senhor (Isaías 43:11).
                    </p>

                    <p>
                        Os "próximos" (um e outro) ajudados e incentivados aqui são os artífices, ourives, escultores e soldadores, que trabalham juntos em prol de algo abominável (Deuteronômio 27:15). Eles unem forças fazendo seus próprios deuses e os manipulam, segundo os seus maus intentos.
                    </p>

                    <h2>Um ao outro ajudou - Compreenda o contexto</h2>
                    <p>
                        Isaías, o autor do livro bíblico, foi o profeta que relatou as mensagens de Deus ao povo de Israel durante os reinados de Uzias, Jotão, Acaz e Ezequias (Isaías 1:1). O nome Isaías significa "Salvação do Senhor". Ele é considerado o maior profeta do Antigo Testamento, por anunciar intensamente a redenção divina e por escrever muitas passagens famosas na literatura bíblica.
                    </p>

                    <p>O livro do profeta Isaías pode ser dividido em duas partes:</p>

                    <ul>
                        <li><strong>Capítulos 1 a 39</strong> - Desde o primeiro capítulo, Isaías denuncia os pecados do povo e anuncia o juízo de Deus. Registra a visão que teve do Santo e soberano Deus em Seu trono, enviando-o para pregar a Palavra ao povo desviado e pecador.</li>
                        <li><strong>Capítulos 40 a 66</strong> - Na segunda parte, Isaías narra uma mensagem de consolo, profecias de esperança messiânicas de restauração do povo. É dentro dessa seção que o versículo está inserido.</li>
                    </ul>

                    <p>
                        No capítulo 41 Deus chama a atenção do povo para a inferioridade das nações e seus deuses comparados à Sua própria grandeza, força e glória. Ele é quem livra o Seu povo e o protege constantemente.
                    </p>

                    <div className={styles.quoteCard}>
                        <span className={styles.quoteText}>
                            "Por isso não tema, pois estou com você;<br />
                            não tenha medo, pois sou o seu Deus.<br />
                            Eu o fortalecerei e o ajudarei;<br />
                            eu o segurarei<br />
                            com a minha mão direita vitoriosa."
                        </span>
                        <span className={styles.quoteRef}>— Isaías 41:10</span>
                    </div>

                    <h2>Passagens relacionadas a Isaías 41:6</h2>
                    <p>O profeta está constantemente alertando para:</p>
                    <ul>
                        <li>A loucura da idolatria - <strong>Isaías 44:9-20</strong>.</li>
                        <li>O engano e ilusão dos falsos deuses - <strong>Isaías 40:18-20</strong></li>
                        <li>Contra aqueles que fabricam ídolos e lhes prestam culto - <strong>Isaías 45:16</strong>.</li>
                    </ul>

                    <h2>Entendendo Isaías 41 e a sua mensagem</h2>
                    <p>
                        O capítulo 41 está inserido na segunda seção do livro de Isaías e apresenta uma promessa de redenção e renovação espiritual do povo hebreu.
                    </p>

                    <ul>
                        <li><strong>Vs. 1-4:</strong> Convocação às nações. Deus informa que chama para a liderança o justo para subjugar os reis.</li>
                        <li><strong>Vs. 5-7:</strong> As nações unem forças, encorajando-se uns aos outros para confeccionar o seu ídolo.</li>
                        <li><strong>Vs. 8-10:</strong> Deus faz distinção do Seu povo escolhido, mostrando Seu amor e cuidado.</li>
                        <li><strong>Vs. 11-16:</strong> O Senhor é o ajudador e protetor do seu povo, encorajando-os à confiança.</li>
                        <li><strong>Vs. 21-28:</strong> Desafio às nações a apresentar ídolos capazes de prever o futuro.</li>
                    </ul>

                    <p>
                        "Um ao outro ajudou..." refere-se apenas à ajuda de idólatras na construção de um falso deus. O capítulo fala sobretudo acerca do contraste entre o Redentor de Israel e os ídolos feitos por mãos humanas:
                    </p>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>DEUS</th>
                                    <th>ÍDOLOS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>É o Criador de todas as coisas (Isaías 42:5)</td>
                                    <td>Não criam nada, mas são confeccionados</td>
                                </tr>
                                <tr>
                                    <td>Fala e instrui ao Seu povo</td>
                                    <td>São incapazes de falar (Isaías 41:28-29)</td>
                                </tr>
                                <tr>
                                    <td>Encoraja e fortalece o Seu povo</td>
                                    <td>Quem faz isso são os idólatras (Esforça-te)</td>
                                </tr>
                                <tr>
                                    <td>Digno de confiança</td>
                                    <td>Incapazes de ajudar</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.alertBox}>
                        <div className={styles.alertTitle}>
                            <AlertTriangle size={20} /> Perigo dos textos usados fora do seu contexto
                        </div>
                        <p>
                            Isaías 41:6 é um dos muitos exemplos de passagens que são usadas fora do seu contexto original. Apesar do intuito positivo, essa não é a atitude certa, uma vez que demonstra falta de estudo e interpretação inadequada da Bíblia. Boas intenções não bastam para comunicar um texto bíblico. É preciso estudar com profundidade, lembrando que a Bíblia interpreta-se a si mesma.
                        </p>
                    </div>
                </article>
            </div>
        </main>
    );
}
