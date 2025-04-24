const carrinho = document.getElementsByClassName('carrinho-formato')[0];
const botaoCarrinho = document.getElementById('pedidos');
const botaoFechar = document.getElementById('fechar');

// Abrir Pedidos
botaoCarrinho.addEventListener('click', function abrirPedidos(){
    carrinho.style.display= 'flex'
})

// Fechar Pedidos
botaoFechar.addEventListener('click', function fecharPedidos(){
    carrinho.style.display= 'none'
})