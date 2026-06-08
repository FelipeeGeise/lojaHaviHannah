'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, LogIn, UserPlus, Package, LogOut, Menu } from 'lucide-react'; 
import { useAuth } from '../../context/AuthContext'; 
import { useCart } from '../../context/CartContext'; // Importe o seu contexto de carrinho aqui
import styles from "./Header.module.css";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isLoggedIn, logout } = useAuth(); 
  const { cartItems } = useCart(); // Puxa os itens do carrinho do seu contexto global

  // Calcula o total de produtos na bolsa somando as quantidades de cada item
  // Ex: Se tem 2 Bíblias e 1 Teologia, o contador mostrará 3
  const totalItemsInCart = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideInteraction(event: MouseEvent | KeyboardEvent) {
      if (event instanceof MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      }
      if (event instanceof KeyboardEvent && event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideInteraction);
    document.addEventListener('keydown', handleOutsideInteraction);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction);
      document.removeEventListener('keydown', handleOutsideInteraction);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      {/* Logo com Link para a Home */}
      <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
        <div className={styles.logo}>
          Havi<span>Hannah</span>
        </div>
      </Link>

      {/* Menu de Navegação */}
      <nav>
        <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <li><Link href="/colecao/todos" onClick={() => setIsMenuOpen(false)}>CATÁLOGO</Link></li>
          <li><Link href="/colecao/biblias" onClick={() => setIsMenuOpen(false)}>BÍBLIAS</Link></li>
          <li><Link href="/colecao/devocionais" onClick={() => setIsMenuOpen(false)}>DEVOCIONAIS</Link></li>
          <li><Link href="/colecao/teologia" onClick={() => setIsMenuOpen(false)}>TEOLOGIA</Link></li>
        </ul>
      </nav>

      {/* Ícones de Ação */}
      <div className={styles.icons}>
        
        {/* Container do Menu Dropdown do Usuário */}
        <div className={styles.userMenuContainer} ref={dropdownRef}>
          <button 
            onClick={toggleDropdown} 
            className={`${styles.iconButton} ${isDropdownOpen ? styles.activeIcon : ''}`}
            aria-label="Menu do usuário"
          >
            <User size={22} strokeWidth={1.5} />
          </button>

          {/* Menu Dropdown Condicional */}
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {!isLoggedIn ? (
                <>
                  <Link href="/login" className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    <LogIn size={16} />
                    <span>Entrar</span>
                  </Link>
                  <Link href="/cadastro" className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    <UserPlus size={16} />
                    <span>Criar Conta</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/perfil" className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    <User size={16} />
                    <span>Minha Conta</span>
                  </Link>
                  <Link href="/pedidos" className={styles.dropdownItem} onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    <Package size={16} />
                    <span>Meus Pedidos</span>
                  </Link>
                  <hr className={styles.divider} />
                  <button 
                    onClick={() => { logout(); setIsDropdownOpen(false); setIsMenuOpen(false); }} 
                    className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Ícone da Bolsa de Compras com a Bolinha Notificadora */}
        <Link href="/carrinho" className={styles.cartButton} onClick={() => setIsMenuOpen(false)}>
          <ShoppingBag size={22} strokeWidth={1.5} />
          {/* A bolinha só aparece se houver pelo menos 1 item na bolsa */}
          {totalItemsInCart > 0 && (
            <span className={styles.badge}>{totalItemsInCart}</span>
          )}
        </Link>

        {/* Botão Hambúrguer Mobile */}
        <button 
          className={styles.menuToggle} 
          onClick={toggleMenu}
          aria-label="Abrir menu de navegação"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}