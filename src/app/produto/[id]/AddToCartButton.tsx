'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import styles from './ProductPage.module.css';

// 1. Incluímos o 'author' na interface para o TypeScript parar de reclamar
interface AddToCartButtonProps {
    id: string;
    title: string;
    author: string; 
    price: number;
    image: string;
}

// 2. Desestruturamos o 'author' aqui nos parâmetros
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
        // 3. Passamos o 'author' para o contexto do carrinho
        addToCart({
            id,
            title,
            author, 
            price,
            imageUrl: image,
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