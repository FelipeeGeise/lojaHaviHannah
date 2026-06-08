// src/app/layout.tsx

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // ✅ Agora importado do arquivo correto!
import Header from './components/Header/Header';

// @ts-ignore: allow side-effect CSS import without type declarations
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Providers globais */}
        <AuthProvider>
          <CartProvider>
            <Header />

            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}