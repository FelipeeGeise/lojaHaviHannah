'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define a estrutura de um item dentro da bolsa
interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Define o que o contexto vai exportar para o Header e para as páginas
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carrega os itens da bolsa salvos no navegador quando a página inicia
  useEffect(() => {
    const savedCart = localStorage.getItem('havihannah_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar o carrinho", e);
      }
    }
  }, []);

  // Salva na memória do navegador sempre que a bolsa mudar
  useEffect(() => {
    localStorage.setItem('havihannah_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Função para adicionar produto ou aumentar a quantidade se já existir
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Função para remover do carrinho
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar o carrinho nos componentes
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}