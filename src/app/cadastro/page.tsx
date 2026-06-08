// app/cadastro/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import styles from './Auth.module.css';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar no banco e já logar o usuário direto
    console.log('Cadastro com:', { name, email, password });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Criar sua Conta</h2>
        <p className={styles.subtitle}>Cadastre-se rápido para acompanhar suas compras</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome Completo</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                type="text"
                id="name"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
            <label htmlFor="password">Criar Senha</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Mínimo 6 caracteres"
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
            <UserPlus size={18} />
            <span>Cadastrar e Entrar</span>
          </button>
        </form>

        <p className={styles.switchAuth}>
          Já possui conta? <Link href="/login">Fazer Login</Link>
        </p>
      </div>
    </div>
  );
}