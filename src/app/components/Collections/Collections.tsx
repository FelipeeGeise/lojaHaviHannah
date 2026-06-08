import Image from "next/image";
import styles from "./Collections.module.css";

interface Collection {
  image: string;
  title: string;
  description: string;
}

interface CollectionsProps {
  collections: Collection[];
}

export default function Collections({
  collections,
}: CollectionsProps) {
  return (
    <section className={styles.collections}>
      <div className={styles.heading}>
        <span>EXPLORE</span>

        <h2>Nossas Coleções</h2>
      </div>

      <div className={styles.grid}>
        {collections.map((item, index) => (
          <div className={styles.card} key={index}>
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={700}
              className={styles.image}
            />

            <div className={styles.overlay}>
              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}