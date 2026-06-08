import styles from "./Featured.module.css";
import Image from "next/image";
import Link from "next/link";

interface Product {
    id: string;
    image: string;
    oldPrice?: string;
    price: string;
    title: string;
    author: string;
    category: string;
}

interface FeaturedProps {
    products: Product[];
}

export default function Featured({
    products,
}: FeaturedProps) {
    return (
        <section className={styles.featured}>
            <div className={styles.top}>
                <div>
                    <span className={styles.subtitle}>
                        CURADORIA
                    </span>

                    <h2>Destaques</h2>
                </div>

                <button className={styles.viewAll}>
                    Ver todos →
                </button>
            </div>

            <div className={styles.line}></div>

            <div className={styles.grid}>
                {products.map((product) => (
                    <Link
                        href={`/produto/${product.id}`}
                        className={styles.card}
                        key={product.id}
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={400}
                            height={500}
                            className={styles.image}
                        />

                        <div className={styles.info}>
                            <div className={styles.prices}>
                                {product.oldPrice && (
                                    <span className={styles.oldPrice}>
                                        {product.oldPrice}
                                    </span>
                                )}

                                <span className={styles.price}>
                                    {product.price}
                                </span>
                            </div>

                            <h3>{product.title}</h3>

                            <p className={styles.author}>
                                {product.author}
                            </p>

                            <span className={styles.category}>
                                {product.category}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}