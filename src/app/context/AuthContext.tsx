// src/app/context/AuthContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

// =========================
// AUTH
// =========================

interface AuthContextType {
  isLoggedIn: boolean;

  login: () => void;

  logout: () => void;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

// =========================
// CART
// =========================

export interface CartItem {
  id: string;

  title: string;

  author: string;

  price: number;

  image: string;

  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (
    product: Omit<CartItem, 'quantity'>
  ) => void;

  removeItem: (id: string) => void;

  increaseQuantity: (
    id: string
  ) => void;

  decreaseQuantity: (
    id: string
  ) => void;
}

const CartContext =
  createContext<
    CartContextType | undefined
  >(undefined);

// =========================
// PROVIDERS
// =========================

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const login = () =>
    setIsLoggedIn(true);

  const logout = () =>
    setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart =
      localStorage.getItem('cart');

    if (storedCart) {
      setCartItems(
        JSON.parse(storedCart)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  function addToCart(
    product: Omit<CartItem, 'quantity'>
  ) {
    setCartItems((items) => {
      const existingProduct =
        items.find(
          (item) =>
            item.id === product.id
        );

      if (existingProduct) {
        return items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...items,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  function removeItem(id: string) {
    setCartItems((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );
  }

  function increaseQuantity(
    id: string
  ) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(
    id: string
  ) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id &&
        item.quantity > 1
          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
          : item
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// =========================
// HOOKS
// =========================

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de um AuthProvider'
    );
  }

  return context;
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart deve ser usado dentro de um CartProvider'
    );
  }

  return context;
}