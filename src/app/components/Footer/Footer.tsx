import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Coluna do Logo e Descrição */}
        <div className={styles.infoCol}>
          <h2 className={styles.logo}>Havi<span>Hannah</span></h2>
          <p className={styles.description}>
            Levando a Palavra de Deus até a sua porta. Cada livro selecionado 
            com cuidado e oração para edificar sua vida espiritual.
          </p>
        </div>

        {/* Coluna de Navegação */}
        <div className={styles.linksCol}>
          <h3 className={styles.title}>NAVEGAÇÃO</h3>
          <ul>
            <li>Catálogo Completo</li>
            <li>Bíblias</li>
            <li>Devocionais</li>
            <li>Meus Pedidos</li>
          </ul>
        </div>

        {/* Coluna de Atendimento */}
        <div className={styles.linksCol}>
          <h3 className={styles.title}>ATENDIMENTO</h3>
          <p>Entrega direta do curador para sua casa</p>
          <p className={styles.email}>contato@havihannah.com.br</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <hr className={styles.divider} />
        <p>© 2026 HaviHannah — Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;