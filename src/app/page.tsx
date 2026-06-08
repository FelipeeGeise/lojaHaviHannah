// app/page.tsx

import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Featured from "./components/Featured/Featured";
import Collections from "./components/Collections/Collections";
import Promise from "./components/Promise/Promise";
import Footer from "./components/Footer/Footer";

import { prisma } from "./lib/prisma";

interface Product {
  id: string;
  image: string;
  oldPrice?: string;
  price: string;
  title: string;
  author: string;
  category: string;
}

interface Collection {
  image: string;
  title: string;
  description: string;
}

export default async function Home() {
  // Produtos reais do banco
  const rawProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Collections reais do banco
  const rawCollections =
    await prisma.collection.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  // Adaptação dos dados do Prisma para o frontend
  const products: Product[] =
    rawProducts.map((product) => ({
      id: product.id,

      image: product.imageUrl,

      oldPrice: product.oldPrice
        ? `R$ ${product.oldPrice.toLocaleString(
            "pt-BR",
            {
              minimumFractionDigits: 2,
            }
          )}`
        : undefined,

      price: `R$ ${product.price.toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
        }
      )}`,

      title: product.title,

      author: product.author,

      category: product.category,
    }));

  // Collections reais
  const collections: Collection[] =
    rawCollections.map((collection) => ({
      image: collection.imageUrl,

      title: collection.title,

      description:
        collection.description,
    }));

  return (
    <>
      <Header />

      <Hero />

      {/* Produtos reais vindos do banco */}
      <Featured products={products} />

      {/* Collections reais do banco */}
      <Collections
        collections={collections}
      />

      <Promise />

      <Footer />
    </>
  );
}