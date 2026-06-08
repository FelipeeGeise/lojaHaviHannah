import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>A PALAVRA</h1>

          <div className={styles.line}></div>

          <p>
            Livros evangélicos selecionados com cuidado e oração,
            entregues diretamente na sua porta.
          </p>

          <div className={styles.buttons}>
            <Link
              href="/colecao/todos"
              className={styles.primaryButton}
            >
              EXPLORAR CATÁLOGO
            </Link>

            <Link
              href="/colecao/biblias"
              className={styles.secondaryButton}
            >
              BÍBLIAS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}