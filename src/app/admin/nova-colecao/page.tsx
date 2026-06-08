import { prisma } from "../../lib/prisma"; 
import { deleteCollection } from "../../actions/collection-actions"; 
import { revalidatePath } from "next/cache";
import Link from 'next/link';
import styles from './NovaColecao.module.css';

export default async function NovaColecaoPage() {
  // Busca as coleções atualizadas diretamente do banco PostgreSQL
  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Visualizar Coleções</h1>
        <Link href="/admin/collections" style={{ background: '#111', color: '#fff', padding: '10px 20px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
          + Cadastrar Nova
        </Link>
      </div>

      {/* Div principal contendo o grid horizontal travado em 4 colunas */}
      <div className={styles.horizontalGrid}>
        {collections.map((item) => (
          <div key={item.id} className={styles.cardAdmin}>
            <div className={styles.imageBox}>
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            <div className={styles.infoBox}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            
            {/* Form nativo para acionar sua função de exclusão de forma assíncrona */}
            <form action={async () => {
              'use server';
              await deleteCollection(item.id);
              revalidatePath("/admin/nova-colecao");
            }}>
              <button type="submit" className={styles.deleteButton}>
                Excluir
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}