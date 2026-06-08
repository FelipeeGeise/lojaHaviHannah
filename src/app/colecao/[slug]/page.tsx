import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

import Image from 'next/image';

import Link from 'next/link';

import styles from './Colecao.module.css';

import { prisma } from '@/app/lib/prisma';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PaginaColecao({
  params,
}: PageProps) {
  const resolvedParams =
    await params;

  const slug =
    resolvedParams.slug;

  const categorias = [
    'Todos',
    'Bíblias',
    'Devocionais',
    'Teologia',
    'Infantil',
    'Louvor',
    'Estudo Bíblico',
    'Família',
  ];

  const normalizar = (
    texto: string
  ) =>
    texto
      .normalize('NFD')
      .replace(
        /[\u0300-\u036f]/g,
        ''
      )
      .toLowerCase()
      .replace(/\s+/g, '-');

  const categoriaAtivaNome =
    categorias.find(
      (cat) =>
        normalizar(cat) === slug
    ) || slug;

  // =========================
  // BUSCA REAL DO PRISMA
  // =========================

  const produtos =
    slug === 'todos'
      ? await prisma.product.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        })
      : await prisma.product.findMany({
          where: {
            category:
              categoriaAtivaNome,
          },

          orderBy: {
            createdAt: 'desc',
          },
        });

  return (
    <>
      <Header />

      <main className={styles.container}>
        <header
          className={styles.pageHeader}
        >
          <span className={styles.label}>
            COLEÇÃO
          </span>

          <h1 className={styles.title}>
            {categoriaAtivaNome}
          </h1>
        </header>

        <section
          className={styles.filterBar}
        >
          <div
            className={
              styles.searchContainer
            }
          >
            <span
              className={
                styles.searchIcon
              }
            >
              🔍
            </span>

            <input
              type="text"
              placeholder="Buscar livros ou autores..."
              className={
                styles.searchInput
              }
            />
          </div>

          <div
            className={
              styles.tabsContainer
            }
          >
            {categorias.map((cat) => {
              const catSlug =
                normalizar(cat);

              const isActive =
                slug === catSlug;

              return (
                <Link
                  key={cat}
                  href={`/colecao/${catSlug}`}
                  className={
                    isActive
                      ? styles.activeTab
                      : styles.tab
                  }
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </section>

        <hr className={styles.divider} />

        <section className={styles.content}>
          <p
            className={
              styles.resultsCount
            }
          >
            {produtos.length}{' '}
            livro(s) encontrado(s)
          </p>

          <div
            className={
              styles.productGrid
            }
          >
            {produtos.map((produto) => {
              const imageUrl =
                produto.imageUrl &&
                produto.imageUrl.trim() !==
                  ''
                  ? produto.imageUrl
                  : '/images/placeholder.jpg';

              return (
                <Link
                  key={produto.id}
                  href={`/produto/${produto.id}`}
                  className={
                    styles.productCard
                  }
                >
                  <div
                    className={
                      styles.imageWrapper
                    }
                  >
                    <Image
                      src={imageUrl}
                      alt={produto.title}
                      width={350}
                      height={450}
                      className={styles.img}
                      priority
                    />
                  </div>

                  <div
                    className={
                      styles.productDetails
                    }
                  >
                    <div
                      className={
                        styles.pricing
                      }
                    >
                      {produto.oldPrice && (
                        <span
                          className={
                            styles.oldPrice
                          }
                        >
                          R${' '}
                          {produto.oldPrice.toLocaleString(
                            'pt-BR',
                            {
                              minimumFractionDigits:
                                2,
                            }
                          )}
                        </span>
                      )}

                      <span
                        className={
                          styles.currentPrice
                        }
                      >
                        R${' '}
                        {produto.price.toLocaleString(
                          'pt-BR',
                          {
                            minimumFractionDigits:
                              2,
                          }
                        )}
                      </span>
                    </div>

                    <h3
                      className={
                        styles.productName
                      }
                    >
                      {produto.title}
                    </h3>

                    <p
                      className={
                        styles.author
                      }
                    >
                      {produto.author}
                    </p>

                    <span
                      className={
                        styles.categoryTag
                      }
                    >
                      {produto.category}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}