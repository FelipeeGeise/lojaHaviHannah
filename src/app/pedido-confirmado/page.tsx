export default function PedidoConfirmado() {
  return (
    <main style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center', 
      marginTop: '120px', // Empurra o conteúdo para baixo da sua barra de navegação
      color: '#333333'     // Garante que o texto fique escuro no fundo branco
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111111' }}>
        Pedido Confirmado
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: '#666666' }}>
        Obrigado pela sua compra.
      </p>
    </main>
  );
}