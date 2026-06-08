'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext'; 
import styles from './ProductPage.module.css';

interface AddToCartButtonProps {
    id: string;
    title: string;
    price: number;
    image: string;
}

export default function AddToCartButton({
    id,
    title,
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