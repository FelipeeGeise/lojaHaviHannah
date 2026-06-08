import React from 'react';
import styles from './Promise.module.css';
import { BookOpen, ShieldCheck, Truck } from 'lucide-react'; // Sugestão de ícones

const Promise = () => {
  const promises = [
    {
      icon: <BookOpen size={32} strokeWidth={1} />,
      title: "Seleção Espiritual",
      description: "Cada livro é curado com oração e discernimento para edificar sua fé."
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1} />,
      title: "Preparação pelo Parceiro",
      description: "Nosso curador parceiro prepara seu pedido com cuidado e atenção."
    },
    {
      icon: <Truck size={32} strokeWidth={1} />,
      title: "Entrega Abençoada",
      description: "Direto do curador até a porta da sua casa, com rastreamento completo."
    }
  ];

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.subtitle}>NOSSA PROMESSA</span>
        <h2 className={styles.title}>Do Curador à Sua Porta</h2>
      </div>

      <div className={styles.grid}>
        {promises.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.iconWrapper}>
              {item.icon}
            </div>
            <hr className={styles.divider} />
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemDescription}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promise;