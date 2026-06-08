// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import styles from './Auth.module.css'; // Usaremos o mesmo CSS para ambas

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui vai entrar a sua lógica de autenticação depois
    console.log('Login com:', { email, password });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Bem-vindo de volta</h2>
        <p className={styles.subtitle}>Acesse sua conta para gerenciar seus pedidos</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Sua senha secreta"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            <LogIn size={18} />
            <span>Entrar</span>
          </button>
        </form>

        <p className={styles.switchAuth}>
          Não tem uma conta? <Link href="/cadastro">Criar Conta</Link>
        </p>
      </div>
    </div>
  );
}