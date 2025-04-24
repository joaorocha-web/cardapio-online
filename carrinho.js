const carrinho = document.getElementsByClassName('carrinho-formato')[0];
const botaoCarrinho = document.getElementById('botao-carrinho');
const botaoFechar = document.getElementById('fechar');

// Abrir Pedidos
botaoCarrinho.addEventListener('click', function(){
    carrinho.style.display= 'flex'
})

// Fechar Pedidos
botaoFechar.addEventListener('click', function fecharPedidos(){
    carrinho.style.display= 'none'
})

// Contar pedidos 
const pedidos = document.getElementById('pedidos')
const mostrarTotal = document.getElementById('total')
let contador = document.getElementById('cont-pedidos')
let cont = 0
let total = 0
document.querySelectorAll('button.comprar').forEach (botao =>{
    botao.addEventListener('click', function (){
        let nome = botao.getAttribute('data-name')
        let preco = botao.getAttribute('data-price')
        pedidos.innerHTML += `${nome} - ${preco} <br>`
        total += Number(preco)
        mostrarTotal.innerHTML = `<strong>R$${total},00</strong>`
        cont++
        contador.innerHTML =`${cont}`
    })
})

// Adicionar Pedidos no Carrinho

