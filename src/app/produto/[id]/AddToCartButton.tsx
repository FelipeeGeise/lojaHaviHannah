'use client';

import { useRouter } from 'next/navigation';
// CORRIGIDO: Agora puxa o useCart direto do contexto exclusivo de carrinho
import { useCart } from '../../context/CartContext'; 
import styles from './ProductPage.module.css';

interface AddToCartButtonProps {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
}

export default function AddToCartButton({
    id,
    title,
    author,
    price,
    image,
}: AddToCartButtonProps) {
    const router = useRouter();
    const { addToCart } = useCart();

    function handleAddToCart() {
        addToCart({
            id,
            title,
            price,
            imageUrl: image, // Adaptado para a propriedade 'imageUrl' exigida pelo seu CartContext
        });

        router.push('/carrinho');
    }

    return (
        <button
            className={styles.button}
            onClick={handleAddToCart}
        >
            ADICIONAR AO CARRINHO
        </button>
    );
}