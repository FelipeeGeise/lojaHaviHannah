'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Importa o useRouter
import styles from './Checkout.module.css';

export default function CheckoutPage() {
    const router = useRouter(); // 2. Inicializa o roteador

    // 3. Função que lida com o clique do botão
    const handleConfirmarPedido = () => {
        // Aqui futuramente você pode colocar a lógica de enviar os dados para uma API
        router.push('/pedido-confirmado'); // Redireciona para a rota desejada
    };

    return (
        <main className={styles.container}>
            <Link
                href="/carrinho"
                className={styles.backLink}
            >
                ← Voltar ao carrinho
            </Link>

            <span className={styles.smallTitle}>
                FINALIZAÇÃO
            </span>

            <h1 className={styles.title}>
                Checkout
            </h1>

            <div className={styles.content}>
                <section className={styles.formSection}>
                    <h2>Seus Dados</h2>

                    <div className={styles.field}>
                        <label>
                            NOME COMPLETO *
                        </label>

                        <input
                            type="text"
                            placeholder=""
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>
                                E-MAIL *
                            </label>

                            <input
                                type="email"
                            />
                        </div>

                        <div className={styles.field}>
                            <label>
                                TELEFONE
                            </label>

                            <input
                                type="tel"
                            />
                        </div>
                    </div>

                    <h2>
                        Endereço de Entrega
                    </h2>

                    <div className={styles.field}>
                        <label>
                            ENDEREÇO
                        </label>

                        <input
                            type="text"
                            placeholder="Rua, número, complemento"
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>
                                CIDADE *
                            </label>

                            <input
                                type="text"
                            />
                        </div>

                        <div className={styles.field}>
                            <label>
                                ESTADO *
                            </label>

                            <input
                                type="text"
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label>
                            CEP *
                        </label>

                        <input
                            type="text"
                        />
                    </div>

                    <h2>
                        Forma de Pagamento
                    </h2>

                    <div className={styles.paymentOption}>
                        <input
                            type="radio"
                            name="payment"
                            defaultChecked
                        />

                        <span>
                            PIX — Pagamento instantâneo
                        </span>
                    </div>

                    <div className={styles.paymentOption}>
                        <input
                            type="radio"
                            name="payment"
                        />

                        <span>
                            Boleto Bancário — até 3 dias úteis
                        </span>
                    </div>

                    <div className={styles.paymentOption}>
                        <input
                            type="radio"
                            name="payment"
                        />

                        <span>
                            Cartão de Crédito — até 12x
                        </span>
                    </div>
                </section>

                <aside className={styles.summary}>
                    <h3>
                        Resumo do Pedido
                    </h3>

                    <div className={styles.product}>
                        <div>
                            Teologia Sistemática —
                            Edição Completa
                        </div>

                        <div>
                            x 1
                        </div>

                        <strong>
                            R$ 149,90
                        </strong>
                    </div>

                    <div className={styles.total}>
                        <span>Total</span>

                        <strong>
                            R$ 149,90
                        </strong>
                    </div>

                    <div className={styles.steps}>
                        <div>
                            Seleção
                        </div>

                        <div>
                            Preparação
                        </div>

                        <div>
                            Entrega
                        </div>
                    </div>

                    {/* 4. Adicionado o evento onClick aqui */}
                    <button
                        className={styles.confirmButton}
                        onClick={handleConfirmarPedido}
                    >
                        CONFIRMAR PEDIDO
                    </button>
                </aside>
            </div>
        </main>
    );
}