// Força o arquivo a ser tratado estritamente no escrutínio do servidor
export const runtime = "nodejs";

import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";

import { prisma } from "../lib/prisma";

import styles from "./Admin.module.css";

async function deleteProduct(formData: FormData) {
  "use server";

  const id = formData.get("id");

  if (typeof id !== "string") {
    return;
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
}

export default async function AdminPage() {
  // Busca os produtos diretamente do banco de dados via Prisma no Server Side
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Imagem padrão caso o produto esteja sem URL
  const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

  return (
    <main className={styles.container}>
      <div className={styles.top}>
        <div>
          <span className={styles.subtitle}>ADMIN</span>
          <h1>Produtos</h1>
        </div>

        <Link
          href="/admin/novo-produto"
          className={styles.button}
        >
          Novo Produto
        </Link>
      </div>

      <div className={styles.grid}>
        {/* CORRIGIDO: Adicionado a tipagem flexível para passar direto no build estrito da Vercel */}
        {products.map((product: { id: string; title: string; category: string | null; author: string | null; price: number; imageUrl: string | null }) => {
          // Validação rápida:
          // se a URL for nula, vazia ou inválida,
          // usa o fallback
          const validImageUrl =
            product.imageUrl &&
            product.imageUrl.trim() !== ""
              ? product.imageUrl
              : PLACEHOLDER_IMAGE;

          return (
            <div
              key={product.id}
              className={styles.card}
            >
              <Image
                src={validImageUrl}
                alt={product.title}
                width={300}
                height={400}
                className={styles.image}
                priority={false}
              />

              <div className={styles.info}>
                <span className={styles.category}>
                  {product.category}
                </span>

                <h2>{product.title}</h2>

                <p>{product.author}</p>

                <strong>
                  R${" "}
                  {product.price.toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </strong>

                <form
                  action={deleteProduct}
                  className={styles.deleteForm}
                >
                  <input
                    type="hidden"
                    name="id"
                    value={product.id}
                  />

                  <button
                    type="submit"
                    className={styles.deleteButton}
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}