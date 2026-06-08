import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "../../lib/prisma";

import AddToCartButton from "./AddToCartButton";

import styles from "./ProductPage.module.css";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({
    params,
}: ProductPageProps) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    if (!product) {
        notFound();
    }

    const imageUrl =
        product.imageUrl &&
        product.imageUrl.trim() !== ""
            ? product.imageUrl
            : "/images/placeholder.jpg";

    return (
        <main className={styles.container}>
            <Link
                href="/"
                className={styles.back}
            >
                ← Voltar ao catálogo
            </Link>

            <div className={styles.content}>
                <div className={styles.imageArea}>
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        width={500}
                        height={700}
                        className={styles.image}
                    />
                </div>

                <div className={styles.info}>
                    <span className={styles.category}>
                        {product.category}
                    </span>

                    <h1>{product.title}</h1>

                    <p className={styles.author}>
                        {product.author}
                    </p>

                    <div className={styles.line}></div>

                    <strong className={styles.price}>
                        R${" "}
                        {product.price.toLocaleString(
                            "pt-BR",
                            {
                                minimumFractionDigits: 2,
                            }
                        )}
                    </strong>

                    <AddToCartButton
                        id={product.id}
                        title={product.title}
                        author={product.author}
                        price={product.price}
                        image={imageUrl}
                    />

                    <div className={styles.descriptionArea}>
                        <h3>SOBRE O LIVRO</h3>

                        <p className={styles.description}>
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}