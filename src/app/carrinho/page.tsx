'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import styles from './Carrinho.module.css';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CarrinhoPage() {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const [, setTick] = useState(0);

    // Corrigido: Agora passando o 'author' aqui
    const increaseQuantity = (item: typeof cartItems[0]) => {
        addToCart({
            id: item.id,
            title: item.title,
            author: item.author, // Adicionado
            price: item.price,
            imageUrl: item.imageUrl
        });
    };

    const decreaseQuantity = (item: typeof cartItems[0]) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            setTick(prev => prev + 1); 
        } else {
            removeFromCart(item.id);
        }
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <ShoppingBag size={52} strokeWidth={1.3} />
                <h1>Seu carrinho está vazio</h1>
                <p>Explore nosso catálogo e encontre o livro perfeito para sua jornada espiritual.</p>
                <Link href="/" className={styles.catalogButton}>EXPLORAR CATÁLOGO</Link>
            </div>
        );
    }

    return (
        <div className={styles.cartContainer}>
            <span className={styles.smallTitle}>CARRINHO</span>
            <h1>Seus Livros</h1>

            <div className={styles.cartContent}>
                {cartItems.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={120}
                            height={160}
                            className={styles.productImage}
                        />

                        <div className={styles.itemInfo}>
                            <h2>{item.title}</h2>
                            <p>por {item.author}</p> {/* Exibindo o autor */}
                            <p>R$ {item.price.toFixed(2)}</p>

                            <div className={styles.quantityControl}>
                                <button onClick={() => decreaseQuantity(item)}>−</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item)}>+</button>
                            </div>
                        </div>

                        <div className={styles.itemActions}>
                            <strong>R$ {(item.price * item.quantity).toFixed(2)}</strong>
                            <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                                <Trash2 size={18} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div><span>Itens</span><strong>{totalItems}</strong></div>
                <div><span>Subtotal</span><strong>R$ {subtotal.toFixed(2)}</strong></div>
                <div><span>Frete</span><p>Calculado no checkout</p></div>
                <div><span>Total</span><strong>R$ {subtotal.toFixed(2)}</strong></div>
            </div>

            <div className={styles.cartButtons}>
                <Link href="/" className={styles.continueShoppingButton}>CONTINUAR COMPRANDO</Link>
                <Link href="/checkout" className={styles.checkoutButton}>FINALIZAR COMPRA</Link>
            </div>
        </div>
    );
}