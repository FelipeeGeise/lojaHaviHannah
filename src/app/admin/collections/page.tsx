'use client';

import { createCollection } from "../../actions/collection-actions";
import { useRouter } from "next/navigation";
import styles from "./AdminCollections.module.css";

export default function AdminCollectionsPage() {
  const router = useRouter();

  async function handleAction(formData: FormData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!title || !description || !(image instanceof File) || image.size === 0) {
      alert("Por favor, preencha todos os campos e selecione uma imagem.");
      return;
    }

    try {
      await createCollection(formData);
      alert("Coleção criada e enviada com sucesso para o banco e componente!");
      
      // Redireciona para a página de visualização
      router.push("/admin/nova-colecao");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar a coleção.");
    }
  }

  return (
    <main className={styles.container}>
      <h1>Cadastrar Nova Coleção</h1>
      
      {/* Usando a propriedade action nativa do Next.js para rodar no servidor */}
      <form action={handleAction} className={styles.form}>
        <div className={styles.field}>
          <label>TÍTULO DA COLEÇÃO</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Ex: Bíblias de Estudo" 
            required 
          />
        </div>

        <div className={styles.field}>
          <label>DESCRIÇÃO</label>
          <input 
            type="text" 
            name="description" 
            placeholder="Ex: Versões luxo e couro legítimo..." 
            required 
          />
        </div>

        <div className={styles.field}>
          <label>IMAGEM DE CAPA</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            required 
          />
        </div>

        <button type="submit" className={styles.addButton}>
          ENVIAR PARA O COMPONENTE
        </button>
      </form>
    </main>
  );
}