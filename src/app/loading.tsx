// src/app/loading.tsx
'use client';

import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.content}>
        {/* Nome do seu site centralizado */}
        <h1 className={styles.logoText}>
          Havi<span>Hannah</span>
        </h1>
        
        {/* O girinho (Spinner) animado abaixo */}
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}