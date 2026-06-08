import styles from "./NovoProduto.module.css";

import { createProduct } from "../../actions/product-actions";

export default function NovoProdutoPage() {
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <span>ADMIN</span>

        <h1>Novo Produto</h1>
      </div>

      <form
        action={createProduct}
        className={styles.form}
      >
        <div className={styles.grid}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Autor"
            required
          />
        </div>

        <div className={styles.grid}>
          <input
            type="text"
            name="category"
            placeholder="Categoria"
            required
          />

          <input
            type="text"
            name="publisher"
            placeholder="Editora"
            required
          />
        </div>

        <div className={styles.grid}>
          <input
            type="number"
            name="price"
            placeholder="Preço"
            required
          />

          <input
            type="number"
            name="oldPrice"
            placeholder="Preço Antigo"
          />
        </div>

        <div className={styles.grid}>
          <input
            type="number"
            name="pages"
            placeholder="Páginas"
            required
          />

          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Descrição"
          rows={8}
          required
        />

        <div className={styles.upload}>
          <label>
            Upload da imagem
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
            required
          />
        </div>

        <button type="submit">
          PUBLICAR PRODUTO
        </button>
      </form>
    </main>
  );
}